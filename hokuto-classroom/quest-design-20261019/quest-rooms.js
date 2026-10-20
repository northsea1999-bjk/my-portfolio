const UI_quest_rooms_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_quest_rooms_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Shared navigation and fictional room examples. No production calls or writes. */
(() => {
  'use strict';

  const links = typeof window !== 'undefined' ? window.HokutoLinks : require('./navigation-catalog.js');
  const F = typeof window !== 'undefined' ? window.HokutoFocus : require('./focus-rule.js');
  const text = (typeof window !== 'undefined' ? window.HokutoText : require('./ui-copy.js')).copy.focus;
  const catalog = links.catalog.map(m => {
    const leads = {
      ops: text.opsLead,
      strategy: text.strategyLead,
      performance: text.performanceHelp,
      selection: text.selectionHelp
    };
    return leads[m.id] ? {
      ...m,
      lead: leads[m.id]
    } : m;
  });
  const drawings = {
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h5v5H7zM15 8h3M15 12h3M7 16h11"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3Z"/><path d="M7 12h10M7 16h6"/>',
    check: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 12 3 3 5-6M9 3v3h6V3"/>',
    pulse: '<path d="M2 12h5l3-7 4 14 3-7h5"/>',
    swap: '<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/>'
  };
  const topics = [{
    id: 'chip',
    name: UI_quest_rooms_js.raw("text_6a67a4abe6ac"),
    rank: 1,
    previous: 1,
    money20: 1.2,
    money60: 1.4,
    return20: 18,
    stockIds: ['DEMO-A'],
    copy: UI_quest_rooms_js.raw("text_5d6edf883e48"),
    next: UI_quest_rooms_js.raw("text_d521a7b32700"),
    tone: 'teal'
  }, {
    id: 'ai',
    name: UI_quest_rooms_js.raw("text_93f810f519c8"),
    rank: 2,
    previous: 3,
    money20: 1.3,
    money60: 1.1,
    return20: 15,
    stockIds: ['DEMO-E'],
    copy: UI_quest_rooms_js.raw("text_7fdd92e04863"),
    next: UI_quest_rooms_js.raw("text_a824a88b2f2c"),
    tone: 'blue'
  }, {
    id: 'parts',
    name: UI_quest_rooms_js.raw("text_8ae98c1ea150"),
    rank: 3,
    previous: 2,
    money20: 1.1,
    money60: 1.3,
    return20: 9,
    stockIds: ['DEMO-D'],
    copy: UI_quest_rooms_js.raw("text_ce75eca47075"),
    next: UI_quest_rooms_js.raw("text_9f8eeab81843"),
    tone: 'violet'
  }, {
    id: 'grid',
    name: UI_quest_rooms_js.raw("text_4d775db48ccd"),
    rank: 4,
    previous: 6,
    money20: 1.4,
    money60: 1.1,
    return20: 8,
    stockIds: ['DEMO-F'],
    copy: UI_quest_rooms_js.raw("text_d981e0f05d72"),
    next: UI_quest_rooms_js.raw("text_0edc15996b6d"),
    tone: 'amber'
  }, {
    id: 'defense',
    name: UI_quest_rooms_js.raw("text_122f77b14ea4"),
    rank: 5,
    previous: 4,
    money20: .8,
    money60: .9,
    return20: 5,
    stockIds: ['DEMO-C'],
    copy: UI_quest_rooms_js.raw("text_782125a0612d"),
    next: UI_quest_rooms_js.raw("text_846947afd65f"),
    tone: 'blue'
  }, {
    id: 'game',
    name: UI_quest_rooms_js.raw("text_3405df6ecf3e"),
    rank: 6,
    previous: 5,
    money20: .7,
    money60: .9,
    return20: -2,
    stockIds: ['DEMO-B'],
    copy: UI_quest_rooms_js.raw("text_3fe89412c037"),
    next: UI_quest_rooms_js.raw("text_fb0c03a1d276"),
    tone: 'violet'
  }];
  topics.push({
    id: 'robot',
    name: UI_quest_rooms_js.text("text_3f97ae143f79"),
    rank: 7,
    previous: 7,
    money20: 1.1,
    money60: 1.0,
    return20: 4,
    stockIds: [],
    copy: UI_quest_rooms_js.text("text_8ec271e2af8f"),
    next: UI_quest_rooms_js.text("text_d11e9538431b"),
    tone: 'blue'
  });
  const articles = [{
    id: 'contract',
    time: '16:20',
    title: UI_quest_rooms_js.raw("text_ffcb2dc940a1"),
    topic: 'chip',
    stock: 'DEMO-A',
    kind: 'direct',
    country: UI_quest_rooms_js.raw("text_8f81db7db55a"),
    state: UI_quest_rooms_js.raw("text_b120e6de0bf8"),
    summary: UI_quest_rooms_js.raw("text_8377a12858c2"),
    unknown: UI_quest_rooms_js.raw("text_4bebaeeedcca"),
    proof: UI_quest_rooms_js.raw("text_f21eff0b0a10")
  }, {
    id: 'game',
    time: '15:40',
    title: UI_quest_rooms_js.raw("text_1a9a8e8643ae"),
    topic: 'game',
    stock: 'DEMO-B',
    kind: 'direct',
    country: UI_quest_rooms_js.raw("text_8f81db7db55a"),
    state: UI_quest_rooms_js.raw("text_b120e6de0bf8"),
    summary: UI_quest_rooms_js.raw("text_126d202578c4"),
    unknown: UI_quest_rooms_js.raw("text_db97a6e39fde"),
    proof: UI_quest_rooms_js.raw("text_6bb003da3083")
  }, {
    id: 'ai',
    time: '14:10',
    title: UI_quest_rooms_js.raw("text_23e189bd5afc"),
    topic: 'ai',
    stock: 'DEMO-E',
    kind: 'direct',
    country: UI_quest_rooms_js.raw("text_8f81db7db55a"),
    state: UI_quest_rooms_js.raw("text_b120e6de0bf8"),
    summary: UI_quest_rooms_js.raw("text_14f35c2d7125"),
    unknown: UI_quest_rooms_js.raw("text_dbe5caccf1c6"),
    proof: UI_quest_rooms_js.raw("text_df7f17438d00")
  }, {
    id: 'grid',
    time: '13:35',
    title: UI_quest_rooms_js.raw("text_196f447a7ae7"),
    topic: 'grid',
    stock: null,
    kind: 'industry',
    country: UI_quest_rooms_js.raw("text_664cbf66088c"),
    state: UI_quest_rooms_js.raw("text_53b936809e55"),
    summary: UI_quest_rooms_js.raw("text_eb36c9eb17c6"),
    unknown: UI_quest_rooms_js.raw("text_51714ba486f1"),
    proof: UI_quest_rooms_js.raw("text_7182804ba5a7")
  }, {
    id: 'parts',
    time: '12:20',
    title: UI_quest_rooms_js.raw("text_19fa9aa06cf2"),
    topic: 'parts',
    stock: 'DEMO-D',
    kind: 'direct',
    country: UI_quest_rooms_js.raw("text_8f81db7db55a"),
    state: UI_quest_rooms_js.raw("text_b120e6de0bf8"),
    summary: UI_quest_rooms_js.raw("text_8d240956329e"),
    unknown: UI_quest_rooms_js.raw("text_4a3047b58031"),
    proof: UI_quest_rooms_js.raw("text_43f77e2136ae")
  }, {
    id: 'pending',
    time: '11:45',
    title: UI_quest_rooms_js.raw("text_bbfe84557d98"),
    topic: 'chip',
    stock: null,
    kind: 'pending',
    country: UI_quest_rooms_js.raw("text_515dfc429e16"),
    state: UI_quest_rooms_js.raw("text_e48762415cea"),
    summary: UI_quest_rooms_js.raw("text_9ce0d56a2e27"),
    unknown: UI_quest_rooms_js.raw("text_70ed17738a57"),
    proof: UI_quest_rooms_js.raw("text_c15715d9a922")
  }];
  const lanes = {
    'DEMO-D': ['B'],
    'DEMO-E': ['A', 'D'],
    'DEMO-F': ['C'],
    'DEMO-G': []
  };
  const candidateIds = ['DEMO-D', 'DEMO-E', 'DEMO-F', 'DEMO-G'];
  const decisionIds = ['DEMO-D', 'DEMO-E', 'DEMO-F'];
  const newbuyIds = ['DEMO-E']; // Explicit fictional card availability, not a production calculation.
  // Fictional display states; these do not calculate or replace production rules.
  const themeStates = {
    chip: {
      kind: 'star',
      label: UI_quest_rooms_js.raw("text_055204275ddd"),
      previous: UI_quest_rooms_js.raw("text_055204275ddd"),
      return60: 24.0,
      converted: false
    },
    ai: {
      kind: 'star',
      label: UI_quest_rooms_js.raw("text_055204275ddd"),
      previous: UI_quest_rooms_js.raw("text_9c45cf2cb06b"),
      return60: 21.0,
      converted: true
    },
    parts: {
      kind: 'star',
      label: UI_quest_rooms_js.raw("text_055204275ddd"),
      previous: UI_quest_rooms_js.raw("text_055204275ddd"),
      return60: 12.0,
      converted: false
    },
    grid: {
      kind: 'arrow',
      label: UI_quest_rooms_js.raw("text_9c45cf2cb06b"),
      previous: UI_quest_rooms_js.raw("text_9c45cf2cb06b"),
      return60: 11.0,
      converted: false
    },
    defense: {
      kind: 'normal',
      label: UI_quest_rooms_js.raw("text_d4ef859c7882"),
      previous: UI_quest_rooms_js.raw("text_d4ef859c7882"),
      return60: 7.0,
      converted: false
    },
    game: {
      kind: 'normal',
      label: UI_quest_rooms_js.raw("text_d4ef859c7882"),
      previous: UI_quest_rooms_js.raw("text_d4ef859c7882"),
      return60: 3.0,
      converted: false
    }
  };
  F.themes.forEach((t, index) => {
    let row = topics.find(x => x.id === t.id);
    if (!row) {
      row = {
        id: t.id,
        name: t.name,
        rank: index + 1,
        previous: index + 1,
        money20: 1,
        money60: 1,
        return20: t.return20,
        stockIds: [],
        copy: UI_quest_rooms_js.text("text_43f113dbad45"),
        next: UI_quest_rooms_js.text("text_79d781c70d9a"),
        tone: 'blue'
      };
      topics.push(row);
    }
    row.rank = index + 1;
    themeStates[t.id] = {
      ...(themeStates[t.id] || {
        return60: null
      }),
      kind: t.star ? 'star' : t.money ? 'arrow' : 'normal',
      label: t.star ? UI_quest_rooms_js.text("text_055204275ddd") : t.money ? UI_quest_rooms_js.text("text_79d3fdd1185d") : UI_quest_rooms_js.text("text_d4ef859c7882"),
      previous: t.converted ? UI_quest_rooms_js.text("text_9c45cf2cb06b") : t.star ? UI_quest_rooms_js.text("text_055204275ddd") : t.money ? UI_quest_rooms_js.text("text_9c45cf2cb06b") : UI_quest_rooms_js.text("text_d4ef859c7882"),
      converted: t.converted,
      money: t.money
    };
  });
  topics.sort((a, b) => a.rank - b.rank);
  const companyChecks = {
    'DEMO-D': {
      eps: 180,
      forecast: 180,
      status: UI_quest_rooms_js.raw("text_3955535ed6b9"),
      reason: UI_quest_rooms_js.raw("text_c982c8540620"),
      at: '2026.10.13'
    },
    'DEMO-E': {
      eps: 120,
      forecast: 132,
      status: UI_quest_rooms_js.raw("text_77f5dfee87b0"),
      reason: UI_quest_rooms_js.raw("text_0b0681669524"),
      at: '2026.10.16'
    },
    'DEMO-F': {
      eps: 80,
      forecast: null,
      status: UI_quest_rooms_js.raw("text_594f548f2007"),
      reason: UI_quest_rooms_js.raw("text_085e51ca2bd0"),
      at: '2026.10.13'
    },
    'DEMO-G': {
      eps: null,
      forecast: null,
      status: UI_quest_rooms_js.raw("text_594f548f2007"),
      reason: UI_quest_rooms_js.raw("text_c37174fd95bc"),
      at: null
    }
  };
  function create(api) {
    const {
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
      bigChart
    } = api;
    const get = () => api.getState();
    const stock = id => stocks.find(s => s.id === id);
    const menu = id => catalog.find(m => m.id === links.resolve(id)) || catalog[0];
    const topic = id => topics.find(t => t.id === id) || topics[0];
    const glyph = id => drawings[id] ? `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${drawings[id]}</svg>` : icon(id);
    const note = text => `<p class="room-note">${icon('file')}<span>${text}</span></p>`;
    const roomButton = (id, label, klass = 'room-text-link') => `<button class="${klass}" data-room="${id}">${label || menu(id).name}<span aria-hidden="true">→</span></button>`;
    const stockButton = (id, label, tab = 'overview') => `<button class="room-stock-link" data-local-record="${id}">${label || stock(id).name}<span aria-hidden="true">↗</span></button>`;
    const chips = (items, current, attr, label) => `<div class="room-filters" role="group" aria-label="${label}">${items.map(([id, text]) => `<button ${attr}="${id}" aria-pressed="${current === id}">${text}</button>`).join('')}</div>`;
    const stockIdentity = s => `<div class="room-stock-identity">${avatar(s)}<div><strong>${s.name}</strong><small>${s.id} · ${s.group === 'held' ? UI_quest_rooms_js.text("text_cd246495045a") : UI_quest_rooms_js.text("text_5ed3f1a3cf5a")}</small></div></div>`;
    const empty = (title, copy) => `<div class="room-empty"><span>${icon('file')}</span><h3>${title}</h3><p>${copy}</p></div>`;
    let operatingBase = '';
    try {
      const saved = localStorage.getItem('hokuto-operating-base-v1');
      if (saved) operatingBase = links.normaliseBase(saved);
    } catch {}
    let pendingSource = '';
    function sourceAction() {
      return '';
    }
    function connectionDialog(id = '') {
      pendingSource = id;
      openDialog(UI_quest_rooms_js.tpl("template_3fc6b4aa2147", esc(operatingBase), id ? UI_quest_rooms_js.raw("text_6f347e95a1c6") + (menu(id).brief ? UI_quest_rooms_js.text("text_3f639ddb2268") : menu(id).name) + UI_quest_rooms_js.raw("text_38c401014575") : UI_quest_rooms_js.text("text_f808a1293bfe")));
    }
    function saveConnection() {
      const input = document.querySelector('#operating-address');
      try {
        operatingBase = links.normaliseBase(input.value);
      } catch (error) {
        document.querySelector('#connection-error').textContent = error.message;
        input.focus();
        return;
      }
      let persisted = true;
      try {
        localStorage.setItem('hokuto-operating-base-v1', operatingBase);
      } catch {
        persisted = false;
      }
      const target = catalog.find(m => m.id === pendingSource && m.path);
      document.querySelector('#evidence-dialog').close();
      api.refresh();
      document.querySelector('#announcer').textContent = persisted ? UI_quest_rooms_js.text("text_1fda737c1689") : UI_quest_rooms_js.text("text_7a30d4937b94");
      if (target) window.open(links.destination(target.id, operatingBase), '_blank', 'noopener,noreferrer');
      pendingSource = '';
    }
    function navigate(id, extra = {}) {
      id = links.resolve(id);
      if (id === 'scores') {
        route({
          view: 'scores',
          detail: false,
          from: '',
          query: ''
        });
      } else {
        route({
          view: 'room',
          room: id,
          detail: false,
          from: '',
          section: 'all',
          item: '',
          flowTopic: '',
          newsQuery: '',
          newsCountry: 'all',
          newsMode: 'titles',
          ...extra
        });
      }
      window.scrollTo({
        top: 0
      });
      if (extra.item) requestAnimationFrame(() => {
        const target = document.querySelector('#explore-view [data-focus-item="' + extra.item + '"]');
        if (target) {
          target.scrollIntoView({
            block: 'center'
          });
          target.focus({
            preventScroll: true
          });
        }
      });
    }
    function directoryCard(m) {
      return `<article class="original-menu-card" data-menu-id="${m.id}"><button class="directory-open" data-room="${m.id}" aria-label="${m.name} ${m.preview ? UI_quest_rooms_js.text("text_2ea518572694") : UI_quest_rooms_js.text("text_b3597e3fae6d")}"><span class="menu-symbol ${m.tone}">${glyph(m.icon)}</span><span class="directory-label"><span class="directory-name">${m.name}${m.legacy ? `<small>${m.legacy}</small>` : ''}</span><span class="directory-copy">${m.copy}</span></span><span class="directory-arrow" aria-hidden="true">›</span></button>${sourceAction(m, '', 'directory-source')}</article>`;
    }
    function workflowCard(m) {
      const n = links.workflow.indexOf(m.id) + 1;
      return `<article class="workflow-card" data-menu-id="${m.id}"><button data-room="${m.id}" class="workflow-open"><span class="workflow-number">${n}</span><span><strong>${m.short || m.name}</strong><small>${m.copy}</small></span><span class="workflow-chevron">›</span></button>${sourceAction(m, '', 'directory-source')}</article>`;
    }
    function workflowDirectory(matches) {
      const groups = [[UI_quest_rooms_js.text("text_dd3551615472"), UI_quest_rooms_js.text("text_e96bf4b4b77a"), ['meeting', 'ops']], [UI_quest_rooms_js.text("text_4c6f4a72ab36"), UI_quest_rooms_js.text("text_aee9e8a4fe10"), ['strategy', 'recommend']], [UI_quest_rooms_js.text("text_5cc75b7595b9"), UI_quest_rooms_js.text("text_0be9171870c3"), ['decision', 'newbuy']]];
      const columns = groups.map(([name, copy, ids]) => ({
        name,
        copy,
        items: ids.map(menu).filter(m => matches.includes(m))
      })).filter(g => g.items.length);
      if (!columns.length) return '';
      return UI_quest_rooms_js.tpl("template_8d171c095a0a", columns.map(g => `<section><header><h3>${g.name}</h3><p>${g.copy}</p></header>${g.items.map(workflowCard).join('')}</section>`).join(''));
    }
    function directory() {
      const q = get().menuQuery.trim().toLowerCase();
      const matches = catalog.filter(m => `${m.name} ${m.legacy || ''} ${m.alias || ''} ${m.copy}`.toLowerCase().includes(q));
      const originals = matches.filter(m => m.group === 'original'),
        entries = matches.filter(m => m.group === 'entry'),
        extras = matches.filter(m => m.group === 'preview');
      const panels = links.sections.map(section => ({
        ...section,
        menus: section.items.map(menu).filter(m => originals.includes(m))
      })).filter(section => section.menus.length);
      return UI_quest_rooms_js.tpl("template_28080ab5cc6e", glyph('compass'), esc(get().menuQuery), operatingBase ? 'connected' : '', operatingBase ? UI_quest_rooms_js.text("text_5dbf9b4c2a53") : UI_quest_rooms_js.text("text_eb071c7a7473"), q ? UI_quest_rooms_js.tpl("template_c4a0e48bfdac", originals.length) : UI_quest_rooms_js.text("text_c6d4c925d131"), workflowDirectory(originals), panels.length ? UI_quest_rooms_js.tpl("template_b364323e7f5a", panels.map(section => `<section class="directory-panel" aria-labelledby="menu-group-${section.id}"><header><span class="group-glyph">${glyph(section.icon)}</span><div><h2 id="menu-group-${section.id}">${section.title}</h2><p>${section.copy}</p></div><small>${section.menus.length}</small></header><div>${section.menus.map(directoryCard).join('')}</div></section>`).join('')) : '', !matches.length ? empty(UI_quest_rooms_js.text("text_342c7efda971"), UI_quest_rooms_js.text("text_5105972a9830")) : '', extras.length ? UI_quest_rooms_js.tpl("template_ed4afe4735e9", extras.map(m => roomButton(m.id, m.name)).join('')) : '', entries.length ? UI_quest_rooms_js.tpl("template_d7eba645e167", entries.map(m => sourceAction(m, m.name)).join('')) : '');
    }
    function flowStock() {
      const state = get();
      const cohort = candidateIds.map(stock).filter(s => !state.flowTopic || topic(state.flowTopic).stockIds.includes(s.id));
      if (state.item) return state.room === 'recommend' ? cohort.find(s => s.id === state.item) : stock(state.item);
      if (state.room === 'recommend') return cohort[0];
      if (state.room === 'strategy') {
        const filtered = cohort.filter(s => state.section === 'all' || lanes[s.id].includes(state.section));
        if (filtered.length === 1) return filtered[0];
      }
      if (state.room === 'newbuy') return stock(newbuyIds[0]);
      return null;
    }
    function stageNavigate(id, extra = {}) {
      const current = get(),
        chosen = Object.hasOwn(extra, 'item') ? stock(extra.item) : flowStock(),
        chosenTopic = topics.find(t => t.stockIds.includes(chosen?.id));
      const selectedTopic = extra.topic || chosenTopic?.id || current.flowTopic || current.topic;
      if (chosen && (id === 'newbuy' && !newbuyIds.includes(chosen.id) || id === 'decision' && !decisionIds.includes(chosen.id))) return;
      navigate(id, {
        topic: selectedTopic,
        flowTopic: extra.flowTopic !== undefined ? extra.flowTopic : current.flowTopic,
        item: chosen?.id || '',
        ...extra
      });
    }
    function workflowProgress() {
      const current = get(),
        at = links.workflow.indexOf(current.room);
      if (at < 0) return '';
      const selected = flowStock();
      return UI_quest_rooms_js.tpl("template_d56d21ef176c", links.workflow.map((id, n) => {
        const m = menu(id),
          off = selected && (id === 'newbuy' && !newbuyIds.includes(selected.id) || id === 'decision' && !decisionIds.includes(selected.id));
        return `<button data-flow-stage="${id}" ${off ? 'disabled aria-disabled="true"' : ''} ${id === current.room ? 'aria-current="step"' : ''}><span>${n + 1}</span><strong>${m.short || m.name}</strong>${off ? UI_quest_rooms_js.text("text_7ae40e89c524") : ''}</button>`;
      }).join(''));
    }
    function context() {
      return '';
    }
    function continuation() {
      return '';
    }
    function bridge() {
      const m = menu(get().room);
      return UI_quest_rooms_js.tpl("template_6ec4c81fa381", m.tone, glyph(m.icon), m.name, m.lead, sourceAction(m, m.name + UI_quest_rooms_js.raw("text_38c401014575"), 'bridge-open'));
    }
    function headline(a) {
      return `<span class="news-title-text" data-news-title="${a.id}" data-title-fallback="${esc(a.title)}">${esc(a.title)}</span><small class="title-origin-note" data-title-status="${a.id}"></small>`;
    }
    function articleCard(a) {
      return UI_quest_rooms_js.tpl("template_75c1f4aa3d79", get().item === a.id ? 'is-focused' : '', a.id, a.time, badge(a.state, a.kind === 'direct' ? 'teal' : a.kind === 'pending' ? 'amber' : 'gray'), a.country, topic(a.topic).name, a.id, headline(a), a.summary, a.stock ? stockButton(a.stock) : `<span>${a.kind === 'pending' ? UI_quest_rooms_js.text("text_30f8c5aa4ff8") : UI_quest_rooms_js.text("text_ba6c18d57115")}</span>`, a.id);
    }
    function newsItems(section = 'all', query = '', country = 'all') {
      const q = query.trim().toLowerCase();
      return articles.filter(a => (section === 'all' || section === 'held' && a.stock && stock(a.stock).group === 'held' || section === 'candidate' && a.stock && stock(a.stock).group === 'candidate' || section === 'industry' && a.kind === 'industry' || section === 'pending' && a.kind === 'pending') && (country === 'all' || country === 'other' && ![UI_quest_rooms_js.raw("text_8f81db7db55a"), UI_quest_rooms_js.raw("text_664cbf66088c")].includes(a.country) || a.country === country) && (!q || `${a.title} ${window.HokutoText?.demoJapaneseTitles[a.id] || ''} ${a.summary} ${a.country} ${topic(a.topic).name} ${a.stock ? stock(a.stock).name : ''}`.toLowerCase().includes(q))).sort((a, b) => b.time.localeCompare(a.time));
    }
    function headlineRow(a, home = false) {
      return `<li class="${home ? 'home-headline' : 'headline-row'} ${get().item === a.id ? 'is-focused' : ''}" data-focus-item="${a.id}" tabindex="-1"><time datetime="2026-10-16T${a.time}:00+09:00">${a.time}</time><button ${home ? 'data-headline' : 'data-article'}="${a.id}">${headline(a)}</button><span class="headline-state">${esc(a.state)}</span></li>`;
    }
    function homeNews() {
      const items = newsItems(),
        first = items.slice(0, 3),
        rest = items.slice(3),
        expanded = get().headlinesExpanded;
      return UI_quest_rooms_js.tpl("template_9e5f0af311c2", items.length, roomButton('news', UI_quest_rooms_js.text("text_283d7183f4f2")), first.map(a => headlineRow(a, true)).join(''), rest.length ? `<div class="home-more"><button data-headlines-expand aria-expanded="${expanded}" aria-controls="more-headlines">${expanded ? UI_quest_rooms_js.text("text_de0fcac8aee6") : UI_quest_rooms_js.raw("text_18bc24068f24") + rest.length + UI_quest_rooms_js.raw("text_008052c7b4ef")} <span aria-hidden="true">${expanded ? '↑' : '↓'}</span></button>${expanded ? `<ul class="home-headline-list" id="more-headlines">${rest.map(a => headlineRow(a, true)).join('')}</ul>` : '<div id="more-headlines" hidden></div>'}</div>` : '', sourceAction(menu('news'), UI_quest_rooms_js.text("text_3682fd3e7cfe")));
    }
    function news() {
      const state = get(),
        items = newsItems(state.section, state.newsQuery, state.newsCountry),
        all = newsItems();
      const filters = [['all', UI_quest_rooms_js.text("text_20c7532d5971")], ['held', UI_quest_rooms_js.text("text_85ffa900fb6b")], ['candidate', UI_quest_rooms_js.text("text_5ed3f1a3cf5a")], ['industry', UI_quest_rooms_js.text("text_53b936809e55")], ['pending', UI_quest_rooms_js.text("text_e48762415cea")]].map(([id, label]) => [id, label + ' ' + newsItems(id).length]);
      return UI_quest_rooms_js.tpl("template_08ea71142dc4", all.length, esc(state.newsQuery), state.newsCountry === 'all' ? 'selected' : '', state.newsCountry === UI_quest_rooms_js.raw("text_8f81db7db55a") ? 'selected' : '', state.newsCountry === UI_quest_rooms_js.raw("text_664cbf66088c") ? 'selected' : '', state.newsCountry === 'other' ? 'selected' : '', chips(filters, state.section, 'data-room-filter', UI_quest_rooms_js.text("text_d482ed36dd68")), items.length, all.length, chips([['titles', UI_quest_rooms_js.text("text_b2e86d4a6579")], ['analysis', UI_quest_rooms_js.text("text_18679d35c86c")]], state.newsMode, 'data-news-mode', UI_quest_rooms_js.text("text_83919757e264")), items.length ? state.newsMode === 'analysis' ? `<div class="news-feed">${items.map(articleCard).join('')}</div>` : `<ul class="news-headline-list">${items.map(a => headlineRow(a)).join('')}</ul>` : UI_quest_rooms_js.tpl("template_8225e21cb321"), all.length, sourceAction(menu('news'), UI_quest_rooms_js.text("text_867322ae4227")), stockButton('DEMO-A', UI_quest_rooms_js.text("text_4d8283b7f410"), 'history'), roomButton('themes', UI_quest_rooms_js.text("text_bd15701463dd")));
    }
    function showArticle(id) {
      const a = articles.find(a => a.id === id);
      if (!a) return;
      const s = a.stock ? stock(a.stock) : null;
      openDialog(UI_quest_rooms_js.tpl("template_bda3f0719a95", a.time, headline(a), badge(a.state, a.kind === 'direct' ? 'teal' : a.kind === 'pending' ? 'amber' : 'gray'), a.summary, a.proof, a.unknown, s ? latest(s).input : a.kind === 'pending' ? UI_quest_rooms_js.text("text_9a9a2b17a6e7") : UI_quest_rooms_js.text("text_c2ea82e58674")));
    }
    function themes() {
      const t = topic(get().topic),
        related = articles.filter(a => a.topic === t.id);
      return UI_quest_rooms_js.tpl("template_a7b27b7225cb", topics.map(x => UI_quest_rooms_js.tpl("template_5455167bcf42", x.id === t.id ? 'selected' : '', x.id, x.id === t.id, x.tone, x.name, articles.filter(a => a.topic === x.id).length, x.stockIds.length)).join(''), t.name, t.copy, icon('clock'), t.next, t.stockIds.map(id => `<div>${stockIdentity(stock(id))}${stockButton(id, UI_quest_rooms_js.text("text_a79e04bd6f1d"))}</div>`).join(''), related.length ? related.map(articleCard).join('') : note(UI_quest_rooms_js.text("text_c5fb3e71b25f")), t.id);
    }
    function research() {
      const t = topic(get().topic);
      return UI_quest_rooms_js.tpl("template_d8a9873beda4", badge(UI_quest_rooms_js.text("text_2a0b9cd2d3cd"), 'gray'), topics.map(x => UI_quest_rooms_js.tpl("template_03e35ecc4a56", x.id === t.id ? 'selected' : '', x.id, x.id === t.id, x.rank, x.name, x.previous, x.rank, colorClass(x.return20), signed(x.return20), FMT_quest_rooms_js.fixed(x.money20, 1))).join(''), note(UI_quest_rooms_js.text("text_c11d08f202d3")), t.name, FMT_quest_rooms_js.fixed(t.money20, 1), FMT_quest_rooms_js.fixed(t.money60, 1), t.copy, t.stockIds.map(id => `<div class="research-stock">${stockIdentity(stock(id))}${stockButton(id, UI_quest_rooms_js.text("text_f93d89454510"))}</div>`).join(''), t.id, roomButton('strategy', UI_quest_rooms_js.text("text_192939ee4ce4")));
    }
    // The remaining rooms share this same shell and stock fixture.
    function decisionButton(s) {
      return decisionIds.includes(s.id) ? UI_quest_rooms_js.tpl("template_9532f5ec1bcf", s.id) : `<span class="route-unavailable">${s.group === 'held' ? UI_quest_rooms_js.text("text_17ffce12c964") : UI_quest_rooms_js.text("text_6e7832720ae6")}</span>`;
    }
    function tradingAction(s) {
      if (s.group === 'held') return UI_quest_rooms_js.tpl("template_91e602e92ec0", s.id);
      if (s.decision === UI_quest_rooms_js.raw("text_9bdf57df1323") && newbuyIds.includes(s.id)) return UI_quest_rooms_js.tpl("template_5b26946cb5d7", s.id);
      return `<span class="route-unavailable">${s.decision === UI_quest_rooms_js.raw("text_9bdf57df1323") ? UI_quest_rooms_js.text("text_2105b456640f") : s.decision + UI_quest_rooms_js.raw("text_e9a8eeb1dd47")}</span>`;
    }
    function meeting() {
      const current = topic(get().topic),
        stars = topics.filter(t => themeStates[t.id].kind === 'star'),
        arrows = topics.filter(t => themeStates[t.id].money);
      return UI_quest_rooms_js.tpl("template_e87a2610d194", [['★', UI_quest_rooms_js.text("text_2868f48a5144"), stars.length], ['↗', UI_quest_rooms_js.text("text_1dff5db5d161"), arrows.length], ['▤', UI_quest_rooms_js.text("text_7acd15a99555"), topics.length]].map(([symbol, label, n]) => UI_quest_rooms_js.tpl("template_bf4f92717be5", symbol, label, n)).join(''), topics.map(t => {
        const f = themeStates[t.id];
        return UI_quest_rooms_js.tpl("template_8140d2d1fd25", t.id === current.id ? 'selected' : '', t.id, t.id === current.id, t.tone, t.name, colorClass(t.return20), signed(t.return20), colorClass(f.return60), signed(f.return60), badge(f.label, f.kind === 'star' ? 'teal' : f.kind === 'arrow' ? 'amber' : 'gray'), f.money && f.kind === 'star' ? badge(UI_quest_rooms_js.text("text_79d3fdd1185d"), 'amber') : '', f.converted ? badge(UI_quest_rooms_js.text("text_2648a677b95d"), 'teal') : '', FMT_quest_rooms_js.fixed(t.money20, 2), t.stockIds.length);
      }).join(''), current.name, themeStates[current.id].previous, themeStates[current.id].label, themeStates[current.id].converted ? UI_quest_rooms_js.text("text_724e9ae0c781") : '', note(UI_quest_rooms_js.text("text_12a0cea8e03a")));
    }
    function operations() {
      return api.focusViews.operations();
    }
    function flowSelection() {
      const id = get().flowTopic;
      return id ? UI_quest_rooms_js.tpl("template_0b8756159774", topic(id).name) : '';
    }
    function strategy() {
      const state = get(),
        cohort = candidateIds.map(stock).filter(s => !state.flowTopic || topic(state.flowTopic).stockIds.includes(s.id));
      const items = cohort.filter(s => state.section === 'all' || lanes[s.id].includes(state.section));
      const reasons = {
        A: UI_quest_rooms_js.text("text_ddeb1cd4f286"),
        B: UI_quest_rooms_js.text("text_49c72069a7b6"),
        C: UI_quest_rooms_js.text("text_1118b63278a2"),
        D: UI_quest_rooms_js.text("text_02649e9dcff8")
      };
      return flowSelection() + UI_quest_rooms_js.tpl("template_ebd477a63a6b", window.HokutoText.copy.focus.sourceHelp, cohort.filter(s => lanes[s.id].length).length, cohort.filter(s => !lanes[s.id].length).length, chips([['all', UI_quest_rooms_js.raw("text_7c844aa6aa58") + cohort.length], ...['A', 'B', 'C', 'D'].map(l => [l, l + UI_quest_rooms_js.raw("text_1c09d940bedb") + cohort.filter(s => lanes[s.id].includes(l)).length])], state.section, 'data-room-filter', UI_quest_rooms_js.text("text_fdca5b097a18")), items.map(s => UI_quest_rooms_js.tpl("template_b62c6656a1ab", state.item === s.id ? 'is-focused' : '', s.id, stockIdentity(s), api.focusViews.source(s.id, lanes[s.id]), lanes[s.id].length ? lanes[s.id].map(l => badge(l + UI_quest_rooms_js.raw("text_8943442f8834"), 'blue')).join(' ') : badge(UI_quest_rooms_js.text("text_6e5ad169f3a1"), 'gray'), lanes[s.id].length ? lanes[s.id].map(l => reasons[l]).join(' / ') : UI_quest_rooms_js.text("text_8a7402fb9f91"), s.group === 'held' ? UI_quest_rooms_js.text("text_de62740a9e6e") : UI_quest_rooms_js.text("text_dd4faea46267"), s.id)).join(''), !items.length ? empty(UI_quest_rooms_js.text("text_4edd689e48b7"), UI_quest_rooms_js.text("text_1a0b6e1d697b")) : '', note(UI_quest_rooms_js.text("text_c80e084dbeea")));
    }
    function verification() {
      const state = get(),
        cohort = candidateIds.map(stock).filter(s => !state.flowTopic || topic(state.flowTopic).stockIds.includes(s.id));
      const s = state.item ? cohort.find(s => s.id === state.item) : cohort[0];
      if (!s) return flowSelection() + `<section class="room-paper room-reading">${empty(UI_quest_rooms_js.text("text_50ed95d66d69"), UI_quest_rooms_js.text("text_230f5d86d824"))}${roomButton('strategy', UI_quest_rooms_js.text("text_48ceb277ee3f"))}</section>`;
      const c = companyChecks[s.id],
        fmt = v => v == null ? UI_quest_rooms_js.text("text_79d781c70d9a") : priceText(v) + UI_quest_rooms_js.raw("text_006a67840f24");
      return flowSelection() + UI_quest_rooms_js.tpl("template_92a18fa5cfd0", cohort.map(x => `<button class="trade-select ${x.id === s.id ? 'selected' : ''}" data-room-item="${x.id}" aria-pressed="${x.id === s.id}">${stockIdentity(x)}<small>${companyChecks[x.id].status}</small></button>`).join(''), s.id, stockIdentity(s), badge(c.status, c.status === UI_quest_rooms_js.raw("text_77f5dfee87b0") ? 'teal' : 'gray'), c.reason, fmt(c.eps), fmt(c.forecast), c.at || UI_quest_rooms_js.text("text_6e4355754569"), lanes[s.id].join(' · ') || UI_quest_rooms_js.text("text_79d781c70d9a"), c.forecast == null ? UI_quest_rooms_js.text("text_d6bdc616ef48") : UI_quest_rooms_js.text("text_0ade978efd2a"), latest(s).next, decisionButton(s), stockButton(s.id, UI_quest_rooms_js.text("text_5bea679417f5")), note(UI_quest_rooms_js.text("text_aeda11539645")));
    }
    function morningObservation(s) {
      const received = get().section === 'intraday';
      return UI_quest_rooms_js.tpl("template_7677b9bac339", badge(UI_quest_rooms_js.text("text_d851b51db492"), 'amber'), !received, received, priceText(s.price), received ? UI_quest_rooms_js.text("text_6e8c5be6fb89") : UI_quest_rooms_js.text("text_748e9faaf008"), received ? UI_quest_rooms_js.text("text_06122b05d1f6") : UI_quest_rooms_js.text("text_748e9faaf008"), received ? '10.19 09:10' : '—', received ? '10.19 09:30' : '—', received ? UI_quest_rooms_js.text("text_7ecd945755a0") : UI_quest_rooms_js.text("text_ea73b742fc50"));
    }
    function decisions() {
      const state = get(),
        all = decisionIds.map(stock),
        items = all.filter(s => state.section === 'all' || s.decision === state.section);
      const counts = [['all', all.length, 'gray'], ...[UI_quest_rooms_js.raw("text_9bdf57df1323"), UI_quest_rooms_js.raw("text_79609dca6327"), UI_quest_rooms_js.raw("text_59eb79987971")].map(label => [label, all.filter(s => s.decision === label).length, label === UI_quest_rooms_js.raw("text_9bdf57df1323") ? 'teal' : 'gray'])];
      return UI_quest_rooms_js.tpl("template_5f1005a0429a", counts.map(([label, n, tone]) => UI_quest_rooms_js.tpl("template_8a4959cb993b", tone, label, state.section === label, label === 'all' ? UI_quest_rooms_js.text("text_20c7532d5971") : label, n)).join(''), items.length ? `<div class="decision-stack">${items.map(s => UI_quest_rooms_js.tpl("template_6b5ccf94f3f4", state.item === s.id ? 'is-focused' : '', s.id, stockIdentity(s), badge(s.decision, s.decision === UI_quest_rooms_js.raw("text_9bdf57df1323") ? 'teal' : 'gray'), s.group === 'held' ? UI_quest_rooms_js.text("text_e28399c517d4") : latest(s).summary, latest(s).next, s.id, stockButton(s.id, UI_quest_rooms_js.text("text_b4351632fd5b")), tradingAction(s))).join('')}</div>` : empty(UI_quest_rooms_js.text("text_8ec3d8e3738a"), UI_quest_rooms_js.text("text_e41cd1ce8c2b")), api.focusViews.nonFocusStars(), note(UI_quest_rooms_js.text("text_5feeef3dc57c")));
    }
    function trading() {
      const state = get(),
        isHoldings = state.room === 'holdings';
      const choices = stocks.filter(s => isHoldings ? s.group === 'held' : newbuyIds.includes(s.id) && s.group !== 'held' && s.decision === UI_quest_rooms_js.raw("text_9bdf57df1323"));
      const s = state.item ? choices.find(s => s.id === state.item) : choices[0];
      if (!s) {
        const requested = stock(state.item);
        return `<section class="room-paper room-reading">${empty(isHoldings ? UI_quest_rooms_js.text("text_0bc3fac7a935") : UI_quest_rooms_js.text("text_aa31fcf391d5"), requested ? requested.name + ' · ' + requested.decision : UI_quest_rooms_js.text("text_08cd7cdf84ad"))}${requested ? decisionButton(requested) : ''}${roomButton(isHoldings ? 'holdings' : 'newbuy', UI_quest_rooms_js.text("text_60dfc66eb0c5"))}</section>`;
      }
      const linkedNews = articles.find(a => a.stock === s.id && a.kind === 'direct');
      return UI_quest_rooms_js.tpl("template_46405af399b2", isHoldings ? UI_quest_rooms_js.text("text_fd9f704e3715") : UI_quest_rooms_js.text("text_aa42618d233c"), choices.length, isHoldings ? UI_quest_rooms_js.text("text_1f32da35eee9") : UI_quest_rooms_js.text("text_4926dff7e8ad"), choices.map(x => `<button class="trade-select ${x.id === s.id ? 'selected' : ''}" data-room-item="${x.id}" aria-pressed="${x.id === s.id}">${stockIdentity(x)}<small>${isHoldings ? badge(UI_quest_rooms_js.raw("text_0313a90b9106") + x.badge, x.tone) : UI_quest_rooms_js.text("text_cc8d6dc09211")}</small></button>`).join(''), s.id, isHoldings ? UI_quest_rooms_js.text("text_b727a297e84b") : '', stockIdentity(s), isHoldings ? statusChips(s) : badge(s.decision, 'teal'), isHoldings ? UI_quest_rooms_js.tpl("template_2d4ed0175a41", latest(s).change) : '', priceText(s.price), s.price == null ? '' : UI_quest_rooms_js.text("text_0424ea8f6cde"), colorClass(s.change), signed(s.change), bigChart(s, 'room-chart-fill'), icon('clock'), isHoldings ? UI_quest_rooms_js.text("text_1fdac222d7c4") : UI_quest_rooms_js.text("text_16f4bdb7dc7f"), isHoldings ? UI_quest_rooms_js.text("text_4ad90b3b5544") : UI_quest_rooms_js.text("text_ec7de6fe0ca1"), isHoldings ? latest(s).next : UI_quest_rooms_js.text("text_7b954e3530c0"), s.decision, s.timing, isHoldings ? '' : morningObservation(s), isHoldings ? decisionButton(s) : '', linkedNews ? UI_quest_rooms_js.tpl("template_80c24f9a4194", s.id) : UI_quest_rooms_js.text("text_a4ed947fc423"), stockButton(s.id, UI_quest_rooms_js.text("text_03b75ee71db5")), note(isHoldings ? UI_quest_rooms_js.text("text_c234c5c1f235") : UI_quest_rooms_js.text("text_fa8c68826c49")));
    }
    function signals() {
      const fixtures = [{
        name: UI_quest_rooms_js.text("text_2e59e3a677a4"),
        state: UI_quest_rooms_js.text("text_d66aea42104e"),
        tone: 'teal',
        values: ['−22.0%', '27.0', '−4 → −2'],
        met: [true, true, true]
      }, {
        name: UI_quest_rooms_js.text("text_7c1741be785f"),
        state: UI_quest_rooms_js.text("text_0e19684bb470"),
        tone: 'gray',
        values: ['−21.0%', '35.0', '−4 → −2'],
        met: [true, false, true]
      }, {
        name: UI_quest_rooms_js.text("text_68a92fb593c3"),
        state: UI_quest_rooms_js.text("text_2032e0d3d120"),
        tone: 'amber',
        values: [UI_quest_rooms_js.text("text_e37cb85e37fa"), UI_quest_rooms_js.text("text_e37cb85e37fa"), UI_quest_rooms_js.text("text_e37cb85e37fa")],
        met: [null, null, null]
      }];
      return UI_quest_rooms_js.tpl("template_6cdaa86ee1a7", glyph('pulse'), fixtures.map((f, i) => UI_quest_rooms_js.tpl("template_af5215c67932", i + 1, f.name, badge(f.state, f.tone), [UI_quest_rooms_js.text("text_633d59aba31d"), 'RSI14 < 30', UI_quest_rooms_js.text("text_3a6885915a97")].map((label, j) => `<div><dt>${label}</dt><dd><b>${f.values[j]}</b><span class="${f.met[j] === false ? 'down' : ''}">${f.met[j] === null ? UI_quest_rooms_js.text("text_2032e0d3d120") : f.met[j] ? UI_quest_rooms_js.text("text_5887ea0ff80c") : UI_quest_rooms_js.text("text_fb8ae4d3f14b")}</span></dd></div>`).join(''), i === 0 ? UI_quest_rooms_js.text("text_ebbc3b25c3d2") : i === 1 ? UI_quest_rooms_js.text("text_a4823ca6c09f") : UI_quest_rooms_js.text("text_c23a3f671718"))).join(''), note(UI_quest_rooms_js.text("text_8e429bfa31cd")));
    }
    function records() {
      const state = get(),
        dates = ['2026-10-16', '2026-10-13', '2026-09-08'];
      const date = dates.includes(state.section) ? state.section : dates[0];
      const items = stocks.map(s => ({
        s,
        r: s.records.find(r => r.date === date)
      })).filter(x => x.r);
      return UI_quest_rooms_js.tpl("template_4c99b3b84bc5", badge(UI_quest_rooms_js.text("text_f8f38d22046a"), 'gray'), chips(dates.map(d => [d, FMT_quest_rooms_js.date(d, "short") + (d === dates[0] ? UI_quest_rooms_js.text("text_6b6e5cab3d90") : '')]), date, 'data-room-filter', UI_quest_rooms_js.text("text_3af22a2e0df2")), items.map(({
        s,
        r
      }) => UI_quest_rooms_js.tpl("template_7cc6bb1fbd84", FMT_quest_rooms_js.date(r.date, "short"), stockIdentity(s), badge(r.status, r.status === UI_quest_rooms_js.raw("text_0d994341a3cc") ? 'amber' : 'gray'), r.change, icon('file'), r.inputAt, priceText(r.price), r.price == null ? '' : UI_quest_rooms_js.text("text_006a67840f24"), s.id, r.date)).join(''), icon('book'), roomButton('scores', UI_quest_rooms_js.text("text_697905eb2c79")));
    }
    function changes() {
      const changed = stocks.filter(s => s.changed),
        unchanged = stocks.filter(s => !s.changed && s.price != null);
      return UI_quest_rooms_js.tpl("template_f84d26982aaf", changed.length, changed.map(s => {
        const old = s.records[s.records.length - 2],
          r = latest(s);
        return UI_quest_rooms_js.tpl("template_c46d9bddb281", stockIdentity(s), badge(old.status, 'gray'), badge(r.status, s.tone), r.change, r.next, stockButton(s.id, UI_quest_rooms_js.text("text_39123f082eec"), 'history'));
      }).join(''), unchanged.map(s => `<div class="unchanged-stock">${stockButton(s.id)}<p>${s.update}</p></div>`).join(''), stockButton('DEMO-G', UI_quest_rooms_js.text("text_150c5546ea1e")), roomButton('research', UI_quest_rooms_js.text("text_be521315119c")));
    }
    function space() {
      return UI_quest_rooms_js.tpl("template_f49052bc416d");
    }
    const renderers = {
      meeting,
      ops: operations,
      strategy,
      recommend: verification,
      news,
      themes,
      research,
      decision: decisions,
      holdings: trading,
      newbuy: trading,
      signals,
      performance: () => api.focusViews.results('performance'),
      selection: () => api.focusViews.results('selection'),
      records: () => api.focusViews.results('performance'),
      park: changes
    };
    function focusTopic(id) {
      const scope = document.querySelector('#explore-view');
      const remove = selector => scope.querySelectorAll(selector).forEach(x => x.remove());
      if (id === 'news') {
        scope.querySelectorAll('.room-aside section').forEach(x => {
          if (x.querySelector('h3')?.textContent === UI_quest_rooms_js.raw("text_5dc91b47a42b")) x.remove();
        });
      }
      if (id === 'ops') scope.querySelectorAll('[data-strategy-topic]').forEach(b => {
        const t = topic(b.dataset.strategyTopic);
        if (!candidateIds.some(id => t.stockIds.includes(id) && lanes[id].length)) b.remove();
      });
      if (id === 'decision') {
        remove('[data-verify-stock]');
        scope.querySelectorAll('[data-trading-stock]').forEach(b => {
          if (stock(b.dataset.tradingStock)?.group === 'held') b.remove();
        });
      }
      if (id === 'holdings' || id === 'newbuy') {
        remove('[data-decision-stock]');
        const label = scope.querySelector('.same-stock-links>span');
        if (label) label.textContent = UI_quest_rooms_js.text("text_411f8e61dc6e");
      }
      if (id === 'records') remove('[data-room="scores"]');
      if (id === 'park') scope.querySelectorAll('.room-aside section').forEach(x => {
        if (x.querySelector('h3')?.textContent === UI_quest_rooms_js.raw("text_6e3f194ee78d")) x.remove();
      });
      scope.querySelectorAll('.news-related [data-local-record]').forEach(b => {
        const span = document.createElement('span');
        span.textContent = stock(b.dataset.localRecord).name;
        b.replaceWith(span);
      });
    }
    function render() {
      const state = get(),
        isMenu = state.view === 'menu';
      const m = menu(state.room);
      document.querySelector('#explore-view').innerHTML = isMenu ? directory() : (renderers[m.id] || bridge)();
      focusTopic(m.id);
      document.querySelector('#page-heading h1').textContent = isMenu ? UI_quest_rooms_js.text("text_e3d44cb9b0fd") : m.name;
      const newLeads = {
        ops: window.HokutoText.copy.focus.opsLead,
        strategy: window.HokutoText.copy.focus.strategyLead,
        performance: window.HokutoText.copy.focus.performanceHelp,
        selection: window.HokutoText.copy.focus.selectionHelp
      };
      document.querySelector('#page-heading p').textContent = isMenu ? UI_quest_rooms_js.text("text_c8c86490b81e") : newLeads[m.id] || m.lead;
      document.querySelector('#page-heading .eyebrow').textContent = isMenu ? UI_quest_rooms_js.text("text_5f2804d67017") : m.group === 'preview' ? UI_quest_rooms_js.text("text_3063b2d56b14") : m.owner || UI_quest_rooms_js.text("text_1f65bef4b9ba");
      document.title = UI_quest_rooms_js.tpl("template_fe237a31fd7c", isMenu ? UI_quest_rooms_js.text("text_bc8c7e0100bb") : m.name);
    }
    function onClick(b) {
      if (b.hasAttribute('data-connect-settings')) {
        connectionDialog();
        return true;
      }
      if (b.hasAttribute('data-connect-source')) {
        connectionDialog(b.dataset.connectSource);
        return true;
      }
      if (b.hasAttribute('data-save-connection')) {
        saveConnection();
        return true;
      }
      if (b.dataset.alertRoom) {
        navigate(b.dataset.alertRoom, {
          item: b.dataset.alertItem || '',
          ...(b.dataset.alertRoom === 'news' ? {
            newsMode: 'analysis'
          } : {})
        });
        return true;
      }
      if (b.hasAttribute('data-menu-home')) {
        route({
          view: 'menu',
          detail: false,
          from: '',
          menuQuery: ''
        });
        window.scrollTo({
          top: 0
        });
        return true;
      }
      if (b.dataset.flowStage) {
        stageNavigate(b.dataset.flowStage);
        return true;
      }
      if (b.dataset.flowNext) {
        const t = get().flowTopic || get().topic;
        stageNavigate(b.dataset.flowNext, {
          flowTopic: ['ops', 'strategy'].includes(b.dataset.flowNext) ? t : get().flowTopic
        });
        return true;
      }
      if (b.dataset.flowTopic) {
        route({
          topic: b.dataset.flowTopic,
          flowTopic: b.dataset.flowTopic,
          item: ''
        }, true);
        return true;
      }
      if (b.dataset.strategyTopic) {
        stageNavigate('strategy', {
          topic: b.dataset.strategyTopic,
          flowTopic: b.dataset.strategyTopic,
          item: ''
        });
        return true;
      }
      if (b.hasAttribute('data-clear-flow-topic')) {
        route({
          flowTopic: '',
          section: 'all'
        }, true);
        return true;
      }
      if (b.dataset.verifyStock) {
        const s = stock(b.dataset.verifyStock),
          t = topics.find(t => t.stockIds.includes(s?.id));
        navigate('recommend', {
          item: s?.id || '',
          topic: t?.id || get().topic,
          flowTopic: t?.id || ''
        });
        return true;
      }
      if (b.dataset.quoteView) {
        route({
          section: b.dataset.quoteView
        }, true);
        return true;
      }
      if (b.dataset.room) {
        navigate(b.dataset.room);
        return true;
      }
      if (b.dataset.roomFilter) {
        route({
          section: b.dataset.roomFilter
        }, true);
        return true;
      }
      if (b.dataset.topic) {
        route({
          topic: b.dataset.topic
        }, true);
        return true;
      }
      if (b.dataset.article) {
        showArticle(b.dataset.article);
        return true;
      }
      if (b.dataset.headline) {
        showArticle(b.dataset.headline);
        return true;
      }
      if (b.dataset.newsMode) {
        route({
          newsMode: b.dataset.newsMode
        }, true);
        return true;
      }
      if (b.hasAttribute('data-news-reset')) {
        route({
          section: 'all',
          newsQuery: '',
          newsCountry: 'all',
          item: ''
        }, true);
        return true;
      }
      if (b.dataset.articleTopic) {
        document.querySelector('#evidence-dialog').close();
        navigate('themes', {
          topic: b.dataset.articleTopic
        });
        return true;
      }
      if (b.dataset.roomItem) {
        route({
          item: b.dataset.roomItem
        }, true);
        return true;
      }
      if (b.dataset.themeResearch) {
        navigate('research', {
          topic: b.dataset.themeResearch
        });
        return true;
      }
      if (b.dataset.themeNews) {
        navigate('themes', {
          topic: b.dataset.themeNews
        });
        return true;
      }
      if (b.dataset.decisionStock) {
        if (decisionIds.includes(b.dataset.decisionStock)) stageNavigate('decision', {
          item: b.dataset.decisionStock
        });
        return true;
      }
      if (b.dataset.stockNews) {
        const article = articles.find(a => a.stock === b.dataset.stockNews && a.kind === 'direct');
        if (article) showArticle(article.id);
        return true;
      }
      if (b.dataset.tradingStock) {
        const s = stock(b.dataset.tradingStock);
        if (s?.group === 'held') navigate('holdings', {
          item: s.id
        });else if (s?.decision === UI_quest_rooms_js.raw("text_9bdf57df1323") && newbuyIds.includes(s.id)) stageNavigate('newbuy', {
          item: s.id
        });
        return true;
      }
      if (b.dataset.roomStock || b.dataset.recordStock) {
        const d = document.querySelector('#evidence-dialog');
        if (d.open) d.close();
        const id = b.dataset.roomStock || b.dataset.recordStock;
        selectStock(id, b.dataset.recordStock ? 'history' : b.dataset.roomTab || 'overview', {
          from: get().room,
          filter: 'all',
          query: '',
          date: b.dataset.recordDate || ''
        });
        return true;
      }
      if (b.id === 'return-room') {
        api.returnToOrigin();
        return true;
      }
      return false;
    }
    return {
      render,
      navigate,
      onClick,
      catalog,
      menu,
      homeNews,
      resolve: links.resolve
    };
  }
  if (typeof window !== 'undefined') window.HokutoRooms = {
    create,
    catalog
  };
  if (typeof module !== 'undefined') module.exports = {
    catalog,
    topics,
    articles,
    lanes,
    candidateIds,
    decisionIds,
    newbuyIds,
    themeStates,
    companyChecks
  };
})();
