const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
// Browserless navigation checks; this does not validate visual layout.
const dir=path.resolve(__dirname,'..');
const {catalog,sections,resolve,normaliseBase,destination}=require(path.join(dir,'stock-links.js'));
const expected=['news_board.html','theme_news.html','research_new.html','recommend.html','hokuto_today.html','decision_room.html','hokuto_fun.html','bnf_signal.html','holdings_room.html','newbuy_room.html','performance_room.html','selection_results.html','trading_logic.html'];
assert.deepEqual(catalog.filter(m=>m.group==='original').map(m=>m.path),expected);
assert.equal(new Set(catalog.map(m=>m.id)).size,catalog.length);
const grouped=sections.flatMap(s=>s.items);
assert.equal(grouped.length,13);assert.equal(new Set(grouped).size,13);
assert.deepEqual([...grouped].sort(),catalog.filter(m=>m.group==='original').map(m=>m.id).sort());
assert.equal(destination('research','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/research_new.html');
assert.equal(destination('ops','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/hokuto_today.html');
assert.equal(destination('themeLab','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/research_new.html');
assert.equal(destination('tradingGuide','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/trading_logic.html');
for(const m of catalog)for(const id of m.related)assert(catalog.some(x=>x.id===id),id);
assert.equal(normaliseBase('https://example.test/hokuto/ko/today.html?v=12#abc'),'https://example.test/hokuto/ko/');
assert.equal(destination('today','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/today.html');
assert.equal(destination('office','https://example.test/hokuto/ko/'),'https://example.test/hokuto/hokuto_main.html');
assert.equal(destination('news','https://example.test/hokuto/ko/'),'https://example.test/hokuto/ko/news_board.html');
assert.equal(destination('news','https://example.test/hokuto/'),'https://example.test/hokuto/news_board.html');
assert.equal(normaliseBase('https://example.test/hokuto/hokuto_main.html'),'https://example.test/hokuto/');
for(const bad of ['javascript:alert(1)','https://u:p@example.test/hokuto/','https://example.test/elsewhere/','bad'])assert.throws(()=>normaliseBase(bad));
assert.equal(resolve('manager'),'recommend');assert.equal(resolve('space'),'office');
function app(initial='#view=menu',mobile=false,saved={}){
 const html=fs.readFileSync(path.join(dir,'stock-home.html'),'utf8');
 const listeners={},windowListeners={},nodes=new Map(),storage=new Map(Object.entries(saved));let ctx;
 const event=(table,name,ev)=>{for(const f of table[name]||[])f(ev)};
 class Node{
  constructor(selector=''){this.selector=selector;this.innerHTML='';this.hidden=false;this.attrs={};this.dataset={};this.id=selector.startsWith('#')?selector.slice(1):'';this.value='';this.open=false;this.tagName='DIV';this.isConnected=true;this.listeners={};const classes=new Set();this.classList={toggle:(v,on)=>{if(on===undefined)on=!classes.has(v);on?classes.add(v):classes.delete(v);return on},contains:v=>classes.has(v),add:v=>classes.add(v),remove:v=>classes.delete(v)};}
  setAttribute(k,v){this.attrs[k]=String(v)} getAttribute(k){return this.attrs[k]} hasAttribute(k){return Object.hasOwn(this.attrs,k)} removeAttribute(k){delete this.attrs[k]}
  addEventListener(k,f){(this.listeners[k]??=[]).push(f)}
  focus(){document.activeElement=this}scrollIntoView(){}getBoundingClientRect(){return{left:0,right:800,top:0,bottom:800}}
  showModal(){this.open=true}close(){this.open=false;event(this.listeners,'close',{})}
  closest(q){if(q==='button'&&this.tagName==='BUTTON')return this;if(q==='nav')return null;if(q==='[data-home-link]'&&this.hasAttribute('data-home-link'))return this;return null}
 }
 const document={title:'',body:new Node(),activeElement:new Node(),documentElement:new Node(),querySelector(q){if(!nodes.has(q))nodes.set(q,new Node(q));return nodes.get(q)},querySelectorAll(){return[]},addEventListener(k,f){(listeners[k]??=[]).push(f)}};
 let url=new URL('https://preview.test/hokuto-classroom/stock-home.html'+initial),index=0;
 const states=[{url:url.href,state:null}];
 const location={get href(){return url.href},get hash(){return url.hash}};
 const history={get state(){return states[index].state},scrollRestoration:'auto',replaceState(state,_,href){url=new URL(href,url);states[index]={url:url.href,state:structuredClone(state)}},pushState(state,_,href){url=new URL(href,url);states.splice(index+1);states.push({url:url.href,state:structuredClone(state)});index++},back(){if(index>0){index--;url=new URL(states[index].url);event(windowListeners,'popstate',{})}},forward(){if(index<states.length-1){index++;url=new URL(states[index].url);event(windowListeners,'popstate',{})}}};
 ctx={console,URL,URLSearchParams,document,history,location,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},scrollY:0,scrollTo:({top})=>{ctx.scrollY=top},requestAnimationFrame:f=>f(),matchMedia:()=>({matches:mobile}),addEventListener:(k,f)=>{(windowListeners[k]??=[]).push(f)},open:(...args)=>{ctx.opened.push(args)},opened:[]};ctx.window=ctx;
 vm.createContext(ctx);
 for(const f of ['stock-links.js','stock-rooms.js','stock-home.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx,{filename:f});
 const markup=(scope)=>scope?document.querySelector(scope).innerHTML:html+[...nodes.values()].map(x=>x.innerHTML).join('');
 function click(attr,value,scope){
  const found=[...markup(scope).matchAll(/<(button|a)\b([^>]*)>/g)].find(m=>{const re=new RegExp('(?:^|\\s)'+attr+'(?:="([^"]*)")?(?=\\s|$)');const a=m[2].match(re);return a&&(value===undefined||a[1]===value)});
  assert(found,`click target not rendered: ${attr}=${value}, ${scope}`);
  const b=new Node();b.tagName=found[1].toUpperCase();
  for(const m of found[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)){const[k,v]=[m[1],m[2]||''];b.attrs[k]=v;if(k==='id')b.id=v;if(k.startsWith('data-'))b.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;}
  event(listeners,'click',{target:b,preventDefault(){}});return b;
 }
 return {ctx,click,markup,input:(id,value)=>{const target=document.querySelector('#'+id);target.value=value;event(listeners,'input',{target})},state:()=>Object.fromEntries(new URLSearchParams(url.hash.slice(1))),node:q=>document.querySelector(q),storage};
}
for(const mobile of [false,true]){
 const a=app('#view=menu&room=news',mobile);
 assert.equal((a.markup('#explore-view').match(/class="original-menu-card"/g)||[]).length,13);
 assert(!a.markup('#explore-view').includes('자주 확인하는 곳'));
 const ids=[...a.markup('#explore-view').matchAll(/data-menu-id="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,13);
 for(const id of catalog.map(m=>m.id)){
  const entry=catalog.find(m=>m.id===id).group==='entry';
  const b=app(entry?'#view=room&room='+id:'#view=menu',mobile);if(!entry)b.click('data-room',id,'#explore-view');
  assert.equal(b.state().view,id==='scores'?'scores':'room');
  if(id!=='scores'){assert.equal(b.state().room,id);assert(!b.markup('#explore-view').includes('undefined'),id);}
 }
 const b=app('#view=home',mobile);
 for(const [id,item] of [['holdings','DEMO-B'],['decision','DEMO-E'],['news','contract']]){
  b.click('data-nav','home');b.click('data-alert-room',id,'#briefing');assert.equal(b.state().room,id);assert.equal(b.state().item,item);
 }
 const c=app('#view=room&room=news',mobile);c.click('data-room-filter','held','#explore-view');c.ctx.scrollY=525;
 c.click('data-article','contract','#explore-view');c.click('data-room-stock','DEMO-A','#dialog-content');
 assert.equal(c.state().from,'news');assert.equal(c.state().section,'held');
 c.click('data-tab','history','#stock-detail');c.click('data-date','2026-10-13','#stock-detail');
 c.click('id','return-room','#stock-detail');assert.equal(c.state().view,'room');assert.equal(c.state().room,'news');assert.equal(c.state().section,'held');assert.equal(c.ctx.scrollY,525);
 const d=app('#view=room&room=records',mobile);d.click('data-room-filter','2026-09-08','#explore-view');d.ctx.scrollY=310;
 const match=d.markup('#explore-view').match(/data-record-stock="([^"]+)"/);assert(match);
 d.click('data-record-stock',match[1],'#explore-view');assert.equal(d.state().date,'2026-09-08');d.click('data-tab','overview','#stock-detail');d.click('id','return-room','#stock-detail');assert.equal(d.state().section,'2026-09-08');assert.equal(d.ctx.scrollY,310);
 const e=app('#view=menu',mobile);e.ctx.scrollY=700;e.click('data-room','decision','#explore-view');assert.equal(e.state().room,'decision');e.click('id','journey-back','#journey-bar');assert.equal(e.state().view,'menu');assert.equal(e.ctx.scrollY,700);e.ctx.history.forward();assert.equal(e.state().room,'decision');
 const f=app('#view=scores',mobile);f.ctx.scrollY=250;f.click('data-score-stock','DEMO-A','#scores-view');assert.equal(f.state().from,'scores');f.click('id','return-room','#stock-detail');assert.equal(f.state().view,'scores');assert.equal(f.ctx.scrollY,250);
 const g=app('#view=menu',mobile);g.click('data-connect-source','performance','#explore-view');g.node('#operating-address').value='https://example.test/hokuto/ko/today.html?v=1';g.click('data-save-connection',undefined,'#dialog-content');
 assert.equal(g.ctx.opened[0][0],'https://example.test/hokuto/ko/performance_room.html');assert.equal(g.storage.get('hokuto-operating-base-v1'),'https://example.test/hokuto/ko/');assert(g.markup('#explore-view').includes('href="https://example.test/hokuto/ko/selection_results.html"'));assert(!g.markup('#explore-view').includes('DEMO-A&amp;'));
 const h=app('#view=room&room=manager',mobile);assert(h.markup('#explore-view').includes('후보 조건 확인'));
 h.click('data-room-filter','C','#explore-view');h.ctx.scrollY=290;h.click('data-decision-stock','DEMO-F','#explore-view');
 assert.equal(h.state().room,'decision');assert.equal(h.state().item,'DEMO-F');assert(!h.markup('#explore-view').includes('data-trading-stock="DEMO-F"'));
 h.click('id','journey-back','#journey-bar');assert.equal(h.state().room,'recommend');assert.equal(h.state().section,'C');assert.equal(h.ctx.scrollY,290);
 const i=app('#view=room&room=decision',mobile);
 assert(!i.markup('#explore-view').includes('data-focus-item="DEMO-G"'));
 i.click('data-trading-stock','DEMO-E','#explore-view');assert.equal(i.state().room,'newbuy');assert.equal(i.state().item,'DEMO-E');
 assert(i.markup('#explore-view').includes('data-room-item="DEMO-E"'));assert(!i.markup('#explore-view').includes('data-room-item="DEMO-F"'));
 i.click('data-decision-stock','DEMO-E','#explore-view');assert.equal(i.state().item,'DEMO-E');assert.equal(i.state().room,'decision');
 i.click('data-trading-stock','DEMO-D','#explore-view');assert.equal(i.state().room,'holdings');assert.equal(i.state().item,'DEMO-D');
 i.click('data-stock-news','DEMO-D','#explore-view');assert.equal(i.state().room,'news');assert.equal(i.state().item,'parts');
 const j=app('#view=room&room=newbuy&item=DEMO-F',mobile);assert(j.markup('#explore-view').includes('이 종목의 신규매수 카드가 없습니다'));assert(!j.markup('#explore-view').includes('data-room-item="DEMO-E"'));
 const k=app('#view=room&room=holdings&item=DEMO-B',mobile);assert(!k.markup('#explore-view').includes('data-decision-stock="DEMO-B"'));k.click('data-stock-news','DEMO-B','#explore-view');assert.equal(k.state().item,'game');
 const l=app('#view=menu',mobile);l.input('menu-search','북두테마');assert(l.markup('#explore-view').includes('data-menu-id="research"'));assert(!l.markup('#explore-view').includes('data-menu-id="ops"'));l.ctx.scrollY=120;l.click('data-room','research','#explore-view');l.click('id','journey-back','#journey-bar');assert.equal(l.state().menuQuery,'북두테마');assert.equal(l.ctx.scrollY,120);
 const m=app('#view=room&room=themeLab',mobile);assert(m.markup('#explore-view').includes('테마 순위'));

}
const html=fs.readFileSync(path.join(dir,'stock-home.html'),'utf8');
for(const f of [...html.matchAll(/(?:src|href)="(stock-[^?]+)\?/g)].map(x=>x[1]))assert(fs.existsSync(path.join(dir,f)),f);
for(const f of ['stock-links.js','stock-navigation.css','stock-rooms.js','stock-home.html'])assert(!/https?:\/\/[^\s"\']+\.ts\.net/i.test(fs.readFileSync(path.join(dir,f),'utf8')),'private operating host published');
console.log('PASS: 13 unique operating screens, all 17 routes, research/ops separation, same-stock transitions and eligibility, alert destinations, origin date/filter/scroll, native back/forward, connection URL handling, legacy aliases. Desktop/mobile logic paths checked; no visual browser test.');
