/* Original menu destinations; the private operating address stays in this browser. */
(() => {
  'use strict';
  const catalog = [
    {id:'news',name:'뉴스룸',alias:'뉴스',group:'original',icon:'news',copy:'기사 전체와 종목 연결 근거',lead:'새 소식과 회사의 연결을 확인합니다.',path:'news_board.html',tone:'teal',preview:true,related:['themes','research','decision']},
    {id:'themes',name:'테마뉴스',group:'original',icon:'layers',copy:'같은 테마의 소식을 모아보기',lead:'테마의 소식과 개별 회사의 영향을 나눠 읽습니다.',path:'theme_news.html',tone:'blue',preview:true,related:['news','research','themeLab']},
    {id:'research',name:'리서치',alias:'리서치센터',group:'original',icon:'compass',copy:'추천테마 · 순위 · 구성 종목',lead:'추천테마와 구성 종목을 확인하고 다음 화면으로 이어갑니다.',path:'hokuto_today.html',tone:'teal',preview:true,related:['themes','recommend','themeLab']},
    {id:'recommend',name:'추천',alias:'펀드매니저실 레인',group:'original',icon:'folder',copy:'선정 조건과 후보를 확인',lead:'후보의 선정 조건과 결정실 판정을 구분합니다.',path:'recommend.html',tone:'blue',preview:true,related:['research','themeLab','decision']},
    {id:'themeLab',name:'북두테마',group:'original',icon:'layers',copy:'기존 북두테마 상세 화면',lead:'추천과 별도로 있던 북두테마의 연결을 유지합니다.',path:'research_new.html',tone:'violet',preview:false,related:['research','recommend','decision']},
    {id:'decision',name:'결정실',group:'original',icon:'check',copy:'판정 · 이유 · 반대근거 · 다음 확인',lead:'판정을 읽고, 보유 관리 또는 신규매수로 이어갑니다.',path:'decision_room.html',tone:'teal',preview:true,related:['recommend','holdings','newbuy']},
    {id:'park',name:'사장실 · 놀이공원',alias:'하루 변화 오늘의 변화',group:'original',icon:'swap',copy:'전 거래일과 달라진 내용',lead:'사장실의 하루 변화와 기존 놀이공원 연결을 유지합니다.',path:'hokuto_fun.html',tone:'amber',preview:true,related:['research','news','decision']},
    {id:'signals',name:'BNF 신호',alias:'BNF 신호실',group:'original',icon:'pulse',copy:'별도 전략의 신호와 조건',lead:'BNF 신호를 결정실 판정과 구분해서 확인합니다.',path:'bnf_signal.html',tone:'violet',preview:true,related:['holdings','newbuy','decision']},
    {id:'holdings',name:'보유주식 관리',alias:'내 주식 트레이딩룸',group:'original',icon:'wallet',copy:'이미 가진 종목의 상태와 경고',lead:'내 주식의 상태와 경고를 점검합니다.',path:'holdings_room.html',tone:'teal',preview:true,related:['news','decision','performance']},
    {id:'newbuy',name:'신규매수',alias:'신규 후보 트레이딩룸',group:'original',icon:'chart',copy:'새로 살 종목의 진입 조건',lead:'후보 선정 뒤, 실제 진입 조건을 따로 확인합니다.',path:'newbuy_room.html',tone:'blue',preview:true,related:['recommend','decision','selection']},
    {id:'performance',name:'성과기록',group:'original',icon:'book',copy:'기존 성과 기록과 평가 항목',lead:'선정성적과 합치지 않고 기존 성과기록으로 연결합니다.',path:'performance_room.html',tone:'teal',preview:false,related:['holdings','selection','records']},
    {id:'selection',name:'선정성적',group:'original',icon:'chart',copy:'선정 결과의 평가를 따로 확인',lead:'성과기록과 별개의 기존 선정 평가 화면입니다.',path:'selection_results.html',tone:'blue',preview:false,related:['decision','performance','scores']},
    {id:'today',name:'기존 오늘 화면',group:'entry',icon:'home',copy:'현재 사용하는 호쿠토의 첫 화면',lead:'새 알림 홈과 기존 오늘 화면의 입구를 구분합니다.',path:'ko/today.html',tone:'teal',preview:false,related:['holdings','decision','news']},
    {id:'office',name:'기존 사무실',alias:'옛 북두 사무실 호쿠토의 공간',group:'entry',icon:'home',copy:'익숙한 사무실과 전체 기능',lead:'기존 사무실 입구도 그대로 열 수 있습니다.',path:'hokuto_main.html',tone:'amber',preview:false,related:['today','news','decision']},
    {id:'records',name:'종목별 변화·기록',alias:'기록실',group:'preview',icon:'book',copy:'그날의 분석과 입력 자료를 함께',lead:'알림 홈에서 이어 보는 종목별 기록의 디자인 시안입니다.',tone:'teal',preview:true,related:['scores','performance','selection']},
    {id:'scores',name:'종목별 성적표',group:'preview',icon:'chart',copy:'분석한 회차와 이후 결과 연결',lead:'종목별 성적표 시안',tone:'blue',preview:true,related:['records','performance','selection']}
  ];
  const aliases={manager:'recommend',trading:'newbuy',space:'office'};
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
  const api={catalog,resolve,normaliseBase,destination};
  if(typeof window!=='undefined')window.HokutoLinks=api;
  if(typeof module!=='undefined')module.exports=api;
})();
