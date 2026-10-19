/* Presentation boundaries only. Original stock inputs and decisions stay unchanged. */
(()=>{'use strict';
const names={home:'알림 홈',news:'오늘 뉴스',holdings:'내 주식',decision:'후보 판정',records:'기록·성적',scores:'기록·성적'};
const descriptions={news:'전체 제목을 훑고, 필요한 기사만 이 화면에서 열어 보세요.',holdings:'보유한 종목의 상태와 달라진 내용을 확인하세요.',decision:'판정과 이유를 확인하세요. 매수대상과 진입 신호는 구분합니다.',records:'그날의 판단과 입력 자료를 확인하세요.'};
const cross='[data-flow-stage],[data-flow-next],[data-strategy-topic],[data-verify-stock],[data-decision-stock],[data-trading-stock],[data-stock-news],[data-theme-research],[data-theme-news],[data-article-topic],[data-room-stock],[data-room]';
let stocks=[];
function strip(scope){
 scope.querySelectorAll(cross).forEach(x=>x.remove());
 scope.querySelectorAll('.same-stock-links,.candidate-actions,.decision-actions,.room-tools,.flow-next,.workflow-progress,.score-original-links,.news-origin-note').forEach(x=>x.remove());
 scope.querySelectorAll('.room-aside section').forEach(x=>{const h=x.querySelector('h3,h2');if(h&&['다음으로','기사 다음에는 어디로?'].includes(h.textContent.trim()))x.remove();});
 scope.querySelectorAll('[data-score-stock]').forEach(x=>{const span=document.createElement('span');span.className='plain-stock';span.innerHTML=x.innerHTML;x.replaceWith(span);});
}
function apply(state,items){
 stocks=items||stocks;const home=state.view==='home'&&!state.detail,room=state.view==='scores'?'scores':state.view==='room'?state.room:state.detail?'detail':'home';
 document.body.classList.toggle('simple-home',home);document.body.classList.add('simple-mode');
 const title=names[room]||document.querySelector('#page-heading h1').textContent;
 document.querySelector('#simple-location').textContent=title;
 document.querySelector('#journey-bar').hidden=true;
 document.querySelector('#home-news').hidden=true;
 document.querySelector('#home-chart').hidden=true;
 if(home){
  document.querySelector('#workspace-grid').hidden=true;
  document.querySelector('#page-heading h1').textContent='알림 홈';
  document.querySelector('#page-heading p').textContent='달라진 내용만 확인하세요. 자세한 설명도 이 화면에서 펼쳐집니다.';
  document.querySelector('#page-heading .eyebrow').textContent='오늘 확인할 내용';
  if(!document.querySelector('.alerts-end')){const end=document.createElement('p');end.className='alerts-end';end.textContent='오늘 알림은 여기까지입니다.';document.querySelector('#briefing').after(end);}
 }else{
  document.querySelector('.alerts-end')?.remove();
  if(names[room])document.querySelector('#page-heading h1').textContent=names[room];
  if(descriptions[room])document.querySelector('#page-heading p').textContent=descriptions[room];
 }
 const tabs=document.querySelector('#simple-record-tabs');tabs.hidden=!['records','scores'].includes(room);tabs.querySelectorAll('a').forEach(a=>{const active=room==='scores'?a.href.includes('view=scores'):a.href.includes('room=records');a.setAttribute('aria-current',active?'page':'false');});
 strip(document.querySelector('#explore-view'));strip(document.querySelector('#scores-view'));
 document.querySelectorAll('.decision-file').forEach(card=>{
  const s=stocks.find(x=>x.id===card.dataset.focusItem);if(!s||card.querySelector('.simple-evidence'))return;
  const r=s.records.at(-1),d=document.createElement('details');d.className='simple-evidence';
  const summary=document.createElement('summary');summary.textContent='판정 근거 펼치기';d.append(summary);
  const list=document.createElement('ul');r.axes.forEach(a=>{const li=document.createElement('li');li.textContent=a;list.append(li);});d.append(list);
  const quote=document.createElement('blockquote');quote.textContent=r.input;d.append(quote);card.append(d);
 });
 const scores=document.querySelector('.scores-header p');if(scores)scores.textContent='같은 평가 기간의 종목 수익률과 비교 기준을 확인합니다.';
 document.title=title+' · 호쿠토증권 단순화 시안';
}
const dialog=document.querySelector('#evidence-dialog');new MutationObserver(()=>strip(dialog)).observe(dialog,{childList:true,subtree:true});
window.HokutoSimple={apply};
})();
