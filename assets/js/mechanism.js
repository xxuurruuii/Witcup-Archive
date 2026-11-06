/* 见联会存档 · 机制页渲染（内容、相关机制与出现轮次均来自 data.js） */
(function () {
  'use strict';

  var data = window.WC_DATA;
  if (!data) return;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var root = document.getElementById('mechanism-root');
  if (!root) return;

  var holder = root.hasAttribute('data-mechanism') ? root : document.body;
  var mechId = holder.getAttribute('data-mechanism');

  var mechanisms = data.mechanisms || [];
  var seasons = data.seasons || [];
  var mech = mechanisms.find(function (item) {
    return item.id === mechId;
  });
  if (!mech) return;

  function linkRow(label, links) {
    if (!links.length) return '';
    return '' +
      '<div class="mech-link-row">' +
        '<span class="mech-link-label">' + esc(label) + '</span>' +
        links.join('') +
      '</div>';
  }

  var relatedLinks = (mech.related || [])
    .map(function (id) {
      return mechanisms.find(function (item) { return item.id === id; });
    })
    .filter(Boolean)
    .map(function (item) {
      return '<a class="btn ghost" href="' + esc(item.page.split('/').pop()) + '">' + esc(item.name) + '</a>';
    });

  var seasonLinks = (mech.seasons || [])
    .map(function (id) {
      return seasons.find(function (item) { return item.id === id; });
    })
    .filter(Boolean)
    .map(function (item) {
      return '<a class="btn ghost" href="../' + esc(item.dir) + '/index.html">' + esc(item.short || item.title) + '</a>';
    });

  var rows = linkRow('相关机制', relatedLinks) + linkRow('出现轮次', seasonLinks);
  var navHtml = rows ? '<nav class="mech-links" aria-label="机制导航">' + rows + '</nav>' : '';

  root.innerHTML = '' +
    '<a class="back-link" href="../index.html#seasons">← 返回首页</a>' +
    '<h1>' + esc(mech.name) + '</h1>' +
    '<div class="mechanism-detail">' +
      '<figure class="mechanism-figure">' +
        '<div class="frame' + (mech.image ? '' : ' is-empty') + '">' +
          (mech.image
            ? '<img src="../' + esc(mech.image) + '" alt="' + esc(mech.name) + '机制图标">'
            : '<span class="mech-glyph" aria-hidden="true">🧩</span>') +
        '</div>' +
      '</figure>' +
      '<div>' +
        '<section class="rule-card">' +
          (mech.note ? '<p class="rule-note">' + esc(mech.note) + '</p>' : '') +
          '<h2>规则</h2>' +
          '<ul>' + (mech.rule || []).map(function (line) {
            return '<li>' + esc(line) + '</li>';
          }).join('') + '</ul>' +
        '</section>' +
        navHtml +
      '</div>' +
    '</div>';

  document.title = mech.name + ' · 见联会存档';
  var description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', '见联会原创机制「' + mech.name + '」的完整规则说明。');
  }
})();
