// Display-contract checks. Runs with Node only; never calls the operating system.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const file=path.join(__dirname,'../daily-demo.js');
let source=fs.readFileSync(file,'utf8').split("document.addEventListener('click'")[0];
source+='globalThis.fixture={stocks,decisions,themes,candidateIds,prices,stockPrices,selectedThemes,home,research,researchTheme,manager,decisionList,decisionDetail,sourceDetail,laneDetail,recordDetail,chart,trading,holdings,news,article,themesPage,themeDetail,park,records,allrooms,space,generic,overview,stockNav,stockRoute,back,allThemes,historyDetail,bnfDetail,bnfExamples,articleRoute,dataNotice,configuredThemeNames,setScenario:v=>scenario=v,setState:v=>state=v,setSearch:(q,filter)=>{themeQuery=q;researchFilter=filter}};})();';
const ctx={URLSearchParams,location:{search:'',hash:''},document:{getElementById:()=>({})},history:{state:null}};
vm.createContext(ctx);vm.runInContext(source,ctx);const f=ctx.fixture;
const pages=new Map();
const add=(key,body)=>{assert.equal(typeof body,'string');assert(!/undefined|NaN|\[object Object\]/.test(body),key+' contains unresolved data');pages.set(key,body);};
for(const name of ['home','research','manager','decisionList','trading','holdings','news','themesPage','park','records','allrooms','space']){
  const route={home:'today',decisionList:'decision',themesPage:'themes',allrooms:'rooms'}[name]||name;add(route,f[name]());
}
for(const key of ['signals','performance','selection'])add(key,f.generic(key));
for(const t of f.themes){add('theme-'+t.id,f.themeDetail(t.id));add('research-theme-'+t.id,f.researchTheme(t.id));}
for(let i=1;i<=9;i++)add('article-'+i,f.article(i));
const stageFns={source:'sourceDetail',lane:'laneDetail',decision:'decisionDetail',chart:'chart',record:'recordDetail'};
add('all-themes',f.allThemes());add('history-a',f.historyDetail('decision'));for(const b of f.bnfExamples)add('bnf-'+b.id,f.bnfDetail(b.id));
for(const id of Object.keys(f.stocks))for(const [stage,fn] of Object.entries(stageFns)){
  const body=f[fn](id);add(stage+'-'+id,body);
  assert(body.includes('data-stock-code="'+f.stocks[id].code+'"'),stage+' loses stock code');
  assert(body.includes('2026-10-09'),stage+' loses as-of date');
  for(const target of Object.keys(stageFns))assert(body.includes('#'+target+'-'+id+'?theme='),stage+' loses same-stock navigation');
}
for(const [key,body] of pages)for(const match of body.matchAll(/href="#([^"?]+)/g)){
  assert(pages.has(match[1]),key+' links to unknown screen '+match[1]);
}
assert.equal(f.themes.filter(t=>t.rank<=6).length,6);
assert(f.themes.filter(t=>t.rank<=6).every(t=>t.stocks.length),'TOP6 constituent examples incomplete');
assert(!pages.get('research').includes('TOP6 종목'));
assert(pages.get('research').includes('20일')&&pages.get('research').includes('60일'));
assert(pages.get('themes').includes('최근 24시간')&&pages.get('themes').includes('별도 개발'));
assert.equal((pages.get('news').match(/class="headline"/g)||[]).length,9,'full news titles lost');
assert.equal((pages.get('decision-c').match(/<h3>심사 전<\/h3>/g)||[]).length,4,'not-input must not inherit reviewed evidence');
assert(pages.get('decision-e').includes('제외')&&!pages.get('decision-e').includes('<h3>심사 전</h3>'));
assert(pages.get('decision-h').includes('이미 보유 중 · 보유관리로'));
assert(pages.get('chart-h').includes('보유 후 새 확인 사항'));
assert(pages.get('chart-a').includes('새 회복·돌파 신호 없음'));
assert(pages.get('chart-d').includes('돌파 신호 확인 · 계좌 확인 필요'));
assert(f.stockPrices('d')[59].close>Math.max(...f.stockPrices('d').slice(39,59).map(p=>p.close)));
assert(pages.get('chart-d').includes('미확인')&&pages.get('chart-d').includes('100주 참고금액'));
for(const id of ['b','c','e'])assert(pages.get('chart-'+id).includes('신규매수 타이밍 판정 대상 아님'));
assert(pages.get('performance').includes('1306 ETF'));
assert(pages.get('selection').includes('같은 테마 구성 종목 동일비중'));
assert(!pages.get('performance').includes('data-stock="c"'),'unreviewed observation must not enter decision performance');
assert(!pages.get('selection').includes('data-stock="h"'),'nonrepresentative must not enter selection assessment');
assert(pages.get('signals').includes('확인 불가'),'unconnected signal is not zero signals');
f.selectedThemes.a='material';
assert(f.sourceDetail('a').includes('반도체 소재'));
for(const stage of Object.keys(stageFns))assert(f.stockNav('a',stage).includes(stage+'-a?theme=material&asof=2026-10-09'));
ctx.history.state={hokuto:true,from:'research'};assert(f.back('themes','목록').includes('href="#research" data-history-back'));
ctx.history.state={hokuto:true,from:'decision?filter=hold'};assert(f.back('today','목록').includes('href="#decision?filter=hold"'));
const home=pages.get('today');assert(home.indexOf('작은 북두 안내도')<home.indexOf('home-news'));assert(home.indexOf('내 주식 · 확인 필요')<home.indexOf('home-news'));
const plan=fs.readFileSync(path.join(__dirname,'../plan.html'),'utf8');
assert.equal((plan.match(/class="upgrade-number"/g)||[]).length,6);
for(const m of plan.matchAll(/data-preview-view="([^"]+)"/g))assert(pages.has(m[1].split('?')[0]),'unknown review target '+m[1]);
assert(plan.includes('value="1280"'),'desktop review control missing');
if(process.env.HOKUTO_RENDER_AUDIT_DIR){fs.mkdirSync(process.env.HOKUTO_RENDER_AUDIT_DIR,{recursive:true});for(const [key,body] of pages)fs.writeFileSync(path.join(process.env.HOKUTO_RENDER_AUDIT_DIR,key+'.html'),body);}
assert.equal(f.themes.length,28);assert.equal(new Set(f.themes.map(t=>t.rank)).size,28);
assert(f.themes.every(t=>f.configuredThemeNames.includes(t.name)&&t.stocks.length));
assert(pages.get('decision-e').includes('파산절차 개시'));assert(pages.get('decision-b').includes('실적 약화는 보류'));
assert.equal((pages.get('chart-h').match(/<span>(테마|실적|가격|뉴스|사장실 판단) ·/g)||[]).length,5);
for(const mode of ['ended','price-missing','overnight','boll-missing']){f.setScenario(mode);const h=f.chart('d');assert(h.includes('볼린저'));assert(h.includes({ended:'확인 기간 종료','price-missing':'기다림 · 가격 확인 필요',overnight:'아침 확인 · 매수 보류','boll-missing':'볼린저 계산 자료 부족'}[mode]));}
for(const mode of ['add','dip','sell','cooling']){f.setScenario(mode);assert(f.chart('h').includes({add:'100주 추가매수 검토',dip:'물타기 검토',sell:'매도 검토',cooling:'3거래일'}[mode]));}
f.setScenario('completed');assert(f.generic('performance').includes('+5.0%p'));assert(f.generic('selection').includes('+3.0%p'));f.setScenario('normal');
f.setSearch('우주','all');assert(f.allThemes().includes('검색 결과 1개'));f.setSearch('검색결과없음','all');assert(f.allThemes().includes('일치하는 테마가 없습니다'));f.setSearch('','outside');assert(f.allThemes().includes('검색 결과 22개'));f.setSearch('','all');
assert(f.articleRoute({id:1,company:'a',theme:'chip'}).includes('theme=material'));
for(const st of ['stale','partial','pending','error','loading']){f.setState(st);assert(f.dataNotice().includes('role="status"'));}f.setState('normal');assert.equal(f.dataNotice(),'');
for(const part of ['decision','source','chart','record']){const h=f.historyDetail(part);assert(h.includes('2026-09-08'));assert(!h.includes('판정 기준 2026-10-09'));}
console.log('PASS: '+pages.size+' display routes; stock/context links, decision states, holdings branch, prices, evaluation scopes, full titles and 6 completion steps, 28 themes, exception states, archive and outcome scopes.');
