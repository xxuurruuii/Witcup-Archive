/* 见联会档案 · 列表页渲染 */
(function () {
  'use strict';

  var data = window.WC_DATA;
  if (!data) return;

  var seasons = data.seasons || [];
  var allMechanisms = data.mechanisms || [];

  function mechanismsOf(season) {
    return allMechanisms.filter(function (mech) {
      return (mech.seasons || []).indexOf(season.id) !== -1;
    });
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function countPuzzles(season) {
    return (season.puzzles || []).length;
  }

  function groupPuzzles(puzzles) {
    var groups = new Map();
    puzzles.forEach(function (puzzle) {
      if (!groups.has(puzzle.group)) groups.set(puzzle.group, []);
      groups.get(puzzle.group).push(puzzle);
    });
    return Array.from(groups.entries()).map(function (entry) {
      return { name: entry[0], puzzles: entry[1] };
    });
  }

  function readStrokes(season, puzzleId) {
    try {
      var raw = localStorage.getItem(window.WC_answerKey(season.id, puzzleId));
      if (!raw) return [];
      var saved = JSON.parse(raw);
      return Array.isArray(saved) ? saved : [];
    } catch (err) {
      return [];
    }
  }

  /* 把本地保存的笔迹画到缩略图上（题目以 contain 方式居中显示，需按同比例映射）。 */
  function paintInk(thumb, strokes) {
    var img = thumb.querySelector('img');
    var canvas = thumb.querySelector('canvas');
    if (!img || !canvas || !strokes.length) return;
    if (!img.complete || !img.naturalWidth) return;

    var size = thumb.clientWidth;
    if (!size) return;

    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);

    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    var scale = Math.min(size / img.naturalWidth, size / img.naturalHeight);
    var offsetX = (size - img.naturalWidth * scale) / 2;
    var offsetY = (size - img.naturalHeight * scale) / 2;

    strokes.forEach(function (stroke) {
      var points = stroke.points || [];
      if (!points.length) return;

      ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      ctx.lineWidth = Math.max(0.6, (stroke.width || 1) * scale);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      var first = points[0];
      if (points.length === 1) {
        ctx.beginPath();
        ctx.arc(offsetX + first.x * scale, offsetY + first.y * scale, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.beginPath();
      ctx.moveTo(offsetX + first.x * scale, offsetY + first.y * scale);
      for (var i = 1; i < points.length; i++) {
        ctx.lineTo(offsetX + points[i].x * scale, offsetY + points[i].y * scale);
      }
      ctx.stroke();
    });

    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- 首页 ---------- */

  var seasonList = document.getElementById('season-list');
  if (seasonList) {
    var totalPuzzles = 0;
    /* no 相同的届次（如第3届与其样卷）保持 seasons 中的先后顺序。 */
    var latestFirst = seasons.slice().sort(function (a, b) {
      return b.no - a.no;
    });

    seasonList.innerHTML = latestFirst.map(function (season) {
      var puzzles = countPuzzles(season);
      var mechanisms = mechanismsOf(season).length;
      totalPuzzles += puzzles;

      var desc = season.duration
        ? esc(season.format) + '，' + esc(season.duration) + '。'
        : esc(season.format) + '。';

      var dateLabel = season.date || '无';

      return '' +
        '<a class="season-card" href="' + esc(season.dir) + '/index.html">' +
          '<span class="season-main">' +
            '<span class="season-title">' + esc(season.title) + '</span>' +
            '<span class="season-meta">' + esc(dateLabel) + ' · ' + puzzles + ' 题 · ' + mechanisms + ' 个原创机制</span>' +
            '<span class="season-desc">' + desc + '</span>' +
          '</span>' +
          '<span class="season-arrow" aria-hidden="true">→</span>' +
        '</a>';
    }).join('');

    var statSeasons = document.getElementById('stat-seasons');
    var statPuzzles = document.getElementById('stat-puzzles');
    var statMechanisms = document.getElementById('stat-mechanisms');
    if (statSeasons) statSeasons.textContent = seasons.length;
    if (statPuzzles) statPuzzles.textContent = totalPuzzles;
    if (statMechanisms) statMechanisms.textContent = allMechanisms.length;
  }

  /* 从机制页跳转过来时（?use=<机制 id>），标记出该机制出现的题目。 */
  function highlightedPuzzles() {
    var ids = new Set();
    var mechId = new URLSearchParams(window.location.search).get('use');
    if (!mechId) return ids;
    var mech = allMechanisms.find(function (item) {
      return item.id === mechId;
    });
    if (!mech) return ids;
    (mech.rounds || []).forEach(function (id) { ids.add(id); });
    return ids;
  }

  /* ---------- 届次页面 ---------- */

  var seasonId = document.body.getAttribute('data-season');
  if (!seasonId) return;

  var season = seasons.find(function (item) { return item.id === seasonId; });
  if (!season) return;

  var facts = document.getElementById('season-facts');
  if (facts) {
    var chips = (season.facts || []).map(function (fact) {
      return '<li><span class="k">' + esc(fact.k) + '</span><span class="v">' + esc(fact.v) + '</span></li>';
    });
    chips.push(
      '<li><span class="k">题目数量</span><span class="v">' + season.puzzles.length + ' 题</span></li>'
    );
    facts.innerHTML = chips.join('');
  }

  var archiveBox = document.getElementById('archive-box');
  if (archiveBox) {
    var archiveLink = document.getElementById('archive-link');
    if (season.archive && season.archive.url) {
      archiveLink.href = season.archive.url;
      archiveLink.title = season.archive.label || '下载原始资料包';
      archiveBox.hidden = false;
    }
  }

  var linksBox = document.getElementById('links-box');
  if (linksBox) {
    var linksWrap = linksBox.querySelector('.link-buttons');
    var links = season.links || [];
    if (linksWrap && links.length) {
      linksWrap.innerHTML = links.map(function (link) {
        return '<a class="btn' + (link.primary ? '' : ' ghost') + '" href="' + esc(link.url) +
          '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + '</a>';
      }).join('');
      linksBox.hidden = false;
    }
  }

  var spoilerToggle = document.getElementById('spoiler-toggle');

  var mechGrid = document.getElementById('mechanism-grid');
  if (mechGrid) {
    var spoil = season.spoilerMechanisms === true;
    var mark = function (text) {
      return spoil ? '<span class="spoiler">' + esc(text) + '</span>' : esc(text);
    };

    mechGrid.innerHTML = mechanismsOf(season).map(function (mech) {
      return '' +
        '<a class="mech-card" href="../' + esc(mech.page) + '">' +
          '<span class="mech-figure' + (mech.image ? '' : ' is-empty') + '">' +
            (mech.image
              ? '<img src="../' + esc(mech.image) + '" alt="' + esc(mech.name) + '机制图标" loading="lazy">'
              : '<span class="mech-glyph" aria-hidden="true">🧩</span>') +
          '</span>' +
          '<span class="mech-body">' +
            '<span class="mech-name">' + mark(mech.name) + '</span>' +
            '<span class="mech-tagline">' + mark(mech.tagline) + '</span>' +
          '</span>' +
        '</a>';
    }).join('');

    if (spoilerToggle) {
      if (!spoil) {
        spoilerToggle.hidden = true;
      } else {
        spoilerToggle.addEventListener('click', function () {
          var revealed = mechGrid.classList.toggle('is-spoiler-revealed');
          spoilerToggle.setAttribute('aria-pressed', revealed ? 'true' : 'false');
          spoilerToggle.textContent = revealed ? '恢复剧透条' : '隐藏剧透条';
        });
      }
    }
  }

  var puzzleWrap = document.getElementById('puzzle-groups');
  if (puzzleWrap) {
    var puzzleGroups = groupPuzzles(season.puzzles);
    var highlightIds = highlightedPuzzles(season);

    puzzleWrap.innerHTML = puzzleGroups.map(function (group) {
      var tiles = group.puzzles.map(function (puzzle) {
        var marked = highlightIds.has(puzzle.id);
        return '' +
          '<a class="tile' + (marked ? ' is-highlight' : '') +
            '" href="puzzle.html?p=' + encodeURIComponent(puzzle.id) + '" data-puzzle="' + esc(puzzle.id) +
            '" aria-label="打开题目 ' + esc(puzzle.name) + '">' +
            '<span class="thumb"><img src="' + esc(puzzle.file) + '" alt="题目 ' + esc(puzzle.name) + ' 缩略图" loading="lazy"><canvas class="thumb-ink" aria-hidden="true"></canvas></span>' +
            '<span class="tile-name">' + esc(puzzle.name) + '</span>' +
          '</a>';
      }).join('');

      return '' +
        '<div class="puzzle-group">' +
          '<div class="group-label">' +
            '<span class="group-name">' + esc(group.name) + '</span>' +
            '<span class="group-count">' + group.puzzles.length + ' 题</span>' +
          '</div>' +
          '<div class="tiles">' + tiles + '</div>' +
        '</div>';
    }).join('');

    var inkJobs = [];

    Array.prototype.forEach.call(puzzleWrap.querySelectorAll('.tile'), function (tile) {
      var strokes = readStrokes(season, tile.getAttribute('data-puzzle'));
      if (!strokes.length) return;

      tile.classList.add('is-answered');
      var thumb = tile.querySelector('.thumb');
      var img = thumb.querySelector('img');
      var paint = function () { paintInk(thumb, strokes); };

      if (img.complete && img.naturalWidth) {
        paint();
      } else {
        img.addEventListener('load', paint);
      }
      inkJobs.push(paint);
    });

    if (inkJobs.length) {
      var repaintAll = function () {
        inkJobs.forEach(function (paint) { paint(); });
      };
      var resizeFrame = 0;
      window.addEventListener('resize', function () {
        if (resizeFrame) return;
        resizeFrame = window.requestAnimationFrame(function () {
          resizeFrame = 0;
          repaintAll();
        });
      });
      if (window.ResizeObserver) {
        var observer = new ResizeObserver(repaintAll);
        puzzleWrap.querySelectorAll('.tile[data-puzzle] .thumb').forEach(function (thumb) {
          observer.observe(thumb);
        });
      }
    }

    if (highlightIds.size) {
      var scrollToFirst = function () {
        var first = puzzleWrap.querySelector('.tile.is-highlight');
        if (first) first.scrollIntoView({ block: 'center' });
      };
      scrollToFirst();
      window.addEventListener('load', function () {
        window.setTimeout(scrollToFirst, 60);
      });
    }
  }
})();
