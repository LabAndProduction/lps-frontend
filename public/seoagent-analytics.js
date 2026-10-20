/* SEO Agent — загрузчик счётчиков (GTM / GA4 / Яндекс.Метрика). Кладётся установщиком в public/ сайта и
   подключается <SeoAnalytics loader/> как обычный скрипт со своего домена: строгой CSP хватает 'self' (+ домены
   счётчиков), inline-скрипты не нужны. ID берутся из data-атрибутов этого же тега; nonce — тоже с него. */
(function () {
  var s = document.currentScript; if (!s) return;
  var d = s.dataset || {}, w = window, nonce = s.nonce || s.getAttribute("nonce") || "";
  function add(src) { var j = document.createElement("script"); j.async = true; j.src = src; if (nonce) j.nonce = nonce; (document.head || document.documentElement).appendChild(j); }
  var gtm = d.gtm, ga4 = d.ga4, ym = d.ym;
  if (gtm && /^GTM-[A-Z0-9]+$/i.test(gtm)) {
    var g = w.__saGtm = w.__saGtm || {};
    if (!g[gtm]) { g[gtm] = 1; w.dataLayer = w.dataLayer || []; w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); add("https://www.googletagmanager.com/gtm.js?id=" + gtm); }
  }
  if (ga4 && /^G-[A-Z0-9]+$/i.test(ga4)) {
    var a = w.__saGa4 = w.__saGa4 || {};
    if (!a[ga4]) { a[ga4] = 1; w.dataLayer = w.dataLayer || []; w.gtag = w.gtag || function () { w.dataLayer.push(arguments); }; w.gtag("js", new Date()); w.gtag("config", ga4); add("https://www.googletagmanager.com/gtag/js?id=" + ga4); }
  }
  if (ym && /^\d+$/.test(ym)) {
    var y = w.__saYm = w.__saYm || {}, id = Number(ym);
    if (!y[id]) {
      y[id] = 1;
      w.ym = w.ym || function () { (w.ym.a = w.ym.a || []).push(arguments); }; w.ym.l = 1 * new Date();
      var src = "https://mc.yandex.ru/metrika/tag.js", has = false;
      for (var i = 0; i < document.scripts.length; i++) if (document.scripts[i].src === src) has = true;
      if (!has) add(src);
      w.ym(id, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
    }
  }
})();
