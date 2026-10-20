/* Session-local title mode: freshly opened Korean pages start translated. */
(()=>{
  'use strict';
  const {copy,selectTitle,initialTitleMode}=window.HokutoText;
  let mode=initialTitleMode(document.documentElement.lang);
  function put(el,text){if(el&&el.textContent!==text)el.textContent=text;}
  function allowed(){
    const p=new URLSearchParams(location.hash.slice(1));
    return (!p.get('view')||p.get('view')==='home')&&!p.get('detail')||p.get('view')==='room'&&['news','themes','holdings'].includes(p.get('room'));
  }
  function refresh(){
    document.querySelectorAll('[data-ui-copy]').forEach(el=>{
      if(Object.hasOwn(copy,el.dataset.uiCopy))put(el,copy[el.dataset.uiCopy]);
    });
    document.querySelectorAll('[data-news-title]').forEach(el=>{
      const title=selectTitle(el.dataset.newsTitle,el.dataset.titleFallback,mode);
      put(el,title.text);if(el.lang!==title.lang)el.lang=title.lang;
    });
    document.querySelectorAll('[data-title-status]').forEach(el=>{
      const note=selectTitle(el.dataset.titleStatus,'',mode).note;
      put(el,note);el.hidden=!note;
    });
    const button=document.getElementById('title-mode-button');
    if(button){button.hidden=!allowed();put(button,mode==='original'?copy.titleOriginal:copy.titleKorean);button.setAttribute('aria-pressed',String(mode==='original'));button.setAttribute('aria-label',mode==='original'?copy.titleShowKorean:copy.titleShowOriginal);}
  }
  document.getElementById('title-mode-button')?.addEventListener('click',()=>{
    mode=mode==='original'?'korean':'original';refresh();
    put(document.getElementById('announcer'),mode==='original'?copy.titleChangedOriginal:copy.titleChangedKorean);
  });
  window.addEventListener('hashchange',refresh);refresh();
  new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
})();
