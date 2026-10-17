/* Original menu destinations; the private operating address stays in this browser. */
(() => {
  'use strict';
  const catalog = [
    {id:'news',name:'뉴스룸',alias:'뉴스',group:'original',icon:'news',copy:'기사 전체와 종목 연결 근거',lead:'새 소식과 회사의 연결을 확인합니다.',path:'news_board.html',tone:'teal',preview:true,related:['themes','research','decision']},
    {id:'themes',name:'테마뉴스',group:'original',icon:'layers',copy:'같은 테마의 소식을 모아보기',lead:'테마의 소식과 개별 회사의 영향을 나눠 읽습니다.',path:'theme_news.html',tone:'blue',preview:true,related:['news','research']},
    {id:'research',name:'리서치센터',legacy:'북두테마',alias:'리서치 TOP6',group:'original',icon:'compass',copy:'추천테마와 구성 종목 살펴보기',lead:'테마 순위와 구성 종목을 봅니다. 종목 판정은 결정실에서 확인합니다.',path:'research_new.html',tone:'teal',preview:true,related:['recommend','themes']},
    {id:'recommend',name:'펀드매니저실',legacy:'추천',alias:'종목검증실 레인',group:'original',icon:'folder',copy:'A·B·C·D 후보 선정 조건',lead:'어떤 조건으로 후보가 됐는지 확인하고, 같은 종목의 결정실 판정으로 이어갑니다.',path:'recommend.html',tone:'blue',preview:true,related:['research','decision']},
    {id:'ops',name:'작전실',alias:'옛 리서치 작전지도',group:'original',icon:'layers',copy:'테마 균등매수 전략의 설명',lead:'테마를 고르게 담는 전략의 설명입니다. 개별 종목의 매수·보류 판정은 결정실에서 확인합니다.',path:'hokuto_today.html',tone:'violet',preview:false,related:['research','decision']},
    {id:'decision',name:'결정실',group:'original',icon:'check',copy:'매수대상·보류·제외와 그 근거',lead:'왜 이런 판정이 나왔는지 읽고, 해당 종목의 보유 관리나 가격 확인으로 이어갑니다.',path:'decision_room.html',tone:'teal',preview:true,related:['recommend','performance']},
    {id:'park',name:'사장실 · 놀이공원',alias:'하루 변화 오늘의 변화',group:'original',icon:'swap',copy:'전 거래일과 달라진 내용',lead:'테마와 종목이 이전 기록에서 무엇이 달라졌는지 확인합니다.',path:'hokuto_fun.html',tone:'amber',preview:true,related:['research','news','decision']},
    {id:'signals',name:'BNF 신호실',alias:'BNF 신호',group:'original',icon:'pulse',copy:'독립 전략의 신호와 조건',lead:'BNF는 별도 전략입니다. 신호 충족이 결정실의 매수대상 선정을 뜻하지 않습니다.',path:'bnf_signal.html',tone:'violet',preview:true,related:['tradingGuide']},
    {id:'holdings',name:'내 주식',legacy:'보유주식 관리',alias:'보유 점검',group:'original',icon:'wallet',copy:'보유종목의 변화와 새 경고',lead:'결정실 목록에 없어도, 이미 보유한 종목의 점검은 계속됩니다.',path:'holdings_room.html',tone:'teal',preview:true,related:['news','performance']},
    {id:'newbuy',name:'신규매수',legacy:'트레이딩룸',alias:'진입 타이밍 가격',group:'original',icon:'chart',copy:'매수대상 종목의 가격·진입 조건',lead:'결정실에서 매수대상으로 본 종목의 가격을 확인합니다. 선정과 지금 매수할 시점은 별개입니다.',path:'newbuy_room.html',tone:'blue',preview:true,related:['decision','performance']},
    {id:'performance',name:'성과기록',alias:'기록 성과기록실',group:'original',icon:'book',copy:'각 판단이 나온 뒤의 결과',lead:'호쿠토의 판단 단계별 결과와 추적 기록을 확인하는 화면입니다.',path:'performance_room.html',tone:'teal',preview:false,related:['selection','records']},
    {id:'selection',name:'선정성적',alias:'선정 후 성적',group:'original',icon:'chart',copy:'선정한 종목의 20일 성적 비교',lead:'선정했던 종목을 당시 테마와 비교합니다. 같은 종목의 연속 선정을 매일 새 선정으로 세지 않습니다.',path:'selection_results.html',tone:'blue',preview:false,related:['performance','scores']},
    {id:'tradingGuide',name:'트레이딩 상황실',alias:'매매 규칙 기존 트레이딩룸',group:'original',icon:'file',copy:'주도 테마·BNF와 기존 규칙',lead:'주도 테마와 BNF 신호, 기존 매매 규칙을 살펴봅니다. 신규매수의 종목별 가격 확인과는 별도 화면입니다.',path:'trading_logic.html',tone:'amber',preview:false,related:['ops','signals']},
    {id:'today',name:'기존 오늘 화면',group:'entry',icon:'home',copy:'현재 사용하는 호쿠토의 첫 화면',lead:'새 알림 홈과 기존 오늘 화면의 입구를 구분합니다.',path:'ko/today.html',tone:'teal',preview:false,related:['holdings','decision','news']},
    {id:'office',name:'기존 사무실',alias:'옛 북두 사무실 호쿠토의 공간',group:'entry',icon:'home',copy:'익숙한 사무실과 전체 기능',lead:'기존 사무실 입구도 그대로 열 수 있습니다.',path:'hokuto_main.html',tone:'amber',preview:false,related:['today','news','decision']},
    {id:'records',name:'종목별 변화·기록',alias:'기록실',group:'preview',icon:'book',copy:'그날의 분석과 입력 자료를 함께',lead:'알림 홈에서 이어 보는 종목별 기록의 디자인 시안입니다.',tone:'teal',preview:true,related:['scores','performance','selection']},
    {id:'scores',name:'종목별 성적표',group:'preview',icon:'chart',copy:'분석한 회차와 이후 결과 연결',lead:'종목별 성적표 시안',tone:'blue',preview:true,related:['records','performance','selection']}
  ];
  const sections=[
    {id:'check',title:'내 종목과 판정',copy:'지금 확인해야 할 종목',icon:'wallet',items:['holdings','decision','newbuy']},
    {id:'discover',title:'뉴스와 후보',copy:'변화의 근거와 선정 조건',icon:'compass',items:['news','themes','research','recommend']},
    {id:'review',title:'변화와 성과',copy:'어제와 비교하고, 판단을 복기',icon:'book',items:['park','performance','selection']},
    {id:'strategy',title:'전략과 규칙',copy:'각 전략의 역할을 구분해서',icon:'layers',items:['ops','signals','tradingGuide']}
  ];
  const aliases={manager:'recommend',trading:'newbuy',space:'office',themeLab:'research'};
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
    if(item.group==='entry'&&address.pathname.endsWith('/ko/'))address.pathname=address.pathname.slice(0,-3);
    return new URL(item.path,address).href;
  }
  const api={catalog,sections,resolve,normaliseBase,destination};
  if(typeof window!=='undefined')window.HokutoLinks=api;
  if(typeof module!=='undefined')module.exports=api;
})();
