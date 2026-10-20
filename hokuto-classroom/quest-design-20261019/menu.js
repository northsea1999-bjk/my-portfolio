const UI_menu_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_menu_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

(() => {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const input = $('#menu-search');
  const originals = [...document.querySelectorAll('#menu-map [data-menu]')];
  const dialog = $('#intent-dialog');
  const viewportControl = $('.viewport-control');
  function search() {
    const query = input.value.trim().toLocaleLowerCase('ko');
    $('#clear-search').hidden = !query;
    $('#menu-map').hidden = !!query;
    $('#search-results').hidden = !query;
    if (!query) {
      $('#search-list').replaceChildren();
      return;
    }
    const found = originals.filter(a => a.dataset.search.toLocaleLowerCase('ko').includes(query));
    const list = document.createDocumentFragment();
    found.forEach(original => {
      const link = document.createElement('a');
      link.className = 'search-card';
      link.href = original.getAttribute('href');
      const icon = original.querySelector('svg');
      if (icon) link.append(icon.cloneNode(true));
      const label = document.createElement('span');
      const title = document.createElement('strong');
      title.textContent = original.querySelector('strong')?.textContent || original.textContent.replace('↗', '').trim();
      const subtitle = document.createElement('small');
      subtitle.textContent = original.querySelector('.room-name,small,.daily-link>span')?.textContent || UI_menu_js.text("text_68dd4ea8fea3");
      label.append(title, subtitle);
      link.append(label);
      list.append(link);
    });
    $('#search-list').replaceChildren(list);
    $('#result-count').textContent = UI_menu_js.tpl("template_d3c8303883f5", found.length);
    $('#search-empty').hidden = found.length !== 0;
  }
  input.addEventListener('input', search);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      input.value = '';
      search();
    }
  });
  $('.menu-search').addEventListener('submit', event => event.preventDefault());
  $('#clear-search').addEventListener('click', () => {
    input.value = '';
    search();
    input.focus();
  });
  document.querySelectorAll('[data-device]').forEach(button => button.addEventListener('click', () => {
    const mobile = button.dataset.device === 'mobile';
    document.body.classList.toggle('mobile-preview', mobile);
    viewportControl.hidden = !mobile;
    document.querySelectorAll('[data-device]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  }));
  $('#viewport-width').addEventListener('change', event => {
    const width = Number(event.target.value);
    if ([360, 390, 430].includes(width)) $('#app-shell').style.setProperty('--preview-width', `${width}px`);
  });
  document.querySelectorAll('.section-nav a').forEach(link => link.addEventListener('click', () => {
    if (input.value) {
      input.value = '';
      search();
    }
  }));
  $('#show-intent').addEventListener('click', () => dialog.showModal());
  $('#close-intent').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
})();
