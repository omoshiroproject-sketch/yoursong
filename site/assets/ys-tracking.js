/* Your Song 計測（広告・アクセス解析）
 * IDS に ID を入れると、その計測だけが動く。空のままなら何も読み込まない。
 * 入れる前に、プライバシーポリシー「8. Cookie等」へ利用目的・事業者名・オプトアウト方法を追記すること。
 */
(function () {
  var IDS = {
    ga4: "",        // Google アナリティクス 4 の測定 ID（例 G-XXXXXXXXXX）
    googleAds: "",  // Google 広告のコンバージョン ID（例 AW-XXXXXXXXX）
    metaPixel: ""   // Meta ピクセル ID（数字）
  };
  var w = window, d = document;
  function load(src) { var s = d.createElement("script"); s.async = true; s.src = src; d.head.appendChild(s); }

  if (IDS.ga4 || IDS.googleAds) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    load("https://www.googletagmanager.com/gtag/js?id=" + (IDS.ga4 || IDS.googleAds));
    if (IDS.ga4) w.gtag("config", IDS.ga4);
    if (IDS.googleAds) w.gtag("config", IDS.googleAds);
  }
  if (IDS.metaPixel) {
    var f = w.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
    if (!w._fbq) w._fbq = f; f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
    load("https://connect.facebook.net/en_US/fbevents.js");
    w.fbq("init", IDS.metaPixel); w.fbq("track", "PageView");
  }

  function track(name, params) {
    if (w.gtag) w.gtag("event", name, params || {});
    if (w.fbq) {
      if (name === "generate_lead") w.fbq("track", "Lead", params || {});
      else w.fbq("trackCustom", name, params || {});
    }
  }
  w.ysTrack = track;

  // 公式 LINE へのボタン（申込・相談の入口）を押した数
  d.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("lin.ee/") !== -1 || href.indexOf("line.me/") !== -1) {
      track("generate_lead", { method: "line", link_text: (a.textContent || "").trim().slice(0, 40) });
    }
  }, true);

  // サンプル曲の再生（初回だけ数える）
  var played = {};
  d.addEventListener("play", function (e) {
    var t = e.target; if (!t || !t.currentSrc) return;
    var name = t.currentSrc.split("/").pop();
    if (played[name]) return; played[name] = 1;
    track("sample_play", { song: name });
  }, true);
})();
