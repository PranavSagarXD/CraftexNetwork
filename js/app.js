(function () {
  "use strict";
  var D = window.CRAFTEX, S = D.site, page = document.body.dataset.page, main = document.getElementById("main");
  S.bedrockIp = S.bedrockHost ? S.bedrockHost + ":" + S.bedrockPort : "";
  var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- theme from js/data.js (optional colour overrides) ---------- */
  function hexRgb(h) { var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(h || "").trim()); if (!m) return null; var x = m[1]; if (x.length === 3) x = x.replace(/./g, "$&$&"); return parseInt(x.slice(0, 2), 16) + ", " + parseInt(x.slice(2, 4), 16) + ", " + parseInt(x.slice(4, 6), 16); }
  (function applyTheme() {
    var t = D.theme || {}, css = "", a = hexRgb(t.accent), b = hexRgb(t.accent2), c = hexRgb(t.accent3), g = hexRgb(t.background);
    if (a) css += "--accent:" + t.accent + ";--accent-rgb:" + a + ";";
    if (b) css += "--accent-2:" + t.accent2 + ";--accent2-rgb:" + b + ";";
    if (c) css += "--accent-3:" + t.accent3 + ";";
    if (g) css += "--bg:" + t.background + ";";
    if (css) { var st = document.createElement("style"); st.textContent = ":root{" + css + "}"; document.head.appendChild(st); }
  })();

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function slugify(s) { return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section"; }
  function fmt(d) { var t = new Date(d + "T00:00:00Z"); return isNaN(t) ? esc(d) : t.toLocaleDateString(undefined, { dateStyle: "medium", timeZone: "UTC" }); }
  function fill(html) {
    var v = { serverIp: S.serverIp, bedrockHost: S.bedrockHost, bedrockPort: S.bedrockPort, bedrockIp: S.bedrockIp, website: S.websiteUrl, version: S.minecraftVersion, discord: S.discordUrl || "community.html", name: S.name };
    return String(html).replace(/\{\{(\w+)\}\}/g, function (_, k) { return v[k] == null ? "" : esc(v[k]); });
  }
  function setTitle(t, desc) {
    document.title = t ? t + " · " + S.name : S.name;
    var m = $('meta[name="description"]');
    if (m && desc) m.setAttribute("content", desc);
  }
  var ICONS = {
    discord: "M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    prev: "M15 6l-6 6 6 6", next: "M9 6l6 6-6 6",
    community: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    rules: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4",
    wiki: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM20 17v4H6.5A2.5 2.5 0 0 1 4 18.5",
    news: "M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5",
    timeline: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 7v5l3 2", staff: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z",
    status: "M3 12h4l3-8 4 16 3-8h4", menu: "M4 6h16M4 12h16M4 18h16", close: "M6 6l12 12M18 6 6 18", copy: "M9 9h11v11H9zM5 15V4h11"
  };
  function icon(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' + ICONS[n] + '"/></svg>'; }

  /* ---------- data ---------- */
  function byDateDesc(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
  var news = (D.news || []).filter(function (p) { return !p.draft; }).sort(byDateDesc);
  var cats = D.wikiCategories || [];
  var live = (D.wiki || []).filter(function (a) { return !a.draft; });
  var wikiFlat = [];
  cats.forEach(function (c) { live.forEach(function (a) { if (a.category === c.id) wikiFlat.push(a); }); });
  live.forEach(function (a) { if (wikiFlat.indexOf(a) < 0) wikiFlat.push(a); });
  function catOf(a) { return cats.filter(function (c) { return c.id === a.category; })[0]; }

  /* ---------- toast + copy ---------- */
  var toasts = document.createElement("div");
  toasts.className = "toasts"; toasts.setAttribute("role", "status"); toasts.setAttribute("aria-live", "polite");
  function toast(msg, err) {
    var t = document.createElement("div"); t.className = "toast glass" + (err ? " toast--error" : ""); t.textContent = msg;
    var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Dismiss notification"); b.innerHTML = icon("close");
    b.addEventListener("click", function () { t.remove(); }); t.appendChild(b); toasts.appendChild(t);
    while (toasts.children.length > 3) toasts.removeChild(toasts.firstChild);
    setTimeout(function () { t.remove(); }, 3500);
  }
  function copyText(text, msg) {
    function done() { toast(msg || "Copied"); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0;top:0";
      document.body.appendChild(ta); ta.select(); var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove(); if (ok) done(); else toast("Couldn't copy. Select the text and copy it manually.", true);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  var streak = 0, lastCopy = 0;
  function copyIp(which) {
    var bedrock = which === "bedrock";
    copyText(bedrock ? S.bedrockIp : S.serverIp, bedrock ? "Copied Bedrock IP" : "Copied Java IP");
    var t = Date.now(); streak = t - lastCopy < 30000 ? streak + 1 : 1; lastCopy = t;
    if (streak === 10) setTimeout(function () { toast("Okay, okay. It is definitely copied."); }, 400);
  }
  function bindCopy(root) { $$("[data-copy]", root).forEach(function (b) { b.addEventListener("click", function () { copyIp(b.dataset.copy); }); }); }

  /* ---------- shared chrome: nav, sidebar, footer ---------- */
  var brandClicks = [];
  function buildChrome() {
    var items = [["Discord", "discord", S.discordUrl || "community.html", ""], ["Community", "community", "community.html", "community"], ["Home", "home", "index.html", "home"], ["Rules", "rules", "rules.html", "rules"], ["Wiki", "wiki", "wiki.html", "wiki"]];
    NAV = buildNav(items); var nav = NAV.el;

    var brand = document.createElement("a"); brand.className = "brand glass"; brand.href = "index.html"; brand.setAttribute("aria-label", S.name + ", home");
    brand.innerHTML = '<img class="brand__logo" src="images/logo.png" width="40" height="40" alt=""><span class="brand__text">' + esc(S.name) + "</span>";
    var menu = document.createElement("button"); menu.type = "button"; menu.className = "menu-btn glass"; menu.setAttribute("aria-label", "Open menu"); menu.setAttribute("aria-haspopup", "dialog"); menu.setAttribute("aria-expanded", "false");
    menu.innerHTML = '<span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>';

    var side = document.createElement("dialog"); side.className = "sidebar"; side.setAttribute("aria-label", "Site menu");
    var links = [["Home", "home", "index.html", "home"], ["Timeline", "timeline", "timeline.html", "timeline"], ["Staff", "staff", "staff.html", "staff"], ["News", "news", "news.html", "news"], ["Wiki", "wiki", "wiki.html", "wiki"], ["Rules", "rules", "rules.html", "rules"], ["Community", "community", "community.html", "community"], ["FAQ", "rules", "faq.html", "faq"], ["Server status", "status", "index.html#status", ""]];
    side.innerHTML = '<div class="sb__head"><span class="sidebar__brand row"><img src="images/logo.png" width="28" height="28" alt="">' + esc(S.name) + '</span><button type="button" class="sb__close" aria-label="Close menu"><span class="x" aria-hidden="true"><i></i><i></i></span></button></div>' +
      '<nav class="sb__nav" aria-label="Site menu"><ul>' + links.map(function (l, n) {
        return '<li style="--i:' + n + '"><a href="' + l[2] + '"' + (l[3] && l[3] === page ? ' class="active" aria-current="page"' : "") + '><span class="ico">' + icon(l[1]) + "</span><span>" + l[0] + "</span>" + icon("next") + "</a></li>";
      }).join("") + "</ul></nav>" +
      '<div class="sb__foot"><div class="sb__ip"><div><small>Java IP</small><code>' + esc(S.serverIp) + '</code></div><button type="button" class="btn" data-copy="java">' + icon("copy") + "Copy</button></div>" +
      (S.discordUrl ? '<a class="btn btn--primary" href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">' + icon("discord") + "Join Discord</a>" : "") +
      (discordOn() ? '<span class="pill" data-discord-stats hidden></span>' : "") + "</div>";

    var ptr = { x: -1, y: -1 }; window.addEventListener("mousemove", function (e) { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true, capture: true });
    var hoverLock = false, hoverOpened = false, openedAt = 0, closing = false, leaveTimer = 0, enterTimer = 0, hoverMq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    function openSide(byHover) { if (side.open || closing) return; hoverOpened = !!byHover; openedAt = Date.now(); side.showModal(); menu.setAttribute("aria-expanded", "true"); }
    function closeSide() {
      if (!side.open || closing) return; closing = true; clearTimeout(leaveTimer); leaveTimer = 0; side.classList.add("closing");
      var done = false;
      function fin() { if (done) return; done = true; side.classList.remove("closing"); closing = false; if (side.open) side.close(); }
      side.addEventListener("animationend", function h(e) { if (e.target !== side) return; side.removeEventListener("animationend", h); fin(); });
      setTimeout(fin, 450);
    }
    side.addEventListener("close", function () { menu.setAttribute("aria-expanded", "false"); hoverOpened = false; clearTimeout(enterTimer); var r = menu.getBoundingClientRect(); hoverLock = ptr.x >= r.left && ptr.x <= r.right && ptr.y >= r.top && ptr.y <= r.bottom; });
    side.addEventListener("cancel", function (e) { e.preventDefault(); closeSide(); });
    menu.addEventListener("click", function () { openSide(false); });
    menu.addEventListener("mouseenter", function () { if (!hoverMq.matches || hoverLock) return; clearTimeout(enterTimer); enterTimer = setTimeout(function () { openSide(true); }, 60); });
    menu.addEventListener("mouseleave", function () { clearTimeout(enterTimer); hoverLock = false; });
    $(".sb__close", side).addEventListener("click", function () { if (hoverOpened && Date.now() - openedAt < 500) return; closeSide(); });
    side.addEventListener("click", function (e) {
      var r = side.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeSide(); else hoverOpened = false;
    });
    side.addEventListener("mousemove", function (e) {
      if (!hoverOpened || closing) return;
      if (e.clientX < side.getBoundingClientRect().left - 6) { if (!leaveTimer) leaveTimer = setTimeout(function () { leaveTimer = 0; if (hoverOpened) closeSide(); }, 260); }
      else if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = 0; }
    });
    $$(".sb__nav a", side).forEach(function (a) { a.addEventListener("click", function () { closeSide(); }); });
    bindCopy(side);

    var skip = document.createElement("a"); skip.className = "skip"; skip.href = "#main"; skip.textContent = "Skip to content";
    var foot = document.createElement("footer"); foot.className = "footer";
    foot.innerHTML = '<div class="container footer__grid"><div><strong class="footer__brand" id="brand"><img src="images/logo.png" width="28" height="28" alt="">' + esc(S.name) + "</strong><p>Not affiliated with Mojang or Microsoft.</p>" + (discordOn() ? '<span class="pill" data-discord-stats hidden></span>' : "") + "</div>" +
      '<div><strong>Explore</strong><ul><li><a href="wiki.html">Wiki</a></li><li><a href="news.html">News</a></li><li><a href="rules.html">Rules</a></li><li><a href="faq.html">FAQ</a></li></ul></div>' +
      '<div><strong>Community</strong><ul><li><a href="community.html">Community</a></li><li><a href="community.html#showcase">Showcase</a></li><li><a href="timeline.html">Timeline</a></li><li><a href="staff.html">Staff</a></li>' + (S.discordUrl ? '<li><a href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">Discord</a></li>' : "") + "</ul></div></div>" +
      '<div class="container"><p style="margin-top:1.25rem">© ' + new Date().getFullYear() + " " + esc(S.name) + "</p></div>";
    $("#brand", foot).addEventListener("click", function () {
      var t = Date.now(); brandClicks = brandClicks.filter(function (x) { return t - x < 4000; }); brandClicks.push(t);
      if (brandClicks.length >= 7) { brandClicks = []; toast("Fun fact: a Minecraft day lasts 20 real minutes."); }
    });
    document.body.insertBefore(skip, document.body.firstChild);
    main.parentNode.insertBefore(brand, main); main.parentNode.insertBefore(menu, main); main.parentNode.insertBefore(nav, main); main.parentNode.insertBefore(side, main);
    main.parentNode.insertBefore(foot, main.nextSibling); document.body.appendChild(toasts);
    NAV.mount();
  }

  /* ---------- nav bar: liquid glass ----------
     A glass lens slides under the current page (and follows the pointer). Its leading edge moves first and the
     trailing edge springs after it, so it stretches like liquid. Built here, styled in css/style.css (.lnav). */
  var NAV = null, NAVKEY = "cx-nav";
  function buildNav(items) {
    var nav = document.createElement("nav"); nav.className = "lnav"; nav.setAttribute("aria-label", "Primary");
    nav.innerHTML = '<span class="lnav__glow" aria-hidden="true"></span><div class="lnav__track"><span class="lnav__lens" aria-hidden="true"></span>' + items.map(function (it, n) {
      var cur = it[3] && it[3] === page, ext = it[1] === "discord" && S.discordUrl ? ' target="_blank" rel="noopener noreferrer"' : "";
      return '<a class="lnav__item' + (cur ? " is-active" : "") + '" style="--n:' + n + '" href="' + esc(it[2]) + '"' + ext + (cur ? ' aria-current="page"' : "") + '><span class="lnav__ico">' + icon(it[1]) + '</span><span class="lnav__label">' + it[0] + "</span></a>";
    }).join("") + "</div>";
    var track = $(".lnav__track", nav), lens = $(".lnav__lens", nav), tabs = $$(".lnav__item", nav), active = $(".lnav__item.is-active", nav);
    var at = null, lastLeft = null, shown = false, restTimer = 0, root = document.documentElement;
    function lit(el) { tabs.forEach(function (t) { t.classList.toggle("is-lit", t === el); }); }
    function place(el, instant) {
      if (!el || !track.clientWidth) return;
      var fresh = !lens.classList.contains("is-on"), l = el.offsetLeft, r = track.clientWidth - el.offsetLeft - el.offsetWidth;
      lens.dataset.dir = instant || fresh || lastLeft === null ? "" : l > lastLeft ? "r" : l < lastLeft ? "l" : "";
      if (instant || fresh) lens.classList.add("no-anim");
      lens.style.left = l + "px"; lens.style.right = r + "px"; lens.style.top = el.offsetTop + "px"; lens.style.height = el.offsetHeight + "px";
      lastLeft = l; at = el; lit(el);
      lens.classList.toggle("is-ghost", el !== active); lens.classList.add("is-on");
      if (instant || fresh) { void lens.offsetWidth; lens.classList.remove("no-anim"); }
    }
    function rest(instant) {
      clearTimeout(restTimer);
      if (active) place(active, instant); else { lens.classList.remove("is-on"); at = null; lit(null); }
    }
    function hover(t) { clearTimeout(restTimer); place(t); }
    tabs.forEach(function (t) {
      t.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hover(t); });
      t.addEventListener("pointerdown", function (e) { lens.classList.add("is-press"); if (e.pointerType !== "mouse") hover(t); });
    });
    track.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") rest(); });
    function release(e) { lens.classList.remove("is-press"); if (e.pointerType && e.pointerType !== "mouse") { clearTimeout(restTimer); restTimer = setTimeout(rest, 450); } }
    window.addEventListener("pointerup", release, { passive: true }); window.addEventListener("pointercancel", release, { passive: true });
    track.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest(".lnav__item") : null; if (!a) return;
      clearTimeout(restTimer);
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") { rest(); return; }
      place(a); try { sessionStorage.setItem(NAVKEY, String(tabs.indexOf(a))); } catch (x) { /* ignore */ }
    });
    track.addEventListener("focusin", function (e) { if (!root.classList.contains("kbd")) return; var t = e.target.closest ? e.target.closest(".lnav__item") : null; if (t) hover(t); });
    track.addEventListener("focusout", function () { if (root.classList.contains("kbd")) { clearTimeout(restTimer); restTimer = setTimeout(rest, 80); } });
    nav.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var b = nav.getBoundingClientRect(); nav.style.setProperty("--px", (e.clientX - b.left) + "px"); nav.style.setProperty("--py", (e.clientY - b.top) + "px"); nav.classList.add("is-hot");
    }, { passive: true });
    nav.addEventListener("pointerleave", function () { nav.classList.remove("is-hot"); });
    var tick = false;
    function sc() { tick = false; nav.classList.toggle("is-scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(sc); } }, { passive: true });
    var ctl = {
      el: nav,
      mount: function () {
        sc();
        function again() { if (at) place(at, true); }
        if (window.ResizeObserver) new ResizeObserver(again).observe(track); else window.addEventListener("resize", again);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
        setTimeout(function () { ctl.show(); }, 2500); /* safety net: the bar always appears */
      },
      show: function () {
        if (shown) return; shown = true; nav.classList.add("is-in");
        var prev = null; try { prev = sessionStorage.getItem(NAVKEY); sessionStorage.setItem(NAVKEY, String(tabs.indexOf(active))); } catch (x) { prev = null; }
        var from = prev !== null && prev !== "" && Number(prev) >= 0 ? tabs[Number(prev)] : null;
        if (active && from && from !== active && !reduceMotion) { place(from, true); setTimeout(function () { place(active); }, 520); }
        else setTimeout(function () { rest(true); }, 260);
      },
      reset: function () { lens.classList.remove("is-press"); rest(); }
    };
    return ctl;
  }

  /* ---------- page transition: a liquid curtain with the logo ----------
     Clicking an internal link: the curtain covers the screen, then the next page loads (still covered, see the small
     script in each page's <head>) and the curtain lifts while the page animates in. Skipped for "reduce motion". */
  var PT = (function () {
    var root = document.documentElement, KEY = "cx-pt", layer = null, busy = false, seen = {};
    var upMq = window.matchMedia ? window.matchMedia("(min-width: 768px)") : { matches: true };
    function norm(p) { return p.replace(/(?:^|\/)index\.html?$/i, "/").replace(/\.html?$/i, "").replace(/\/+$/, "") || "/"; }
    function usable() { if (reduceMotion) return false; try { sessionStorage.setItem("cx-t", "1"); sessionStorage.removeItem("cx-t"); return true; } catch (e) { return false; } }
    function make(cls) {
      var el = document.createElement("div"); el.className = "pt is-active " + cls; el.setAttribute("aria-hidden", "true"); el.dataset.dir = upMq.matches ? "up" : "down";
      el.innerHTML = '<div class="pt__dim"></div><div class="pt__a"></div><div class="pt__b"></div>'; document.body.appendChild(el); return el;
    }
    function recover() {
      busy = false; if (layer) { layer.remove(); layer = null; }
      try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      if (NAV) NAV.reset();
    }
    function leave(url) {
      if (busy) return; busy = true;
      try { sessionStorage.setItem(KEY, String(Date.now())); } catch (e) { busy = false; location.href = url; return; }
      layer = make("is-cover");
      var gone = false; function go() { if (gone) return; gone = true; location.href = url; }
      $(".pt__b", layer).addEventListener("animationend", go);
      setTimeout(go, 850); setTimeout(function () { if (busy) recover(); }, 9000);
    }
    function sameSite(a) { return a.protocol === location.protocol && a.host === location.host; }
    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a[href]") : null; if (!a) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || /\bexternal\b/.test(a.rel || "") || !sameSite(a)) return;
      var samePage = norm(a.pathname) === norm(location.pathname) && a.search === location.search;
      if (samePage) { if (a.hash) return; e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); return; }
      if (!usable()) return;
      e.preventDefault(); leave(a.href);
    }
    function prefetch(e) {
      var a = e.target.closest ? e.target.closest("a[href]") : null; if (!a || a.target === "_blank" || !sameSite(a)) return;
      var u = a.href.split("#")[0]; if (seen[u] || (norm(a.pathname) === norm(location.pathname) && a.search === location.search)) return;
      seen[u] = 1; var l = document.createElement("link"); l.rel = "prefetch"; l.href = u; document.head.appendChild(l);
    }
    function whenReady(held, cb) {
      var f = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, held ? 450 : 250); })]) : Promise.resolve();
      f.then(function () { requestAnimationFrame(function () { requestAnimationFrame(cb); }); });
    }
    return {
      init: function () {
        document.addEventListener("click", onClick);
        document.addEventListener("pointerover", function (e) { if (e.pointerType === "mouse") prefetch(e); }, { passive: true });
        document.addEventListener("touchstart", prefetch, { passive: true });
        window.addEventListener("pageshow", function (e) { if (e.persisted) recover(); });
      },
      /* called once the page has rendered: lifts the curtain (if we arrived through one), then shows the nav bar */
      arrive: function (showNav) {
        var held = root.classList.contains("pt-enter");
        if (!held) { whenReady(false, showNav); return; }
        var el = layer = make("is-held"); root.classList.remove("pt-enter");
        whenReady(true, function () {
          el.classList.remove("is-held"); el.classList.add("is-reveal");
          setTimeout(function () { root.classList.remove("pt-hold"); el.classList.remove("is-active"); showNav(); }, 240);
          function done() { if (!el.parentNode) return; el.remove(); if (layer === el) layer = null; root.classList.remove("pt-hold"); }
          $(".pt__a", el).addEventListener("animationend", done); setTimeout(done, 1300); setTimeout(done, 2600);
        });
      }
    };
  })();

  /* ---------- reusable blocks ---------- */
  function newsCard(p, featured) {
    return '<article class="ncard glass' + (featured ? " ncard--featured" : "") + (p.cover ? "" : " ncard--nocover") + '">' +
      (p.cover ? '<img class="ncard__cover" src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || "") + '" width="1200" height="675" loading="' + (featured ? "eager" : "lazy") + '" decoding="async">' : "") +
      '<div class="ncard__body"><p class="ncard__meta">' + (p.category ? esc(p.category) + " · " : "") + fmt(p.date) + '</p><h3><a class="ncard__link" href="news.html?p=' + encodeURIComponent(p.slug) + '">' + esc(p.title) + "</a></h3>" +
      (p.excerpt ? '<p class="ncard__excerpt">' + esc(p.excerpt) + "</p>" : "") + "</div></article>";
  }
  function stateBlock(title, body, link, top) { var h = top ? "h1" : "h2"; return '<div class="state glass"><' + h + ">" + esc(title) + "</" + h + ">" + (body ? "<p class=\"muted\">" + esc(body) + "</p>" : "") + (link || "") + "</div>"; }
  function notFoundBlock(what, top) { return stateBlock("Chunk not found", "That " + what + " doesn't exist or has moved.", '<a class="btn" href="index.html">Return home</a>', top); }
  function announcementsHtml() {
    var list = (D.announcements || []).slice().sort(byDateDesc);
    if (!list.length) return "";
    return '<section class="section" aria-labelledby="ann-title"><h2 id="ann-title">Announcements</h2><ul class="ann">' + list.map(function (a) {
      return '<li class="glass"><p class="ncard__meta">' + (a.author ? esc(a.author) + " · " : "") + fmt(a.date) + "</p><p>" + esc(a.text) + "</p></li>";
    }).join("") + "</ul></section>";
  }
  function prepProse(root) {
    $$(".cmd", root).forEach(function (el) {
      var text = el.textContent.trim();
      el.innerHTML = "<code>" + esc(text) + '</code><button type="button" class="cmd__copy" aria-label="Copy command ' + esc(text) + '">' + icon("copy") + "<span>Copy</span></button>";
      $("button", el).addEventListener("click", function () { copyText(text, "Copied"); });
    });
    $$("a[href^='http']", root).forEach(function (a) { a.target = "_blank"; a.rel = "noopener noreferrer"; });
    $$("img", root).forEach(function (i) { i.loading = "lazy"; i.decoding = "async"; });
  }
  function headingsToc(root) {
    var used = {}, out = [];
    $$("h2, h3, h4", root).forEach(function (h) {
      var base = slugify(h.textContent), n = used[base] || 0; used[base] = n + 1;
      h.id = n ? base + "-" + (n + 1) : base; out.push({ level: Number(h.tagName.charAt(1)), text: h.textContent, id: h.id });
    });
    return out;
  }

  /* ---------- pages ---------- */
  function loadStatus(box) {
    if (S.liveStatus === false) { box.innerHTML = '<div class="status__row"><span class="dot"></span>Live status is off</div><small>Join with the address on the left.</small>'; return; }
    box.innerHTML = '<div class="skeleton" role="status" aria-label="Checking server status"></div>';
    var ctl = typeof AbortController === "function" ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 6000);
    function show(html) { box.innerHTML = html; }
    function unavailable() { show('<div class="status__row"><span class="dot"></span>Status unavailable</div><small>We couldn\'t check the server. You can still try joining.</small>'); }
    fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(S.serverIp), ctl ? { signal: ctl.signal } : {})
      .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
      .then(function (d) {
        if (!d.online) return show('<div class="status__row"><span class="dot dot--off"></span>Offline</div><small>The server isn\'t responding right now.</small>');
        var p = d.players || {}, v = d.version ? ", " + esc(d.version) : "";
        show('<div class="status__row"><span class="dot dot--on"></span>Online</div><small>' + Number(p.online || 0) + " / " + Number(p.max || 0) + " players" + v + "</small>");
      }).catch(unavailable).then(function () { clearTimeout(timer); });
  }

  /* ---------- showcase gallery ---------- */
  function shots() { return ((D.gallery || {}).images || []).filter(function (i) { return !i.draft; }); }
  function catLabel(id) { var c = ((D.gallery || {}).categories || []).filter(function (x) { return x.id === id; })[0]; return c ? c.name : ""; }
  function shotCats() {
    var all = shots();
    return ((D.gallery || {}).categories || []).map(function (c) { return { id: c.id, name: c.name, count: all.filter(function (i) { return i.category === c.id; }).length }; }).filter(function (c) { return c.count; });
  }
  function shotGrid(list) {
    return '<ul class="shots">' + list.map(function (i, n) {
      return '<li><button type="button" class="shot" data-n="' + n + '" aria-haspopup="dialog" aria-label="View larger: ' + esc(i.title) + '"><img src="' + esc(i.src) + '" alt="' + esc(i.alt || i.title) + '" width="1280" height="720" loading="lazy" decoding="async"><span class="shot__cap"><strong>' + esc(i.title) + "</strong><small>" + esc(catLabel(i.category)) + "</small></span></button></li>";
    }).join("") + "</ul>";
  }
  var lb = null, lbList = [], lbIdx = 0, lbOpener = null, lbBusy = false, EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  function lbShow(dir) {
    var i = lbList[lbIdx], d = lb.dialog, img = $(".lightbox__img", d), fig = $(".lightbox__fig", d);
    img.src = i.src; img.alt = i.alt || i.title;
    $(".lightbox__cat", d).textContent = catLabel(i.category); $(".lightbox__title", d).textContent = i.title; $(".lightbox__desc", d).textContent = i.description || "";
    $(".lightbox__count", d).textContent = (lbIdx + 1) + " / " + lbList.length; $(".lightbox__nav", d).hidden = lbList.length < 2;
    if (dir && !reduceMotion && fig.animate) fig.animate([{ opacity: 0, transform: "translateX(" + dir * 46 + "px)" }, { opacity: 1, transform: "none" }], { duration: 460, easing: EASE });
  }
  function lbStep(dir) { if (lbList.length < 2) return; lbIdx = (lbIdx + dir + lbList.length) % lbList.length; lbShow(dir); }
  function lbClose() {
    var d = lb && lb.dialog; if (!d || !d.open || lbBusy) return;
    if (reduceMotion || !d.animate) { d.close(); return; }
    lbBusy = true; d.classList.add("closing");
    var an = d.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(26px) scale(0.95)" }], { duration: 280, easing: "cubic-bezier(0.5, 0, 0.75, 0)", fill: "forwards" });
    var fin = function () { lbBusy = false; d.classList.remove("closing"); an.cancel(); if (d.open) d.close(); };
    an.onfinish = fin; setTimeout(function () { if (lbBusy) fin(); }, 450);
  }
  function openLightbox(list, idx, opener) {
    if (!lb) {
      var d = document.createElement("dialog"); d.className = "lightbox"; d.setAttribute("aria-label", "Image viewer");
      d.innerHTML = '<div class="lightbox__bar"><span class="lightbox__count" aria-live="polite"></span><button type="button" class="btn lightbox__close" aria-label="Close image viewer">' + icon("close") + '</button></div>' +
        '<figure class="lightbox__fig"><img class="lightbox__img" alt="" width="1280" height="720"><figcaption><p class="ncard__meta lightbox__cat"></p><h3 class="lightbox__title"></h3><p class="lightbox__desc"></p></figcaption></figure>' +
        '<div class="lightbox__nav"><button type="button" class="btn" data-dir="-1">' + icon("prev") + 'Previous</button><button type="button" class="btn" data-dir="1">Next' + icon("next") + "</button></div>";
      document.body.appendChild(d); lb = { dialog: d };
      $(".lightbox__close", d).addEventListener("click", lbClose);
      $$("[data-dir]", d).forEach(function (b) { b.addEventListener("click", function () { lbStep(Number(b.dataset.dir)); }); });
      d.addEventListener("click", function (e) { if (e.target === d) lbClose(); });
      d.addEventListener("cancel", function (e) { e.preventDefault(); lbClose(); });
      d.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") lbStep(-1); else if (e.key === "ArrowRight") lbStep(1); });
      var x0 = null; d.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      d.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 60) lbStep(dx < 0 ? 1 : -1); }, { passive: true });
      d.addEventListener("close", function () { if (lbOpener && document.contains(lbOpener)) lbOpener.focus(); });
    }
    if (lbBusy) return;
    lbList = list; lbIdx = idx; lbOpener = opener; lbShow(0);
    if (!lb.dialog.open) {
      lb.dialog.showModal();
      var d2 = lb.dialog;
      if (!reduceMotion && d2.animate) {
        var r = opener && document.contains(opener) ? opener.getBoundingClientRect() : null, dr = d2.getBoundingClientRect();
        var dx = r ? r.left + r.width / 2 - (dr.left + dr.width / 2) : 0, dy = r ? r.top + r.height / 2 - (dr.top + dr.height / 2) : 70;
        var sc = r ? Math.max(0.3, Math.min(0.9, r.width / dr.width)) : 0.9;
        d2.animate([{ opacity: 0, transform: "translate(" + dx + "px," + dy + "px) scale(" + sc + ")" }, { opacity: 1, transform: "none" }], { duration: 620, easing: EASE });
      }
    }
  }
  function bindShots(host, list) { $$(".shot", host).forEach(function (b) { b.addEventListener("click", function () { openLightbox(list, Number(b.dataset.n), b); }); }); }
  function showcaseSection() {
    var all = shots(); if (!all.length) return "";
    var cats = shotCats();
    return '<section class="section" id="showcase" aria-labelledby="show-title"><h2 id="show-title">Server showcase</h2><p class="muted" style="margin-top:.4rem">Pictures from around the server. Tap one to see it larger.</p>' +
      (cats.length > 1 ? '<div class="chips" role="group" aria-label="Filter pictures by category"><button type="button" class="chip" data-cat="" aria-pressed="true">All <span>' + all.length + "</span></button>" +
        cats.map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c.id) + '" aria-pressed="false">' + esc(c.name) + " <span>" + c.count + "</span></button>"; }).join("") + "</div>" : '<div style="height:1rem"></div>') +
      '<div id="shot-host" aria-live="polite"></div></section>';
  }
  function bindShowcase(root) {
    var host = $("#shot-host", root); if (!host) return;
    function draw(cat) { var l = cat ? shots().filter(function (i) { return i.category === cat; }) : shots(); host.innerHTML = shotGrid(l); bindShots(host, l); reveal(host); }
    draw("");
    $$(".chip", root).forEach(function (c) { c.addEventListener("click", function () { $$(".chip", root).forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); }); draw(c.dataset.cat); }); });
  }

  /* ---------- home ---------- */
  function addrRow(label, value, which, note) {
    return '<div class="addr"><span class="addr__label">' + label + '</span><div class="ip"><code>' + esc(value) + '</code><button type="button" class="btn" data-copy="' + which + '">' + icon("copy") + "Copy</button></div>" + (note ? '<small class="muted">' + note + "</small>" : "") + "</div>";
  }
  function bindTabs(root) {
    var tabs = $$('[role="tab"]', root); if (tabs.length < 2) return;
    function pick(t) { tabs.forEach(function (x) { var on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; $("#" + x.getAttribute("aria-controls")).hidden = !on; }); }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { pick(t); });
      t.addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; pick(n); n.focus(); } });
    });
  }
  function stepsHtml(list) { return '<ol class="steps">' + (list || []).map(function (t) { return "<li><span>" + fill(t) + "</span></li>"; }).join("") + "</ol>"; }

  function renderHome() {
    setTitle("", S.description);
    var top = news.slice(0, Math.max(1, Number(S.homeNewsCount) || 3)), a = D.about || {}, js = D.joinSteps || {}, teaser = shots().slice(0, 3), hasBedrock = !!S.bedrockHost;
    main.innerHTML = '<div class="container"><section class="hero" aria-labelledby="hero-title">' + heroPx() + '<img class="hero__logo" src="images/logo.png" width="256" height="256" alt="">' + '<h1 id="hero-title">' + esc(S.name) + "</h1>" +
      '<p class="lead">' + esc(S.description || "A Minecraft server with its own rules and wiki.") + "</p>" +
      '<div class="hero__cta"><button type="button" class="btn btn--primary" data-copy="java">' + icon("copy") + "Copy Java IP</button>" + (hasBedrock ? '<button type="button" class="btn" data-copy="bedrock">' + icon("copy") + "Copy Bedrock IP</button>" : "") +
      (S.discordUrl ? '<a class="btn" href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">' + icon("discord") + "Join Discord</a>" : "") + '</div>' + (discordOn() ? '<div class="hero__stat"><span class="pill" data-discord-stats hidden></span></div>' : "") + "</section>" +
      '<section id="status" class="join glass" aria-labelledby="join-title"><div><h2 id="join-title">Join Craftex</h2>' + addrRow("Java Edition", S.serverIp, "java") +
      (hasBedrock ? addrRow("Bedrock Edition", S.bedrockIp, "bedrock", "Address " + esc(S.bedrockHost) + " · Port " + esc(S.bedrockPort)) : "") +
      (S.minecraftVersion ? '<p class="muted" style="margin-top:.8rem">Recommended version: ' + esc(S.minecraftVersion) + "</p>" : "") + '</div><div class="status" id="status-box" aria-live="polite"></div></section>' +
      ((a.cards || []).length ? '<section class="section" aria-labelledby="about-title"><h2 id="about-title">' + esc(a.title || "About") + "</h2>" + (a.intro ? '<p class="muted" style="margin:.4rem 0 1rem">' + esc(a.intro) + "</p>" : "") +
        '<div class="cards">' + a.cards.map(function (c) { return '<div class="card glass"><h3>' + esc(c.title) + "</h3><p>" + esc(c.text) + "</p></div>"; }).join("") + "</div></section>" : "") +
      '<section class="section" id="join" aria-labelledby="how-title"><h2 id="how-title">How to join</h2><div class="tabs" role="tablist" aria-label="Minecraft edition" style="margin-top:1rem"><button type="button" role="tab" id="tab-java" aria-selected="true" aria-controls="panel-java">Java Edition</button>' +
      (hasBedrock ? '<button type="button" role="tab" id="tab-bedrock" aria-selected="false" aria-controls="panel-bedrock" tabindex="-1">Bedrock Edition</button>' : "") + "</div>" +
      '<div role="tabpanel" id="panel-java" aria-labelledby="tab-java">' + stepsHtml(js.java) + "</div>" + (hasBedrock ? '<div role="tabpanel" id="panel-bedrock" aria-labelledby="tab-bedrock" hidden>' + stepsHtml(js.bedrock) + "</div>" : "") +
      '<p class="muted" style="margin-top:1rem">Having trouble? Read <a class="more" href="wiki.html?a=cant-connect">Can\'t connect?</a></p></section>' +
      (teaser.length ? '<section class="section" aria-labelledby="tease-title"><div class="row-between"><h2 id="tease-title">Server showcase</h2><a class="more" href="community.html#showcase">See all</a></div><div id="tease-host"></div></section>' : "") +
      (top.length ? '<section class="section" aria-labelledby="news-title"><div class="row-between"><h2 id="news-title">Latest news</h2><a class="more" href="news.html">All news</a></div><div class="news-compact">' +
        top.map(function (p) { return newsCard(p, false); }).join("") + "</div></section>" : "") +
      '<section class="section" aria-labelledby="cta-title"><div class="cta glass"><div><h2 id="cta-title">Join the community</h2><p class="muted">Chat with players, get help and share your builds.</p></div>' +
      (S.discordUrl ? '<a class="btn btn--primary" href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">' + icon("discord") + "Open Discord</a>" : '<a class="btn btn--primary" href="community.html">Visit the community</a>') + "</div></section></div>";
    bindCopy(main); bindTabs(main); loadStatus($("#status-box"));
    if (teaser.length) { var th = $("#tease-host"); th.innerHTML = shotGrid(teaser); bindShots(th, teaser); }
  }

  function renderCommunity() {
    var intro = D.communityIntro || "Where players meet, ask questions and follow server news.";
    setTitle("Community", intro);
    var extra = (D.communityLinks || []).map(function (l) { return '<section class="card glass"><h2>' + esc(l.label) + "</h2><p>" + esc(l.description || "") + '</p><a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">Open</a></section>'; }).join("");
    var guide = (D.communityGuidelines || []).length ? '<section class="card glass"><h2>Community guidelines</h2><ul class="plain">' + D.communityGuidelines.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + '</ul><a class="more" href="rules.html">Read the full rules</a></section>' : "";
    main.innerHTML = '<div class="container page"><h1>Community</h1><p class="lead">' + esc(intro) + '</p><div class="cards">' +
      (S.discordUrl ? '<section class="card glass"><h2>Discord</h2><p>Chat with players and staff, and get help.</p>' + (discordOn() ? '<span class="pill" data-discord-stats hidden></span>' : '') + '<a class="btn btn--primary" href="' + esc(S.discordUrl) + '" target="_blank" rel="noopener noreferrer">' + icon("discord") + "Open Discord</a></section>" : "") +
      (S.communityUrl ? '<section class="card glass"><h2>Community hub</h2><p>More places to connect with the community.</p><a class="btn" href="' + esc(S.communityUrl) + '" target="_blank" rel="noopener noreferrer">Visit</a></section>' : "") + extra +
      '<section class="card glass"><h2>Join the server</h2>' + addrRow("Java Edition", S.serverIp, "java") + (S.bedrockHost ? addrRow("Bedrock Edition", S.bedrockIp, "bedrock", "Address " + esc(S.bedrockHost) + " · Port " + esc(S.bedrockPort)) : "") + "</section>" + guide +
      '<section class="card glass"><h2>Before you play</h2><p>Read the rules and find answers in the wiki.</p><div class="row"><a class="btn" href="rules.html">Rules</a><a class="btn" href="wiki.html">Wiki</a></div></section>' +
      '<section class="card glass"><h2>Stay up to date</h2><p>Announcements and updates are posted in the news.</p><a class="btn" href="news.html">Read the news</a></section></div>' + showcaseSection() + "</div>";
    bindCopy(main); bindShowcase(main);
  }

  function renderFaq() {
    setTitle("FAQ", "Answers to common questions about " + S.name + ".");
    var list = D.faq || [];
    main.innerHTML = '<div class="container page page--narrow"><h1>FAQ</h1><p class="lead">Quick answers to common questions.</p>' +
      (list.length ? '<div class="faq">' + list.map(function (f) { return '<details class="faq__item glass"><summary>' + esc(f.q) + '</summary><div class="prose">' + fill(f.a) + "</div></details>"; }).join("") + "</div>" : stateBlock("No questions yet.", "Check back soon.")) +
      '<p class="muted">Can\'t find your answer? Ask in <a class="more" href="' + esc(S.discordUrl || "community.html") + '">our community</a>.</p></div>';
    prepProse(main);
  }

  function renderRules() {
    setTitle("Rules", "The rules of " + S.name + ".");
    var r = D.rules || {};
    main.innerHTML = '<div class="container page page--narrow"><h1>Rules</h1>' + (r.content ? (r.updated ? '<p class="muted">Last updated ' + fmt(r.updated) + "</p>" : "") + '<div class="prose" id="prose">' + fill(r.content) + "</div>" : stateBlock("The rules haven't been published yet.", "Please check back soon.")) + "</div>";
    if (r.content) { prepProse($("#prose")); headingsToc($("#prose")); }
  }

  function renderNews() {
    var slug = new URLSearchParams(location.search).get("p");
    if (!slug) {
      setTitle("News", "News and announcements from " + S.name + ".");
      main.innerHTML = '<div class="container page"><h1>News</h1>' + (news.length ? '<div class="news-list">' + news.map(function (p, i) { return newsCard(p, i === 0); }).join("") + "</div>" : stateBlock("No news yet.", "Announcements will appear here.")) + announcementsHtml() + "</div>";
      return;
    }
    var p = news.filter(function (x) { return x.slug === slug; })[0];
    if (!p) { setTitle("Post not found"); main.innerHTML = '<div class="container page page--narrow"><a class="back" href="news.html">Back to News</a>' + notFoundBlock("post", true) + "</div>"; return; }
    setTitle(p.title, p.excerpt);
    var more = news.filter(function (x) { return x !== p; }).slice(0, 3);
    main.innerHTML = '<div class="container page page--narrow"><a class="back" href="news.html">Back to News</a><article>' +
      (p.cover ? '<img class="cover" src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || "") + '" width="1200" height="675" decoding="async">' : "") +
      '<p class="ncard__meta">' + (p.category ? esc(p.category) + " · " : "") + fmt(p.date) + '</p><h1 class="article-title">' + esc(p.title) + "</h1>" + (p.excerpt ? '<p class="lead">' + esc(p.excerpt) + "</p>" : "") +
      '<div class="prose" id="prose" style="margin-top:1rem">' + fill(p.content) + "</div>" + ((p.tags || []).length ? '<ul class="tags" aria-label="Tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
      (more.length ? '<section class="section"><h2>More news</h2><div class="news-list">' + more.map(function (x) { return newsCard(x, false); }).join("") + "</div></section>" : "") + "</article></div>";
    prepProse($("#prose"));
  }

  function renderWiki() {
    var slug = new URLSearchParams(location.search).get("a");
    var art = slug ? wikiFlat.filter(function (a) { return a.slug === slug; })[0] : null;
    var groups = cats.map(function (c) { return { c: c, list: wikiFlat.filter(function (a) { return a.category === c.id; }) }; }).filter(function (g) { return g.list.length; });
    var other = wikiFlat.filter(function (a) { return !catOf(a); }); if (other.length) groups.push({ c: null, list: other });
    var navHtml = groups.map(function (g) {
      return "<div><h2>" + esc(g.c ? g.c.name : "Other") + "</h2><ul>" + g.list.map(function (a) { return '<li><a href="wiki.html?a=' + encodeURIComponent(a.slug) + '"' + (art && art.slug === a.slug ? ' class="active" aria-current="page"' : "") + ">" + esc(a.title) + "</a></li>"; }).join("") + "</ul></div>";
    }).join("") || '<p class="muted">Nothing here yet.</p>';

    var body;
    if (!slug) {
      setTitle("Wiki", "Guides, commands and answers for " + S.name + ".");
      body = groups.length ? groups.map(function (g) {
        return '<section class="wiki-group"><h2>' + esc(g.c ? g.c.name : "Other") + "</h2>" + (g.c && g.c.description ? '<p class="muted">' + esc(g.c.description) + "</p>" : "") + '<div class="cards">' +
          g.list.map(function (a) { return '<a class="card glass card--link" href="wiki.html?a=' + encodeURIComponent(a.slug) + '"><h3>' + esc(a.title) + "</h3>" + (a.excerpt ? "<p>" + esc(a.excerpt) + "</p>" : "") + "</a>"; }).join("") + "</div></section>";
      }).join("") : stateBlock("The wiki is empty so far.", "Articles will appear here once they're published.");
    } else if (!art) {
      setTitle("Article not found"); body = notFoundBlock("article");
    } else {
      setTitle(art.title, art.excerpt);
      var c = catOf(art), at = wikiFlat.indexOf(art), prev = wikiFlat[at - 1], next = wikiFlat[at + 1];
      var related = wikiFlat.filter(function (a) { return a !== art && a.category === art.category; }).slice(0, 3);
      body = '<article class="wiki-article"><div class="wiki-article__body"><nav aria-label="Breadcrumb" class="crumbs"><ol><li><a href="wiki.html">Wiki</a></li>' + (c ? "<li>" + esc(c.name) + "</li>" : "") + '<li aria-current="page">' + esc(art.title) + "</li></ol></nav>" +
        '<h1 class="article-title">' + esc(art.title) + "</h1>" + (art.excerpt ? '<p class="lead">' + esc(art.excerpt) + "</p>" : "") +
        '<p class="muted">' + (art.updated ? "Updated " + fmt(art.updated) : "") + (art.version ? " · Version " + esc(art.version) : "") + '</p><div id="toc-mobile"></div><div class="prose" id="prose">' + fill(art.content) + "</div>" +
        (prev || next ? '<nav class="pager" aria-label="More articles">' + (prev ? '<a class="glass" href="wiki.html?a=' + encodeURIComponent(prev.slug) + '"><small>Previous</small>' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="glass pager__next" href="wiki.html?a=' + encodeURIComponent(next.slug) + '"><small>Next</small>' + esc(next.title) + "</a>" : "<span></span>") + "</nav>" : "") +
        (related.length ? '<section class="section"><h2>Related articles</h2><ul class="related">' + related.map(function (a) { return '<li><a href="wiki.html?a=' + encodeURIComponent(a.slug) + '">' + esc(a.title) + "</a></li>"; }).join("") + "</ul></section>" : "") + '</div><aside class="toc toc--side" id="toc-side" aria-label="On this page" hidden></aside></article>';
    }

    main.innerHTML = '<div class="container page">' + (art ? "" : "<h1>Wiki</h1>") + '<div class="search" role="search"><label class="sr-only" for="wiki-q">Search the wiki</label><input id="wiki-q" type="search" placeholder="Search the wiki" autocomplete="off"><div id="results" aria-live="polite"></div></div>' +
      '<div class="wiki"><details class="wiki__nav glass" id="wiki-nav"><summary>Browse the wiki</summary><nav aria-label="Wiki">' + navHtml + '</nav></details><div class="wiki__main">' + body + "</div></div></div>";

    var det = $("#wiki-nav"), mq = window.matchMedia("(min-width: 960px)");
    function syncNav() { det.open = mq.matches; } syncNav();
    if (mq.addEventListener) mq.addEventListener("change", syncNav); else if (mq.addListener) mq.addListener(syncNav);

    if (art) {
      var prose = $("#prose"); prepProse(prose);
      var toc = headingsToc(prose);
      if (toc.length > 1) {
        var list = "<ul>" + toc.map(function (h) { return '<li style="padding-left:' + (h.level - 2) * 12 + 'px"><a href="#' + esc(h.id) + '">' + esc(h.text) + "</a></li>"; }).join("") + "</ul>";
        $("#toc-mobile").innerHTML = '<details class="toc toc--mobile glass"><summary>On this page</summary>' + list + "</details>";
        var side = $("#toc-side"); side.hidden = false; side.innerHTML = "<h2>On this page</h2>" + list;
      }
      if (location.hash) { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); }
    }

    var idx = wikiFlat.map(function (a) {
      var tmp = document.createElement("div"); tmp.innerHTML = fill(a.content);
      return { a: a, title: a.title.toLowerCase(), ex: (a.excerpt || "").toLowerCase(), kw: (a.keywords || "").toLowerCase(), text: tmp.textContent.toLowerCase() };
    });
    var q = $("#wiki-q"), res = $("#results");
    function runSearch() {
      var toks = q.value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
      if (!q.value.trim()) { res.innerHTML = ""; return; }
      var hits = idx.map(function (e) {
        var s = 0;
        for (var i = 0; i < toks.length; i++) { var m = 0, t = toks[i]; if (e.title.indexOf(t) >= 0) m += 8; if (e.kw.indexOf(t) >= 0) m += 4; if (e.ex.indexOf(t) >= 0) m += 3; if (e.text.indexOf(t) >= 0) m += 1; if (!m) return null; s += m; }
        return toks.length ? { a: e.a, s: s } : null;
      }).filter(Boolean).sort(function (x, y) { return y.s - x.s; }).slice(0, 8);
      res.innerHTML = hits.length ? '<ul class="search__results glass">' + hits.map(function (h) { return '<li><a href="wiki.html?a=' + encodeURIComponent(h.a.slug) + '"><strong>' + esc(h.a.title) + "</strong>" + (h.a.excerpt ? "<span>" + esc(h.a.excerpt) + "</span>" : "") + "</a></li>"; }).join("") + "</ul>" : '<p class="search__note">No results for "' + esc(q.value.trim()) + '".</p>';
    }
    q.addEventListener("input", runSearch);
    q.addEventListener("keydown", function (e) { if (e.key === "Escape") { q.value = ""; res.innerHTML = ""; } });
  }

  /* ---------- Discord presence + member count ---------- */
  function inviteCode() { var d = D.discord || {}; if (d.inviteCode) return String(d.inviteCode); var m = String(S.discordUrl || "").match(/(?:discord\.gg|discord(?:app)?\.com\/invite)\/([\w-]+)/i); return m ? m[1] : ""; }
  function discordOn() { var d = D.discord || {}; return d.showCount !== false && !!(inviteCode() || d.guildId); }
  function countUp(el, to) {
    if (reduceMotion || !window.requestAnimationFrame) { el.textContent = to.toLocaleString(); return; }
    var t0 = null; function tick(t) { if (t0 === null) t0 = t; var k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e).toLocaleString(); if (k < 1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  function showDiscord(on, total) {
    $$("[data-discord-stats]").forEach(function (el) {
      var parts = [];
      if (on != null) parts.push('<span class="dot dot--on"></span><span><b data-n="' + on + '">0</b> online</span>');
      if (total != null) parts.push('<span><b data-n="' + total + '">0</b> members</span>');
      if (!parts.length) return;
      el.innerHTML = parts.join('<span class="pill__sep"></span>'); el.hidden = false;
      $$("b[data-n]", el).forEach(function (b) { countUp(b, Number(b.dataset.n)); });
    });
  }
  function loadDiscord() {
    if (!discordOn() || !$("[data-discord-stats]")) return;
    var d = D.discord || {}, key = "cx-discord", cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(key) || "null"); } catch (e) { cached = null; }
    if (cached && Date.now() - cached.t < 300000) { showDiscord(cached.on, cached.total); return; }
    var ctl = typeof AbortController === "function" ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 7000), opt = ctl ? { signal: ctl.signal } : {};
    function save(on, total) { if (on == null && total == null) return; try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), on: on, total: total })); } catch (e) { /* ignore */ } showDiscord(on, total); }
    function viaWidget() {
      if (!d.guildId) return Promise.resolve();
      return fetch("https://discord.com/api/guilds/" + encodeURIComponent(d.guildId) + "/widget.json", opt).then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
        .then(function (w) { save(typeof w.presence_count === "number" ? w.presence_count : null, null); });
    }
    var code = inviteCode(), first = code ? fetch("https://discord.com/api/v10/invites/" + encodeURIComponent(code) + "?with_counts=true", opt).then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
      .then(function (v) { var on = typeof v.approximate_presence_count === "number" ? v.approximate_presence_count : null, tot = typeof v.approximate_member_count === "number" ? v.approximate_member_count : null; if (on == null && tot == null) throw new Error("none"); save(on, tot); }) : Promise.reject(new Error("no code"));
    first.catch(viaWidget).catch(function () { /* leave hidden */ }).then(function () { clearTimeout(timer); });
  }

  /* ---------- motion: hero pixels, scroll reveal, progress bar, card glow ---------- */
  function heroPx() {
    if (reduceMotion) return "";
    var cols = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"], out = "";
    for (var i = 0; i < 16; i++) out += '<i style="--x:' + Math.round(Math.random() * 96) + "%;--s:" + (4 + Math.round(Math.random() * 6)) + "px;--d:" + (9 + Math.round(Math.random() * 9)) + "s;--dl:-" + Math.round(Math.random() * 14) + "s;--c:" + cols[i % 3] + '"></i>';
    return '<div class="hero__px" aria-hidden="true">' + out + "</div>";
  }
  var canTilt = !reduceMotion && !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  var rvObs = null, RV = ".section > h2, .row-between, .join, .card, .ncard, .steps li, .shots li, .staff, .tl__card, .cta, .faq__item, .state, .wiki-group > h2, .ann li, .pager a, .tabs, .chips, .toc--mobile, .prose > h2, .prose > .callout, .footer__grid > div";
  function reveal(root) {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    if (!rvObs) rvObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rvObs.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    var kids = new Map();
    $$(RV, root || document).forEach(function (el) {
      if (el.hasAttribute("data-rv") || (el.closest(".prose") && !(el.parentNode.classList && el.parentNode.classList.contains("prose")))) return;
      var par = el.parentNode, n = kids.get(par) || 0; kids.set(par, n + 1);
      el.setAttribute("data-rv", ""); if (canTilt && el.matches(".card, .staff, .ncard")) el.setAttribute("data-tilt", ""); el.style.setProperty("--i", String(Math.min(n, 6)));
      rvObs.observe(el);
    });
    document.documentElement.classList.add("js-reveal");
  }
  function chromeFx() {
    var bar = document.createElement("div"); bar.className = "progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
    var ticking = false;
    function upd() { ticking = false; var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.setProperty("--p", h > 0 ? Math.min(1, window.scrollY / h).toFixed(4) : "0"); tlProgress(); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener("resize", upd); upd();
    if (window.matchMedia && matchMedia("(hover: hover)").matches && !reduceMotion) {
      document.addEventListener("pointerout", function (e) {
        var t = e.target.closest ? e.target.closest("[data-tilt]") : null;
        if (t && !(e.relatedTarget && t.contains(e.relatedTarget))) { t.style.setProperty("--tx", "0deg"); t.style.setProperty("--ty", "0deg"); }
      }, { passive: true });
      document.addEventListener("pointermove", function (e) {
        var t = e.target.closest ? e.target.closest("[data-tilt]") : null;
        if (t) { var tr = t.getBoundingClientRect(), px = (e.clientX - tr.left) / tr.width - 0.5, py = (e.clientY - tr.top) / tr.height - 0.5; t.style.setProperty("--tx", (px * 6).toFixed(2) + "deg"); t.style.setProperty("--ty", (-py * 6).toFixed(2) + "deg"); }
        var c = e.target.closest ? e.target.closest(".card, .ncard, .staff, .join, .cta, .tl__card, .steps li") : null; if (!c) return;
        var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    }
  }
  function tlProgress() {
    var tl = $("#tl"); if (!tl) return;
    var r = tl.getBoundingClientRect(), mid = window.innerHeight * 0.62, pct = Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, r.height)));
    tl.style.setProperty("--tlp", (pct * 100).toFixed(2) + "%");
    var last = null;
    $$(".tl__item", tl).forEach(function (it) { var on = it.getBoundingClientRect().top + 24 < mid; it.classList.toggle("on", on); it.classList.remove("hl"); if (on) last = it; });
    if (last) last.classList.add("hl");
  }

  /* ---------- timeline + staff pages ---------- */
  function renderTimeline() {
    var T = D.timeline || {}, list = (T.events || []).filter(function (e) { return !e.draft; }), dated = list.length > 0 && list.every(function (e) { return !!e.date; });
    if (dated) list = list.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    if (T.order === "newest") list = list.slice().reverse();
    var intro = T.intro || "The story of " + S.name + ", one event at a time.";
    setTitle("Timeline", intro);
    main.innerHTML = '<div class="container page"><h1>' + esc(T.title || "Timeline") + '</h1><p class="lead">' + esc(intro) + "</p>" +
      (list.length ? '<div class="tl" id="tl"><div class="tl__line" aria-hidden="true"><i></i></div><ol class="tl__list">' + list.map(function (e) {
        return '<li class="tl__item' + (e.future ? " tl__item--future" : "") + '"><span class="tl__dot" aria-hidden="true"></span><article class="tl__card glass"><p class="tl__date">' + (e.label ? esc(e.label) : e.date ? fmt(e.date) : "") + "</p>" +
          (e.tag ? '<span class="tl__tag">' + esc(e.tag) + "</span>" : "") + "<h3>" + esc(e.title) + "</h3>" + (e.description ? "<p>" + esc(e.description) + "</p>" : "") +
          (e.image ? '<img class="tl__img" src="' + esc(e.image) + '" alt="' + esc(e.imageAlt || e.title) + '" width="1280" height="720" loading="lazy" decoding="async">' : "") + "</article></li>";
      }).join("") + "</ol></div>" : stateBlock("The story is just beginning.", "Events will appear here as they happen.")) + "</div>";
  }
  function renderStaff() {
    var St = D.staff || {}, roles = St.roles || [], all = (St.members || []).filter(function (m) { return !m.draft; });
    var intro = St.intro || "The people who keep " + S.name + " running.";
    setTitle("Staff", intro);
    function color(c) { return /^#[0-9a-f]{3,8}$/i.test(String(c || "")) ? c : ""; }
    var groups = roles.map(function (r) { return { r: r, list: all.filter(function (m) { return m.role === r.id; }) }; }).filter(function (g) { return g.list.length; });
    var rest = all.filter(function (m) { return !roles.some(function (r) { return r.id === m.role; }); }); if (rest.length) groups.push({ r: { id: "", name: "Team" }, list: rest });
    function card(m, r) {
      var av = m.skin ? '<img class="px" src="https://mc-heads.net/avatar/' + encodeURIComponent(m.skin) + '/128" alt="" width="72" height="72" loading="lazy" decoding="async">' : m.avatar ? '<img src="' + esc(m.avatar) + '" alt="" width="72" height="72" loading="lazy" decoding="async" referrerpolicy="no-referrer">' : "";
      var links = (m.links || []).filter(function (l) { return l && l.url; });
      return '<article class="staff glass"' + (color(r.color) ? ' style="--sc:' + color(r.color) + '"' : "") + '><div class="staff__av" aria-hidden="true">' + esc((m.name || "?").trim().charAt(0).toUpperCase()) + av + '</div><div class="staff__body"><h3>' + esc(m.name) + '</h3><span class="staff__role">' + esc(m.title || r.name) + "</span>" +
        (m.bio ? "<p>" + esc(m.bio) + "</p>" : "") + (links.length ? '<ul class="staff__links">' + links.map(function (l) { return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label || "Link") + "</a></li>"; }).join("") + "</ul>" : "") + "</div></article>";
    }
    main.innerHTML = '<div class="container page"><h1>' + esc(St.title || "Staff") + '</h1><p class="lead">' + esc(intro) + "</p>" +
      (groups.length ? groups.map(function (g) { return '<section class="staff-group"' + (color(g.r.color) ? ' style="--sc:' + color(g.r.color) + '"' : "") + "><h2>" + esc(g.r.name) + '</h2><div class="cards">' + g.list.map(function (m) { return card(m, g.r); }).join("") + "</div></section>"; }).join("") : stateBlock("The staff list is coming soon.", "Check back shortly.")) + "</div>";
    $$(".staff__av img", main).forEach(function (i) { i.addEventListener("error", function () { i.remove(); }); });
  }

  function renderNotFound() {
    setTitle("Page not found");
    var lines = ["Generating chunk… 0%", "Generation failed. The void stares back.", "Tip: some places aren't on any map. Try void.html"], n = 0;
    main.innerHTML = '<div class="container nf"><div class="nf__code" id="nf-code" aria-hidden="true">404</div><h1 style="font-size:clamp(1.6rem,4vw,2.4rem)">Chunk not found</h1><p class="muted">This page doesn\'t exist or has moved.</p><p id="nf-line" style="color:var(--accent);min-height:1.6em" aria-live="polite"></p><a class="btn btn--primary" href="index.html">Return home</a></div>';
    $("#nf-code").addEventListener("click", function () { n = Math.min(n + 1, lines.length); $("#nf-line").textContent = lines[n - 1]; });
  }

  function renderVoid() {
    setTitle("The Void");
    main.innerHTML = '<div class="container nf"><h1 style="font-size:clamp(2rem,6vw,3.5rem)">The Void</h1><p class="muted">Nothing here. That\'s the point.</p><a class="btn" href="index.html">Climb back out</a></div>';
    var seen = false; try { seen = !!sessionStorage.getItem("void"); sessionStorage.setItem("void", "1"); } catch (e) { seen = false; }
    if (!seen) toast("Advancement made: Into the Void");
  }

  /* ---------- keyboard Easter eggs ---------- */
  function keyEggs() {
    var K = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a", seq = [], word = "";
    window.addEventListener("keydown", function (e) {
      var t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key; seq.push(k); seq = seq.slice(-10);
      if (seq.join(",") === K) {
        var root = document.documentElement, on = root.dataset.palette === "emerald";
        if (on) delete root.dataset.palette; else root.dataset.palette = "emerald";
        toast(on ? "Back to survival mode" : "Creative mode unlocked");
      }
      if (k.length === 1) { word = (word + k).slice(-7); if (word === "creeper") { word = ""; toast("Ssssss…"); setTimeout(function () { toast("Just kidding. You're safe here."); }, 1600); } }
    });
  }

  /* ---------- start ---------- */
  try { console.info("%cCraftex Network", "font-weight:bold;color:#3fd9e8", "\nYou read the console. Welcome to the team. Try void.html"); } catch (e) { /* no console */ }
  (function kbd() {
    var root = document.documentElement;
    window.addEventListener("keydown", function (e) { if (e.key === "Tab") root.classList.add("kbd"); }, true);
    ["pointerdown", "mousedown", "touchstart"].forEach(function (ev) { window.addEventListener(ev, function () { root.classList.remove("kbd"); }, { capture: true, passive: true }); });
  })();
  buildChrome(); keyEggs();
  var pages = { home: renderHome, community: renderCommunity, faq: renderFaq, rules: renderRules, news: renderNews, wiki: renderWiki, timeline: renderTimeline, staff: renderStaff, notfound: renderNotFound, void: renderVoid };
  (pages[page] || renderNotFound)();
  reveal(main); reveal($(".footer")); chromeFx(); loadDiscord();
  if (location.hash && page !== "wiki") { var anchor = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (anchor) anchor.scrollIntoView(); }
  PT.init(); PT.arrive(function () { NAV.show(); });
})();
