const UI_focus_views_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_focus_views_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Rendering for the requested rule. All new display copy lives in ui-copy.js. */
(function (root) {
  'use strict';

  function create(api) {
    const {
      stocks,
      esc,
      badge,
      signed,
      latest,
      openDialog,
      getState,
      route
    } = api;
    const F = root.HokutoFocus,
      T = root.HokutoText.copy.focus;
    const theme = id => F.themes.find(t => t.id === id);
    const stock = id => stocks.find(s => s.id === id);
    const chips = (values, current, key, label) => `<div class="focus-switch" role="group" aria-label="${label}">${values.map(([value, text]) => `<button type="button" data-${key}="${value}" aria-pressed="${current === value}">${text}</button>`).join('')}</div>`;
    const source = (id, lanes, event = null) => {
      const t = F.themeForStock(id),
        abc = lanes.filter(l => ['A', 'B', 'C'].includes(l));
      const focused = event ? event.focusAtSelection : F.focusForStock(id),
        outside = event ? event.starAtSelection === false : t && !t.star;
      return `<div class="focus-source" aria-label="${T.candidateSource}">${abc.length && focused ? badge(T.sourceABC + ' ' + abc.join('·'), 'teal') : ''}${lanes.includes('D') ? badge(T.sourceD, 'blue') : ''}${!lanes.length ? badge(T.sourceUnknown) : ''}${abc.length && focused && outside ? badge(T.outside, 'amber') : ''}</div>`;
    };
    function operations() {
      return `<section class="focus-hero"><div class="focus-heading"><div><span class="focus-kicker">02 · ${T.fixture}</span><h2>${T.title}</h2><p>${T.rule}</p></div><span class="focus-count">3<span> / A·B·C</span></span></div><div class="focus-theme-grid">${F.focusIds.map((id, n) => {
        const t = theme(id);
        return `<article class="focus-theme-card"><span class="focus-rank">0${n + 1}</span><h3>${t.name}</h3>${badge(T.title, 'teal')}${t.star ? badge('★', 'gray') : badge(T.outside, 'amber')}<dl><div><dt>${T.trend}</dt><dd>+ ${T.positive}</dd></div><div><dt>${T.return20}</dt><dd>${signed(t.return20)}</dd></div></dl></article>`;
      }).join('')}</div><p class="focus-route-note">${T.scope}</p></section><section class="room-paper room-reading"><div class="section-headline"><div><h2>${T.starTitle}</h2><p>${T.starHelp}</p></div></div><div class="star-theme-list">${F.themes.filter(t => t.star).map(t => `<div><strong>★ ${t.name}</strong>${F.focusIds.includes(t.id) ? badge(T.title, 'teal') : badge(T.notFocus, 'gray')}${t.money ? badge(T.money, 'amber') : ''}${t.converted ? badge(T.converted, 'teal') : ''}<small>${T.trend}: ${t.trend6m > 0 ? T.positive : T.negative}</small></div>`).join('')}</div><p class="metric-note">${T.noTradeSignal}</p></section><section class="room-paper room-reading"><h2>${T.money}</h2><div class="focus-inline-themes">${F.themes.filter(t => t.money).map(t => `<span>${t.name}${t.converted ? ` · ${T.converted}` : ''}</span>`).join('')}</div><p>${T.dScope}</p></section>`;
    }
    function nonFocusStars() {
      return `<section class="focus-neutral"><h3>${T.notFocus}</h3><p>${T.notFocusHelp}</p><div class="focus-inline-themes">${F.themes.filter(t => t.star && !F.focusIds.includes(t.id)).map(t => `<span>★ ${t.name}</span>`).join('')}</div></section>`;
    }
    function daily() {
      const changed = stocks.filter(s => s.changed),
        delta = F.changeSummary(F.focusIds, F.previousFocusIds);
      const dailyTitle = delta.kind === 'changed' ? T.dailyChanged : delta.kind === 'unchanged' ? T.dailyUnchanged : T.dailyFirst;
      return `<div class="daily-brief-title"><h2>${T.daily}</h2><span>${T.dailyLabel}</span></div><div class="focus-daily"><span class="focus-kicker">${T.title} → A·B·C</span><h3>${dailyTitle}</h3><p>${T.dailyHelp}</p><div class="focus-inline-themes">${F.focusIds.map(id => `<span>${theme(id).name}${!theme(id).star ? ` <b>${T.outside}</b>` : ''}</span>`).join('')}</div><details><summary>${T.dailyExpand}</summary><p>${T.rule}</p><p>${T.scope}</p><p>${delta.kind === 'initial' ? T.dailyInitial : delta.kind === 'changed' ? T.entered + ' ' + delta.entered.map(id => theme(id).name).join(', ') + ' / ' + T.exited + ' ' + delta.exited.map(id => theme(id).name).join(', ') : T.dailyUnchanged}</p></details><details><summary>${T.dailyOther}</summary><p class="metric-note">${T.dailyOtherHelp}</p>${changed.map(s => `<div class="focus-daily-item"><strong>${esc(s.name)}</strong><p>${esc(latest(s).change)}</p></div>`).join('')}</details></div>`;
    }
    function resultCell(e, month, metric, dayMode = false) {
      const days = dayMode ? month : {
        1: 20,
        2: 40,
        3: 60
      }[month];
      let result = e.returns[days];
      const old = stock(e.stockId)?.evaluation;
      if (days === 20 && F.dateGroup(e.date) === 'legacy' && old && old.recordDate === e.date) result = {
        stock: old.stock,
        theme: old.stock - old.theme,
        market: old.stock - old.market
      };
      const value = result && typeof result === 'object' ? result[metric] : metric === 'stock' ? result : null;
      return Number.isFinite(value) ? signed(value, metric === 'stock' ? '%' : '%p') : `<span class="focus-pending">${T.pending}</span>`;
    }
    function results(kind = 'selection', home = false) {
      const state = getState(),
        version = home ? 'focus' : state.ruleVersion === 'legacy' ? 'legacy' : 'focus';
      const scope = home ? 'abc' : state.resultScope || 'all',
        metric = kind === 'performance' ? 'stock' : state.resultMetric || 'stock';
      const rows = F.rowsFor(version, scope),
        complete = rows.filter(e => e.returns[20] != null || version === 'legacy' && stock(e.stockId)?.evaluation?.recordDate === e.date).length;
      const performance = kind === 'performance';
      return `<section class="focus-results"><div class="focus-results-heading"><span class="focus-kicker">${home ? T.current : T.fixture}</span><h2>${home ? T.homeScore : performance ? T.performance : T.selection}</h2><p>${home ? T.homeScoreHelp : performance ? T.performanceHelp : T.selectionHelp}</p></div>${home ? '' : chips([['focus', T.current], ['legacy', T.legacy]], version, 'rule-version', T.version)}${!home && version === 'focus' ? chips([['all', T.allSources], ['abc', T.abc], ['d', T.d]], scope, 'result-scope', T.source) : ''}${!performance ? chips([['stock', T.stockReturn], ['theme', T.themeExcess], ['market', T.marketExcess]], metric, 'result-metric', T.metric) : ''}<p class="focus-sample-note">${T.cohort} ${rows.length} · ${T.completed} ${complete} · ${T.fixture}</p><div class="focus-table-scroll" tabindex="0" aria-label="${performance ? T.performance : T.selection}"><table class="focus-result-table"><thead><tr><th>${T.stock}</th><th>${T.source}</th>${performance ? `<th>${T.decision}</th>` : ''}<th>${T.month1}</th><th>${T.month2}</th><th>${T.month3}</th></tr></thead><tbody>${rows.map(e => `<tr data-result-event="${e.id}"><td><button data-focus-event="${e.id}">${esc(stock(e.stockId).name)}</button><small>${e.date} · ${theme(e.themeId).name}</small></td><td>${F.dateGroup(e.date) === 'focus' ? source(e.stockId, e.lanes, e) : badge(T.legacy)}</td>${performance ? `<td>${e.decision || T.noDecision}</td>` : ''}${[1, 2, 3].map(m => `<td>${resultCell(e, m, metric)}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${performance ? 6 : 5}">${T.empty}</td></tr>`}</tbody></table></div><p class="metric-note">${home ? T.homeScoreNote : T.historicalHelp}</p><p class="metric-note">${T.missingNote}</p><details class="focus-archive"><summary>${T.shortTerm}</summary><div class="focus-table-scroll"><table class="focus-result-table"><thead><tr><th>${T.stock}</th><th>1${T.day}</th><th>5${T.day}</th></tr></thead><tbody>${rows.map(e => `<tr><td>${esc(stock(e.stockId).name)}</td><td>${resultCell(e, 1, metric, true).replace(T.pending, T.missing)}</td><td>${resultCell(e, 5, metric, true).replace(T.pending, T.missing)}</td></tr>`).join('')}</tbody></table></div></details><p class="metric-note">${T.availableResults}</p></section>`;
    }
    function eventDetail(id) {
      const e = F.events.find(x => x.id === id);
      if (!e) return;
      const s = stock(e.stockId),
        r = s.records.find(x => x.date === e.date);
      openDialog(UI_focus_views_js.tpl("template_063be1186831", e.date, F.dateGroup(e.date) === 'focus' ? T.current : T.legacy, esc(s.name), T.eventDetail, theme(e.themeId).name, F.dateGroup(e.date) === 'focus' ? source(s.id, e.lanes, e) : '', T.decision, r ? esc(r.summary) : T.unlinked, r ? `<button class="room-text-link" data-local-record="${s.id}" data-record-date="${r.date}">${T.detail}</button>` : '', T.historicalHelp));
    }
    function onClick(b) {
      if (b.dataset.ruleVersion) {
        route({
          ruleVersion: b.dataset.ruleVersion,
          resultScope: 'all'
        }, true);
        return true;
      }
      if (b.dataset.resultScope) {
        route({
          resultScope: b.dataset.resultScope
        }, true);
        return true;
      }
      if (b.dataset.resultMetric) {
        route({
          resultMetric: b.dataset.resultMetric
        }, true);
        return true;
      }
      if (b.dataset.focusEvent) {
        eventDetail(b.dataset.focusEvent);
        return true;
      }
      return false;
    }
    return {
      operations,
      daily,
      results,
      source,
      onClick,
      nonFocusStars
    };
  }
  root.HokutoFocusViews = {
    create
  };
})(window);
