/* A presentation preference. It does not rerun or mutate stock analysis. */
(()=>{
  'use strict';
  const {copy,selectTitle}=window.HokutoText;
  const storageKey='hokuto-quest-title-mode-v1';
  let mode='korean';
  try{if(localStorage.getItem(storageKey)==='original')mode='original';}catch{}
  function put(el,text){if(el&&el.textContent!==text)el.textContent=text;}
  function refresh(){
    document.querySelectorAll('[data-ui-copy]').forEach(el=>{
      if(Object.hasOwn(copy,el.dataset.uiCopy))put(el,copy[el.dataset.uiCopy]);
    });
    document.querySelectorAll('[data-news-title]').forEach(el=>{
      const title=selectTitle(el.dataset.newsTitle,el.dataset.titleFallback,mode);
      put(el,title.text);
      if(el.lang!==title.lang)el.lang=title.lang;
    });
    document.querySelectorAll('[data-title-status]').forEach(el=>{
      put(el,selectTitle(el.dataset.titleStatus,'',mode).note);
      el.hidden=mode!=='original';
    });
    const button=document.getElementById('title-mode-button');
    if(button){
      put(button,mode==='original'?copy.titleOriginal:copy.titleKorean);
      button.setAttribute('aria-pressed',String(mode==='original'));
      button.setAttribute('aria-label',mode==='original'?copy.titleShowKorean:copy.titleShowOriginal);
    }
  }
  document.getElementById('title-mode-button')?.addEventListener('click',()=>{
    mode=mode==='original'?'korean':'original';
    try{localStorage.setItem(storageKey,mode);}catch{}
    refresh();
    put(document.getElementById('announcer'),mode==='original'?copy.titleChangedOriginal:copy.titleChangedKorean);
  });
  window.addEventListener('storage',event=>{
    if(event.key===storageKey){mode=event.newValue==='original'?'original':'korean';refresh();}
  });
  refresh();
  new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
})();
