/* Shared navigation and fictional room examples. No production calls or writes. */
(() => {
  'use strict';
  const links=typeof window!=='undefined'?window.HokutoLinks:require('./stock-links.js');
  const catalog=links.catalog;
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
  const candidateIds=['DEMO-D','DEMO-E','DEMO-F','DEMO-G'];
  const decisionIds=['DEMO-D','DEMO-E','DEMO-F'];
  const newbuyIds=['DEMO-E']; // Explicit fictional card availability, not a production calculation.
  // Fictional display states; these do not calculate or replace production rules.
  const themeStates={
    chip:{kind:'star',label:'★ 주도',previous:'★ 주도',return60:24.0,converted:false},
    ai:{kind:'star',label:'★ 주도',previous:'↗ 관찰',return60:21.0,converted:true},
    parts:{kind:'star',label:'★ 주도',previous:'★ 주도',return60:12.0,converted:false},
    grid:{kind:'arrow',label:'↗ 관찰',previous:'↗ 관찰',return60:11.0,converted:false},
    defense:{kind:'normal',label:'일반',previous:'일반',return60:7.0,converted:false},
    game:{kind:'normal',label:'일반',previous:'일반',return60:3.0,converted:false}
  };
  const companyChecks={
    'DEMO-D':{eps:180,forecast:180,status:'변화미미',reason:'가상 회사 전망과 최근 연간 EPS가 같습니다.',at:'2026.10.13'},
    'DEMO-E':{eps:120,forecast:132,status:'개선',reason:'가상 회사 전망 EPS가 최근 연간 EPS보다 10% 높습니다.',at:'2026.10.16'},
    'DEMO-F':{eps:80,forecast:null,status:'자료부족',reason:'새 회사 전망을 확보하지 못했습니다. 업종 투자 기사를 회사 실적으로 바꾸지 않습니다.',at:'2026.10.13'},
    'DEMO-G':{eps:null,forecast:null,status:'자료부족',reason:'선정·실적 자료를 아직 확보하지 못했습니다.',at:null}
  };
  function create(api){
    const {stocks,latest,esc,icon,badge,statusChips,avatar,signed,priceText,colorClass,route,selectStock,openDialog,bigChart}=api;
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
    function sourceAction(m,label='운영 화면',klass='source-link'){
      return operatingBase?`<a class="${klass}" href="${esc(links.destination(m.id,operatingBase))}" target="_blank" rel="noopener noreferrer" aria-label="${m.brief?m.name+'이 있는 사무실 위치':m.name+' 기존 화면'} 새 탭에서 열기">${label} <span aria-hidden="true">↗</span></a>`:`<button class="${klass}" data-connect-source="${m.id}" aria-label="${m.name} 기존 화면 연결">${label} <span aria-hidden="true">↗</span></button>`;
    }
    function connectionDialog(id=''){
      pendingSource=id;
      openDialog(`<div class="dialog-header"><div><small>기존 호쿠토와 연결</small><h2>내 호쿠토 주소를 알려주세요</h2></div><button class="close-dialog" id="close-dialog" aria-label="연결 창 닫기">×</button></div><div class="dialog-body connection-dialog"><p>지금 사용하는 호쿠토의 오늘 화면이나 사무실 주소를 복사해 붙여넣으세요.</p><label for="operating-address">호쿠토 화면 주소</label><input id="operating-address" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://…/hokuto/ko/today.html" value="${esc(operatingBase)}"><p class="connection-error" id="connection-error" role="alert"></p><button class="connection-save" data-save-connection>${id?'연결하고 '+(menu(id).brief?'사무실 위치':menu(id).name)+' 열기':'연결 저장하기'}</button><p class="connection-private">주소는 이 브라우저에만 저장됩니다. 기존 화면은 새 탭에서 열리고, 이곳에서 보던 화면은 유지됩니다.</p></div>`);
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
      else {route({view:'room',room:id,detail:false,from:'',section:'all',item:'',flowTopic:'',newsQuery:'',newsCountry:'all',newsMode:'titles',...extra});}
      window.scrollTo({top:0});
      if(extra.item)requestAnimationFrame(()=>{
        const target=document.querySelector('#explore-view [data-focus-item="'+extra.item+'"]');
        if(target){target.scrollIntoView({block:'center'});target.focus({preventScroll:true});}
      });
    }
    function directoryCard(m){return `<article class="original-menu-card" data-menu-id="${m.id}"><button class="directory-open" data-room="${m.id}" aria-label="${m.name} ${m.preview?'미리보기':'연결 안내'}"><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><span class="directory-label"><span class="directory-name">${m.name}${m.legacy?`<small>${m.legacy}</small>`:''}</span><span class="directory-copy">${m.copy}</span></span><span class="directory-arrow" aria-hidden="true">›</span></button>${sourceAction(m,'','directory-source')}</article>`;}
    function workflowCard(m){
      const n=links.workflow.indexOf(m.id)+1;
      return `<article class="workflow-card" data-menu-id="${m.id}"><button data-room="${m.id}" class="workflow-open"><span class="workflow-number">${n}</span><span><strong>${m.short||m.name}</strong><small>${m.copy}</small></span><span class="workflow-chevron">›</span></button>${sourceAction(m,'','directory-source')}</article>`;
    }
    function workflowDirectory(matches){
      const groups=[['리서치','어느 테마를 볼까',['meeting','ops']],['펀드매니저','어떤 회사를 볼까',['strategy','recommend']],['판정과 가격 확인','다음에 무엇을 확인할까',['decision','newbuy']]];
      const columns=groups.map(([name,copy,ids])=>({name,copy,items:ids.map(menu).filter(m=>matches.includes(m))})).filter(g=>g.items.length);
      if(!columns.length)return '';
      return `<section class="workflow-directory"><div class="workflow-heading"><div><span class="eyebrow">후보를 검토하는 순서</span><h2>새 종목 검토는 1단계부터 시작하세요.</h2></div><span>6단계</span></div><div class="workflow-columns">${columns.map(g=>`<section><header><h3>${g.name}</h3><p>${g.copy}</p></header>${g.items.map(workflowCard).join('')}</section>`).join('')}</div><p class="workflow-caption">번호는 읽는 순서입니다. ‘후보 선정 · 실적 확인 · 최종 판정 · 진입 확인’의 결과는 서로 구분합니다.</p></section>`;
    }
    function directory(){
      const q=get().menuQuery.trim().toLowerCase();
      const matches=catalog.filter(m=>`${m.name} ${m.legacy||''} ${m.alias||''} ${m.copy}`.toLowerCase().includes(q));
      const originals=matches.filter(m=>m.group==='original'),entries=matches.filter(m=>m.group==='entry'),extras=matches.filter(m=>m.group==='preview');
      const panels=links.sections.map(section=>({...section,menus:section.items.map(menu).filter(m=>originals.includes(m))})).filter(section=>section.menus.length);
      return `<div class="directory-toolbar"><label class="menu-search">${glyph('compass')}<input id="menu-search" type="search" aria-label="전체 메뉴 검색" placeholder="메뉴·용도 찾기 · 예: 회의실, 검증, 기록" value="${esc(get().menuQuery)}"></label><button class="connection-settings" data-connect-settings><i class="${operatingBase?'connected':''}"></i>${operatingBase?'내 호쿠토 연결됨':'내 호쿠토 연결'} <span>↗</span></button></div><div class="directory-key"><span>${q?`검색 결과 ${originals.length}개`:'회의실부터 신규매수실까지, 기존 순서대로'}</span><span>메뉴 선택은 미리보기 <b>·</b> ↗ 기존 화면</span></div>${workflowDirectory(originals)}${panels.length?`<div class="support-menu-heading"><h2>보유 점검과 함께 볼 자료</h2><p>필요한 화면으로 바로 들어갈 수 있습니다.</p></div><div class="directory-panels">${panels.map(section=>`<section class="directory-panel" aria-labelledby="menu-group-${section.id}"><header><span class="group-glyph">${glyph(section.icon)}</span><div><h2 id="menu-group-${section.id}">${section.title}</h2><p>${section.copy}</p></div><small>${section.menus.length}</small></header><div>${section.menus.map(directoryCard).join('')}</div></section>`).join('')}</div>`:''}${!matches.length?empty('찾는 메뉴가 없어요','메뉴 이름이나 보유, 추천, 성과로 찾아보세요.'):''}${extras.length?`<section class="directory-records"><div><span class="eyebrow">새 홈의 기록 시안</span><h2>한 종목의 지난 판단이 궁금하다면</h2><p>당시 입력 자료와 분석, 이후 결과를 함께 봅니다.</p></div><div>${extras.map(m=>roomButton(m.id,m.name)).join('')}</div></section>`:''}${entries.length?`<div class="directory-entries"><span>익숙한 입구로</span>${entries.map(m=>sourceAction(m,m.name)).join('')}</div>`:''}`;
    }
    function flowStock(){
      const state=get();
      const cohort=candidateIds.map(stock).filter(s=>!state.flowTopic||topic(state.flowTopic).stockIds.includes(s.id));
      if(state.item)return state.room==='recommend'?cohort.find(s=>s.id===state.item):stock(state.item);
      if(state.room==='recommend')return cohort[0];
      if(state.room==='strategy'){
        const filtered=cohort.filter(s=>state.section==='all'||lanes[s.id].includes(state.section));
        if(filtered.length===1)return filtered[0];
      }
      if(state.room==='newbuy')return stock(newbuyIds[0]);
      return null;
    }
    function stageNavigate(id,extra={}){
      const current=get(),chosen=Object.hasOwn(extra,'item')?stock(extra.item):flowStock(),chosenTopic=topics.find(t=>t.stockIds.includes(chosen?.id));
      const selectedTopic=extra.topic||chosenTopic?.id||current.flowTopic||current.topic;
      if(chosen&&((id==='newbuy'&&!newbuyIds.includes(chosen.id))||(id==='decision'&&!decisionIds.includes(chosen.id))))return;
      navigate(id,{topic:selectedTopic,flowTopic:extra.flowTopic!==undefined?extra.flowTopic:current.flowTopic,item:chosen?.id||'',...extra});
    }
    function workflowProgress(){
      const current=get(),at=links.workflow.indexOf(current.room);if(at<0)return '';
      const selected=flowStock();
      return `<nav class="workflow-progress" aria-label="후보 검토 여섯 단계">${links.workflow.map((id,n)=>{
        const m=menu(id),off=selected&&((id==='newbuy'&&!newbuyIds.includes(selected.id))||(id==='decision'&&!decisionIds.includes(selected.id)));
        return `<button data-flow-stage="${id}" ${off?'disabled aria-disabled="true"':''} ${id===current.room?'aria-current="step"':''}><span>${n+1}</span><strong>${m.short||m.name}</strong>${off?'<small>이 종목 대상 아님</small>':''}</button>`;
      }).join('')}</nav>`;
    }
    function context(){
      const m=menu(get().room);
      const source=m.path&&m.preview?`<div class="room-tools">${m.brief?`<span>기존 사무실에서 ${m.brief}을 누르세요.</span>`:''}${sourceAction(m,m.brief?'사무실의 해당 위치':'운영 화면 열기')}</div>`:'';
      return workflowProgress()+source;
    }
    function continuation(){
      // Company and theme cards own their next action. Only the summary needs a page-level next button.
      if(get().room!=='meeting')return '';
      return `<div class="flow-next"><div><small>다음 · 2단계</small><strong>${topic(get().topic).name}의 주도·관찰 상태 확인</strong></div><button data-flow-next="ops">작전실 <span>→</span></button></div>`;
    }
    function bridge(){
      const m=menu(get().room);
      return `<section class="original-bridge"><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><span class="eyebrow">ORIGINAL HOKUTO</span><h2>${m.name}</h2><p>${m.lead}</p>${sourceAction(m,m.name+' 열기','bridge-open')}<small>새 탭에서 열립니다. 이 화면으로 돌아오면 읽던 위치가 그대로입니다.</small></section>`;
    }
    function articleCard(a){
      return `<article class="news-entry ${get().item===a.id?'is-focused':''}" data-focus-item="${a.id}" tabindex="-1"><div class="news-time">${a.time}<small>10.16</small></div><div class="news-entry-content"><div class="news-tags">${badge(a.state,a.kind==='direct'?'teal':a.kind==='pending'?'amber':'gray')}<span>${a.country} · ${topic(a.topic).name}</span></div><button class="news-headline" data-article="${a.id}">${a.title}</button><p>${a.summary}</p><div class="news-related">${a.stock?stockButton(a.stock):`<span>${a.kind==='pending'?'분석 완료 후 연결 확인':'회사 직접 연결 없음'}</span>`}<button data-article="${a.id}">내용과 근거 <span aria-hidden="true">→</span></button></div></div></article>`;
    }
    function newsItems(section='all',query='',country='all'){
      const q=query.trim().toLowerCase();
      return articles.filter(a=>(section==='all'||section==='held'&&a.stock&&stock(a.stock).group==='held'||section==='candidate'&&a.stock&&stock(a.stock).group==='candidate'||section==='industry'&&a.kind==='industry'||section==='pending'&&a.kind==='pending')
        &&(country==='all'||country==='other'&&!['일본','미국'].includes(a.country)||a.country===country)
        &&(!q||`${a.title} ${a.summary} ${a.country} ${topic(a.topic).name} ${a.stock?stock(a.stock).name:''}`.toLowerCase().includes(q)))
        .sort((a,b)=>b.time.localeCompare(a.time));
    }
    function headlineRow(a,home=false){
      return `<li class="${home?'home-headline':'headline-row'} ${get().item===a.id?'is-focused':''}" data-focus-item="${a.id}" tabindex="-1"><time datetime="2026-10-16T${a.time}:00+09:00">${a.time}</time><button ${home?'data-headline':'data-article'}="${a.id}">${esc(a.title)}</button><span class="headline-state">${esc(a.state)}</span></li>`;
    }
    function homeNews(){
      const items=newsItems(),first=items.slice(0,3),rest=items.slice(3),expanded=get().headlinesExpanded;
      return `<div class="home-news-heading"><div><h2 id="home-news-title">오늘 뉴스 제목 <strong>${items.length}<small>개 · 예시</small></strong></h2><p>뉴스룸 전체 목록 · 10.16 수집 예시 · 최신순</p></div>${roomButton('news','전체 뉴스 보기')}</div><ul class="home-headline-list">${first.map(a=>headlineRow(a,true)).join('')}</ul>${rest.length?`<div class="home-more"><button data-headlines-expand aria-expanded="${expanded}" aria-controls="more-headlines">${expanded?'접기':'나머지 '+rest.length+'개 보기'} <span aria-hidden="true">${expanded?'↑':'↓'}</span></button>${expanded?`<ul class="home-headline-list" id="more-headlines">${rest.map(a=>headlineRow(a,true)).join('')}</ul>`:'<div id="more-headlines" hidden></div>'}</div>`:''}<div class="home-news-footer"><span>제목을 누르면 기사 내용과 연결 근거가 열립니다.</span>${sourceAction(menu('news'),'운영 뉴스룸')}</div>`;
    }
    function news(){
      const state=get(),items=newsItems(state.section,state.newsQuery,state.newsCountry),all=newsItems();
      const filters=[['all','전체'],['held','내 주식'],['candidate','신규 후보'],['industry','업종 참고'],['pending','분석 대기']].map(([id,label])=>[id,label+' '+newsItems(id).length]);
      return `<div class="room-two-column"><section class="room-paper"><div class="room-paper-heading"><div><h2>오늘 뉴스 제목 <span class="list-size">전체 ${all.length}개 · 예시</span></h2><p>회사에 연결되지 않은 뉴스도 함께 봅니다.</p></div></div><div class="news-tools"><label class="news-search"><span>뉴스 검색</span><input id="news-search" type="search" placeholder="제목·회사·테마 검색" value="${esc(state.newsQuery)}"></label><label class="news-country">국가<select id="news-country"><option value="all" ${state.newsCountry==='all'?'selected':''}>전체 국가</option><option value="일본" ${state.newsCountry==='일본'?'selected':''}>일본</option><option value="미국" ${state.newsCountry==='미국'?'selected':''}>미국</option><option value="other" ${state.newsCountry==='other'?'selected':''}>기타·미확인</option></select></label></div>${chips(filters,state.section,'data-room-filter','뉴스 범위')}<div class="news-list-caption"><span>${items.length}개 표시 / 전체 ${all.length}개 · 최신순</span>${chips([['titles','제목만'],['analysis','분석 함께']],state.newsMode,'data-news-mode','뉴스 보기 방식')}</div>${items.length?(state.newsMode==='analysis'?`<div class="news-feed">${items.map(articleCard).join('')}</div>`:`<ul class="news-headline-list">${items.map(a=>headlineRow(a)).join('')}</ul>`):`<div class="news-empty"><h3>조건에 맞는 뉴스가 없습니다.</h3><p>다른 검색어를 입력하거나 필터를 초기화하세요.</p><button class="room-text-link" data-news-reset>전체 뉴스로 돌아가기 →</button></div>`}<p class="news-origin-note">10.16 수집 가상 뉴스 ${all.length}개입니다. 현재 운영 뉴스는 상단의 ‘운영 화면’에서 확인하세요.</p></section><aside class="room-aside"><section class="room-paper room-reading"><span class="eyebrow">지난 기사에서 달라진 것</span><h2>협의가 계약으로<br>바뀌었어요.</h2><p>호쿠토 반도체의 같은 사건을 이어서 봅니다.</p><div class="follow-mini"><div><time>10.13</time><strong>공급 협의</strong><small>금액·납기 미확정</small></div><div><time>10.16</time><strong>계약 체결</strong><small>42억 엔 · 이익 영향 미확인</small></div></div>${stockButton('DEMO-A','후속 기록 보기','history')}</section><section class="room-paper room-reading"><h3>기사 다음에는 어디로?</h3><ul class="reading-list"><li><b>직접 연결</b><span>해당 회사의 분석과 기록</span></li><li><b>업종 참고</b><span>테마 뉴스에서 흐름 확인</span></li><li><b>분석 대기</b><span>연결 근거가 확보될 때까지 대기</span></li></ul>${roomButton('themes','테마별로 모아보기')}</section></aside></div>`;
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
      return `<div class="room-two-column"><section class="room-paper"><div class="room-paper-heading"><div><h2>테마 순위</h2><p>20거래일 등락률 기준 · 가상 6개 테마</p></div>${badge('10.16 종가','gray')}</div><div class="research-columns"><span>테마 / 이전 순위</span><span>20일 등락률</span><span>돈몰림 20일</span></div>${topics.map(x=>`<button class="research-row ${x.id===t.id?'selected':''}" data-topic="${x.id}" aria-pressed="${x.id===t.id}"><span class="rank-number">${x.rank}</span><span><strong>${x.name}</strong><small>${x.previous}위 → ${x.rank}위</small></span><span class="${colorClass(x.return20)}">${signed(x.return20)}</span><span>${x.money20.toFixed(1)}배</span></button>`).join('')}${note('뉴스 건수와 돈몰림은 다른 숫자입니다. 테마 순위를 종목의 매수 판정으로 바꾸지 않습니다.')}</section><aside class="room-aside"><section class="room-paper room-reading"><span class="eyebrow">SELECTED THEME</span><h2>${t.name}</h2><div class="room-metrics"><div><small>20일 돈몰림</small><strong>${t.money20.toFixed(1)}<em>배</em></strong></div><div><small>60일 돈몰림</small><strong>${t.money60.toFixed(1)}<em>배</em></strong></div></div><p>${t.copy}</p><h3 class="room-small-heading">함께 볼 종목</h3>${t.stockIds.map(id=>`<div class="research-stock">${stockIdentity(stock(id))}${stockButton(id,'분석과 기록 보기')}</div>`).join('')}<button class="room-text-link" data-theme-news="${t.id}">이 테마의 뉴스 보기 <span>→</span></button></section><section class="room-paper room-reading"><h3>다음으로</h3><p>종목을 고를 때는 테마뿐 아니라 선정 조건과 실적 근거도 확인합니다.</p>${roomButton('strategy','전략실에서 후보 조건 보기')}</section></aside></div>`;
    }
    // The remaining rooms share this same shell and stock fixture.
    function decisionButton(s){
      return decisionIds.includes(s.id)?`<button class="room-text-link" data-decision-stock="${s.id}">이 종목의 결정실 판정 <span>→</span></button>`:`<span class="route-unavailable">${s.group==='held'?'결정실 입력 없음 · 보유 점검은 별도':'선정 자료 미확인 · 결정실 입력 없음'}</span>`;
    }
    function tradingAction(s){
      if(s.group==='held')return `<button data-trading-stock="${s.id}">내 주식에서 보유 점검 <span>→</span></button>`;
      if(s.decision==='매수대상'&&newbuyIds.includes(s.id))return `<button data-trading-stock="${s.id}">신규매수에서 가격 확인 <span>→</span></button>`;
      return `<span class="route-unavailable">${s.decision==='매수대상'?'신규매수 카드 없음':s.decision+' · 타이밍 확인 대상 아님'}</span>`;
    }
    function meeting(){
      const current=topic(get().topic),stars=topics.filter(t=>themeStates[t.id].kind==='star'),arrows=topics.filter(t=>themeStates[t.id].kind==='arrow');
      return `<section class="meeting-summary"><div><span class="eyebrow">리서치센터 요약</span><h2>어느 테마가 강해졌나요?</h2><p>전체 흐름을 먼저 읽고, 작전실에서 관찰 대상을 확인합니다.</p></div><span class="fixture-chip">10.16 기준 · 가상 예시</span></section><div class="research-totals">${[['★','주도 테마',stars.length],['↗','돈몰림 관찰',arrows.length],['▤','표시한 테마',topics.length]].map(([symbol,label,n])=>`<div><span>${symbol}</span><small>${label}</small><strong>${n}<em>개</em></strong></div>`).join('')}</div><section class="room-paper room-reading"><div class="section-headline"><div><h2>테마 전체 흐름</h2><p>설명용 6개만 표시 · 운영의 전체 테마 수나 통과 건수가 아닙니다.</p></div></div><div class="meeting-table-scroll" tabindex="0" aria-label="테마 순위와 20일·60일 수익률, 돈몰림. 좁은 화면에서 가로 이동"><table class="meeting-table"><thead><tr><th>테마</th><th>20일</th><th>60일</th><th>주도·관찰</th><th>돈몰림</th><th>종목</th></tr></thead><tbody>${topics.map(t=>{const f=themeStates[t.id];return `<tr class="${t.id===current.id?'selected':''}"><td><button data-flow-topic="${t.id}" aria-pressed="${t.id===current.id}"><span class="topic-dot ${t.tone}"></span>${t.name}</button></td><td class="${colorClass(t.return20)}">${signed(t.return20)}</td><td class="${colorClass(f.return60)}">${signed(f.return60)}</td><td>${badge(f.label,f.kind==='star'?'teal':f.kind==='arrow'?'amber':'gray')}</td><td>${t.money20.toFixed(2)}배</td><td>${t.stockIds.length}</td></tr>`;}).join('')}</tbody></table></div><div class="selected-theme-note"><span>선택한 테마</span><strong>${current.name}</strong><small>${themeStates[current.id].previous} → ${themeStates[current.id].label}${themeStates[current.id].converted?' · 새 주도전환':''}</small></div>${note('별표·화살표와 돈몰림은 테마를 읽는 자료입니다. 개별 회사의 최종 판정은 뒤의 결정실에서 확인합니다.')}</section>`;
    }
    function operations(){
      const state=get(),current=topic(state.topic);
      const items=topics.filter(t=>state.section==='all'||themeStates[t.id].kind===state.section||state.section==='converted'&&themeStates[t.id].converted);
      return `<section class="room-paper room-reading"><div class="section-headline"><div><h2>어떤 테마가 주도·관찰 대상인가요?</h2><p>회의실과 같은 가상 자료 · 주도전환을 따로 확인합니다.</p></div></div>${chips([['all','전체 예시'],['star','★ 주도 3'],['arrow','↗ 관찰 1'],['converted','새 전환 1']],state.section,'data-room-filter','테마 상태')}<div class="operation-grid">${items.map(t=>{const f=themeStates[t.id],candidateCount=candidateIds.filter(id=>t.stockIds.includes(id)&&lanes[id].length).length;return `<article class="operation-card ${t.id===current.id?'selected':''}"><div><span class="topic-dot ${t.tone}"></span><h3>${t.name}</h3>${badge(f.label,f.kind==='star'?'teal':f.kind==='arrow'?'amber':'gray')}</div><p>${f.previous} → ${f.label}${f.converted?' · 새 주도전환':' · 상태 유지'}</p><dl><div><dt>20일 흐름</dt><dd>${signed(t.return20)}</dd></div><div><dt>돈몰림</dt><dd>${t.money20.toFixed(2)}배</dd></div><div><dt>조건 충족 후보</dt><dd>${candidateCount}개 · 예시</dd></div></dl><button class="room-text-link" data-strategy-topic="${t.id}">이 테마의 전략실 후보 <span>→</span></button></article>`;}).join('')}</div>${!items.length?empty('해당 상태의 테마가 없습니다','가상 예시에 없는 상태입니다.'):''}${note('주도·관찰 테마의 분류를 확인하는 단계입니다. 테마 전략의 대상과 개별 종목의 매수대상은 같은 판정이 아닙니다. 운영 D는 별도로 넓힌 테마 범위에서도 후보를 찾습니다.')}</section>`;
    }
    function flowSelection(){
      const id=get().flowTopic;
      return id?`<div class="flow-selection"><span>이어 보는 테마 <strong>${topic(id).name}</strong></span><button data-clear-flow-topic>전체 후보 보기</button></div>`:'';
    }
    function strategy(){
      const state=get(),cohort=candidateIds.map(stock).filter(s=>!state.flowTopic||topic(state.flowTopic).stockIds.includes(s.id));
      const items=cohort.filter(s=>state.section==='all'||lanes[s.id].includes(state.section));
      const reasons={A:'가격 회복 조건',B:'테마 안 주도 종목 조건',C:'차선 후보 조건',D:'거래량 폭증·가격 정체 · 독립 근거'};
      return flowSelection()+`<section class="room-paper room-reading"><div class="section-headline"><div><h2>후보 조건 확인</h2><p>선정 조건 충족 ${cohort.filter(s=>lanes[s.id].length).length}개 · 자료 확인 필요 ${cohort.filter(s=>!lanes[s.id].length).length}개 · 가상</p></div></div>${chips([['all','전체 '+cohort.length],...['A','B','C','D'].map(l=>[l,l+' 레인 '+cohort.filter(s=>lanes[s.id].includes(l)).length])],state.section,'data-room-filter','후보 레인')}<div class="manager-grid">${items.map(s=>`<article class="manager-card ${state.item===s.id?'is-focused':''}" data-focus-item="${s.id}" tabindex="-1">${stockIdentity(s)}<div class="candidate-lanes">${lanes[s.id].length?lanes[s.id].map(l=>badge(l+' 조건 충족','blue')).join(' '):badge('선정 자료 미확인','gray')}</div><p class="candidate-reason">${lanes[s.id].length?lanes[s.id].map(l=>reasons[l]).join(' / '):'어떤 선정 조건을 충족했는지 아직 확인하지 못했습니다.'}</p><p class="candidate-stage-note">${s.group==='held'?'이미 보유 중 · 이후 보유관리로 연결':'후보 선정 단계 · 최종 매수 판정 전'}</p><button class="room-text-link" data-verify-stock="${s.id}">이 회사의 실적 검증 <span>→</span></button></article>`).join('')}</div>${!items.length?empty('해당 조건의 후보 예시가 없습니다','다른 테마의 회사로 바꿔 보여주지 않습니다. 전체 후보에서 살펴볼 수 있습니다.'):''}${note('여러 레인을 충족해도 종목은 한 번만 셉니다. A/B/C 종목과 운영 D 대표가 결정실로 이어지며, EPS 확인 화면에서 새로 탈락시키지 않습니다.')}</section>`;
    }
    function verification(){
      const state=get(),cohort=candidateIds.map(stock).filter(s=>!state.flowTopic||topic(state.flowTopic).stockIds.includes(s.id));
      const s=state.item?cohort.find(s=>s.id===state.item):cohort[0];
      if(!s)return flowSelection()+`<section class="room-paper room-reading">${empty('이 범위의 회사 자료가 없습니다','선택한 테마·종목을 확인하거나 전체 후보를 보세요.')}${roomButton('strategy','전략실로 돌아가기')}</section>`;
      const c=companyChecks[s.id],fmt=v=>v==null?'확인 필요':priceText(v)+'엔';
      return flowSelection()+`<div class="theme-workspace"><section class="room-paper theme-index"><div class="room-paper-heading"><div><h2>확인할 회사</h2><p>전략실에서 이어진 후보 · 가상</p></div></div>${cohort.map(x=>`<button class="trade-select ${x.id===s.id?'selected':''}" data-room-item="${x.id}" aria-pressed="${x.id===s.id}">${stockIdentity(x)}<small>${companyChecks[x.id].status}</small></button>`).join('')}</section><section class="room-paper room-reading" data-focus-item="${s.id}" tabindex="-1"><div class="decision-file-head">${stockIdentity(s)}${badge(c.status,c.status==='개선'?'teal':'gray')}</div><p class="verification-lead">${c.reason}</p><div class="eps-comparison"><div><small>최근 확정 연간 EPS</small><strong>${fmt(c.eps)}</strong></div><span aria-hidden="true">→</span><div><small>회사 전망 EPS</small><strong>${fmt(c.forecast)}</strong></div></div><p class="room-meta">EPS는 주식 한 주당 이익 · 회사 자료 ${c.at||'미확인'} · 가상 값</p><dl class="room-dl"><div><dt>전략실 선정 조건</dt><dd>${lanes[s.id].join(' · ')||'확인 필요'}</dd></div><div><dt>자료 상태</dt><dd>${c.forecast==null?'회사 전망 확인 필요':'회사 전망 확인'}</dd></div><div><dt>아직 확인할 것</dt><dd>${latest(s).next}</dd></div></dl><div class="verification-result"><span>이 화면의 역할</span><p>회사의 실적과 근거를 확인합니다. EPS 상태를 새 통과·탈락 조건으로 쓰지 않습니다.</p></div><div class="candidate-actions">${decisionButton(s)}${stockButton(s.id,'분석과 당시 입력 자료')}</div>${note('실적 개선만으로 매수대상으로 확정하지 않습니다. 결정실에서 시장행동·실적·촉매·반대근거를 함께 봅니다.')}</section></div>`;
    }
    function morningObservation(s){
      const received=get().section==='intraday';
      return `<section class="morning-observation"><div class="section-headline"><div><h3>다음 거래일 아침·장중 확인</h3><p>대상일 2026.10.19 · 가상 화면 상태</p></div>${badge('실시간 아님','amber')}</div><div class="quote-examples" role="group" aria-label="가상 가격 수신 상태"><button data-quote-view="waiting" aria-pressed="${!received}">개장 전 예시</button><button data-quote-view="intraday" aria-pressed="${received}">장중 수신 예시</button></div><dl class="observation-values"><div><dt>전 거래일 기준 종가 · 10.16</dt><dd>${priceText(s.price)}엔</dd></div><div><dt>다음 거래일 시가 · 10.19</dt><dd>${received?'6,160엔':'아직 수신 전'}</dd></div><div><dt>장중 지연 시세 · 1분봉 종가</dt><dd>${received?'6,180엔':'아직 수신 전'}</dd></div><div><dt>가격 기준 시각</dt><dd>${received?'10.19 09:10':'—'}</dd></div><div><dt>마지막 수신 시각</dt><dd>${received?'10.19 09:30':'—'}</dd></div></dl><p class="observation-conclusion">${received?'가격 수신 예시입니다. 10.16 기준 새 회복·돌파 신호 없음은 그대로이며, 가격 수신만으로 진입 신호를 만들지 않습니다.':'현재 예시는 개장 전입니다. 가격이 없으므로 통과·실패로 표시하지 않습니다.'}</p><small>시가·장중값·시각은 모두 가상입니다. 실제 운영 가격은 Yahoo 지연 관측이며 가격 시각과 수신 시각을 함께 봅니다.</small></section>`;
    }
    function decisions(){
      const state=get(),all=decisionIds.map(stock),items=all.filter(s=>state.section==='all'||s.decision===state.section);
      const counts=[['all',all.length,'gray'],...['매수대상','보류','제외'].map(label=>[label,all.filter(s=>s.decision===label).length,label==='매수대상'?'teal':'gray'])];
      return `<div class="decision-overview">${counts.map(([label,n,tone])=>`<button class="decision-total ${tone}" data-room-filter="${label}" aria-pressed="${state.section===label}"><span>${label==='all'?'전체':label}</span><strong>${n}<small>종목</small></strong></button>`).join('')}</div><section class="room-paper room-reading"><div class="section-headline"><div><h2>판정과 그 이유</h2><p>10.16 기준 · 3종목 · 보유 중인 매수대상 1종목 포함</p></div></div>${items.length?`<div class="decision-stack">${items.map(s=>`<article class="decision-file ${state.item===s.id?'is-focused':''}" data-focus-item="${s.id}" tabindex="-1"><div class="decision-file-head">${stockIdentity(s)}${badge(s.decision,s.decision==='매수대상'?'teal':'gray')}</div><p class="decision-reason">${s.group==='held'?'기존 결정실 판정은 매수대상이며 이미 보유 중입니다. 최신 보유 점검은 정상이고, 새 경고는 없습니다.':latest(s).summary}</p><div class="decision-next"><b>다음 확인</b><span>${latest(s).next}</span></div><div class="decision-actions"><button class="room-text-link" data-verify-stock="${s.id}">이 회사의 실적 확인 <span>←</span></button>${stockButton(s.id,'네 가지 근거와 기록')}${tradingAction(s)}</div></article>`).join('')}</div>`:empty('해당 판정의 종목이 없습니다','이 예시의 제외 판정은 0건입니다.')}${note('보류·제외는 신규매수 타이밍 확인 대상이 아닙니다. 매수대상도 가격 확인이 별도로 필요합니다.')}</section>`;
    }
    function trading(){
      const state=get(),isHoldings=state.room==='holdings';
      const choices=stocks.filter(s=>isHoldings?s.group==='held':newbuyIds.includes(s.id)&&s.group!=='held'&&s.decision==='매수대상');
      const s=state.item?choices.find(s=>s.id===state.item):choices[0];
      if(!s){const requested=stock(state.item);return `<section class="room-paper room-reading">${empty(isHoldings?'보유 목록에 없는 종목입니다':'이 종목의 신규매수 카드가 없습니다',requested?requested.name+' · '+requested.decision:'목록에서 종목을 다시 선택해 주세요.')}${requested?decisionButton(requested):''}${roomButton(isHoldings?'holdings':'newbuy','목록으로 돌아가기')}</section>`;}
      const linkedNews=articles.find(a=>a.stock===s.id&&a.kind==='direct');
      return `<div class="theme-workspace"><section class="room-paper theme-index"><div class="room-paper-heading"><div><h2>${isHoldings?'보유 목록':'가격 확인 대상'} <span class="list-size">${choices.length}종목</span></h2><p>${isHoldings?'결정실 포함 여부와 별개로 점검':'매수대상 중 신규매수 카드가 있는 종목'}</p></div></div>${choices.map(x=>`<button class="trade-select ${x.id===s.id?'selected':''}" data-room-item="${x.id}" aria-pressed="${x.id===s.id}">${stockIdentity(x)}<small>${isHoldings?badge('보유 점검 '+x.badge,x.tone):'가격 확인'}</small></button>`).join('')}</section><section class="room-paper room-reading" data-focus-item="${s.id}" tabindex="-1">${isHoldings?'<p class="selected-detail-label">선택한 종목 상세</p>':''}<div class="decision-file-head">${stockIdentity(s)}${isHoldings?statusChips(s):badge(s.decision,'teal')}</div>${isHoldings?`<div class="holding-change"><small>직전 기록과 달라진 점</small><p>${latest(s).change}</p></div>`:''}<div class="trade-price"><strong>${priceText(s.price)}${s.price==null?'':'<small>엔</small>'}</strong><span class="${colorClass(s.change)}">${signed(s.change)}</span></div><p class="room-meta">2026.10.16 종가 · 실시간 가격 아님 · 가상</p><div class="chart-container">${bigChart(s,'room-chart-fill')}</div><div class="trade-state"><span>${icon('clock')}</span><div><small>${isHoldings?'보유 중인 종목':'신규 진입 확인'}</small><h3>${isHoldings?'보유 상태와 새 경고를 확인해요':'아직 진입 신호가 없습니다'}</h3><p>${isHoldings?latest(s).next:'다음 가격 확인에서 회복·돌파 조건을 봅니다. 매수대상 선정만으로 지금 진입할 수 있는 것은 아닙니다.'}</p></div></div><dl class="room-dl"><div><dt>결정실 판정</dt><dd>${s.decision}</dd></div><div><dt>타이밍</dt><dd>${s.timing}</dd></div><div><dt>계좌·체결</dt><dd>시안에 연결하지 않음</dd></div></dl>${isHoldings?'':morningObservation(s)}<div class="same-stock-links"><span>이 종목 이어보기</span>${isHoldings?decisionButton(s):''}${linkedNews?`<button class="room-text-link" data-stock-news="${s.id}">이 종목의 연결 뉴스 <span>→</span></button>`:'<small>직접 연결 뉴스 없음 · 예시</small>'}${stockButton(s.id,'종목 분석과 당시 기록')}</div>${note(isHoldings?'결정실에 없어도 보유 점검은 계속됩니다. 실제 주문·체결 기능은 없습니다.':'이 화면은 가격을 확인하는 곳입니다. 실제 주문·체결 기능은 없습니다.')}</section></div>`;
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
    const renderers={meeting,ops:operations,strategy,recommend:verification,news,themes,research,decision:decisions,holdings:trading,newbuy:trading,signals,records,park:changes};
    function render(){
      const state=get(),isMenu=state.view==='menu';
      const m=menu(state.room);
      document.querySelector('#explore-view').innerHTML=isMenu?directory():context()+(renderers[m.id]||bridge)()+continuation();
      document.querySelector('#page-heading h1').textContent=isMenu?'호쿠토 전체 메뉴':m.name;
      document.querySelector('#page-heading p').textContent=isMenu?'새 후보는 위의 여섯 단계로, 보유·뉴스·성과는 아래에서.':m.lead;
      document.querySelector('#page-heading .eyebrow').textContent=isMenu?'전체 기능':m.group==='preview'?'기록과 결과':m.owner||'호쿠토';
      document.title=`${isMenu?'전체 메뉴':m.name} · 호쿠토증권 디자인 v2.0`;
    }
    function onClick(b){
      if(b.hasAttribute('data-connect-settings')){connectionDialog();return true;}
      if(b.hasAttribute('data-connect-source')){connectionDialog(b.dataset.connectSource);return true;}
      if(b.hasAttribute('data-save-connection')){saveConnection();return true;}
      if(b.dataset.alertRoom){navigate(b.dataset.alertRoom,{item:b.dataset.alertItem||'',...(b.dataset.alertRoom==='news'?{newsMode:'analysis'}:{})});return true;}
      if(b.hasAttribute('data-menu-home')){route({view:'menu',detail:false,from:'',menuQuery:''});window.scrollTo({top:0});return true;}
      if(b.dataset.flowStage){stageNavigate(b.dataset.flowStage);return true;}
      if(b.dataset.flowNext){const t=get().flowTopic||get().topic;stageNavigate(b.dataset.flowNext,{flowTopic:['ops','strategy'].includes(b.dataset.flowNext)?t:get().flowTopic});return true;}
      if(b.dataset.flowTopic){route({topic:b.dataset.flowTopic,flowTopic:b.dataset.flowTopic,item:''},true);return true;}
      if(b.dataset.strategyTopic){stageNavigate('strategy',{topic:b.dataset.strategyTopic,flowTopic:b.dataset.strategyTopic,item:''});return true;}
      if(b.hasAttribute('data-clear-flow-topic')){route({flowTopic:'',section:'all'},true);return true;}
      if(b.dataset.verifyStock){const s=stock(b.dataset.verifyStock),t=topics.find(t=>t.stockIds.includes(s?.id));navigate('recommend',{item:s?.id||'',topic:t?.id||get().topic,flowTopic:t?.id||''});return true;}
      if(b.dataset.quoteView){route({section:b.dataset.quoteView},true);return true;}
      if(b.dataset.room){navigate(b.dataset.room);return true;}
      if(b.dataset.roomFilter){route({section:b.dataset.roomFilter},true);return true;}
      if(b.dataset.topic){route({topic:b.dataset.topic},true);return true;}
      if(b.dataset.article){showArticle(b.dataset.article);return true;}
      if(b.dataset.headline){navigate('news',{item:b.dataset.headline});document.querySelector('[data-article="'+b.dataset.headline+'"]')?.focus({preventScroll:true});showArticle(b.dataset.headline);return true;}
      if(b.dataset.newsMode){route({newsMode:b.dataset.newsMode},true);return true;}
      if(b.hasAttribute('data-news-reset')){route({section:'all',newsQuery:'',newsCountry:'all',item:''},true);return true;}
      if(b.dataset.articleTopic){document.querySelector('#evidence-dialog').close();navigate('themes',{topic:b.dataset.articleTopic});return true;}
      if(b.dataset.roomItem){route({item:b.dataset.roomItem},true);return true;}
      if(b.dataset.themeResearch){navigate('research',{topic:b.dataset.themeResearch});return true;}
      if(b.dataset.themeNews){navigate('themes',{topic:b.dataset.themeNews});return true;}
      if(b.dataset.decisionStock){if(decisionIds.includes(b.dataset.decisionStock))stageNavigate('decision',{item:b.dataset.decisionStock});return true;}
      if(b.dataset.stockNews){const article=articles.find(a=>a.stock===b.dataset.stockNews&&a.kind==='direct');if(article)navigate('news',{item:article.id,newsMode:'analysis'});return true;}
      if(b.dataset.tradingStock){const s=stock(b.dataset.tradingStock);if(s?.group==='held')navigate('holdings',{item:s.id});else if(s?.decision==='매수대상'&&newbuyIds.includes(s.id))stageNavigate('newbuy',{item:s.id});return true;}
      if(b.dataset.roomStock||b.dataset.recordStock){
        const d=document.querySelector('#evidence-dialog');if(d.open)d.close();
        const id=b.dataset.roomStock||b.dataset.recordStock;
        selectStock(id,b.dataset.recordStock?'history':b.dataset.roomTab||'overview',{from:get().room,filter:'all',query:'',date:b.dataset.recordDate||''});return true;
      }
      if(b.id==='return-room'){api.returnToOrigin();return true;}
      return false;
    }
    return {render,navigate,onClick,catalog,menu,homeNews,resolve:links.resolve};
  }
  if(typeof window!=='undefined')window.HokutoRooms={create,catalog};
  if(typeof module!=='undefined')module.exports={catalog,topics,articles,lanes,candidateIds,decisionIds,newbuyIds,themeStates,companyChecks};
})();
