/* Original menu destinations; the private operating address stays in this browser. */
(() => {
  'use strict';
  const catalog = [
    {id:'meeting',name:'리서치 회의실',short:'회의실',owner:'리서치',group:'original',icon:'compass',copy:'전체 테마의 순위·강도·돈몰림 요약',lead:'리서치센터의 요약부터 읽습니다. 어느 테마가 강하고 어디로 돈이 모이는지 비교합니다.',path:'hokuto_main.html#room1',scope:'office',brief:'리서치센터의 ▶ 브리핑',tone:'teal',preview:true,related:['ops','research']},
    {id:'strategy',name:'펀드매니저 전략실',short:'전략실',owner:'펀드매니저',group:'original',icon:'folder',copy:'선정 조건을 충족한 후보와 그 이유',lead:'테마 안에서 어떤 회사가 선정 조건을 충족했는지 봅니다. 후보 선정과 최종 매수 판정은 다릅니다.',path:'hokuto_main.html#room2',scope:'office',brief:'펀드매니저실의 ▶ 브리핑',tone:'blue',preview:true,related:['recommend','ops']},
    {id:'news',name:'오늘 뉴스 · 뉴스룸',alias:'뉴스 전체 제목 속보',group:'original',icon:'news',copy:'전체 제목부터 기사·종목 근거까지',lead:'전체 제목을 훑고, 필요한 기사의 내용과 회사 연결 근거를 확인합니다.',path:'news_board.html',tone:'teal',preview:true,related:['themes','research','decision']},
    {id:'themes',name:'테마뉴스',group:'original',icon:'layers',copy:'같은 테마의 소식을 모아보기',lead:'테마의 소식과 개별 회사의 영향을 나눠 읽습니다.',path:'theme_news.html',tone:'blue',preview:true,related:['news','research']},
    {id:'research',name:'북두테마 상세',legacy:'리서치센터',alias:'리서치 TOP6',group:'original',icon:'compass',copy:'추천테마와 구성 종목의 자세한 자료',lead:'회의실 요약에서 더 살펴보고 싶은 테마의 상세 자료입니다.',path:'research_new.html',tone:'teal',preview:true,related:['meeting','themes']},
    {id:'recommend',name:'펀드매니저 종목검증실',short:'종목검증실',owner:'펀드매니저',legacy:'추천',alias:'펀드매니저실 EPS 실적',group:'original',icon:'check',copy:'후보 회사별 EPS·실적과 자료 확인',lead:'전략실이 고른 회사의 실적을 확인합니다. 여기서 새로 탈락시키지 않고, 결정실이 최종 판정합니다.',path:'recommend.html',tone:'blue',preview:true,related:['strategy','decision']},
    {id:'ops',name:'리서치 작전실',short:'작전실',owner:'리서치',alias:'작전지도 테마전략',group:'original',icon:'layers',copy:'주도·돈몰림·전환 테마 확인',lead:'회의실에서 본 테마 중 주도·관찰 대상으로 분류된 곳과 전환을 확인한 뒤, 종목 후보를 살펴봅니다.',path:'hokuto_today.html',tone:'teal',preview:true,related:['meeting','strategy']},
    {id:'decision',name:'결정실',group:'original',icon:'check',copy:'매수대상·보류·제외와 그 근거',lead:'왜 이런 판정이 나왔는지 읽고, 해당 종목의 보유 관리나 가격 확인으로 이어갑니다.',path:'decision_room.html',tone:'teal',preview:true,related:['recommend','performance']},
    {id:'park',name:'사장실 · 놀이공원',alias:'하루 변화 오늘의 변화',group:'original',icon:'swap',copy:'전 거래일과 달라진 내용',lead:'테마와 종목이 이전 기록에서 무엇이 달라졌는지 확인합니다.',path:'hokuto_fun.html',tone:'amber',preview:true,related:['research','news','decision']},
    {id:'signals',name:'BNF 신호실',alias:'BNF 신호',group:'original',icon:'pulse',copy:'독립 전략의 신호와 조건',lead:'BNF는 별도 전략입니다. 신호 충족이 결정실의 매수대상 선정을 뜻하지 않습니다.',path:'bnf_signal.html',tone:'violet',preview:true,related:['tradingGuide']},
    {id:'holdings',name:'내 주식',legacy:'보유주식 관리',alias:'보유 점검',group:'original',icon:'wallet',copy:'보유종목의 변화와 새 경고',lead:'결정실 목록에 없어도, 이미 보유한 종목의 점검은 계속됩니다.',path:'holdings_room.html',tone:'teal',preview:true,related:['news','performance']},
    {id:'newbuy',name:'신규매수실',short:'신규매수실',legacy:'트레이딩룸',alias:'진입 타이밍 가격 아침',group:'original',icon:'chart',copy:'다음 거래일 가격·차트·진입 조건',lead:'결정실 매수대상의 차트 기준과 다음 거래일 시가·장중 관측을 함께 확인합니다. 가격 기준 시각과 수신 시각을 구분합니다.',path:'newbuy_room.html',tone:'blue',preview:true,related:['decision','performance']},
    {id:'performance',name:'성과기록',alias:'기록 성과기록실',group:'original',icon:'book',copy:'각 판단이 나온 뒤의 결과',lead:'호쿠토의 판단 단계별 결과와 추적 기록을 확인하는 화면입니다.',path:'performance_room.html',tone:'teal',preview:false,related:['selection','records']},
    {id:'selection',name:'선정성적',alias:'선정 후 성적',group:'original',icon:'chart',copy:'선정한 종목의 20일 성적 비교',lead:'선정했던 종목을 당시 테마와 비교합니다. 같은 종목의 연속 선정을 매일 새 선정으로 세지 않습니다.',path:'selection_results.html',tone:'blue',preview:false,related:['performance','scores']},
    {id:'tradingGuide',name:'매매 전략·규칙',legacy:'기존 트레이딩룸',alias:'트레이딩 상황실 매매 규칙',group:'original',icon:'file',copy:'주도 테마·BNF·근접 후보와 매매 규칙',lead:'주도 테마와 BNF 신호, 기존 매매 규칙을 살펴봅니다. 신규매수의 종목별 가격 확인과는 별도 화면입니다.',path:'trading_logic.html',tone:'amber',preview:false,related:['ops','signals']},
    {id:'today',name:'기존 오늘 화면',group:'entry',icon:'home',copy:'현재 사용하는 호쿠토의 첫 화면',lead:'새 알림 홈과 기존 오늘 화면의 입구를 구분합니다.',path:'ko/today.html',tone:'teal',preview:false,related:['holdings','decision','news']},
    {id:'office',name:'기존 사무실',alias:'옛 북두 사무실 호쿠토의 공간',group:'entry',icon:'home',copy:'익숙한 사무실과 전체 기능',lead:'기존 사무실 입구도 그대로 열 수 있습니다.',path:'hokuto_main.html',tone:'amber',preview:false,related:['today','news','decision']},
    {id:'records',name:'종목별 변화·기록',alias:'기록실',group:'preview',icon:'book',copy:'그날의 분석과 입력 자료를 함께',lead:'알림 홈에서 이어 보는 종목별 기록의 디자인 시안입니다.',tone:'teal',preview:true,related:['scores','performance','selection']},
    {id:'scores',name:'종목별 성적표',group:'preview',icon:'chart',copy:'분석한 회차와 이후 결과 연결',lead:'종목별 성적표 시안',tone:'blue',preview:true,related:['records','performance','selection']}
  ];
  const workflow=['meeting','ops','strategy','recommend','decision','newbuy'];
  const sections=[
    {id:'check',title:'보유와 뉴스',copy:'이미 가진 종목과 새 소식',icon:'wallet',items:['holdings','news','themes']},
    {id:'review',title:'변화와 성과',copy:'이전 판단과 이후 결과',icon:'book',items:['park','performance','selection']},
    {id:'reference',title:'테마·전략 자료',copy:'상세 자료와 독립 전략',icon:'layers',items:['research','signals','tradingGuide']}
  ];
  const aliases={manager:'strategy',trading:'newbuy',space:'office',themeLab:'research'};
  const resolve=id=>aliases[id]||id;
  function normaliseBase(value){
    let url;
    try { url=new URL(String(value).trim()); } catch { throw new Error('사용 중인 호쿠토의 전체 주소를 붙여넣어 주세요.'); }
    if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw new Error('http 또는 https로 시작하는 화면 주소를 입력해 주세요.');
    const match=url.pathname.match(/^(.*\/hokuto)(?:\/|$)/);
    if(!match)throw new Error('호쿠토의 오늘 화면 또는 사무실 주소를 붙여넣어 주세요.');
    const korean=/^\/ko(?:\/|$)/.test(url.pathname.slice(match[1].length));
    url.pathname=match[1]+(korean?'/ko/':'/');url.search='';url.hash='';return url.href;
  }
  function destination(id,base){
    const item=catalog.find(m=>m.id===resolve(id));
    if(!item?.path)throw new Error('기존 화면 연결이 없는 시안입니다.');
    const address=new URL(normaliseBase(base));
    if((item.group==='entry'||item.scope==='office')&&address.pathname.endsWith('/ko/'))address.pathname=address.pathname.slice(0,-3);
    return new URL(item.path,address).href;
  }
  const api={catalog,sections,workflow,resolve,normaliseBase,destination};
  if(typeof window!=='undefined')window.HokutoLinks=api;
  if(typeof module!=='undefined')module.exports=api;
})();
