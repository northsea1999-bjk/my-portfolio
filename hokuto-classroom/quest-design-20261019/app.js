const UI_app_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_app_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Public design fixture only. No private endpoints, live prices, account data or model calls. */
(() => {
  'use strict';

  const icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M4 6V4h14v2m3 5h-5v5h5"/><path d="M17.5 13.5h.1"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',
    chart: '<path d="M4 3v18h17M8 16l4-5 4 2 5-7"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    book: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
    file: '<path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.file}</svg>`;
  const record = (date, price, status, summary, next, input, change, axes) => ({
    date,
    price,
    status,
    summary,
    next,
    input,
    change,
    axes,
    savedAt: `${date} 17:45`,
    inputAt: `${date} 15:00`,
    source: UI_app_js.text("text_01741e23108f")
  });
  const stocks = [{
    id: 'DEMO-A',
    name: UI_app_js.raw("text_c80b866a62b0"),
    short: UI_app_js.raw("text_4c2783fb744e"),
    theme: UI_app_js.raw("text_6a67a4abe6ac"),
    group: 'held',
    badge: UI_app_js.raw("text_0d994341a3cc"),
    tone: 'amber',
    decision: UI_app_js.raw("text_c7828d833651"),
    timing: UI_app_js.raw("text_6ab27595e04b"),
    price: 8240,
    change: 2.1,
    order: 7,
    changed: true,
    update: UI_app_js.raw("text_65b35bebaa8a"),
    color: '#e7f0ed',
    ink: '#648777',
    chart: [7600, 7670, 7550, 7820, 7760, 7860, 7790, 7930, 7880, 8030, 7960, 8100, 8050, 7980, 8090, 8030, 8140, 8070, 8070, 8240],
    records: [record('2026-09-08', 7643, UI_app_js.raw("text_9bdf57df1323"), UI_app_js.raw("text_bf3838f676da"), UI_app_js.raw("text_92f83b9285ec"), UI_app_js.raw("text_c7df11269a3a"), UI_app_js.raw("text_0b95fa5e87b0"), [UI_app_js.raw("text_4f1f511e28d7"), UI_app_js.raw("text_a0e5346f32af"), UI_app_js.raw("text_2274963a0da1"), UI_app_js.raw("text_0652a4bffa04")]), record('2026-10-13', 8070, UI_app_js.raw("text_0d994341a3cc"), UI_app_js.raw("text_b3cb7d969848"), UI_app_js.raw("text_c6236797a7c9"), UI_app_js.raw("text_509be26d55c8"), UI_app_js.raw("text_e3588eea33d7"), [UI_app_js.raw("text_4f1f511e28d7"), UI_app_js.raw("text_551c68aaeb7f"), UI_app_js.raw("text_87d36e0301fb"), UI_app_js.raw("text_20deb79995ea")]), record('2026-10-16', 8240, UI_app_js.raw("text_0d994341a3cc"), UI_app_js.raw("text_337f40061065"), UI_app_js.raw("text_2adda608222c"), UI_app_js.raw("text_752dfa183a84"), UI_app_js.raw("text_afbfa31de637"), [UI_app_js.raw("text_4f1f511e28d7"), UI_app_js.raw("text_8eb02acaf3ba"), UI_app_js.raw("text_715284378d27"), UI_app_js.raw("text_2af8805d55dc")])],
    evaluation: {
      recordDate: '2026-09-08',
      start: '2026-09-09',
      end: '2026-10-09',
      stock: 7.8,
      theme: 4.2,
      market: 2.1
    }
  }, {
    id: 'DEMO-B',
    name: UI_app_js.raw("text_7eddfa228da9"),
    short: UI_app_js.raw("text_dadc4b180c7a"),
    theme: UI_app_js.raw("text_3405df6ecf3e"),
    group: 'held',
    badge: UI_app_js.raw("text_0d994341a3cc"),
    tone: 'amber',
    decision: UI_app_js.raw("text_c7828d833651"),
    timing: UI_app_js.raw("text_6ab27595e04b"),
    price: 5860,
    change: -1.4,
    order: 6,
    changed: true,
    update: UI_app_js.raw("text_732c102578fb"),
    color: '#f1eaf4',
    ink: '#9a78a8',
    chart: [6240, 6180, 6260, 6150, 6220, 6110, 6140, 6060, 6110, 6010, 6070, 5950, 6030, 5980, 5990, 5900, 5980, 5900, 5943, 5860],
    records: [record('2026-09-08', 6004, UI_app_js.raw("text_9bdf57df1323"), UI_app_js.raw("text_2c09c894578e"), UI_app_js.raw("text_241477a1b34e"), UI_app_js.raw("text_c4b0a9528ac4"), UI_app_js.raw("text_d579df05dbdf"), [UI_app_js.raw("text_6965c8e07bb6"), UI_app_js.raw("text_2ca2a01a857b"), UI_app_js.raw("text_73f7e04fe538"), UI_app_js.raw("text_049c91ffde00")]), record('2026-10-13', 5943, UI_app_js.raw("text_744b88e482ad"), UI_app_js.raw("text_09cf4493fb01"), UI_app_js.raw("text_329ccf5b6ccb"), UI_app_js.raw("text_e0ee127b3c1c"), UI_app_js.raw("text_9ec9ac7b9233"), [UI_app_js.raw("text_07b5fa419526"), UI_app_js.raw("text_3f34de505cfa"), UI_app_js.raw("text_f3bb9f7220a9"), UI_app_js.raw("text_a832b61bef09")]), record('2026-10-16', 5860, UI_app_js.raw("text_0d994341a3cc"), UI_app_js.raw("text_5bef3d4dcd82"), UI_app_js.raw("text_fc0a5d03027f"), UI_app_js.raw("text_d5d88746a2bd"), UI_app_js.raw("text_b9dbea77621b"), [UI_app_js.raw("text_bbd335a0b09b"), UI_app_js.raw("text_5f545d4b4714"), UI_app_js.raw("text_460ecdb2b475"), UI_app_js.raw("text_266dc3c3de10")])],
    evaluation: {
      recordDate: '2026-09-08',
      start: '2026-09-09',
      end: '2026-10-09',
      stock: -2.4,
      theme: 1.8,
      market: 2.1
    }
  }, {
    id: 'DEMO-C',
    name: UI_app_js.raw("text_d2a7ae23a9bb"),
    short: UI_app_js.raw("text_452ec4d83414"),
    theme: UI_app_js.raw("text_122f77b14ea4"),
    group: 'held',
    badge: UI_app_js.raw("text_744b88e482ad"),
    tone: 'teal',
    decision: UI_app_js.raw("text_c7828d833651"),
    timing: UI_app_js.raw("text_6ab27595e04b"),
    price: 3420,
    change: .9,
    order: 2,
    changed: false,
    update: UI_app_js.raw("text_b69fafb03695"),
    color: '#eaf0fa',
    ink: '#6d8bbb',
    chart: [3190, 3230, 3200, 3270, 3240, 3310, 3280, 3320, 3300, 3290, 3350, 3310, 3360, 3340, 3370, 3350, 3400, 3390, 3390, 3420],
    records: [record('2026-10-13', 3390, UI_app_js.raw("text_744b88e482ad"), UI_app_js.raw("text_7643187c798e"), UI_app_js.raw("text_849649dc912a"), UI_app_js.raw("text_2da4ac947838"), UI_app_js.raw("text_d579df05dbdf"), [UI_app_js.raw("text_6965c8e07bb6"), UI_app_js.raw("text_2ca2a01a857b"), UI_app_js.raw("text_9a16ea0dbc7f"), UI_app_js.raw("text_d5d082f5de13")]), record('2026-10-16', 3420, UI_app_js.raw("text_744b88e482ad"), UI_app_js.raw("text_08cf2602fa62"), UI_app_js.raw("text_849649dc912a"), UI_app_js.raw("text_02b03f789a33"), UI_app_js.raw("text_50b8f629eb7e"), [UI_app_js.raw("text_6965c8e07bb6"), UI_app_js.raw("text_2ca2a01a857b"), UI_app_js.raw("text_9a16ea0dbc7f"), UI_app_js.raw("text_d5d082f5de13")])]
  }, {
    id: 'DEMO-D',
    name: UI_app_js.raw("text_756b6485c410"),
    short: UI_app_js.raw("text_c7bb4e55620d"),
    theme: UI_app_js.raw("text_8ae98c1ea150"),
    group: 'held',
    badge: UI_app_js.raw("text_744b88e482ad"),
    tone: 'teal',
    decision: UI_app_js.raw("text_9bdf57df1323"),
    timing: UI_app_js.raw("text_6ab27595e04b"),
    price: 4725,
    change: -.3,
    order: 1,
    changed: false,
    update: UI_app_js.raw("text_f2c8afeb9028"),
    color: '#f8eedf',
    ink: '#b09665',
    chart: [4590, 4560, 4630, 4600, 4680, 4640, 4710, 4670, 4700, 4720, 4690, 4760, 4720, 4700, 4750, 4710, 4770, 4750, 4739, 4725],
    records: [record('2026-10-13', 4739, UI_app_js.raw("text_744b88e482ad"), UI_app_js.raw("text_db323338c5fa"), UI_app_js.raw("text_be155f14b675"), UI_app_js.raw("text_c1e4451c32a3"), UI_app_js.raw("text_d579df05dbdf"), [UI_app_js.raw("text_4f1f511e28d7"), UI_app_js.raw("text_2ca2a01a857b"), UI_app_js.raw("text_1be7b546e37a"), UI_app_js.raw("text_06cb5af9695b")]), record('2026-10-16', 4725, UI_app_js.raw("text_744b88e482ad"), UI_app_js.raw("text_55a0a5a4617f"), UI_app_js.raw("text_be155f14b675"), UI_app_js.raw("text_44d3ad36f840"), UI_app_js.raw("text_78cbaabc761c"), [UI_app_js.raw("text_4f1f511e28d7"), UI_app_js.raw("text_2ca2a01a857b"), UI_app_js.raw("text_9a16ea0dbc7f"), UI_app_js.raw("text_06cb5af9695b")])]
  }, {
    id: 'DEMO-E',
    name: UI_app_js.raw("text_dd0944019e01"),
    short: UI_app_js.raw("text_2a2d56f55f2e"),
    theme: UI_app_js.raw("text_93f810f519c8"),
    group: 'candidate',
    badge: UI_app_js.raw("text_9bdf57df1323"),
    tone: 'teal',
    decision: UI_app_js.raw("text_9bdf57df1323"),
    timing: UI_app_js.raw("text_90a6be70a88e"),
    price: 6130,
    change: 3.2,
    order: 5,
    changed: true,
    update: UI_app_js.raw("text_a75af7b04536"),
    color: '#e8effc',
    ink: '#688bc6',
    chart: [5330, 5410, 5350, 5480, 5440, 5530, 5490, 5560, 5610, 5530, 5650, 5620, 5730, 5680, 5810, 5770, 5880, 5820, 5940, 6130],
    records: [record('2026-10-13', 5940, UI_app_js.raw("text_79609dca6327"), UI_app_js.raw("text_4fabcbc888da"), UI_app_js.raw("text_f4478183b076"), UI_app_js.raw("text_a0f93a0de212"), UI_app_js.raw("text_d579df05dbdf"), [UI_app_js.raw("text_352cd16d070f"), UI_app_js.raw("text_50030f521816"), UI_app_js.raw("text_a42d31e1463b"), UI_app_js.raw("text_a9b835cea2a3")]), record('2026-10-16', 6130, UI_app_js.raw("text_9bdf57df1323"), UI_app_js.raw("text_cb2c98900d1c"), UI_app_js.raw("text_17be1a3cc049"), UI_app_js.raw("text_02141ed9f5bf"), UI_app_js.raw("text_a2adb18dc699"), [UI_app_js.raw("text_58706fdc1fb3"), UI_app_js.raw("text_ccf221826064"), UI_app_js.raw("text_20d3a94c36dc"), UI_app_js.raw("text_f4a53c272d21")])]
  }, {
    id: 'DEMO-F',
    name: UI_app_js.raw("text_f22317d1e2ab"),
    short: UI_app_js.raw("text_cfa1c18b7b5d"),
    theme: UI_app_js.raw("text_4d775db48ccd"),
    group: 'candidate',
    badge: UI_app_js.raw("text_79609dca6327"),
    tone: 'gray',
    decision: UI_app_js.raw("text_79609dca6327"),
    timing: UI_app_js.raw("text_d81a164dc4b5"),
    price: 2980,
    change: -.6,
    order: 3,
    changed: true,
    update: UI_app_js.raw("text_1be1cf1d2187"),
    color: '#eaf1e3',
    ink: '#8ca571',
    chart: [3020, 3050, 2990, 3030, 2980, 3010, 2970, 3000, 3040, 3010, 3020, 2970, 2980, 3020, 3000, 2960, 2990, 3010, 2998, 2980],
    records: [record('2026-10-13', 2998, UI_app_js.raw("text_79609dca6327"), UI_app_js.raw("text_9764a63efe12"), UI_app_js.raw("text_24f59fbb8d76"), UI_app_js.raw("text_59c27acea9b8"), UI_app_js.raw("text_d579df05dbdf"), [UI_app_js.raw("text_07b5fa419526"), UI_app_js.raw("text_551c68aaeb7f"), UI_app_js.raw("text_09499ef3d587"), UI_app_js.raw("text_7c08ab89359f")]), record('2026-10-16', 2980, UI_app_js.raw("text_79609dca6327"), UI_app_js.raw("text_88e39276d6fe"), UI_app_js.raw("text_24f59fbb8d76"), UI_app_js.raw("text_c2ea82e58674"), UI_app_js.raw("text_467d8f1b2a04"), [UI_app_js.raw("text_07b5fa419526"), UI_app_js.raw("text_551c68aaeb7f"), UI_app_js.raw("text_09499ef3d587"), UI_app_js.raw("text_7c08ab89359f")])]
  }, {
    id: 'DEMO-G',
    name: UI_app_js.raw("text_816c1d9ffcea"),
    short: UI_app_js.raw("text_980a33ecd341"),
    theme: UI_app_js.raw("text_67589aaa0784"),
    group: 'candidate',
    badge: UI_app_js.raw("text_e37cb85e37fa"),
    tone: 'gray',
    decision: UI_app_js.raw("text_033a934770e8"),
    timing: UI_app_js.raw("text_48b572d2dc9a"),
    price: null,
    change: null,
    order: 4,
    changed: false,
    update: UI_app_js.raw("text_2693730b95d2"),
    color: '#f5e9eb',
    ink: '#bb8e99',
    chart: [],
    records: [record('2026-10-16', null, UI_app_js.raw("text_033a934770e8"), UI_app_js.raw("text_7ed1e199546f"), UI_app_js.raw("text_5313eec017a8"), UI_app_js.raw("text_10731998f2d0"), UI_app_js.raw("text_a74246b66b07"), [UI_app_js.raw("text_aa4816f143d2"), UI_app_js.raw("text_8fce0393b263"), UI_app_js.raw("text_8c162a517fc1"), UI_app_js.raw("text_3a7682922f1e")])]
  }];
  const signed = (n, unit = '%') => n == null ? UI_app_js.text("text_79d781c70d9a") : (typeof window === 'undefined' ? require('./display-format.js') : window.HokutoFormat).signed(n, unit);
  const priceText = n => n == null ? UI_app_js.text("text_79d781c70d9a") : (typeof window === 'undefined' ? require('./display-format.js') : window.HokutoFormat).number(n);
  const latest = s => s.records[s.records.length - 1];
  const scoreDifference = (s, b = 'theme') => s.evaluation ? Math.round((s.evaluation.stock - s.evaluation[b]) * 10) / 10 : null;
  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = {
      stocks,
      latest,
      scoreDifference
    };
    return;
  }
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
  const colorClass = n => n == null || n === 0 ? 'muted' : n > 0 ? 'up' : 'down';
  const selectedStock = () => stocks.find(s => s.id === state.stock) || stocks[0];
  const badge = (text, tone = 'gray') => `<span class="pill ${tone}">${esc(UI_app_js.textValue(text))}</span>`;
  const decisionLabel = s => s.decision.startsWith(UI_app_js.raw("text_8260232f5519")) ? s.decision : UI_app_js.raw("text_8260232f5519") + s.decision;
  const statusChips = s => s.group === 'held' ? UI_app_js.tpl("template_740dcf097327", badge(UI_app_js.raw("text_0313a90b9106") + s.badge, s.tone), badge(decisionLabel(s), 'gray')) : badge(s.badge, s.tone);
  const avatar = s => `<span class="stock-avatar" style="--avatar-bg:${s.color};--avatar-ink:${s.ink}">${s.short}</span>`;
  let state;
  let returnFocus;
  let listScroll = 0;
  let originContext = history.state?.hokutoOrigin || null;
  let renderedHash = '';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const focusViews = window.HokutoFocusViews.create({
    stocks,
    latest,
    esc,
    badge,
    signed,
    openDialog,
    getState: () => state,
    route
  });
  const rooms = window.HokutoRooms.create({
    stocks,
    latest,
    esc,
    icon,
    badge,
    statusChips,
    avatar,
    signed,
    priceText,
    colorClass,
    route,
    selectStock,
    openDialog,
    bigChart,
    getState: () => state,
    refresh: () => render(),
    returnToOrigin,
    focusViews
  });
  function readState() {
    const p = new URLSearchParams(location.hash.slice(1));
    let view = ['home', 'scores', 'menu', 'room'].includes(p.get('view')) ? p.get('view') : 'home';
    const stock = stocks.some(s => s.id === p.get('stock')) ? p.get('stock') : 'DEMO-B';
    let room = rooms.resolve(p.get('room'));
    const from = rooms.resolve(p.get('from'));
    if (room === 'park' && view === 'room') view = 'home';
    if (room === 'records') room = 'performance';
    return {
      view,
      stock,
      ruleVersion: p.get('ruleVersion') === 'legacy' ? 'legacy' : 'focus',
      resultScope: ['all', 'abc', 'd'].includes(p.get('resultScope')) ? p.get('resultScope') : 'all',
      resultMetric: ['stock', 'theme', 'market'].includes(p.get('resultMetric')) ? p.get('resultMetric') : 'stock',
      filter: ['all', 'held', 'candidate'].includes(p.get('filter')) ? p.get('filter') : 'all',
      tab: ['overview', 'history', 'score'].includes(p.get('tab')) ? p.get('tab') : 'overview',
      date: p.get('date') || '',
      detail: p.get('detail') === '1',
      query: p.get('q') || '',
      sort: ['change', 'name', 'return'].includes(p.get('sort')) ? p.get('sort') : 'change',
      benchmark: p.get('benchmark') === 'market' ? 'market' : 'theme',
      round: p.get('round') === 'past' ? 'past' : 'current',
      period: p.get('period') === '5' ? '5' : '20',
      room: rooms.catalog.some(m => m.id === room) ? room : 'news',
      section: p.get('section') || 'all',
      topic: p.get('topic') || 'chip',
      item: p.get('item') || '',
      flowTopic: p.get('flowTopic') || '',
      menuQuery: p.get('menuQuery') || '',
      newsQuery: p.get('newsQuery') || '',
      newsCountry: p.get('newsCountry') || 'all',
      newsMode: p.get('newsMode') === 'analysis' ? 'analysis' : 'titles',
      headlinesExpanded: p.get('headlinesExpanded') === 'true',
      from: rooms.catalog.some(m => m.id === from) ? from : ''
    };
  }
  function route(patch, replace = false) {
    const scroll = window.scrollY,
      previousView = state.view;
    const previousMeta = history.state || {
      hokutoIndex: 0
    };
    history.replaceState({
      ...previousMeta,
      hokutoScroll: scroll,
      hokutoOrigin: originContext
    }, '', location.href);
    state = {
      ...state,
      ...patch
    };
    if (patch.from === '' && !patch.detail) originContext = null;
    if (patch.filter && state.filter !== 'all' && selectedStock().group !== state.filter) {
      state.stock = stocks.filter(s => s.group === state.filter).sort((a, b) => b.order - a.order)[0].id;
      state.tab = 'overview';
      state.date = '';
    }
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(state)) if (v !== '' && v !== false) p.set(k === 'query' ? 'q' : k, k === 'detail' ? '1' : v);
    const same = location.hash.slice(1) === p.toString();
    const keepScroll = replace || patch.view === undefined && patch.room === undefined || state.view === 'home' && previousView === 'home' && !patch.from;
    const meta = {
      hokutoIndex: (previousMeta.hokutoIndex || 0) + (replace || same ? 0 : 1),
      hokutoScroll: keepScroll ? scroll : 0,
      hokutoOrigin: originContext
    };
    history[replace || same ? 'replaceState' : 'pushState'](meta, '', `#${p}`);
    render();
    if (!keepScroll) window.scrollTo({
      top: 0
    });
  }
  function returnToOrigin() {
    const origin = history.state?.hokutoOrigin || originContext;
    if (origin) {
      originContext = null;
      route({
        ...origin.state
      });
      requestAnimationFrame(() => window.scrollTo({
        top: origin.scroll || 0
      }));
      return;
    }
    if (state.from === 'scores') {
      route({
        view: 'scores',
        detail: false,
        from: ''
      });
      return;
    }
    if (state.from) {
      route({
        view: 'room',
        room: state.from,
        detail: false,
        from: ''
      });
      return;
    }
    route({
      view: 'home',
      detail: false,
      from: ''
    });
    requestAnimationFrame(() => window.scrollTo({
      top: listScroll
    }));
  }
  function goBack() {
    if ((history.state?.hokutoIndex || 0) > 0) {
      history.back();
      return;
    }
    if (state.from) {
      returnToOrigin();
      return;
    }
    route({
      view: state.view === 'menu' ? 'home' : 'menu',
      detail: false,
      from: ''
    });
  }
  function locationChanged() {
    if (location.hash === renderedHash) return;
    if ($('#evidence-dialog').open) $('#evidence-dialog').close();
    state = readState();
    originContext = history.state?.hokutoOrigin || null;
    render();
    requestAnimationFrame(() => window.scrollTo({
      top: history.state?.hokutoScroll || 0
    }));
  }
  function chartPath(values, width, height, pad = 6) {
    if (!values.length) return '';
    const min = Math.min(...values),
      max = Math.max(...values),
      range = max - min || 1;
    return values.map((n, i) => `${i ? 'L' : 'M'}${FMT_app_js.fixed(pad + i * (width - pad * 2) / Math.max(1, values.length - 1), 1)},${FMT_app_js.fixed(height - pad - (n - min) / range * (height - pad * 2), 1)}`).join(' ');
  }
  function spark(s) {
    if (!s.chart.length) return '<span class="spark muted" aria-hidden="true">—</span>';
    const col = s.chart.at(-1) >= s.chart[0] ? '#90b9a6' : '#9cb7d1';
    return UI_app_js.tpl("template_a627de1d5284", esc(s.name), chartPath(s.chart, 72, 35, 3), col);
  }
  function bigChart(s, fillId = 'chart-fill') {
    if (window.HokutoCharts) return window.HokutoCharts.markup(s, state.period);
    if (!s.chart.length) return UI_app_js.text("text_0ca5ba88a7f9");
    const values = state.period === '5' ? s.chart.slice(-5) : s.chart;
    const path = chartPath(values, 420, 135, 8);
    return UI_app_js.tpl("template_a0800d71f669", state.period === '5', state.period === '20', esc(s.name), state.period, priceText(s.price), fillId, path, fillId, path, state.period === '5' ? '5' : '20');
  }
  function renderList() {
    const q = state.query.trim().toLowerCase();
    let found = stocks.filter(s => (state.filter === 'all' || s.group === state.filter) && (!q || `${s.name} ${s.id} ${s.theme}`.toLowerCase().includes(q)));
    found.sort(state.sort === 'name' ? (a, b) => a.name.localeCompare(b.name, 'ko') : state.sort === 'return' ? (a, b) => (b.change ?? -Infinity) - (a.change ?? -Infinity) : (a, b) => b.order - a.order);
    $('#list-title').innerHTML = `${state.filter === 'held' ? UI_app_js.text("text_82299d34c15e") : state.filter === 'candidate' ? UI_app_js.text("text_7a1ffef9cf3f") : UI_app_js.text("text_177eb75a9c73")} <span>${found.length}</span>`;
    $('#stock-list').innerHTML = found.length ? found.map(s => UI_app_js.tpl("template_eb13bd9c7041", s.id === state.stock ? 'selected' : '', s.id, s.id === state.stock, s.name, s.group === 'held' ? UI_app_js.text("text_cd246495045a") : UI_app_js.text("text_8648240beaf7"), s.group === 'held' ? UI_app_js.raw("text_0313a90b9106") + s.badge + ', ' + decisionLabel(s) : s.badge, avatar(s), s.name, s.group, s.group === 'held' ? UI_app_js.text("text_2d4a445ffca7") : UI_app_js.text("text_55b962dc086d"), s.theme, statusChips(s), window.HokutoFocus.focusForStock(s.id) ? `<span class="focus-list-badge">${window.HokutoText.copy.focus.membership}</span>` : '', s.changed ? 'changed' : '', s.update, spark(s), priceText(s.price), s.price == null ? '' : UI_app_js.text("text_4c6ebcde1e61"), colorClass(s.change), signed(s.change))).join('') : UI_app_js.tpl("template_7fb4afef31fb");
    $$('#stock-filters button').forEach(b => b.setAttribute('aria-pressed', b.dataset.filter === state.filter));
    $('#stock-sort').value = state.sort;
    if (document.activeElement !== $('#stock-search')) $('#stock-search').value = state.query;
  }
  function renderBriefing() {
    $('#briefing').innerHTML = focusViews.daily();
  }
  function overview(s) {
    const r = latest(s);
    return UI_app_js.tpl("template_0c80b9058e09", statusChips(s), s.group === 'held' ? '' : UI_app_js.text("text_c933e76d4b41"), r.summary, s.group === 'held' ? UI_app_js.text("text_5727bc37b65c") : UI_app_js.tpl("template_8a576ac41142", s.timing), bigChart(s), r.axes.map(a => {
      const [name, ...value] = a.split(':');
      return `<div class="evidence-cell"><small>${name}</small><strong>${value.join(':').trim()}</strong></div>`;
    }).join(''), icon('clock'), r.next, r.date, icon('file'), s.name, s.price == null ? UI_app_js.text("text_aab5f46331e7") : UI_app_js.text("text_efe6dc08fe3e"), r.inputAt);
  }
  function historyView(s) {
    const r = s.records.find(r => r.date === state.date) || latest(s);
    return UI_app_js.tpl("template_e42e9bb87f0b", [...s.records].reverse().map(t => `<button data-date="${t.date}" aria-pressed="${t.date === r.date}">${FMT_app_js.date(t.date, "short")} ${t === latest(s) ? UI_app_js.text("text_ae2f7c918f7d") : ''}</button>`).join(''), r.date, badge(r.status, r.status === UI_app_js.raw("text_0d994341a3cc") ? 'amber' : r.status === UI_app_js.raw("text_744b88e482ad") || r.status === UI_app_js.raw("text_9bdf57df1323") ? 'teal' : 'gray'), priceText(r.price), r.price == null ? '' : UI_app_js.text("text_006a67840f24"), r.summary, r.change, r.inputAt, r.savedAt, r.date, icon('clock'), r.next, s.evaluation && r.date === s.evaluation.recordDate ? UI_app_js.text("text_ac1f58eb3997") : '', [...s.records].reverse().map(t => `<div class="timeline-item"><span class="timeline-date">${FMT_app_js.date(t.date, "short")}</span><p><strong>${t.status}</strong><br>${t.change}</p></div>`).join(''));
  }
  function stockScore(s) {
    const past = state.round === 'past' && s.evaluation;
    const e = past ? s.evaluation : null;
    const benchmark = state.benchmark === 'market' ? UI_app_js.text("text_0ca83c2648f0") : UI_app_js.text("text_af43f1c67818");
    return UI_app_js.tpl("template_f8953f715fd6", !past ? 'selected' : '', s.decision === UI_app_js.raw("text_9bdf57df1323") ? UI_app_js.text("text_d85807817360") : UI_app_js.text("text_39eef766f3f4"), s.evaluation ? UI_app_js.tpl("template_7e517b2f3057", past ? 'selected' : '') : '', state.benchmark === 'theme', state.benchmark === 'market', e ? UI_app_js.tpl("template_727afbb08836", benchmark, colorClass(scoreDifference(s, state.benchmark)), signed(scoreDifference(s, state.benchmark), ''), colorClass(e.stock), signed(e.stock), benchmark, signed(e[state.benchmark]), e.recordDate, FMT_app_js.date(e.start, 'dash'), FMT_app_js.date(e.end, 'dash')) : UI_app_js.tpl("template_64bc0097d085", s.price == null ? UI_app_js.text("text_4133ccd616c2") : s.decision === UI_app_js.raw("text_9bdf57df1323") ? UI_app_js.text("text_cdc199b5f4f0") : UI_app_js.text("text_89aea11f1c6a"), s.price == null ? UI_app_js.text("text_c5b583fdc404") : s.decision === UI_app_js.raw("text_9bdf57df1323") ? UI_app_js.text("text_e2002774847d") : UI_app_js.text("text_c5098b13579f")));
  }
  function renderDetail() {
    const s = selectedStock();
    const names = {
      overview: UI_app_js.text("text_5dc1a3282569"),
      history: UI_app_js.text("text_7396410e03e2"),
      score: UI_app_js.text("text_0f8d897f6e2d")
    };
    $('#stock-detail').innerHTML = UI_app_js.tpl("template_d388891cc1bd", state.from ? UI_app_js.tpl("template_c10b1fe14d50", rooms.menu(state.from).name) : UI_app_js.text("text_99a638e11054"), badge(s.group === 'held' ? UI_app_js.text("text_cd246495045a") : UI_app_js.text("text_8648240beaf7"), s.group === 'held' ? 'gray' : 'blue'), avatar(s), s.name, s.id, s.theme, priceText(s.price), s.price == null ? '' : UI_app_js.text("text_fe91eaaafffa"), colorClass(s.change), signed(s.change), Object.entries(names).map(([key, label]) => `<button role="tab" id="tab-${key}" aria-selected="${state.tab === key}" aria-controls="detail-body" tabindex="${state.tab === key ? '0' : '-1'}" data-tab="${key}">${label}</button>`).join(''), state.tab, state.tab === 'history' ? historyView(s) : state.tab === 'score' ? stockScore(s) : overview(s));
    document.title = UI_app_js.tpl("template_2cc1b718ed31", state.detail ? s.name + ' · ' : '', state.view === 'scores' ? UI_app_js.text("text_0f8d897f6e2d") : UI_app_js.text("text_6d65a09d5d84"));
  }
  function renderScores() {
    $('#scores-view').innerHTML = focusViews.results('selection', true);
  }
  function render() {
    if (state.view === 'menu') {
      location.replace('menu.html?v=9-final1020');
      return;
    }
    document.body.dataset.room = state.view === 'room' ? state.room : '';
    const inTopic = state.view === 'room' || state.view === 'scores' || !!state.from;
    document.body.classList.toggle('topic-focused', inTopic);
    const brand = document.querySelector('.brand');
    if (inTopic) {
      brand.removeAttribute('href');
      brand.removeAttribute('data-home-link');
      brand.setAttribute('aria-label', UI_app_js.text("text_8f26ff6719fd"));
    } else {
      brand.setAttribute('href', '#view=home');
      brand.setAttribute('data-home-link', '');
      brand.setAttribute('aria-label', UI_app_js.text("text_481fbfd8c7e1"));
    }
    const scores = state.view === 'scores';
    const explore = state.view === 'menu' || state.view === 'room';
    const focused = state.view === 'home' && state.detail && !!state.from;
    document.body.classList.toggle('mobile-detail', state.detail && !scores && !explore);
    document.body.classList.toggle('explore-mode', explore);
    document.body.classList.toggle('news-mode', state.view === 'room' && state.room === 'news');
    document.body.classList.toggle('focused-detail', focused);
    document.body.classList.toggle('home-overview', state.view === 'home' && !focused && !state.query);
    $('#workspace-grid').hidden = scores || explore;
    $('#briefing').hidden = scores || explore || focused || !!state.query;
    $('#scores-view').hidden = !scores;
    $('#explore-view').hidden = !explore;
    $('#home-news').hidden = scores || explore || focused || !!state.query;
    $('#home-news').innerHTML = rooms.homeNews();
    $('#overview-column').hidden = focused;
    const active = explore ? state.view === 'room' && state.room === 'holdings' ? 'held' : state.view === 'room' && state.room === 'decision' ? 'candidate' : state.view === 'room' && state.room === 'news' ? 'news' : 'menu' : scores ? 'scores' : 'home';
    $$('[data-nav]').forEach(b => {
      b.classList.toggle('active', b.dataset.nav === active);
      if (b.closest('nav')) b.setAttribute('aria-current', b.dataset.nav === active ? 'page' : 'false');
    });
    ['all-menu', 'mobile-all-menu'].forEach(id => {
      const b = $('#' + id);
      b.classList.toggle('active', active === 'menu');
      if (active === 'menu') b.setAttribute('aria-current', 'page');else b.removeAttribute('aria-current');
    });
    $('#page-heading h1').textContent = scores ? UI_app_js.text("text_f2578f32a03b") : focused ? UI_app_js.text("text_a79e04bd6f1d") : state.query ? UI_app_js.text("text_27f3ca025f60") : state.filter === 'held' ? UI_app_js.text("text_6d06b852cf27") : state.filter === 'candidate' ? UI_app_js.text("text_cffaf14545c1") : UI_app_js.text("text_f8913b31c84d");
    $('#page-heading p').textContent = scores ? window.HokutoText.copy.focus.homeScoreHelp : focused ? rooms.menu(state.from).name + UI_app_js.raw("text_1a7718c8cfa1") : state.query ? UI_app_js.text("text_45d21ab8dc5e") : UI_app_js.text("text_ec4b05e64f3f");
    $('#page-heading .eyebrow').textContent = scores ? UI_app_js.text("text_3063b2d56b14") : focused ? UI_app_js.text("text_9a7900c22675") : UI_app_js.text("text_af2d2bbce6bc");
    const journey = $('#journey-bar');
    journey.hidden = !(explore || scores);
    journey.innerHTML = UI_app_js.tpl("template_70471c4af4a7", scores ? UI_app_js.text("text_f2578f32a03b") : rooms.menu(state.room).name);
    renderBriefing();
    renderList();
    renderDetail();
    if (scores) renderScores();
    if (explore) rooms.render();
    $$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
    if (!explore) document.title = UI_app_js.tpl("template_fe237a31fd7c", scores ? UI_app_js.text("text_038ae9c26a52") : UI_app_js.text("text_2dfd34a50836"));
    window.HokutoCharts?.renderHome(stocks, state, id => route({
      stock: id
    }, true));
    window.HokutoCharts?.mount();
    renderedHash = location.hash;
  }
  function selectStock(id, tab = 'overview', extra = {}) {
    if (!state.detail) listScroll = window.scrollY;
    const from = state.view === 'room' ? state.room : state.view === 'scores' ? 'scores' : '';
    if (from || !state.detail) originContext = {
      state: {
        ...state
      },
      scroll: window.scrollY
    };
    route({
      view: 'home',
      stock: id,
      tab,
      detail: true,
      date: '',
      round: 'current',
      from,
      ...extra
    });
    if (extra.from || matchMedia('(max-width:760px)').matches) window.scrollTo({
      top: 0
    });
    $('#announcer').textContent = UI_app_js.tpl("template_15061753019a", stocks.find(s => s.id === id).name, tab === 'history' ? UI_app_js.text("text_243b8fa45506") : tab === 'score' ? UI_app_js.text("text_0f8d897f6e2d") : UI_app_js.text("text_5dc1a3282569"));
  }
  function openDialog(content) {
    if (!$('#evidence-dialog').open) returnFocus = document.activeElement;
    $('#dialog-content').innerHTML = content;
    const d = $('#evidence-dialog');
    if (!d.open) d.showModal();
    $('#close-dialog')?.focus();
  }
  function showEvidence(date, id) {
    const s = id ? stocks.find(s => s.id === id) : selectedStock();
    if (!s) return;
    const r = date ? s.records.find(r => r.date === date) : latest(s);
    if (!r) return;
    openDialog(UI_app_js.tpl("template_cb8658cba654", s.name, r.date, [...s.records].reverse().map(x => `<button data-local-record="${s.id}" data-record-date="${x.date}" aria-pressed="${x.date === r.date}">${FMT_app_js.date(x.date, "short")}</button>`).join(''), badge(r.status, r.status === UI_app_js.raw("text_0d994341a3cc") ? 'amber' : 'gray'), r.summary, r.input, priceText(r.price), r.price == null ? '' : UI_app_js.text("text_006a67840f24"), r.inputAt, r.savedAt, r.axes.map(a => `<div class="evidence-cell"><strong>${a}</strong></div>`).join(''), r.next));
  }
  function showMenu() {
    route({
      view: 'menu',
      detail: false,
      from: '',
      menuQuery: ''
    });
    window.scrollTo({
      top: 0
    });
  }
  document.addEventListener('click', ev => {
    if (ev.target.closest('[data-home-link]')) {
      ev.preventDefault();
      route({
        view: 'home',
        filter: 'all',
        detail: false,
        from: '',
        query: ''
      });
      return;
    }
    if (ev.target.closest('.skip')) {
      ev.preventDefault();
      $('#workspace').focus();
      $('#workspace').scrollIntoView();
      return;
    }
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.localRecord) {
      showEvidence(b.dataset.recordDate, b.dataset.localRecord);
      return;
    }
    if (focusViews.onClick(b)) return;
    if (rooms.onClick(b)) return;
    if (b.dataset.nav) {
      const n = b.dataset.nav;
      if (n === 'held' || n === 'candidate' || n === 'news') {
        rooms.navigate(n === 'held' ? 'holdings' : n === 'news' ? 'news' : 'decision');
        return;
      }
      route({
        view: n === 'scores' ? 'scores' : 'home',
        ruleVersion: 'focus',
        resultScope: 'all',
        filter: 'all',
        detail: false,
        query: '',
        from: ''
      });
      window.scrollTo({
        top: 0
      });
      return;
    }
    if (b.id === 'journey-back') {
      goBack();
      return;
    }
    if (b.dataset.stock) {
      selectStock(b.dataset.stock);
      return;
    }
    if (b.dataset.open) {
      selectStock(b.dataset.open, b.dataset.openTab || 'overview');
      return;
    }
    if (b.dataset.filter) {
      route({
        filter: b.dataset.filter,
        detail: false
      });
      return;
    }
    if (b.hasAttribute('data-headlines-expand')) {
      route({
        headlinesExpanded: !state.headlinesExpanded
      }, true);
      return;
    }
    if (b.dataset.tab) {
      route({
        tab: b.dataset.tab,
        date: '',
        round: 'current'
      });
      return;
    }
    if (b.dataset.period) {
      route({
        period: b.dataset.period
      }, true);
      return;
    }
    if (b.dataset.date) {
      route({
        date: b.dataset.date
      });
      return;
    }
    if (b.dataset.evidence) {
      showEvidence(b.dataset.evidence);
      return;
    }
    if (b.dataset.benchmark) {
      route({
        benchmark: b.dataset.benchmark
      }, true);
      return;
    }
    if (b.dataset.scoreStock) {
      const s = stocks.find(s => s.id === b.dataset.scoreStock);
      selectStock(s.id, 'score', {
        round: s.evaluation ? 'past' : 'current'
      });
      return;
    }
    if (b.id === 'clear-search') {
      route({
        query: '',
        filter: 'all'
      });
      return;
    }
    if (b.id === 'back-list') {
      returnToOrigin();
      return;
    }
    if (b.id === 'type-button') {
      document.documentElement.classList.toggle('large-text');
      b.setAttribute('aria-pressed', document.documentElement.classList.contains('large-text'));
      return;
    }
    if (b.id === 'record-to-score') {
      route({
        tab: 'score',
        round: 'past'
      });
      return;
    }
    if (b.id === 'score-to-record') {
      route({
        tab: 'history',
        date: selectedStock().evaluation.recordDate
      });
      return;
    }
    if (b.id === 'all-menu' || b.id === 'mobile-all-menu') {
      showMenu();
      return;
    }
    if (b.id === 'close-dialog') {
      $('#evidence-dialog').close();
      return;
    }
  });
  $('#stock-search').addEventListener('input', e => route({
    query: e.target.value,
    view: 'home',
    detail: false,
    from: ''
  }, true));
  document.addEventListener('input', e => {
    if (e.target.id !== 'news-search' || e.isComposing) return;
    const value = e.target.value;
    const caret = e.target.selectionStart;
    route({
      newsQuery: value,
      item: ''
    }, true);
    const input = $('#news-search');
    input.focus({
      preventScroll: true
    });
    if (caret != null) input.setSelectionRange?.(caret, caret);
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'news-country') route({
      newsCountry: e.target.value,
      item: ''
    }, true);
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'menu-search') {
      const value = e.target.value;
      route({
        menuQuery: value
      }, true);
      const input = $('#menu-search');
      input.focus();
    }
  });
  $('#stock-sort').addEventListener('change', e => route({
    sort: e.target.value
  }, true));
  document.addEventListener('change', e => {
    if (e.target.id === 'score-round') route({
      round: e.target.value
    }, true);
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('#evidence-dialog').open) {
      e.preventDefault();
      $('#stock-search').focus();
    }
    const tab = e.target.closest('[role=tab]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const keys = ['overview', 'history', 'score'];
      const i = keys.indexOf(tab.dataset.tab);
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
      route({
        tab: keys[next],
        date: '',
        round: 'current'
      }, true);
      $(`#tab-${keys[next]}`).focus();
    }
  });
  $('#evidence-dialog').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.currentTarget.close();
    }
  });
  $('#evidence-dialog').addEventListener('close', () => {
    if (returnFocus?.isConnected) returnFocus.focus();
  });
  window.addEventListener('popstate', locationChanged);
  window.addEventListener('hashchange', locationChanged);
  history.replaceState({
    ...history.state,
    hokutoIndex: history.state?.hokutoIndex || 0
  }, '', location.href);
  state = readState();
  render();
})();
