/* Display copy only. Do not use this catalog as input to scoring or selection. */
(function(root){
  'use strict';
  const copy=Object.freeze({
    brandSubtitle:'SECURITIES',
    titleKorean:'제목: 한국어',
    titleOriginal:'제목: 일본어 원문',
    titleShowOriginal:'제목을 일본어 원문으로 보기',
    titleShowKorean:'제목을 한국어로 보기',
    titleJapaneseDemo:'일본어 예시',
    titleUnavailable:'일본어 원문 없음 · 기존 제목',
    titleDemoNotice:'일본어 제목도 전환 시연을 위해 만든 가상 문구입니다.',
    titleChangedKorean:'제목을 한국어로 표시합니다.',
    titleChangedOriginal:'일본어 예시 제목을 표시합니다. 일본어 원문이 없는 항목은 기존 제목을 유지합니다.'
  });
  // Synthetic display examples, not retrieved Japanese source articles.
  // Production must replace these with existing original/translated fields.
  const demoJapaneseTitles=Object.freeze({
    contract:'ホクト半導体、42億円の装置供給契約を締結',
    game:'アオイゲームズ、通期営業利益予想を120億円から108億円へ下方修正',
    ai:'セイウンソフト、法人契約の増加を受け利益予想を上方修正',
    parts:'ハルカ電子、四半期の生産計画と通期見通しを据え置き'
  });
  const selectTitle=(id,fallback,mode)=>({
    text:mode==='original'&&demoJapaneseTitles[id]?demoJapaneseTitles[id]:fallback,
    lang:mode==='original'&&demoJapaneseTitles[id]?'ja':'ko',
    note:mode==='original'?(demoJapaneseTitles[id]?copy.titleJapaneseDemo:copy.titleUnavailable):''
  });
  const api=Object.freeze({copy,demoJapaneseTitles,selectTitle});
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.HokutoText=api;
})(typeof window==='undefined'?{}:window);
