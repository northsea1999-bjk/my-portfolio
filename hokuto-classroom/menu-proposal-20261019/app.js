(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const input = $('#menu-search');
  const originals = [...document.querySelectorAll('#menu-map [data-menu]')];
  const dialog = $('#intent-dialog');
  function search() {
    const query = input.value.trim().toLocaleLowerCase('ko');
    $('#clear-search').hidden = !query;
    $('#menu-map').hidden = !!query;
    $('#search-results').hidden = !query;
    if (!query) { $('#search-list').replaceChildren(); return; }
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
      title.textContent = original.querySelector('strong')?.textContent || original.textContent.replace('↗','').trim();
      const subtitle = document.createElement('small');
      subtitle.textContent = original.querySelector('.room-name,small')?.textContent || '기존 호쿠토 입구';
      label.append(title,subtitle);link.append(label);list.append(link);
    });
    $('#search-list').replaceChildren(list);
    $('#result-count').textContent = `${found.length}개 메뉴`;
    $('#search-empty').hidden = found.length !== 0;
  }
  input.addEventListener('input', search);
  input.addEventListener('keydown', event => { if(event.key==='Escape'){input.value='';search();} });
  $('.menu-search').addEventListener('submit',event=>event.preventDefault());
  $('#clear-search').addEventListener('click',()=>{input.value='';search();input.focus();});
  document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>{
    document.body.classList.toggle('mobile-preview',button.dataset.device==='mobile');
    document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  $('#show-intent').addEventListener('click',()=>dialog.showModal());
  $('#close-intent').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
