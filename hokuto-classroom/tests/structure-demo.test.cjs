// Display-contract checks. Runs with Node only; never calls the operating system.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const file=path.join(__dirname,'../daily-demo.js');
let source=fs.readFileSync(file,'utf8').split("document.addEventListener('click'")[0];
source+='globalThis.fixture={stocks,decisions,themes,candidateIds,prices,stockPrices,selectedThemes,home,research,researchTheme,manager,decisionList,decisionDetail,sourceDetail,laneDetail,recordDetail,chart,trading,holdings,news,article,themesPage,themeDetail,park,records,allrooms,space,generic,overview,stockNav,stockRoute,back};})();';
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
for(const id of f.candidateIds)for(const [stage,fn] of Object.entries(stageFns)){
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
assert.equal((plan.match(/class="upgrade-number"/g)||[]).length,5);
for(const m of plan.matchAll(/data-preview-view="([^"]+)"/g))assert(pages.has(m[1]),'unknown review target '+m[1]);
assert(plan.includes('value="1280"'),'desktop review control missing');
if(process.env.HOKUTO_RENDER_AUDIT_DIR){fs.mkdirSync(process.env.HOKUTO_RENDER_AUDIT_DIR,{recursive:true});for(const [key,body] of pages)fs.writeFileSync(path.join(process.env.HOKUTO_RENDER_AUDIT_DIR,key+'.html'),body);}
console.log('PASS: '+pages.size+' display routes; stock/context links, decision states, holdings branch, prices, evaluation scopes, full titles and 5 review steps.');
