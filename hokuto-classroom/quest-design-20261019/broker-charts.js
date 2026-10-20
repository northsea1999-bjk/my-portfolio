const UI_broker_charts_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_broker_charts_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Display-only chart adapter. Does not calculate or change investment judgments. */
(() => {
  'use strict';

  const fmt = n => n == null ? '—' : window.HokutoFormat.number(n);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
  const fixture = window.HokutoChartFixture;
  const live = new Map();
  const preferences = new Map();
  let lastHomeStock = '';
  function settings(id, period) {
    if (!preferences.has(id)) preferences.set(id, {
      type: 'candles',
      period: Number(period) || 20,
      ma5: true,
      ma10: true,
      volume: true
    });
    return preferences.get(id);
  }
  // Dates without prices are whitespace, never invented candles or zero prices.
  function sixMonthWindow(bars) {
    const last = bars.at(-1).time,
      end = new Date(last + 'T00:00:00Z');
    const target = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 6, 1));
    const day = Math.min(end.getUTCDate(), new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate());
    const start = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), day + 1));
    const from = start.toISOString().slice(0, 10),
      spaces = [];
    for (const day = new Date(start); day.toISOString().slice(0, 10) < bars[0].time; day.setUTCDate(day.getUTCDate() + 1)) spaces.push({
      time: day.toISOString().slice(0, 10)
    });
    return {
      from,
      to: last,
      spaces
    };
  }
  function markup(s, period = '20') {
    if (!fixture[s.id]?.bars.length) return UI_broker_charts_js.text("text_7acaf93a518a");
    const c = settings(s.id, period);
    return UI_broker_charts_js.tpl("template_ef9269c2c2ec", esc(s.id), esc(s.name), c.type === 'candles', c.type === 'line', c.period === 5, c.period === 20, c.period === 180, c.period === 180 ? '' : 'hidden', c.ma5 ? 'checked' : '', c.ma10 ? 'checked' : '', c.volume ? 'checked' : '', esc(s.name), esc(s.name), fixture[s.id].bars.map(d => `<tr><th>${FMT_broker_charts_js.date(d.time, 'dash')}</th><td>${fmt(d.open)}</td><td>${fmt(d.high)}</td><td>${fmt(d.low)}</td><td>${fmt(d.close)}</td><td>${fmt(d.volume)}</td></tr>`).join(''));
  }
  function average(bars, n) {
    return bars.flatMap((d, i) => i < n - 1 ? [] : [{
      time: d.time,
      value: bars.slice(i - n + 1, i + 1).reduce((sum, x) => sum + x.close, 0) / n
    }]);
  }
  function quote(el, d, settings) {
    el.querySelector('.chart-quote').innerHTML = UI_broker_charts_js.tpl("template_1101a481a7c2", FMT_broker_charts_js.date(d.time, "short"), fmt(d.open), fmt(d.high), fmt(d.low), d.close >= d.open ? 'up' : 'down', fmt(d.close), fmt(d.volume));
    el.dataset.chartDate = d.time;
  }
  function mountOne(el) {
    const L = window.LightweightCharts,
      id = el.dataset.chartStock,
      bars = fixture[id].bars,
      c = settings(id),
      host = el.querySelector('.broker-canvas');
    if (!L) {
      host.innerHTML = UI_broker_charts_js.text("text_408cefe801e4");
      return;
    }
    const chart = L.createChart(host, {
      autoSize: true,
      layout: {
        background: {
          type: L.ColorType.Solid,
          color: '#ffffff'
        },
        textColor: '#52627a',
        fontSize: 12,
        fontFamily: 'Noto Sans KR, Noto Sans JP, sans-serif',
        attributionLogo: true,
        panes: {
          separatorColor: '#dce3ed',
          separatorHoverColor: '#b8c8dd',
          enableResize: true
        }
      },
      grid: {
        vertLines: {
          color: '#edf1f6'
        },
        horzLines: {
          color: '#edf1f6'
        }
      },
      crosshair: {
        mode: L.CrosshairMode.Normal,
        vertLine: {
          color: '#7586a0',
          width: 1,
          style: 2,
          labelBackgroundColor: '#243650'
        },
        horzLine: {
          color: '#7586a0',
          width: 1,
          style: 2,
          labelBackgroundColor: '#243650'
        }
      },
      rightPriceScale: {
        borderColor: '#dce3ed',
        minimumWidth: 65,
        scaleMargins: {
          top: .13,
          bottom: .1
        }
      },
      timeScale: {
        lockVisibleTimeRangeOnResize: true,
        borderColor: '#dce3ed',
        rightOffset: 1,
        barSpacing: 21,
        minBarSpacing: 4,
        timeVisible: false,
        secondsVisible: false,
        tickMarkFormatter: time => FMT_broker_charts_js.date(time, "axis")
      },
      localization: {
        locale: window.HokutoFormat.locale,
        priceFormatter: p => fmt(Math.round(p))
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true
      }
    });
    const candle = chart.addSeries(L.CandlestickSeries, {
      upColor: window.HokutoFormat.colors.up,
      downColor: window.HokutoFormat.colors.down,
      borderVisible: false,
      wickUpColor: window.HokutoFormat.colors.up,
      wickDownColor: window.HokutoFormat.colors.down,
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1
      },
      lastValueVisible: true,
      priceLineStyle: 2
    });
    candle.setData(bars);
    const line = chart.addSeries(L.LineSeries, {
      color: '#2b63ae',
      lineWidth: 2,
      visible: false,
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1
      }
    });
    line.setData(bars.map(d => ({
      time: d.time,
      value: d.close
    })));
    const ma5 = chart.addSeries(L.LineSeries, {
      color: '#1f8b77',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false
    });
    ma5.setData(average(bars, 5));
    const ma10 = chart.addSeries(L.LineSeries, {
      color: '#b78327',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false
    });
    ma10.setData(average(bars, 10));
    const volume = chart.addSeries(L.HistogramSeries, {
      priceFormat: {
        type: 'volume'
      },
      priceLineVisible: false,
      lastValueVisible: false
    }, 1);
    volume.setData(bars.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? window.HokutoFormat.colors.volumeUp : window.HokutoFormat.colors.volumeDown
    })));
    volume.priceScale().applyOptions({
      scaleMargins: {
        top: .15,
        bottom: 0
      }
    });
    chart.panes()[1].setHeight(90);
    let index = bars.length - 1;
    const update = () => {
      candle.applyOptions({
        visible: c.type === 'candles'
      });
      line.applyOptions({
        visible: c.type === 'line'
      });
      ma5.applyOptions({
        visible: c.ma5
      });
      ma10.applyOptions({
        visible: c.ma10
      });
      volume.applyOptions({
        visible: c.volume
      });
      el.dataset.chartType = c.type;
      el.dataset.chartPeriod = c.period;
      el.querySelectorAll('[data-chart-type]').forEach(b => b.setAttribute('aria-pressed', b.dataset.chartType === c.type));
      el.querySelectorAll('[data-chart-range]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.chartRange) === c.period));
    };
    const year = sixMonthWindow(bars);
    const fit = () => {
      const annual = c.period === 180,
        spaces = annual ? year.spaces : [];
      candle.setData([...spaces, ...bars]);
      line.setData([...spaces, ...bars.map(d => ({
        time: d.time,
        value: d.close
      }))]);
      chart.timeScale().applyOptions({
        minBarSpacing: annual ? .1 : 4,
        tickMarkFormatter: time => {
          const t = typeof time === 'object' ? `${time.year}-${String(time.month).padStart(2, '0')}-${String(time.day).padStart(2, '0')}` : String(time);
          return FMT_broker_charts_js.date(t, annual ? "month" : "axis");
        }
      });
      if (annual) chart.timeScale().setVisibleRange({
        from: year.from,
        to: year.to
      });else chart.timeScale().setVisibleLogicalRange({
        from: bars.length - c.period - .6,
        to: bars.length + .2
      });
      const note = el.querySelector('.chart-range-note');
      note.hidden = !annual;
      note.innerHTML = annual ? UI_broker_charts_js.tpl("template_8e955d6e9422", year.from, year.to, bars[0].time, year.to, bars.length) : '';
      el.dataset.chartPeriod = c.period;
      el.dataset.rangeFrom = annual ? year.from : bars[Math.max(0, bars.length - c.period)].time;
      el.dataset.rangeTo = year.to;
    };
    const select = delta => {
      index = Math.min(bars.length - 1, Math.max(0, index + delta));
      const d = bars[index];
      quote(el, d, c);
      chart.setCrosshairPosition(d.close, d.time, c.type === 'candles' ? candle : line);
    };
    chart.subscribeCrosshairMove(p => {
      if (!p.time) return;
      const time = typeof p.time === 'object' ? `${p.time.year}-${String(p.time.month).padStart(2, '0')}-${String(p.time.day).padStart(2, '0')}` : String(p.time);
      const i = bars.findIndex(d => d.time === time);
      if (i >= 0) {
        index = i;
        quote(el, bars[i], c);
      }
    });
    el.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.chartType) {
        c.type = b.dataset.chartType;
        update();
      }
      if (b.dataset.chartRange) {
        c.period = Number(b.dataset.chartRange);
        update();
        fit();
      }
      if (b.hasAttribute('data-chart-fit')) fit();
      if (b.dataset.chartStep) select(Number(b.dataset.chartStep));
      if (b.hasAttribute('data-chart-expand')) {
        const expanded = el.classList.toggle('expanded');
        el.setAttribute('role', expanded ? 'dialog' : 'region');
        if (expanded) {
          el.setAttribute('aria-modal', 'true');
        } else {
          el.removeAttribute('aria-modal');
        }
        b.textContent = expanded ? UI_broker_charts_js.text("text_f3f593594c5f") : UI_broker_charts_js.text("text_8d96c9bb03ae");
        b.setAttribute('aria-pressed', expanded);
        document.body.classList.toggle('chart-expanded', expanded);
        requestAnimationFrame(() => {
          chart.resize(host.clientWidth, host.clientHeight);
          chart.panes()[1].setHeight(expanded ? 120 : 90);
          fit();
        });
      }
    });
    el.addEventListener('change', e => {
      if (e.target.dataset.chartIndicator) {
        c[e.target.dataset.chartIndicator] = e.target.checked;
        update();
      }
    });
    host.addEventListener('keydown', e => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        select(e.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    const observer = new ResizeObserver(() => {
      if (host.clientWidth) chart.resize(host.clientWidth, host.clientHeight);
    });
    observer.observe(host);
    live.set(el, {
      chart,
      observer
    });
    quote(el, bars.at(-1), c);
    update();
    fit();
    el.dataset.chartReady = 'true';
  }
  function mount() {
    if (!document.querySelector('.broker-chart.expanded')) document.body.classList.remove('chart-expanded');
    for (const [el, x] of live) {
      if (!el.isConnected) {
        x.observer.disconnect();
        x.chart.remove();
        live.delete(el);
      }
    }
    document.querySelectorAll('.broker-chart').forEach(el => {
      if (!live.has(el) && el.getBoundingClientRect().width > 0) mountOne(el);
    });
  }
  function renderHome(stocks, state, onSelect) {
    const host = document.querySelector('#home-chart');
    if (!host) return;
    host.hidden = state.view !== 'home' || state.detail || !!state.query;
    if (host.hidden) return;
    const s = stocks.find(x => x.id === state.stock) || stocks[0];
    if (lastHomeStock === s.id && host.childElementCount) {
      mount();
      return;
    }
    lastHomeStock = s.id;
    host.innerHTML = UI_broker_charts_js.tpl("template_5f49ece63bd7", stocks.map(x => `<option value="${esc(x.id)}" ${x.id === s.id ? 'selected' : ''}>${esc(x.name)}</option>`).join(''), esc(s.theme), esc(s.id), fmt(s.price), s.price == null ? '' : UI_broker_charts_js.text("text_0424ea8f6cde"), s.change == null ? 'muted' : s.change > 0 ? 'up' : 'down', s.change == null ? UI_broker_charts_js.text("text_e37cb85e37fa") : window.HokutoFormat.signed(s.change), markup(s, state.period), esc(s.id));
    host.querySelector('select').addEventListener('change', e => onSelect(e.target.value));
  }
  document.addEventListener('keydown', e => {
    const el = document.querySelector('.broker-chart.expanded');
    if (!el) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      el.querySelector('[data-chart-expand]').click();
      el.querySelector('[data-chart-expand]').focus();
    }
    if (e.key === 'Tab') {
      const items = [...el.querySelectorAll('button,input,summary,a[href],[tabindex="0"]')].filter(x => x.getClientRects().length);
      const first = items[0],
        last = items.at(-1);
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  window.HokutoCharts = {
    markup,
    mount,
    renderHome,
    sixMonthWindow
  };
})();
