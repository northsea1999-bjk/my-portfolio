/* Shared navigation and fictional room examples. No production calls or writes. */
(() => {
  'use strict';
  const links=typeof window!=='undefined'?window.HokutoLinks:require('./stock-links.js');
  const catalog=links.catalog;
  const groups=[{id:'original',name:'기존 호쿠토 메뉴'},{id:'entry',name:'기존 입구'},{id:'preview',name:'종목별 기록 시안'}];
  const drawings={
    news:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h5v5H7zM15 8h3M15 12h3M7 16h11"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3Z"/><path d="M7 12h10M7 16h6"/>',
    check:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 12 3 3 5-6M9 3v3h6V3"/>',
    pulse:'<path d="M2 12h5l3-7 4 14 3-7h5"/>',
    swap:'<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/>'
  };
  const topics=[
    {id:'chip',name:'반도체 장비·검사',rank:1,previous:1,money20:1.2,money60:1.4,return20:18,stockIds:['DEMO-A'],copy:'공급 계약은 확인됐습니다. 이익 기여 규모는 다음 확인으로 남습니다.',next:'매출 반영 시점과 연간 전망 변경',tone:'teal'},
    {id:'ai',name:'AI 소프트웨어',rank:2,previous:3,money20:1.3,money60:1.1,return20:15,stockIds:['DEMO-E'],copy:'회사 이익 전망 상향을 확인했습니다. 진입 시점은 별도 점검합니다.',next:'가격 확인에서 회복·돌파 조건 충족 여부',tone:'blue'},
    {id:'parts',name:'전자부품',rank:3,previous:2,money20:1.1,money60:1.3,return20:9,stockIds:['DEMO-D'],copy:'생산 계획과 기존 전망이 유지됐습니다.',next:'회사 생산 계획의 변경 여부',tone:'violet'},
    {id:'grid',name:'전력망',rank:4,previous:6,money20:1.4,money60:1.1,return20:8,stockIds:['DEMO-F'],copy:'설비 투자 계획이 나왔지만 공급 회사는 공개되지 않았습니다.',next:'회사 이름과 계약이 함께 나오는 직접 자료',tone:'amber'},
    {id:'defense',name:'방산',rank:5,previous:4,money20:.8,money60:.9,return20:5,stockIds:['DEMO-C'],copy:'기존 납품 일정이 유지됐습니다. 새 수주 발표는 없습니다.',next:'예정된 납품 완료 발표',tone:'blue'},
    {id:'game',name:'게임',rank:6,previous:5,money20:.7,money60:.9,return20:-2,stockIds:['DEMO-B'],copy:'연간 이익 전망 하향이 확인됐습니다.',next:'하향 원인과 신작 판매 수량',tone:'violet'}
  ];
  const articles=[
    {id:'contract',time:'16:20',title:'호쿠토 반도체, 42억 엔 장비 공급 계약 체결',topic:'chip',stock:'DEMO-A',kind:'direct',country:'일본',state:'직접 연결',summary:'계약 체결과 납품 시작 시점을 확인했습니다.',unknown:'연간 이익 전망의 변경 여부와 이익 기여 규모는 이번 발표에 없습니다.',proof:'회사 이름과 공급 계약 금액이 같은 발표에 명시돼 있습니다.'},
    {id:'game',time:'15:40',title:'아오이 게임즈, 연간 영업이익 전망 120억 → 108억 엔',topic:'game',stock:'DEMO-B',kind:'direct',country:'일본',state:'직접 연결',summary:'회사가 연간 영업이익 전망을 10% 낮췄습니다.',unknown:'판매 감소와 비용 증가의 영향은 아직 나눠 설명하지 않았습니다.',proof:'회사가 자기 회사의 연간 전망을 직접 수정한 발표입니다.'},
    {id:'ai',time:'14:10',title:'세이운 소프트, 법인 계약 증가 반영해 이익 전망 상향',topic:'ai',stock:'DEMO-E',kind:'direct',country:'일본',state:'직접 연결',summary:'영업이익 전망이 60억 엔에서 66억 엔으로 높아졌습니다.',unknown:'실제 진입 조건의 충족 여부는 가격 확인이 더 필요합니다.',proof:'회사 발표에서 법인 계약 증가와 연간 전망 상향을 함께 설명했습니다.'},
    {id:'grid',time:'13:35',title:'전력 설비 투자 계획 추가 발표…공급 회사는 미공개',topic:'grid',stock:null,kind:'industry',country:'미국',state:'업종 참고',summary:'전력 설비 투자가 계획돼 있습니다. 어느 회사의 수주인지는 확인되지 않았습니다.',unknown:'일본 공급 회사, 계약 금액, 납기가 공개되지 않았습니다.',proof:'전력망이라는 업종만 같습니다. 키타 전력설비의 수주로 연결할 직접 근거는 없습니다.'},
    {id:'parts',time:'12:20',title:'하루카 전자, 분기 생산 계획과 연간 전망 유지',topic:'parts',stock:'DEMO-D',kind:'direct',country:'일본',state:'직접 연결',summary:'기존 생산 계획과 전망에 변화가 없습니다.',unknown:'추가 증설 여부는 아직 결정되지 않았습니다.',proof:'회사 이름과 기존 계획 유지 여부를 함께 확인한 발표입니다.'},
    {id:'pending',time:'11:45',title:'반도체 장비 공급 일정 관련 후속 보도',topic:'chip',stock:null,kind:'pending',country:'불명',state:'분석 대기',summary:'원문과 회사 연결을 아직 확인하지 못했습니다.',unknown:'영향받는 회사와 방향 모두 미확인입니다.',proof:'분석이 끝나지 않아 종목 연결을 표시하지 않습니다.'}
  ];
  const lanes={'DEMO-D':['B'],'DEMO-E':['A','D'],'DEMO-F':['C'],'DEMO-G':[]};
  const decisionIds=['DEMO-D','DEMO-E','DEMO-F','DEMO-G'];
  function create(api){
    const {stocks,latest,esc,icon,badge,avatar,signed,priceText,colorClass,route,selectStock,openDialog,bigChart}=api;
    const get=()=>api.getState();
    const stock=id=>stocks.find(s=>s.id===id);
    const menu=id=>catalog.find(m=>m.id===links.resolve(id))||catalog[0];
    const topic=id=>topics.find(t=>t.id===id)||topics[0];
    const glyph=id=>drawings[id]?`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${drawings[id]}</svg>`:icon(id);
    const note=(text)=>`<p class="room-note">${icon('file')}<span>${text}</span></p>`;
    const roomButton=(id,label,klass='room-text-link')=>`<button class="${klass}" data-room="${id}">${label||menu(id).name}<span aria-hidden="true">→</span></button>`;
    const stockButton=(id,label,tab='overview')=>`<button class="room-stock-link" data-room-stock="${id}" data-room-tab="${tab}">${label||stock(id).name}<span aria-hidden="true">↗</span></button>`;
    const chips=(items,current,attr,label)=>`<div class="room-filters" role="group" aria-label="${label}">${items.map(([id,text])=>`<button ${attr}="${id}" aria-pressed="${current===id}">${text}</button>`).join('')}</div>`;
    const stockIdentity=(s)=>`<div class="room-stock-identity">${avatar(s)}<div><strong>${s.name}</strong><small>${s.id} · ${s.group==='held'?'보유 예시':'신규 후보'}</small></div></div>`;
    const empty=(title,copy)=>`<div class="room-empty"><span>${icon('file')}</span><h3>${title}</h3><p>${copy}</p></div>`;
    let operatingBase='';
    try { const saved=localStorage.getItem('hokuto-operating-base-v1');if(saved)operatingBase=links.normaliseBase(saved); } catch {}
    let pendingSource='';
    function sourceAction(m,label='기존 화면',klass='source-link'){
      return operatingBase?`<a class="${klass}" href="${esc(links.destination(m.id,operatingBase))}" target="_blank" rel="noopener noreferrer" aria-label="${m.name} 기존 화면 새 탭에서 열기">${label} <span aria-hidden="true">↗</span></a>`:`<button class="${klass}" data-connect-source="${m.id}" aria-label="${m.name} 기존 화면 연결">${label} <span aria-hidden="true">↗</span></button>`;
    }
    function connectionDialog(id=''){
      pendingSource=id;
      openDialog(`<div class="dialog-header"><div><small>기존 호쿠토와 연결</small><h2>내 호쿠토 주소를 알려주세요</h2></div><button class="close-dialog" id="close-dialog" aria-label="연결 창 닫기">×</button></div><div class="dialog-body connection-dialog"><p>지금 사용하는 호쿠토의 오늘 화면이나 사무실 주소를 복사해 붙여넣으세요.</p><label for="operating-address">호쿠토 화면 주소</label><input id="operating-address" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://…/hokuto/ko/today.html" value="${esc(operatingBase)}"><p class="connection-error" id="connection-error" role="alert"></p><button class="connection-save" data-save-connection>${id?'연결하고 '+menu(id).name+' 열기':'연결 저장하기'}</button><p class="connection-private">주소는 이 브라우저에만 저장됩니다. 기존 화면은 새 탭에서 열리고, 이곳에서 보던 화면은 유지됩니다.</p></div>`);
    }
    function saveConnection(){
      const input=document.querySelector('#operating-address');
      try { operatingBase=links.normaliseBase(input.value); }
      catch(error){document.querySelector('#connection-error').textContent=error.message;input.focus();return;}
      let persisted=true;
      try { localStorage.setItem('hokuto-operating-base-v1',operatingBase); } catch { persisted=false; }
      const target=catalog.find(m=>m.id===pendingSource&&m.path);
      document.querySelector('#evidence-dialog').close();
      api.refresh();
      document.querySelector('#announcer').textContent=persisted?'기존 호쿠토를 연결했습니다.':'현재 화면에서 연결했습니다. 브라우저 저장은 사용할 수 없습니다.';
      if(target)window.open(links.destination(target.id,operatingBase),'_blank','noopener,noreferrer');
      pendingSource='';
    }
    function navigate(id,extra={}){
      id=links.resolve(id);
      if(id==='scores'){route({view:'scores',detail:false,from:'',query:''});}
      else {route({view:'room',room:id,detail:false,from:'',section:'all',item:'',...extra});}
      window.scrollTo({top:0});
      if(extra.item)requestAnimationFrame(()=>{
        const target=document.querySelector('[data-focus-item="'+extra.item+'"]');
        if(target){target.scrollIntoView({block:'center'});target.focus({preventScroll:true});}
      });
    }
    function directoryCard(m){return `<article class="original-menu-card"><div class="original-menu-title"><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><div><h3>${m.name}</h3><p>${m.copy}</p></div></div><div class="original-menu-actions"><button class="preview-link" data-room="${m.id}">${m.preview?'미리보기':'연결 보기'} <span>→</span></button>${sourceAction(m)}</div></article>`;}
    function directory(){
      const q=get().menuQuery.trim().toLowerCase();
      const matches=catalog.filter(m=>`${m.name} ${m.alias||''} ${m.copy}`.toLowerCase().includes(q));
      const originals=matches.filter(m=>m.group==='original'),entries=matches.filter(m=>m.group==='entry'),extras=matches.filter(m=>m.group==='preview');
      return `<section class="connection-intro"><div><span class="eyebrow">YOUR HOKUTO, CONNECTED</span><h2>알림으로 시작하고,<br>익숙한 메뉴에서 확인하세요.</h2><p>새 알림 홈과 기존 호쿠토가 이어집니다.<br>추천·북두테마, 성과기록·선정성적도 각각 그대로.</p><button class="room-text-link" data-nav="home">알림 홈으로 <span>→</span></button></div><div class="connection-route"><div><span class="route-number">01</span><span><strong>알림 홈</strong><small>내 종목에서 달라진 것</small></span></div><span class="route-line" aria-hidden="true"></span><div><span class="route-number">02</span><span><strong>기존 호쿠토 메뉴</strong><small>근거를 읽고 자세히 확인</small></span></div><span class="route-line" aria-hidden="true"></span><div><span class="route-number">03</span><span><strong>읽던 곳으로 돌아오기</strong><small>종목 · 날짜 · 필터 유지</small></span></div></div></section><div class="connection-status"><span class="connection-status-copy"><i class="${operatingBase?'connected':''}"></i>${operatingBase?'내 호쿠토가 연결되어 있어요':'기존 화면도 바로 열고 싶다면'}</span><button data-connect-settings>${operatingBase?'연결 주소 변경':'내 호쿠토 연결'} <span>↗</span></button></div><section class="daily-entry"><div class="directory-section-heading"><h2>자주 확인하는 곳</h2><span>알림에서 이어지는 메뉴</span></div><div class="daily-entry-grid">${[{id:'holdings',note:'보유종목에 변화가 생겼다면'},{id:'decision',note:'새 후보의 판단이 궁금하다면'},{id:'newbuy',note:'진입 조건을 확인하려면'}].map(x=>`<button data-room="${x.id}"><span class="menu-symbol ${menu(x.id).tone}">${glyph(menu(x.id).icon)}</span><span><strong>${menu(x.id).name}</strong><small>${x.note}</small></span><b>→</b></button>`).join('')}</div></section><section class="original-directory"><div class="directory-section-heading menu-list-heading"><div><h2>기존 호쿠토 전체 메뉴 <span>12</span></h2><p>미리보기는 가상 자료 · 기존 화면은 내 호쿠토에서 새 탭으로</p></div><label class="menu-search">${glyph('compass')}<input id="menu-search" type="search" aria-label="전체 메뉴 검색" placeholder="메뉴 이름으로 찾기" value="${esc(get().menuQuery)}"></label></div><div class="original-menu-grid">${originals.map(directoryCard).join('')}</div>${!matches.length?empty('찾는 메뉴가 없어요','메뉴 이름이나 보유, 추천, 성과로 찾아보세요.'):''}</section>${entries.length?`<section class="entry-links"><div class="directory-section-heading"><h2>기존 입구도 그대로</h2></div><div class="entry-link-grid">${entries.map(m=>`<article><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><div><h3>${m.name}</h3><p>${m.copy}</p></div>${sourceAction(m,'열기')}</article>`).join('')}</div></section>`:''}${extras.length?`<section class="preview-extras"><div class="directory-section-heading"><div><h2>종목별로 이어 보는 기록</h2><p>새 알림 홈에 더한 디자인 시안</p></div>${badge('미리보기','gray')}</div><div>${extras.map(m=>`<button data-room="${m.id}"><span>${glyph(m.icon)}</span><strong>${m.name}</strong><span>→</span></button>`).join('')}</div></section>`:''}<p class="directory-footnote">기존 메뉴의 역할은 유지합니다. 실제 화면은 연결된 호쿠토에서 확인하세요.</p>`;
    }
    function context(){
      const m=menu(get().room);
      return `<nav class="room-breadcrumb" aria-label="현재 위치"><button data-nav="home">알림 홈</button><span>/</span><button data-menu-home>전체 메뉴</button><span>/</span><strong>${m.name}</strong></nav><div class="room-origin"><div><span class="origin-tag">${m.path?'기존 호쿠토 메뉴':'새 홈의 기록 시안'}</span><span>${m.preview?'현재 내용은 가상 자료 미리보기':'세부 내용은 기존 화면에서 확인'}</span></div>${m.path?sourceAction(m,'기존 '+m.name+' 열기'):''}</div><nav class="room-siblings" aria-label="함께 확인할 메뉴">${(m.related||[]).map(id=>`<button data-room="${id}">${glyph(menu(id).icon)}${menu(id).name}<span>→</span></button>`).join('')}</nav>`;
    }
    function bridge(){
      const m=menu(get().room);
      return `<section class="original-bridge"><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><span class="eyebrow">ORIGINAL HOKUTO</span><h2>${m.name},<br>기존 화면에서 이어보세요.</h2><p>${m.lead}</p>${sourceAction(m,m.name+' 열기','bridge-open')}<small>새 탭에서 열립니다. 이 화면으로 돌아오면 읽던 위치가 그대로입니다.</small></section><section class="bridge-next room-paper room-reading"><h3>이어서 확인할 곳</h3><div>${(m.related||[]).map(id=>roomButton(id)).join('')}</div></section>`;
    }
    function articleCard(a){
      return `<article class="news-entry ${get().item===a.id?'is-focused':''}" data-focus-item="${a.id}" tabindex="-1"><div class="news-time">${a.time}<small>10.16</small></div><div class="news-entry-content"><div class="news-tags">${badge(a.state,a.kind==='direct'?'teal':a.kind==='pending'?'amber':'gray')}<span>${a.country} · ${topic(a.topic).name}</span></div><button class="news-headline" data-article="${a.id}">${a.title}</button><p>${a.summary}</p><div class="news-related">${a.stock?stockButton(a.stock):`<span>${a.kind==='pending'?'분석 완료 후 연결 확인':'회사 직접 연결 없음'}</span>`}<button data-article="${a.id}">내용과 근거 <span aria-hidden="true">→</span></button></div></div></article>`;
    }
    function news(){
      const state=get(),items=articles.filter(a=>state.section==='all'||state.section==='held'&&a.stock&&stock(a.stock).group==='held'||state.section==='industry'&&a.kind==='industry'||state.section==='pending'&&a.kind==='pending');
      return `<div class="room-two-column"><section class="room-paper"><div class="room-paper-heading"><div><h2>오늘의 소식</h2><p>가상 기사 6건 · 10.16 수집 예시</p></div><span class="small-asof">수집시각순</span></div>${chips([['all','전체 6'],['held','내 주식 3'],['industry','업종 참고 1'],['pending','분석 대기 1']],state.section,'data-room-filter','뉴스 범위')}<div class="news-feed">${items.map(articleCard).join('')}</div></section><aside class="room-aside"><section class="room-paper room-reading"><span class="eyebrow">FOLLOW THE CHANGE</span><h2>협의가 계약으로<br>바뀌었어요.</h2><p>호쿠토 반도체의 같은 사건을 이어서 봅니다.</p><div class="follow-mini"><div><time>10.13</time><strong>공급 협의</strong><small>금액·납기 미확정</small></div><div><time>10.16</time><strong>계약 체결</strong><small>42억 엔 · 이익 영향 미확인</small></div></div>${stockButton('DEMO-A','후속 기록 보기','history')}</section><section class="room-paper room-reading"><h3>읽을 때 구분해요</h3><ul class="reading-list"><li><b>직접 연결</b><span>회사와 사건을 함께 확인</span></li><li><b>업종 참고</b><span>회사 영향은 별도로 확인</span></li><li><b>분석 대기</b><span>아직 영향 판단이 없음</span></li></ul>${roomButton('themes','테마별로 모아보기')}</section></aside></div>`;
    }
    function showArticle(id){
      const a=articles.find(a=>a.id===id);if(!a)return;
      const s=a.stock?stock(a.stock):null;
      openDialog(`<div class="dialog-header"><div><small>뉴스룸 · 수집 2026.10.16 ${a.time} · 가상 기사</small><h2>${a.title}</h2></div><button class="close-dialog" id="close-dialog" aria-label="뉴스 상세 닫기">×</button></div><div class="dialog-body news-dialog">${badge(a.state,a.kind==='direct'?'teal':a.kind==='pending'?'amber':'gray')}<h3>확인한 사실</h3><p>${a.summary}</p><h3>종목 연결 근거</h3><p>${a.proof}</p><h3>아직 모르는 것</h3><p>${a.unknown}</p><details class="room-details"><summary>입력 자료 · 출처 보기</summary><blockquote>${s?latest(s).input:a.kind==='pending'?'원문 분석이 아직 완료되지 않았습니다.':'전력 설비 투자 계획이 추가 발표됐다. 공급 회사와 계약 금액은 공개하지 않았다.'}</blockquote><p>화면 시연용 가상 자료입니다. 실제 기사 원문 링크는 없습니다.</p></details>${s?stockButton(s.id,`${s.name}의 분석과 기록`):''}<button class="room-text-link" data-article-topic="${a.topic}">같은 테마의 다른 소식 <span>→</span></button></div>`);
    }
    function themes(){
      const t=topic(get().topic),related=articles.filter(a=>a.topic===t.id);
      return `<div class="theme-workspace"><section class="room-paper theme-index"><div class="room-paper-heading"><div><h2>관찰 중인 테마</h2><p>6개 테마 · 가상 자료</p></div></div>${topics.map(x=>`<button class="theme-index-row ${x.id===t.id?'selected':''}" data-topic="${x.id}" aria-pressed="${x.id===t.id}"><span class="topic-dot ${x.tone}"></span><span><strong>${x.name}</strong><small>${articles.filter(a=>a.topic===x.id).length}개 소식 · ${x.stockIds.length}개 관찰 종목</small></span><span>›</span></button>`).join('')}</section><section class="room-paper theme-story"><span class="eyebrow">THEME BRIEF</span><h2>${t.name}</h2><p class="theme-lead">${t.copy}</p><div class="next-check"><span>${icon('clock')}</span><div><h3>다음 확인</h3><p>${t.next}</p></div></div><div class="section-headline"><h3>관찰 종목</h3><small>소속 테마와 직접 연결은 별개</small></div><div class="theme-stocks">${t.stockIds.map(id=>`<div>${stockIdentity(stock(id))}${stockButton(id,'종목 분석')}</div>`).join('')}</div><div class="section-headline"><h3>관련 소식</h3><small>제목을 누르면 근거까지</small></div>${related.length?related.map(articleCard).join(''):note('이 예시에는 연결된 새 기사가 없습니다. 중요 사건이 없다고 확정한 뜻은 아닙니다.')}<button class="room-text-link" data-theme-research="${t.id}">같은 테마의 가격 흐름·돈몰림 <span>→</span></button></section></div>`;
    }
    function research(){
      const t=topic(get().topic);
      return `<div class="room-two-column"><section class="room-paper"><div class="room-paper-heading"><div><h2>테마 순위</h2><p>20거래일 등락률 기준 · 가상 6개 테마</p></div>${badge('10.16 종가','gray')}</div><div class="research-columns"><span>테마 / 이전 순위</span><span>20일 등락률</span><span>돈몰림 20일</span></div>${topics.map(x=>`<button class="research-row ${x.id===t.id?'selected':''}" data-topic="${x.id}" aria-pressed="${x.id===t.id}"><span class="rank-number">${x.rank}</span><span><strong>${x.name}</strong><small>${x.previous}위 → ${x.rank}위</small></span><span class="${colorClass(x.return20)}">${signed(x.return20)}</span><span>${x.money20.toFixed(1)}배</span></button>`).join('')}${note('뉴스 건수와 돈몰림은 다른 숫자입니다. 테마 순위를 종목의 매수 판정으로 바꾸지 않습니다.')}</section><aside class="room-aside"><section class="room-paper room-reading"><span class="eyebrow">SELECTED THEME</span><h2>${t.name}</h2><div class="room-metrics"><div><small>20일 돈몰림</small><strong>${t.money20.toFixed(1)}<em>배</em></strong></div><div><small>60일 돈몰림</small><strong>${t.money60.toFixed(1)}<em>배</em></strong></div></div><p>${t.copy}</p><h3 class="room-small-heading">함께 볼 종목</h3>${t.stockIds.map(id=>`<div class="research-stock">${stockIdentity(stock(id))}${stockButton(id,'분석과 기록 보기')}</div>`).join('')}<button class="room-text-link" data-theme-news="${t.id}">이 테마의 뉴스 보기 <span>→</span></button></section><section class="room-paper room-reading"><h3>다음으로</h3><p>종목을 고를 때는 테마뿐 아니라 선정 조건과 실적 근거도 확인합니다.</p>${roomButton('manager','후보 조건 살펴보기')}</section></aside></div>`;
    }
    // The remaining rooms share this same shell and stock fixture.
    function manager(){
      const state=get(),items=decisionIds.map(stock).filter(s=>state.section==='all'||lanes[s.id].includes(state.section));
      return `<div class="room-paper room-reading"><div class="section-headline"><div><h2>후보 조건 확인</h2><p>레인 충족 → 결정실 판정 → 진입 시점을 구분합니다.</p></div>${roomButton('decision','판정 목록')}</div>${chips([['all','전체 4'],['A','A 레인 1'],['B','B 레인 1'],['C','C 레인 1'],['D','D 레인 1']],state.section,'data-room-filter','후보 레인')}<div class="manager-grid">${items.map(s=>`<article class="manager-card">${stockIdentity(s)}<dl class="room-dl"><div><dt>충족 레인</dt><dd>${lanes[s.id].length?lanes[s.id].map(l=>badge(l,'blue')).join(' '):'자료 미확인'}</dd></div><div><dt>실적 근거</dt><dd>${s.price==null?'자료 부족':latest(s).axes[1].split(':')[1]}</dd></div><div><dt>결정실</dt><dd>${badge(s.decision,s.decision==='매수대상'?'teal':'gray')}</dd></div><div><dt>진입 확인</dt><dd>${s.timing}</dd></div></dl>${stockButton(s.id,'판정과 네 가지 근거')}</article>`).join('')}</div>${note('복수 레인은 종목 수에 중복으로 더하지 않습니다. 이 시안의 레인 배정은 화면 연결을 위한 가상 예시입니다.')}</div>`;
    }
    function decisions(){
      const state=get(),items=decisionIds.map(stock).filter(s=>state.section==='all'||s.decision===state.section);
      return `<div class="decision-overview">${[['매수대상',2,'teal'],['보류',1,'gray'],['제외',0,'gray'],['미입력',1,'amber']].map(([label,n,tone])=>`<button class="decision-total ${tone}" data-room-filter="${label}" aria-pressed="${state.section===label}"><span>${label}</span><strong>${n}<small>종목</small></strong></button>`).join('')}</div><section class="room-paper room-reading"><div class="section-headline"><div><h2>판정과 그 이유</h2><p>10.16 기준 · 보유 중인 매수대상 1종목 포함</p></div></div>${chips([['all','전체'],['매수대상','매수대상'],['보류','보류'],['제외','제외'],['미입력','미입력']],state.section,'data-room-filter','결정실 판정')}${items.length?`<div class="decision-stack">${items.map(s=>`<article class="decision-file ${state.item===s.id?'is-focused':''}" data-focus-item="${s.id}" tabindex="-1"><div class="decision-file-head">${stockIdentity(s)}${badge(s.decision,s.decision==='매수대상'?'teal':s.price==null?'amber':'gray')}</div><p class="decision-reason">${s.group==='held'?'기존 결정실 판정은 매수대상이며 이미 보유 중입니다. 최신 보유 점검은 정상이고, 새 경고는 없습니다.':latest(s).summary}</p><div class="decision-next"><b>다음 확인</b><span>${latest(s).next}</span></div><div class="decision-actions">${stockButton(s.id,'네 가지 근거와 기록')}<button data-trading-stock="${s.id}">진입·보유 상태 <span>→</span></button></div></article>`).join('')}</div>`:empty('제외 판정 예시가 없습니다','0건과 자료 미확인 상태는 구분해서 표시합니다.')}${note('결정실의 매수대상은 진입 시점을 확인할 대상입니다. 보유 경고·매매 타이밍과 같은 뜻이 아닙니다.')}</section>`;
    }
    function trading(){
      const state=get(),isHoldings=state.room==='holdings';
      const choices=stocks.filter(s=>s.group===(isHoldings?'held':'candidate'));
      const s=choices.find(s=>s.id===state.item)||choices[0],isNew=s.group!=='held'&&s.decision==='매수대상';
      return `<div class="theme-workspace"><section class="room-paper theme-index"><div class="room-paper-heading"><div><h2>${isHoldings?'보유주식 관리':'신규매수'}</h2><p>${isHoldings?'이미 보유한 종목의 상태와 경고':'새 후보의 판정과 진입 조건'}</p></div></div>${choices.map(x=>`<button class="trade-select ${x.id===s.id?'selected':''}" data-room-item="${x.id}" aria-pressed="${x.id===s.id}">${stockIdentity(x)}<small>${x.group==='held'?'보유관리':x.decision==='매수대상'?'신규 진입 확인':x.decision}</small></button>`).join('')}</section><section class="room-paper room-reading"><div class="decision-file-head">${stockIdentity(s)}${badge(s.group==='held'?'보유관리':s.decision,s.group==='held'?'blue':'gray')}</div><div class="trade-price"><strong>${priceText(s.price)}${s.price==null?'':'<small>엔</small>'}</strong><span class="${colorClass(s.change)}">${signed(s.change)}</span></div><p class="room-meta">2026.10.16 종가 · 실시간 가격 아님 · 가상</p><div class="chart-container">${bigChart(s,'room-chart-fill')}</div><div class="trade-state"><span>${icon('clock')}</span><div><small>${s.group==='held'?'보유 중인 종목':isNew?'신규 진입 확인':'판정 확인이 먼저'}</small><h3>${s.group==='held'?'보유 상태와 새 경고를 확인해요':isNew?'아직 진입 신호가 없습니다':s.price==null?'자료가 부족해 확인할 수 없습니다':'보류 상태를 유지합니다'}</h3><p>${s.group==='held'?latest(s).next:isNew?'매수대상 선정과 지금 진입할 수 있는지는 별개입니다. 다음 가격 확인에서 회복·돌파 조건을 봅니다.':latest(s).next}</p></div></div><dl class="room-dl"><div><dt>결정실 판정</dt><dd>${s.decision}</dd></div><div><dt>타이밍</dt><dd>${s.timing}</dd></div><div><dt>다음 거래일 가격</dt><dd>아직 확인 전</dd></div><div><dt>계좌·체결</dt><dd>시안에 연결하지 않음</dd></div></dl>${stockButton(s.id,'종목 분석과 당시 기록')}${note('버튼은 자료를 살펴보는 용도입니다. 실제 주문·체결 기능은 없습니다.')}</section></div>`;
    }
    function signals(){
      const fixtures=[{name:'가상 BNF 종목 01',state:'세 조건 충족',tone:'teal',values:['−22.0%','27.0','−4 → −2'],met:[true,true,true]},{name:'가상 BNF 종목 02',state:'조건 미충족',tone:'gray',values:['−21.0%','35.0','−4 → −2'],met:[true,false,true]},{name:'가상 BNF 종목 03',state:'확인 불가',tone:'amber',values:['자료 부족','자료 부족','자료 부족'],met:[null,null,null]}];
      return `<div class="strategy-banner"><span class="menu-symbol violet">${glyph('pulse')}</span><div><strong>BNF는 별도로 보는 전략입니다.</strong><p>조건 충족 결과가 결정실의 매수대상을 뜻하지 않습니다.</p></div></div><div class="bnf-grid">${fixtures.map((f,i)=>`<article class="room-paper room-reading"><span class="eyebrow">BNF · 0${i+1}</span><h2>${f.name}</h2><div class="bnf-result">${badge(f.state,f.tone)}</div><dl class="bnf-conditions">${['25일 이격도 ≤ −20%','RSI14 < 30','MACD 히스토그램 상승'].map((label,j)=>`<div><dt>${label}</dt><dd><b>${f.values[j]}</b><span class="${f.met[j]===false?'down':''}">${f.met[j]===null?'확인 불가':f.met[j]?'충족':'미충족'}</span></dd></div>`).join('')}</dl><details class="room-details"><summary>이 결과 읽는 법</summary><p>${i===0?'세 조건을 모두 충족한 가상 예시입니다. 실제 주문이나 결정실 판정으로 이어지지 않습니다.':i===1?'RSI14가 35.0으로 기준 30 미만을 충족하지 않았습니다. 나머지 두 조건과 구분합니다.':'가격 자료가 부족합니다. 신호 없음이나 조건 미충족으로 바꾸지 않습니다.'}</p></details></article>`).join('')}</div>${note('기존 신호실에 있는 세 조건을 설명하는 예시입니다. 운영 신호를 조회하거나 계산하지 않습니다.')}`;
    }
    function records(){
      const state=get(),dates=['2026-10-16','2026-10-13','2026-09-08'];
      const date=dates.includes(state.section)?state.section:dates[0];
      const items=stocks.map(s=>({s,r:s.records.find(r=>r.date===date)})).filter(x=>x.r);
      return `<div class="room-two-column"><section class="room-paper room-reading"><div class="section-headline"><div><h2>당시 자료가 붙어 있는 기록</h2><p>현재 자료로 다시 쓴 기록이 아닙니다.</p></div>${badge('가상 보존 기록','gray')}</div>${chips(dates.map(d=>[d,d.slice(5).replace('-','.')+(d===dates[0]?' 최신':'')]),date,'data-room-filter','기록 날짜')}<div class="archive-list">${items.map(({s,r})=>`<article class="archive-item"><div class="archive-time"><strong>${r.date.slice(5).replace('-','.')}</strong><span>17:45 보존</span></div><div><div class="decision-file-head">${stockIdentity(s)}${badge(r.status,r.status==='주의'?'amber':'gray')}</div><p>${r.change}</p><div class="archive-input"><span>${icon('file')}</span>입력 자료 ${r.inputAt} · 당시 종가 ${priceText(r.price)}${r.price==null?'':'엔'}</div><button class="room-text-link" data-record-stock="${s.id}" data-record-date="${r.date}">이 날짜의 분석과 입력 자료 <span>→</span></button></div></article>`).join('')}</div></section><aside class="room-aside"><section class="room-paper room-reading archive-explainer"><span class="menu-symbol teal">${icon('book')}</span><h2>판단을 기억하는 방식</h2><ol><li><strong>무엇을 봤는지</strong><span>기사 문장과 당시 가격</span></li><li><strong>어떻게 판단했는지</strong><span>근거·반대근거·다음 확인</span></li><li><strong>그 뒤 어땠는지</strong><span>같은 회차의 성적표</span></li></ol>${roomButton('scores','이후 성적표 보기')}</section></aside></div>`;
    }
    function changes(){
      const changed=stocks.filter(s=>s.changed),unchanged=stocks.filter(s=>!s.changed&&s.price!=null);
      return `<section class="change-hero"><div><span class="eyebrow">DAILY CHANGES · 사장실</span><h2>달라진 것부터 읽으세요.</h2><p>10.13 기록 → 10.16 기록 비교 · 가상</p></div><div><strong>${changed.length}</strong><span>변화가 있는 종목</span></div></section><div class="room-two-column"><section class="room-paper room-reading"><div class="section-headline"><h2>종목별 변화</h2><small>가격 등락과 판단 변화는 별도</small></div>${changed.map(s=>{const old=s.records[s.records.length-2],r=latest(s);return `<article class="change-item">${stockIdentity(s)}<div class="status-transition">${badge(old.status,'gray')}<span>→</span>${badge(r.status,s.tone)}</div><p>${r.change}</p><div class="decision-next"><b>다음 확인</b><span>${r.next}</span></div>${stockButton(s.id,'이전 기록과 비교','history')}</article>`;}).join('')}</section><aside class="room-aside"><section class="room-paper room-reading"><h3>판단이 유지된 종목</h3>${unchanged.map(s=>`<div class="unchanged-stock">${stockButton(s.id)}<p>${s.update}</p></div>`).join('')}</section><section class="room-paper room-reading"><h3>아직 비교할 수 없어요</h3><p>유키 메디컬은 자료가 부족하고 이전 기록도 없습니다.</p>${stockButton('DEMO-G','자료 상태 보기')}</section><section class="room-paper room-reading"><h3>테마 순위 변화</h3><p>테마 순위는 리서치센터에서 비교할 수 있습니다.</p>${roomButton('research','테마 흐름 보기')}</section></aside></div>`;
    }
    function space(){return `<section class="room-paper space-page"><div class="space-page-copy"><span class="eyebrow">A LITTLE BREAK</span><h2>바닷가의 작은 호쿠토.</h2><p>익숙한 공간은 남겨두고,<br>투자 정보는 같은 메뉴에서 또렷하게 봅니다.</p><button class="room-primary" data-nav="home">내 종목의 오늘로 <span>→</span></button></div><img src="assets/entry-mobile-v2.webp" alt="바닷가의 작은 호쿠토 사무실" width="1774" height="887"></section><section class="room-paper space-lounge"><img src="assets/lounge-mobile-v2.webp" alt="안내원이 있는 호쿠토 라운지" width="1000" height="500" loading="lazy"><div><h3>방 이름은 익숙하게, 이동은 간단하게.</h3><p>뉴스룸·결정실·기록실 모두 같은 화면 안에서 이어집니다.</p><button class="room-text-link" data-menu-home>전체 메뉴로 <span>→</span></button></div></section>`;}
    const renderers={news,themes,research,recommend:manager,decision:decisions,holdings:trading,newbuy:trading,signals,records,park:changes};
    function render(){
      const state=get(),isMenu=state.view==='menu';
      const m=menu(state.room);
      document.querySelector('#explore-view').innerHTML=isMenu?directory():context()+(renderers[m.id]||bridge)();
      const sub=document.querySelector('#room-subnav');
      sub.innerHTML=['news','decision','holdings','newbuy'].map(id=>`<button class="${!isMenu&&id===state.room?'active':''}" data-room="${id}" ${!isMenu&&id===state.room?'aria-current="page"':''}>${glyph(menu(id).icon)}${menu(id).name}</button>`).join('');
      document.querySelector('#page-heading h1').textContent=isMenu?'호쿠토 전체 메뉴':m.name;
      document.querySelector('#page-heading p').textContent=isMenu?'새 알림 홈에서, 기존 호쿠토의 모든 기능으로.':m.lead;
      document.querySelector('#page-heading .eyebrow').textContent=isMenu?'ALL OF HOKUTO':m.group==='preview'?'RECORDS & REVIEW':'ORIGINAL HOKUTO';
      document.title=`${isMenu?'전체 메뉴':m.name} · 호쿠토증권 시안`;
    }
    function onClick(b){
      if(b.hasAttribute('data-connect-settings')){connectionDialog();return true;}
      if(b.hasAttribute('data-connect-source')){connectionDialog(b.dataset.connectSource);return true;}
      if(b.hasAttribute('data-save-connection')){saveConnection();return true;}
      if(b.dataset.alertRoom){navigate(b.dataset.alertRoom,{item:b.dataset.alertItem||''});return true;}
      if(b.hasAttribute('data-menu-home')){route({view:'menu',detail:false,from:'',menuQuery:''});window.scrollTo({top:0});return true;}
      if(b.dataset.room){navigate(b.dataset.room);return true;}
      if(b.dataset.roomFilter){route({section:b.dataset.roomFilter},true);return true;}
      if(b.dataset.topic){route({topic:b.dataset.topic},true);return true;}
      if(b.dataset.article){showArticle(b.dataset.article);return true;}
      if(b.dataset.articleTopic){document.querySelector('#evidence-dialog').close();navigate('themes',{topic:b.dataset.articleTopic});return true;}
      if(b.dataset.roomItem){route({item:b.dataset.roomItem},true);return true;}
      if(b.dataset.themeResearch){navigate('research',{topic:b.dataset.themeResearch});return true;}
      if(b.dataset.themeNews){navigate('themes',{topic:b.dataset.themeNews});return true;}
      if(b.dataset.tradingStock){navigate(stock(b.dataset.tradingStock)?.group==='held'?'holdings':'newbuy',{item:b.dataset.tradingStock});return true;}
      if(b.dataset.roomStock||b.dataset.recordStock){
        const d=document.querySelector('#evidence-dialog');if(d.open)d.close();
        const id=b.dataset.roomStock||b.dataset.recordStock;
        selectStock(id,b.dataset.recordStock?'history':b.dataset.roomTab||'overview',{from:get().room,filter:'all',query:'',date:b.dataset.recordDate||''});return true;
      }
      if(b.id==='return-room'){api.returnToOrigin();return true;}
      return false;
    }
    return {render,navigate,onClick,catalog,menu,resolve:links.resolve};
  }
  if(typeof window!=='undefined')window.HokutoRooms={create,catalog};
  if(typeof module!=='undefined')module.exports={catalog,topics,articles,lanes,decisionIds};
})();
