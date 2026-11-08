/* 见联会档案 · 做题页（绘画 / 擦除 / 同组切换） */
(function () {
  'use strict';

  var data = window.WC_DATA;
  if (!data || !data.seasons.length) return;

  var params = new URLSearchParams(window.location.search);
  var seasonId = params.get('s') || document.body.getAttribute('data-season');
  var season = data.seasons.find(function (item) {
    return item.id === seasonId;
  }) || data.seasons[0];
  if (!season || !season.puzzles.length) return;

  var COLORS = [
    { value: '#f2d43c', label: '黄色' },
    { value: '#ffffff', label: '白色' },
    { value: '#111214', label: '黑色' },
    { value: '#e5484d', label: '红色' },
    { value: '#3aa0ff', label: '蓝色' },
    { value: '#4ade80', label: '绿色' }
  ];
  var DEFAULT_COLOR = '#e5484d';
  var DEFAULT_BRUSH = 8;

  var img = document.getElementById('puzzle-img');
  var canvas = document.getElementById('draw-canvas');
  var wrap = document.getElementById('canvas-wrap');
  var stage = document.getElementById('stage');
  var message = document.getElementById('stage-message');
  var nameEl = document.getElementById('puzzle-name');
  var progressEl = document.getElementById('puzzle-progress');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var drawBtn = document.getElementById('mode-draw');
  var eraseBtn = document.getElementById('mode-erase');
  var sizeInput = document.getElementById('size');
  var sizeValue = document.getElementById('size-value');
  var swatches = document.getElementById('swatches');
  var undoBtn = document.getElementById('undo');
  var clearBtn = document.getElementById('clear');
  var cursorEl = document.getElementById('brush-cursor');
  var noteEl = document.getElementById('puzzle-note');

  var ctx = canvas.getContext('2d');
  var current = null;
  var groupPuzzles = [];
  var groupIndex = 0;
  var naturalW = 0;
  var naturalH = 0;
  var strokes = [];
  var currentStroke = null;
  var mode = 'draw';
  var rightErase = false;
  var color = DEFAULT_COLOR;
  var brush = DEFAULT_BRUSH;
  var loadToken = 0;
  var BRUSH_REFERENCE = 700;
  var ERASER_SCALE = 3.2;
  var MIN_BRUSH = Number(sizeInput.min) || 2;
  var MAX_BRUSH = Number(sizeInput.max) || 30;

  /* ---------- 本地保存 ---------- */

  function storageKey(puzzle) {
    return window.WC_answerKey(season.id, puzzle.id);
  }

  function readStrokes(puzzle) {
    try {
      var raw = window.localStorage.getItem(storageKey(puzzle));
      if (!raw) return [];
      var saved = JSON.parse(raw);
      return Array.isArray(saved) ? saved : [];
    } catch (err) {
      return [];
    }
  }

  function toolKey(puzzle) {
    return 'wc-tool-' + season.id + '-' + puzzle.id;
  }

  function readTool(puzzle) {
    try {
      var raw = window.localStorage.getItem(toolKey(puzzle));
      if (!raw) return null;
      var saved = JSON.parse(raw);
      return saved && typeof saved === 'object' ? saved : null;
    } catch (err) {
      return null;
    }
  }

  function saveTool() {
    if (!current) return;
    try {
      window.localStorage.setItem(toolKey(current), JSON.stringify({ color: color, brush: brush }));
    } catch (err) {
      /* 本地存储不可用时忽略 */
    }
  }

  function persist() {
    if (!current) return;
    try {
      if (strokes.length) {
        window.localStorage.setItem(storageKey(current), JSON.stringify(strokes));
      } else {
        window.localStorage.removeItem(storageKey(current));
      }
    } catch (err) {
      /* 本地存储不可用时仍可继续作答 */
    }
  }

  /* ---------- 画布尺寸 ---------- */

  function fitCanvas() {
    if (!naturalW || !naturalH) return;
    var style = window.getComputedStyle(stage);
    var padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    var padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    var availW = Math.max(60, stage.clientWidth - padX);
    var availH = Math.max(60, stage.clientHeight - padY);
    var ratio = Math.min(availW / naturalW, availH / naturalH, 1);
    if (!isFinite(ratio) || ratio <= 0) ratio = 1;
    wrap.style.width = Math.round(naturalW * ratio) + 'px';
    wrap.style.height = Math.round(naturalH * ratio) + 'px';
    updateCursor();
  }

  /* ---------- 绘制 ---------- */

  function brushWidth(erase) {
    var scale = canvas.width / BRUSH_REFERENCE;
    var width = brush * (scale > 0 ? scale : 1);
    if (erase) width *= ERASER_SCALE;
    return Math.max(1, width);
  }

  /* ---------- 光标 ---------- */

  function eraseCursorActive() {
    return mode === 'erase' || rightErase;
  }

  function updateCursor() {
    if (!cursorEl || !naturalW || !canvas.width) return;
    var rect = canvas.getBoundingClientRect();
    if (!rect.width) return;

    var erase = eraseCursorActive();
    var diameter = brushWidth(erase) * (rect.width / canvas.width);

    cursorEl.style.width = diameter + 'px';
    cursorEl.style.height = diameter + 'px';
    cursorEl.style.setProperty('--cursor-color', color);
    cursorEl.classList.toggle('is-erase', erase);
    cursorEl.classList.toggle('is-draw', !erase);
  }

  function hideCursor() {
    if (cursorEl) cursorEl.classList.remove('is-visible');
  }

  function showCursor(event) {
    if (!cursorEl) return;
    if (event.pointerType === 'touch') {
      hideCursor();
      return;
    }

    var rect = canvas.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
      hideCursor();
      return;
    }

    updateCursor();
    cursorEl.style.left = event.clientX + 'px';
    cursorEl.style.top = event.clientY + 'px';
    cursorEl.classList.add('is-visible');
  }

  function applyStyle(stroke) {
    ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function drawDot(stroke) {
    var point = stroke.points[0];
    if (!point) return;
    applyStyle(stroke);
    ctx.beginPath();
    ctx.arc(point.x, point.y, stroke.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawStroke(stroke) {
    if (!stroke.points.length) return;
    applyStyle(stroke);
    if (stroke.points.length === 1) {
      drawDot(stroke);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (var i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();
  }

  function redrawAll() {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    strokes.forEach(drawStroke);
    ctx.globalCompositeOperation = 'source-over';
  }

  function pointerPoint(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function startStroke(event) {
    if (!naturalW || !current || currentStroke) return;

    var isMouse = event.pointerType === 'mouse';
    if (isMouse ? (event.button !== 0 && event.button !== 2) : event.button !== 0) return;

    event.preventDefault();
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (err) { /* 某些浏览器不支持，忽略 */ }

    rightErase = isMouse && event.button === 2;
    var erase = mode === 'erase' || rightErase;

    currentStroke = {
      color: color,
      width: brushWidth(erase),
      erase: erase,
      points: [pointerPoint(event)]
    };
    strokes.push(currentStroke);
    drawDot(currentStroke);
    showCursor(event);
  }

  function moveStroke(event) {
    if (!currentStroke) return;
    event.preventDefault();

    var events = typeof event.getCoalescedEvents === 'function'
      ? event.getCoalescedEvents()
      : null;
    if (!events || !events.length) events = [event];

    for (var i = 0; i < events.length; i++) {
      var point = pointerPoint(events[i]);
      var points = currentStroke.points;
      var last = points[points.length - 1];
      if (Math.abs(point.x - last.x) + Math.abs(point.y - last.y) < 1) continue;

      points.push(point);
      applyStyle(currentStroke);
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }

  function endStroke() {
    if (!currentStroke) return;
    currentStroke = null;
    if (rightErase) {
      rightErase = false;
      updateCursor();
    }
    persist();
  }

  /* ---------- 界面状态 ---------- */

  function updateUI() {
    if (!current) return;
    nameEl.textContent = current.name;
    var groupLabel = /(卷|组|部分|章)$/.test(current.group) || current.group === '压轴'
      ? current.group
      : current.group + ' 组';
    progressEl.textContent = groupLabel + ' · ' + (groupIndex + 1) + ' / ' + groupPuzzles.length;
    document.title = current.name + ' · ' + season.title;

    if (noteEl) {
      var note = current.note || '';
      noteEl.textContent = note;
      noteEl.hidden = !note;
    }

    var prevPuzzle = groupPuzzles.length > 1 ? groupPuzzles[groupIndex - 1] : null;
    var nextPuzzle = groupPuzzles.length > 1 ? groupPuzzles[groupIndex + 1] : null;

    prevBtn.hidden = !prevPuzzle;
    nextBtn.hidden = !nextPuzzle;
    prevBtn.disabled = !prevPuzzle;
    nextBtn.disabled = !nextPuzzle;
    if (prevPuzzle) prevBtn.setAttribute('aria-label', '上一题：' + prevPuzzle.name);
    if (nextPuzzle) nextBtn.setAttribute('aria-label', '下一题：' + nextPuzzle.name);
  }

  function setMode(nextMode) {
    mode = nextMode;
    drawBtn.classList.toggle('active', mode === 'draw');
    eraseBtn.classList.toggle('active', mode === 'erase');
    drawBtn.setAttribute('aria-pressed', String(mode === 'draw'));
    eraseBtn.setAttribute('aria-pressed', String(mode === 'erase'));
    updateCursor();
  }

  function setColor(value, remember) {
    color = value;
    var buttons = swatches.querySelectorAll('.swatch');
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute('data-color') === value;
      buttons[i].classList.toggle('active', active);
      buttons[i].setAttribute('aria-pressed', String(active));
    }
    if (mode === 'erase' && remember !== false) {
      setMode('draw');
    } else {
      updateCursor();
    }
    if (remember !== false) saveTool();
  }

  /* 恢复该题上次用过的画笔颜色与粗细 */
  function restoreTool(puzzle) {
    var tool = readTool(puzzle);
    var nextColor = tool && COLORS.some(function (item) { return item.value === tool.color; })
      ? tool.color
      : DEFAULT_COLOR;
    var nextBrush = tool && Number.isFinite(tool.brush) ? tool.brush : DEFAULT_BRUSH;
    setColor(nextColor, false);
    setBrush(nextBrush, false);
  }

  /* ---------- 题目切换 ---------- */

  function preloadNeighbours() {
    [groupIndex - 1, groupIndex + 1].forEach(function (offset) {
      var puzzle = groupPuzzles[(offset + groupPuzzles.length) % groupPuzzles.length];
      if (!puzzle || puzzle === current) return;
      var preload = new Image();
      preload.src = puzzle.file;
    });
  }

  function loadPuzzle(puzzle) {
    if (!puzzle) return;
    loadToken += 1;
    var token = loadToken;

    current = puzzle;
    currentStroke = null;
    strokes = [];
    naturalW = 0;
    naturalH = 0;
    restoreTool(puzzle);
    groupPuzzles = season.puzzles.filter(function (item) {
      return item.group === puzzle.group;
    });
    groupIndex = groupPuzzles.findIndex(function (item) {
      return item.id === puzzle.id;
    });
    if (groupIndex < 0) groupIndex = 0;

    wrap.style.width = '';
    wrap.style.height = '';
    canvas.width = 1;
    canvas.height = 1;
    message.hidden = false;
    message.textContent = '正在载入题目…';

    img.onload = function () {
      if (token !== loadToken) return;
      naturalW = img.naturalWidth;
      naturalH = img.naturalHeight;
      canvas.width = naturalW;
      canvas.height = naturalH;
      strokes = readStrokes(puzzle);
      fitCanvas();
      redrawAll();
      message.hidden = true;
      updateUI();
      preloadNeighbours();
    };

    img.onerror = function () {
      if (token !== loadToken) return;
      message.hidden = false;
      message.textContent = '题目图片加载失败：' + puzzle.file;
    };

    img.alt = '题目 ' + puzzle.name;
    img.src = puzzle.file;

    updateUI();
    try {
      window.history.replaceState(null, '', 'puzzle.html?p=' + encodeURIComponent(puzzle.id));
    } catch (err) {
      /* file:// 等环境下可能不允许改写 URL */
    }
  }

  function switchPuzzle(delta) {
    if (groupPuzzles.length < 2) return;
    var nextIndex = groupIndex + delta;
    if (nextIndex < 0 || nextIndex >= groupPuzzles.length) return;
    loadPuzzle(groupPuzzles[nextIndex]);
  }

  /* ---------- 交互绑定 ---------- */

  COLORS.forEach(function (item) {
    var active = item.value === color;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'swatch' + (active ? ' active' : '');
    button.style.setProperty('--swatch', item.value);
    button.setAttribute('data-color', item.value);
    button.setAttribute('aria-label', item.label);
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', function () {
      setColor(item.value);
    });
    swatches.appendChild(button);
  });

  drawBtn.addEventListener('click', function () { setMode('draw'); });
  eraseBtn.addEventListener('click', function () { setMode('erase'); });

  function setBrush(next, remember) {
    brush = Math.min(MAX_BRUSH, Math.max(MIN_BRUSH, Math.round(next)));
    sizeInput.value = String(brush);
    sizeValue.textContent = String(brush);
    updateCursor();
    if (remember !== false) saveTool();
  }

  sizeInput.addEventListener('input', function () {
    setBrush(Number(sizeInput.value) || 8);
  });

  stage.addEventListener('wheel', function (event) {
    if (!naturalW || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    setBrush(brush - Math.sign(event.deltaY));
    showCursor(event);
  }, { passive: false });

  canvas.addEventListener('pointerdown', startStroke);
  canvas.addEventListener('pointermove', moveStroke);
  canvas.addEventListener('pointermove', showCursor);
  canvas.addEventListener('pointerenter', showCursor);
  canvas.addEventListener('pointerleave', hideCursor);
  canvas.addEventListener('pointerup', endStroke);
  canvas.addEventListener('pointercancel', endStroke);
  canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  prevBtn.addEventListener('click', function () { switchPuzzle(-1); });
  nextBtn.addEventListener('click', function () { switchPuzzle(1); });

  undoBtn.addEventListener('click', function () {
    if (!strokes.length) return;
    strokes.pop();
    persist();
    redrawAll();
  });

  clearBtn.addEventListener('click', function () {
    if (!strokes.length) return;
    if (!window.confirm('清空本题的所有笔迹？此操作不可撤销。')) return;
    strokes = [];
    persist();
    redrawAll();
  });

  document.addEventListener('keydown', function (event) {
    var tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      switchPuzzle(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      switchPuzzle(1);
    } else if ((event.ctrlKey || event.metaKey) && (event.key === 'z' || event.key === 'Z')) {
      event.preventDefault();
      undoBtn.click();
    } else if (event.key === 'b' || event.key === 'B') {
      setMode('draw');
    } else if (event.key === 'e' || event.key === 'E') {
      setMode('erase');
    }
  });

  var resizeFrame = 0;
  function onResize() {
    if (resizeFrame) return;
    resizeFrame = window.requestAnimationFrame(function () {
      resizeFrame = 0;
      fitCanvas();
    });
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
  if (window.ResizeObserver) {
    new ResizeObserver(onResize).observe(stage);
  }

  /* ---------- 启动 ---------- */

  var requested = season.puzzles.find(function (item) {
    return item.id === params.get('p');
  });
  loadPuzzle(requested || season.puzzles[0]);
})();
