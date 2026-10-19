/* Reproduce reading copies from the current v2.0 renderer. No browser, network or production access. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),crypto=require('node:crypto');
const root=__dirname,dir=path.join(root,'..');
const fixture=fs.readFileSync(path.join(dir,'tests/navigation-connections.test.cjs'),'utf8');
const helper=fixture.slice(fixture.indexOf('function app('),fixture.indexOf('for(const mobile of [false,true])'));
const app=Function('fs','vm','assert','path','dir',`return (${helper});`)(fs,vm,assert,path,dir);
const {catalog}=require(path.join(dir,'stock-links.js'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cases=[{id:'home',title:'첫 화면',hash:'#view=home',kind:'home'},{id:'menu',title:'전체 메뉴',hash:'#view=menu',kind:'room'},...catalog.map(m=>({id:m.id,title:m.name,hash:m.id==='scores'?'#view=scores':'#view=room&room='+m.id+(m.id==='meeting'||m.id==='ops'?'&topic=ai':m.id==='recommend'?'&item=DEMO-E&flowTopic=ai':m.id==='newbuy'?'&item=DEMO-E':m.id==='holdings'?'&item=DEMO-B':''),kind:m.id==='scores'?'scores':'room'})),
{id:'strategy-ai',title:'선택한 테마의 후보',hash:'#view=room&room=strategy&topic=ai&flowTopic=ai',kind:'room'},
{id:'newbuy-intraday',title:'신규매수실 · 장중 지연 시세',hash:'#view=room&room=newbuy&item=DEMO-E&section=intraday&flowTopic=ai',kind:'room'},
{id:'decision-hold',title:'결정실 · 보류 종목',hash:'#view=room&room=decision&item=DEMO-F&section='+encodeURIComponent('보류'),kind:'room'},
{id:'verification-missing',title:'종목검증실 · 선정 자료 미확인',hash:'#view=room&room=recommend&item=DEMO-G',kind:'room'},
{id:'company-analysis',title:'회사 분석 · 집중 화면',hash:'#view=home&stock=DEMO-B&detail=1&from=holdings&tab=overview',kind:'detail'},
{id:'company-history',title:'회사 분석 · 과거 기록',hash:'#view=home&stock=DEMO-B&detail=1&from=holdings&tab=history&date=2026-10-13',kind:'detail'},
{id:'company-input',title:'과거 분석에 사용한 입력 자료',hash:'#view=home&stock=DEMO-B&detail=1&from=holdings&tab=history&date=2026-10-13',kind:'dialog'}];
const base=fs.readFileSync(path.join(dir,'stock-home.html'),'utf8');
const overview=base.slice(base.indexOf('<div class="overview-column"'),base.indexOf('<section class="detail-panel"'));
function staticControls(s){return s.replace(/<button\b([^>]*)>/g,(_,attrs)=>'<button '+attrs.replace(/\s*tabindex="[^"]*"/g,'')+' tabindex="-1">').replace(/<(input|select)\b([^>]*)>/g,'<$1$2 disabled>');}
for(const c of cases){
 const a=app(c.hash);let content='';
 if(c.kind==='home')content=`<section class="briefing">${a.markup('#briefing')}</section><section class="home-news">${a.markup('#home-news')}</section><div class="workspace-grid">${overview.replace('<div id="stock-list"></div>',`<div id="stock-list">${a.markup('#stock-list')}</div>`).replace(/id="list-title">[^<]*<span>7<\/span>/,'id="list-title">전체 종목 <span>7</span>')}<section class="detail-panel"><div id="stock-detail">${a.markup('#stock-detail')}</div></section></div>`;
 else if(c.kind==='detail')content=`<section class="detail-panel">${a.markup('#stock-detail')}</section>`;
 else if(c.kind==='dialog'){a.click('data-evidence','2026-10-13','#stock-detail');content=`<section class="room-paper">${a.markup('#dialog-content')}</section>`;}
 else content=c.kind==='scores'?a.markup('#scores-view'):a.markup('#explore-view');
 const heading=c.kind==='home'?'내 일본 주식의 중요한 변화':c.title;
 const classes=['reading-copy',c.kind==='home'?'home-overview':'',c.kind==='detail'?'focused-detail':''].join(' ');
 const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="호쿠토 디자인 v2.0 ${esc(c.title)}의 정적 읽기용 사본. 모든 자료는 가상이며 브라우저 캡처가 아닙니다."><title>${esc(c.title)} · 호쿠토 디자인 v2.0 검토 자료</title><link rel="stylesheet" href="../../stock-home.css"><link rel="stylesheet" href="../../stock-rooms.css"><link rel="stylesheet" href="../../stock-navigation.css"><link rel="stylesheet" href="../../stock-v2.css"><style>.review-bar{padding:16px 22px;background:#fff;border-bottom:1px solid #dce7de;line-height:1.8;color:#496a53;font-size:13px}.review-bar a{color:#186e59;text-decoration:underline;margin-right:18px}.review-bar p{font-size:12px;color:#7d8d76;margin-top:7px}.reading-surface{max-width:1180px;margin:auto;padding:28px 24px}.reading-surface .page-heading{margin-bottom:24px}.reading-surface button{pointer-events:none;cursor:default}.reading-surface .mobile-back{display:none}.reading-surface .detail-panel{display:block}.reading-surface .dialog-body{max-height:none}.reading-surface .room-note{line-height:1.9}.focused-detail .reading-surface{max-width:960px}.reading-copy .page-footer{margin-top:24px}@media(max-width:760px){.reading-surface{padding:22px 16px}.reading-surface .detail-panel{margin-top:20px}.reading-surface .page-heading{display:block}.reading-copy .asof{max-width:none;text-align:left;padding-top:10px}.review-bar{padding:14px 16px}}</style></head><body class="${classes}"><header class="review-bar"><a href="../../review-v2-20261019.html#screens">検토 안내 · 화면 목록</a><a href="../../stock-home.html${c.hash}">이 화면 직접 눌러보기 →</a><p>v2.0 읽기 자료 · 정적 본문 사본 · 버튼 동작 없음 · 모든 회사·가격·분석·성과는 가상입니다. 생성 HTML을 미리 채운 자료이며 브라우저 화면 캡처가 아닙니다. 상단·옆 메뉴와 실제 이동은 동작 시안에서 확인하세요.</p></header><main class="reading-surface"><div class="page-heading"><div><div class="eyebrow">호쿠토 디자인 v2.0 · 읽기용 화면</div><h1>${esc(heading)}</h1><p>${esc(a.node('#page-heading p').textContent||'현재 화면의 내용과 연결 목적을 확인합니다.')}</p></div></div>${staticControls(content)}<footer class="page-footer">출처: 디자인 v2.0 표시 수정 · 2026.10.19 · 판정·기사·성과는 기존 v9 입력과 동일<br>이 페이지는 사용자 자료를 조회하지 않습니다. 실제 렌더링·클릭 시험을 대신하지 않습니다.</footer></main></body></html>`;
 fs.writeFileSync(path.join(root,'screens',c.id+'.html'),html.replace('検토 안내','검토 안내'));
}
fs.writeFileSync(path.join(root,'screens-index.json'),JSON.stringify(cases,null,2)+'\n');
console.log('Created '+cases.length+' static reading pages from current v2.0 renderer.');
