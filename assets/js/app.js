(function () {
  const S = window.SHOP;
  const { art, COLORS } = window.ART;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

  // Browser storage can be blocked; the site still works without it.
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  let cart = store.get("ro_cart", []);        // [{id, color, qty}]
  let wish = store.get("ro_wish", []);        // [id]
  let recent = store.get("ro_recent", []);    // [id]

  const byId = (id) => S.products.find((p) => p.id === id);
  function catBySlug(slug) {
    for (const top of S.menu) {
      if (top.slug === slug) return { ...top, top };
      for (const c of top.children) if (c.slug === slug) return { ...c, top };
    }
    return null;
  }
  const countIn = (slug) => S.products.filter((p) => p.cat === slug || catBySlug(p.cat).top.slug === slug).length;
  const pic = (p, color, cls = "") => p.img
    ? `<img class="${cls}" src="${p.img}" alt="${esc(p.name)}" loading="lazy">`
    : art(p.art, color || p.colors[0], p.name);

  /* ---------- icons ---------- */
  const I = (d, extra = "") => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const ic = {
    search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    user: I('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
    heart: I('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    cart: I('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>'),
    menu: I('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    close: I('<path d="M18 6 6 18M6 6l12 12"/>'),
    eye: I('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
    truck: I('<path d="M1 4h14v12H1zM15 9h4l3 3v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'),
    wrench: I('<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z"/>'),
    phone: I('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    chev: I('<path d="m6 9 6 6 6-6"/>'),
    left: I('<path d="m15 18-6-6 6-6"/>'),
    right: I('<path d="m9 18 6-6-6-6"/>'),
    shield: I('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
    ret: I('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
    pin: I('<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
    money: I('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'),
    grid: I('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    filter: I('<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>'),
    trash: I('<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>'),
    wa: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.2 4.2 0 0 0 1.9.1 3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>'
  };
  const stars = (r, n) => `<div class="stars" title="Rated ${r} out of 5"><span style="--r:${(r / 5) * 100}%"></span>${n != null ? `<em>(${n})</em>` : ""}</div>`;
  const logo = `<span class="logo-mark">${art("mtb", "#ffffff")}</span><span class="logo-text">${esc(S.name)}<small>${esc(S.tagline)}</small></span>`;
  const waLink = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;

  /* ---------- product card ---------- */
  function card(p) {
    const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    const stock = p.stock ? (p.stock < 4 ? `<span class="low">Only ${p.stock} left</span>` : "In stock") : "Out of stock";
    return `<article class="card">
      <div class="card-media">
        <div class="badges">${off ? `<span class="badge sale">-${off}%</span>` : ""}${p.tags.includes("new") ? `<span class="badge new">New</span>` : ""}${!p.stock ? `<span class="badge out">Sold out</span>` : ""}</div>
        <a href="product.html?id=${p.id}" class="card-img" tabindex="-1">${pic(p)}</a>
        <div class="card-actions">
          <button class="${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Add to wishlist" title="Wishlist">${ic.heart}</button>
          <button data-quick="${p.id}" aria-label="Quick view" title="Quick view">${ic.eye}</button>
        </div>
      </div>
      <div class="card-body">
        <a class="card-cat" href="shop.html?cat=${p.cat}">${esc(catBySlug(p.cat).name)}</a>
        <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
        ${stars(p.rating, p.reviews)}
        <div class="price">${money(p.price)}${p.was ? ` <del>${money(p.was)}</del>` : ""}</div>
        <div class="stock ${p.stock ? "in" : "out"}">${stock}</div>
        ${p.stock ? `<button class="btn btn-sm btn-block" data-add="${p.id}">${ic.cart} Add to basket</button>` : `<a class="btn btn-sm btn-block btn-ghost" href="product.html?id=${p.id}">Read more</a>`}
      </div>
    </article>`;
  }
  const carousel = (items, id) => `<div class="carousel" id="${id}">
    <button class="car-btn prev" aria-label="Previous">${ic.left}</button>
    <div class="car-track">${items.map(card).join("")}</div>
    <button class="car-btn next" aria-label="Next">${ic.right}</button></div>`;
  function bindCarousels(root = document) {
    $$(".carousel", root).forEach((c) => {
      const t = $(".car-track", c);
      $(".prev", c).onclick = () => t.scrollBy({ left: -t.clientWidth * 0.8, behavior: "smooth" });
      $(".next", c).onclick = () => t.scrollBy({ left: t.clientWidth * 0.8, behavior: "smooth" });
    });
  }

  /* ---------- header / footer / drawers ---------- */
  function header() {
    const mega = S.menu.map((top) => {
      const feat = S.products.find((p) => catBySlug(p.cat).top.slug === top.slug && p.tags.includes("best")) || S.products.find((p) => catBySlug(p.cat).top.slug === top.slug);
      return `<li class="has-mega"><a href="shop.html?cat=${top.slug}">${esc(top.name)} ${ic.chev}</a>
        <div class="mega"><div class="wrap mega-wrap">
          <div class="mega-links">${top.children.map((c) => `<a href="shop.html?cat=${c.slug}"><span class="mega-ic">${art(c.art, "Black")}</span><span>${esc(c.name)}<small>${countIn(c.slug)} products</small></span></a>`).join("")}
            <a class="mega-all" href="shop.html?cat=${top.slug}">View all ${esc(top.name)} →</a></div>
          ${feat ? `<a class="mega-feat" href="product.html?id=${feat.id}"><span class="mega-feat-img">${pic(feat)}</span><span class="kicker">Popular pick</span><strong>${esc(feat.name)}</strong><span class="price">${money(feat.price)}</span></a>` : ""}
        </div></div></li>`;
    }).join("");
    return `
    <div class="topbar"><div class="wrap tb">
      <div class="tb-left"><a href="index.html#service">${ic.wrench} Service &amp; Repair</a><span class="only-d">${ic.truck} Next-day delivery in Nairobi</span><span class="only-d">${ic.money} Pay on delivery · M-Pesa</span></div>
      <div class="tb-right"><a href="tel:${S.phone}">${ic.phone} ${S.phoneDisplay}</a><button class="linklike" data-open="login">${ic.user} Login / Register</button></div>
    </div></div>
    <header class="header" id="siteHeader"><div class="wrap header-row">
      <button class="icon-btn only-m" data-open="menu" aria-label="Open menu">${ic.menu}</button>
      <a class="logo" href="index.html" aria-label="${esc(S.name)} home">${logo}</a>
      <form class="search" action="shop.html" role="search">
        <input name="q" placeholder="Search bikes, parts, accessories…" aria-label="Search products" autocomplete="off">
        <button aria-label="Search">${ic.search}</button>
        <div class="suggest" hidden></div>
      </form>
      <div class="header-icons">
        <a href="shop.html?wish=1" class="icon-btn" aria-label="Wishlist">${ic.heart}<span class="count" data-wish-count>0</span></a>
        <button class="icon-btn cart-btn" data-open="cart" aria-label="Open cart">${ic.cart}<span class="count" data-cart-count>0</span><span class="cart-total only-d" data-cart-total>KSh 0</span></button>
      </div>
    </div>
    <nav class="mainnav only-d" aria-label="Main"><div class="wrap"><ul>${mega}<li><a class="hot" href="shop.html?tag=deal">Deals</a></li><li><a href="index.html#service">Bike Service</a></li></ul></div></nav>
    </header>`;
  }

  function footer() {
    return `
    <section class="features"><div class="wrap feat-grid">
      <div>${ic.truck}<strong>Fast delivery</strong><span>Next day in Nairobi, 2-3 days countrywide</span></div>
      <div>${ic.money}<strong>Pay on delivery</strong><span>M-Pesa, cash or card</span></div>
      <div>${ic.ret}<strong>Free 7-day returns</strong><span>Unused items, no fuss</span></div>
      <div>${ic.wrench}<strong>Expert servicing</strong><span>Every bike built &amp; checked by mechanics</span></div>
    </div></section>
    <footer class="footer"><div class="wrap foot-grid">
      <div class="foot-brand"><a class="logo light" href="index.html">${logo}</a><p>${esc(S.about)}</p>
        <p><a href="tel:${S.phone}">${ic.phone} ${S.phoneDisplay}</a><br><a href="mailto:${S.email}">${esc(S.email)}</a></p>
        <form class="news" data-news><label for="newsEmail">Get deals &amp; ride news</label><div><input id="newsEmail" type="email" required placeholder="Your email"><button class="btn btn-sm">Subscribe</button></div></form>
      </div>
      <div><h4>Shop</h4>${S.menu.map((m) => `<a href="shop.html?cat=${m.slug}">${esc(m.name)}</a>`).join("")}<a href="shop.html?tag=deal">Deals</a></div>
      <div><h4>Help</h4><a href="index.html#service">Book a service</a><a href="cart.html">Delivery &amp; returns</a><a href="${waLink("Hi, I have a question")}" target="_blank" rel="noopener">WhatsApp us</a><a href="index.html#stores">Store locations</a></div>
      <div><h4>Visit us</h4>${S.stores.map((s) => `<p class="store-mini"><strong>${esc(s.name)}</strong><br>${esc(s.area)}<br><small>${esc(s.hours)}</small></p>`).join("")}</div>
    </div>
    <div class="wrap foot-bottom"><span>© ${new Date().getFullYear()} ${esc(S.name)} ${esc(S.tagline)}. All rights reserved.</span>
      <span class="pay-logos"><b class="mpesa">M-PESA</b><b>VISA</b><b>Mastercard</b><b>Cash on delivery</b></span></div>
    </footer>
    <a class="wa-float" href="${waLink("Hi " + S.name + ", I need help with")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ic.wa}<span>Need help?</span></a>
    <div class="overlay" data-close></div>
    <aside class="drawer drawer-left" id="menuDrawer" aria-label="Menu">
      <div class="drawer-head"><strong>Menu</strong><button class="icon-btn" data-close aria-label="Close">${ic.close}</button></div>
      <form class="search m-search" action="shop.html"><input name="q" placeholder="Search…" aria-label="Search"><button aria-label="Search">${ic.search}</button></form>
      <nav class="m-nav">${S.menu.map((m) => `<details><summary>${esc(m.name)} ${ic.chev}</summary>${m.children.map((c) => `<a href="shop.html?cat=${c.slug}">${esc(c.name)}</a>`).join("")}<a href="shop.html?cat=${m.slug}"><b>All ${esc(m.name)}</b></a></details>`).join("")}
        <a class="m-top hot" href="shop.html?tag=deal">Deals</a><a class="m-top" href="index.html#service">Bike Service</a><a class="m-top" href="shop.html?wish=1">Wishlist</a></nav>
    </aside>
    <aside class="drawer drawer-right" id="cartDrawer" aria-label="Shopping cart">
      <div class="drawer-head"><strong>Shopping cart</strong><button class="icon-btn" data-close aria-label="Close">${ic.close}</button></div>
      <div class="drawer-body" id="cartBody"></div>
    </aside>
    <div class="modal" id="modal" role="dialog" aria-modal="true" hidden><div class="modal-box"><button class="icon-btn modal-x" data-close aria-label="Close">${ic.close}</button><div id="modalBody"></div></div></div>
    <div class="toast" id="toast" role="status"></div>`;
  }

  /* ---------- cart ---------- */
  const save = () => { store.set("ro_cart", cart); store.set("ro_wish", wish); updateCounts(); };
  const cartTotal = () => cart.reduce((t, l) => t + (byId(l.id)?.price || 0) * l.qty, 0);
  function addToCart(id, color, qty = 1) {
    const p = byId(id); if (!p || !p.stock) return;
    color = color || p.colors[0];
    const line = cart.find((l) => l.id === id && l.color === color);
    if (line) line.qty = Math.min(line.qty + qty, p.stock); else cart.push({ id, color, qty: Math.min(qty, p.stock) });
    save(); renderCartDrawer(); toast(`Added to basket: <b>${esc(p.name)}</b>`); open("cart");
  }
  function updateCounts() {
    const n = cart.reduce((t, l) => t + l.qty, 0);
    $$("[data-cart-count]").forEach((e) => (e.textContent = n));
    $$("[data-cart-total]").forEach((e) => (e.textContent = money(cartTotal())));
    $$("[data-wish-count]").forEach((e) => (e.textContent = wish.length));
  }
  function renderCartDrawer() {
    const body = $("#cartBody"); if (!body) return;
    if (!cart.length) { body.innerHTML = `<div class="empty">${ic.cart}<p>Your basket is empty.</p><a class="btn" href="shop.html">Start shopping</a></div>`; return; }
    const total = cartTotal(), left = S.freeDeliveryOver - total;
    body.innerHTML = `<div class="free-bar"><p>${left > 0 ? `Add <b>${money(left)}</b> more for free Nairobi delivery` : `You qualify for <b>free Nairobi delivery</b>`}</p><span><i style="width:${Math.min(100, (total / S.freeDeliveryOver) * 100)}%"></i></span></div>
      <ul class="mini-cart">${cart.map((l, i) => { const p = byId(l.id); return p ? `<li><a href="product.html?id=${p.id}" class="mc-img">${pic(p, l.color)}</a><div><a href="product.html?id=${p.id}">${esc(p.name)}</a><small>${esc(l.color)}</small>
        <div class="qty sm"><button data-q="${i}" data-d="-1" aria-label="Less">−</button><span>${l.qty}</span><button data-q="${i}" data-d="1" aria-label="More">+</button></div></div><div class="mc-right"><b>${money(p.price * l.qty)}</b><button class="icon-btn" data-rm="${i}" aria-label="Remove">${ic.trash}</button></div></li>` : ""; }).join("")}</ul>
      <div class="mc-foot"><div class="row"><span>Subtotal</span><b>${money(total)}</b></div><p class="muted">Pay on delivery available in Nairobi.</p>
      <a class="btn btn-block" href="cart.html">View basket &amp; checkout</a></div>`;
  }
  function changeQty(i, d) {
    const l = cart[i]; if (!l) return;
    const max = byId(l.id)?.stock || 1;
    l.qty = Math.max(1, Math.min(max, l.qty + d)); save(); renderCartDrawer(); window.__cartPage && window.__cartPage();
  }
  function removeLine(i) { cart.splice(i, 1); save(); renderCartDrawer(); window.__cartPage && window.__cartPage(); }
  function toggleWish(id, btn) {
    const i = wish.indexOf(id);
    if (i >= 0) wish.splice(i, 1); else wish.push(id);
    save(); $$(`[data-wish="${id}"]`).forEach((b) => b.classList.toggle("on", i < 0));
    toast(i < 0 ? "Saved to wishlist" : "Removed from wishlist");
  }

  /* ---------- drawers, modal, toast ---------- */
  function open(which) {
    closeAll();
    if (which === "menu") $("#menuDrawer").classList.add("open");
    if (which === "cart") { renderCartDrawer(); $("#cartDrawer").classList.add("open"); }
    if (which === "login") showModal(`<h3>Sign in</h3><p class="muted">Accounts are not connected yet in this demo. Orders go through WhatsApp for now.</p>
      <form data-demo><label>Email<input type="email" required></label><label>Password<input type="password" required></label><button class="btn btn-block">Sign in</button></form>`);
    document.body.classList.add("locked");
  }
  function closeAll() {
    $$(".drawer.open").forEach((d) => d.classList.remove("open"));
    const m = $("#modal"); if (m) m.hidden = true;
    document.body.classList.remove("locked");
  }
  function showModal(html) { $("#modalBody").innerHTML = html; $("#modal").hidden = false; document.body.classList.add("locked"); }
  let toastT;
  function toast(html) { const t = $("#toast"); t.innerHTML = html; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }

  function quickView(id) {
    const p = byId(id); if (!p) return;
    showModal(`<div class="qv"><div class="qv-img">${pic(p)}</div><div>
      <span class="kicker">${esc(catBySlug(p.cat).name)}</span><h3>${esc(p.name)}</h3>${stars(p.rating, p.reviews)}
      <div class="price big">${money(p.price)}${p.was ? ` <del>${money(p.was)}</del>` : ""}</div><p>${esc(p.desc)}</p>
      <div class="swatches" data-sw>${p.colors.map((c, i) => `<button class="sw ${i ? "" : "on"}" data-color="${esc(c)}" style="--c:${COLORS[c] || c}" title="${esc(c)}"></button>`).join("")}</div>
      ${p.stock ? `<button class="btn" data-add-qv="${p.id}">${ic.cart} Add to basket</button>` : `<p class="stock out">Out of stock</p>`}
      <a class="link" href="product.html?id=${p.id}">View full details →</a></div></div>`);
    const sw = $("#modal [data-sw]");
    sw.addEventListener("click", (e) => { const b = e.target.closest(".sw"); if (!b) return; $$(".sw", sw).forEach((x) => x.classList.remove("on")); b.classList.add("on"); $("#modal .qv-img").innerHTML = pic(p, b.dataset.color); });
  }

  /* ---------- global events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-add-qv],[data-wish],[data-quick],[data-open],[data-close],[data-q],[data-rm],[data-post]");
    if (!t) { if (e.target.id === "modal") closeAll(); return; }
    if (t.dataset.add) addToCart(t.dataset.add);
    else if (t.dataset.addQv) { const c = $("#modal .sw.on"); addToCart(t.dataset.addQv, c && c.dataset.color); }
    else if (t.dataset.wish) toggleWish(t.dataset.wish, t);
    else if (t.dataset.quick) quickView(t.dataset.quick);
    else if (t.dataset.open) open(t.dataset.open);
    else if (t.hasAttribute("data-close")) closeAll();
    else if (t.dataset.q) changeQty(+t.dataset.q, +t.dataset.d);
    else if (t.dataset.rm) removeLine(+t.dataset.rm);
    else if (t.dataset.post) { const p = S.posts[+t.dataset.post]; showModal(`<article class="post-full"><div class="post-img">${art(p.art, p.color)}</div><span class="kicker">${esc(p.date)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  document.addEventListener("submit", (e) => {
    if (e.target.matches("[data-news]")) { e.preventDefault(); e.target.reset(); toast("Thanks! You're on the list."); }
    if (e.target.matches("[data-demo]")) { e.preventDefault(); closeAll(); toast("Accounts are coming soon."); }
  });

  function bindSearchSuggest() {
    const f = $(".header .search"); if (!f) return;
    const inp = $("input", f), box = $(".suggest", f);
    inp.addEventListener("input", () => {
      const q = inp.value.trim().toLowerCase();
      if (q.length < 2) { box.hidden = true; return; }
      const hits = S.products.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(q)).slice(0, 6);
      box.innerHTML = hits.length ? hits.map((p) => `<a href="product.html?id=${p.id}"><span>${pic(p)}</span><b>${esc(p.name)}</b><em>${money(p.price)}</em></a>`).join("") + `<a class="all" href="shop.html?q=${encodeURIComponent(q)}">See all results for “${esc(q)}”</a>` : `<p>No products found.</p>`;
      box.hidden = false;
    });
    document.addEventListener("click", (e) => { if (!f.contains(e.target)) box.hidden = true; });
  }

  /* ---------- HOME ---------- */
  function initHome() {
    const root = $("#home");
    const best = S.products.filter((p) => p.tags.includes("best"));
    const fresh = S.products.filter((p) => p.tags.includes("new"));
    const deal = S.products.filter((p) => p.was).sort((a, b) => b.was - b.price - (a.was - a.price))[0];
    const cats = S.menu.flatMap((m) => m.children).filter((c) => countIn(c.slug)).slice(0, 8);
    const recentP = recent.map(byId).filter(Boolean);

    root.innerHTML = `
    <section class="hero"><div class="slides">${S.slides.map((s, i) => `<div class="slide ${i ? "" : "on"}" style="background:${s.bg}"><div class="wrap slide-in">
        <div class="slide-text"><span class="kicker">${s.kicker}</span><h1>${s.title}</h1><p>${esc(s.text)}</p><a class="btn btn-lg" href="${s.href}">${s.cta}</a></div>
        <div class="slide-art">${art(s.art, s.color)}</div></div></div>`).join("")}</div>
      <button class="hero-btn prev" aria-label="Previous slide">${ic.left}</button><button class="hero-btn next" aria-label="Next slide">${ic.right}</button>
      <div class="dots">${S.slides.map((_, i) => `<button class="${i ? "" : "on"}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
    </section>

    <section class="wrap promo-row">
      <a class="promo" href="shop.html?cat=lights" style="--pbg:#1f2a37;--fg:#fff"><div><span class="kicker">Be seen</span><h3>Light your way</h3><p>USB lights from ${money(1200)}</p><span class="btn btn-sm">Shop lights</span></div>${art("light", "Black")}</a>
      <a class="promo" href="#service" style="--pbg:#ffe8dc"><div><span class="kicker">Workshop</span><h3>Feel new again after a service</h3><p>Full tune-ups from ${money(1500)}</p><span class="btn btn-sm">Book service</span></div>${art("tool", "Red")}</a>
    </section>

    <section class="wrap section"><div class="sec-head"><h2>Popular categories</h2><a href="shop.html">All products →</a></div>
      <div class="cat-grid">${cats.map((c) => `<a class="cat-tile" href="shop.html?cat=${c.slug}"><span>${art(c.art, "Black")}</span><b>${esc(c.name)}</b><small>${countIn(c.slug)} products</small></a>`).join("")}</div></section>

    <section class="wrap section"><div class="sec-head"><h2>Best sellers</h2><a href="shop.html?tag=best">More products →</a></div>${carousel(best, "carBest")}</section>

    ${deal ? `<section class="wrap section"><div class="deal">
      <div class="deal-art">${pic(deal)}</div>
      <div class="deal-text"><span class="kicker">Deal of the week</span><h2>${esc(deal.name)}</h2>
        <div class="price big">${money(deal.price)} <del>${money(deal.was)}</del> <span class="badge sale">Save ${money(deal.was - deal.price)}</span></div>
        <div class="countdown" id="countdown"></div>
        <a class="btn btn-lg" href="product.html?id=${deal.id}">Take the deal</a></div></div></section>` : ""}

    <section class="wrap section"><div class="sec-head"><h2>New arrivals</h2><a href="shop.html?tag=new">See all new →</a></div>${carousel(fresh, "carNew")}</section>

    <section class="wrap section"><div class="diy"><div><span class="kicker">Feeling like DIY?</span><h2>Keep your bike running smooth at home</h2>
      <div class="pills"><a href="shop.html?cat=toolkits">Tools</a><a href="shop.html?cat=lubricants">Lubricants</a><a href="shop.html?cat=drivetrain">Chains</a><a href="shop.html?cat=tyres">Tubes</a><a href="shop.html?cat=tools">More</a></div></div>${art("stand", "Orange")}</div></section>

    <section class="wrap section tri">
      ${[["tyres", "Tyres & tubes", "Grip for every surface", "tyre", "Black"], ["drivetrain", "Chain & drivetrain", "Smooth, quiet shifting", "chain", "Silver"], ["helmets", "Helmets", "Protection that fits", "helmet", "Blue"]].map(([slug, t, s, a, c]) => `<a class="tri-card" href="shop.html?cat=${slug}">${art(a, c)}<div><h3>${t}</h3><p>${s}</p><span class="link">Shop now →</span></div></a>`).join("")}
    </section>

    <section class="service" id="service"><div class="wrap service-in">
      <div><span class="kicker">Bike service &amp; repair</span><h2>Our workshop keeps you riding</h2>
        <ul class="price-list"><li><span>Safety check</span><b>Free</b></li><li><span>Puncture repair</span><b>${money(300)}</b></li><li><span>Basic tune-up</span><b>${money(1500)}</b></li><li><span>Full service</span><b>${money(3500)}</b></li></ul>
        <a class="btn btn-lg btn-wa" href="${waLink("Hi, I'd like to book a bike service. My bike is:")}" target="_blank" rel="noopener">${ic.wa} Book on WhatsApp</a></div>
      <div class="service-art">${art("mtb", "Teal")}</div></div></section>

    ${recentP.length ? `<section class="wrap section"><div class="sec-head"><h2>Recently viewed</h2></div>${carousel(recentP, "carRecent")}</section>` : ""}

    <section class="wrap section"><div class="sec-head"><h2>Ride tips &amp; articles</h2></div>
      <div class="posts">${S.posts.map((p, i) => `<article class="post"><button class="post-img" data-post="${i}" aria-label="Read ${esc(p.title)}">${art(p.art, p.color)}</button><span class="kicker">${esc(p.date)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body.slice(0, 110))}…</p><button class="link" data-post="${i}">Continue reading →</button></article>`).join("")}</div></section>

    <section class="wrap section seo"><h2>Kenya's friendly bike shop</h2><div class="seo-text" id="seo">
      <p>${esc(S.name)} ${esc(S.tagline)} sells mountain bikes, road bikes, hybrid and city bikes, electric bikes and kids' bikes, along with the parts, accessories and clothing you need to ride safely.</p>
      <p>Every bike is assembled and checked by our mechanics before delivery. We deliver next day within Nairobi and ship countrywide by courier. Pay with M-Pesa, cash or card, including pay on delivery in Nairobi.</p>
      <p>Not sure what size or type of bike you need? Send us a WhatsApp with your height and the kind of riding you do, and we'll recommend the right fit.</p></div>
      <button class="link" id="seoMore">Read more</button></section>

    <section class="wrap section" id="stores"><div class="sec-head"><h2>Visit our stores</h2></div>
      <div class="stores">${S.stores.map((s) => `<div class="store">${ic.pin}<div><h3>${esc(s.name)}</h3><p>${esc(s.area)}</p><small>${esc(s.hours)}</small></div><a class="btn btn-sm btn-ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(s.area)}">Directions</a></div>`).join("")}</div></section>`;

    // slider
    const slides = $$(".slide", root), dots = $$("[data-dot]", root);
    let cur = 0, timer;
    const go = (n) => { cur = (n + slides.length) % slides.length; slides.forEach((s, i) => s.classList.toggle("on", i === cur)); dots.forEach((d, i) => d.classList.toggle("on", i === cur)); restart(); };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); };
    $(".hero .prev", root).onclick = () => go(cur - 1);
    $(".hero .next", root).onclick = () => go(cur + 1);
    dots.forEach((d) => (d.onclick = () => go(+d.dataset.dot)));
    restart();

    // countdown to Sunday 23:59
    const cd = $("#countdown");
    if (cd) {
      const end = new Date(); end.setDate(end.getDate() + ((7 - end.getDay()) % 7)); end.setHours(23, 59, 59, 0);
      const tick = () => {
        const ms = Math.max(0, end - new Date()), d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
        cd.innerHTML = [[d, "days"], [h, "hrs"], [m, "min"], [s, "sec"]].map(([v, l]) => `<span><b>${String(v).padStart(2, "0")}</b>${l}</span>`).join("");
      };
      tick(); setInterval(tick, 1000);
    }
    $("#seoMore").onclick = (e) => { const s = $("#seo"); s.classList.toggle("open"); e.target.textContent = s.classList.contains("open") ? "Read less" : "Read more"; };
    bindCarousels(root);
  }

  /* ---------- SHOP ---------- */
  function initShop() {
    const qs = new URLSearchParams(location.search);
    const st = { cat: qs.get("cat") || "", q: (qs.get("q") || "").trim(), tag: qs.get("tag") || "", wish: qs.get("wish") === "1",
      min: "", max: "", inStock: false, brands: new Set(), colors: new Set(), sort: "default", per: 12, page: 1, cols: store.get("ro_cols", 4) };
    const cat = st.cat ? catBySlug(st.cat) : null;
    const title = st.wish ? "Wishlist" : st.q ? `Search: “${st.q}”` : st.tag === "deal" ? "Deals" : st.tag === "new" ? "New arrivals" : st.tag === "best" ? "Best sellers" : cat ? cat.name : "Shop";
    document.title = `${title} | ${S.name} ${S.tagline}`;

    const base = S.products.filter((p) => {
      const pc = catBySlug(p.cat);
      if (st.cat && p.cat !== st.cat && pc.top.slug !== st.cat) return false;
      if (st.q) { const h = (p.name + " " + p.brand + " " + pc.name + " " + pc.top.name).toLowerCase(); if (!st.q.toLowerCase().split(/\s+/).every((w) => h.includes(w))) return false; }
      if (st.tag === "deal" && !p.was) return false;
      if (st.tag && st.tag !== "deal" && !p.tags.includes(st.tag)) return false;
      if (st.wish && !wish.includes(p.id)) return false;
      return true;
    });
    const brands = [...new Set(base.map((p) => p.brand))].sort();
    const colors = [...new Set(base.flatMap((p) => p.colors))];
    const crumbs = [`<a href="index.html">Home</a>`, `<a href="shop.html">Shop</a>`];
    if (cat && cat.top.slug !== cat.slug) crumbs.push(`<a href="shop.html?cat=${cat.top.slug}">${esc(cat.top.name)}</a>`);
    crumbs.push(`<span>${esc(title)}</span>`);

    const sideCats = cat ? (cat.top.slug === cat.slug ? cat.children : cat.top.children) : S.menu;
    $("#shop").innerHTML = `
      <div class="page-head"><div class="wrap"><nav class="crumbs">${crumbs.join(" / ")}</nav><h1>${esc(title)}</h1></div></div>
      <div class="wrap shop">
        <aside class="sidebar" id="sidebar">
          <div class="drawer-head only-m"><strong>Filters</strong><button class="icon-btn" id="sideClose" aria-label="Close">${ic.close}</button></div>
          <div class="widget"><h4>${cat ? esc(cat.top.name) : "Categories"}</h4><ul class="cat-list">${sideCats.map((c) => `<li><a class="${c.slug === st.cat ? "on" : ""}" href="shop.html?cat=${c.slug}">${esc(c.name)}<span>${countIn(c.slug)}</span></a></li>`).join("")}</ul>${cat ? `<a class="link" href="shop.html">← All categories</a>` : ""}</div>
          <div class="widget"><h4>Filter by price</h4><div class="price-in"><input type="number" id="fMin" placeholder="Min" min="0"><span>–</span><input type="number" id="fMax" placeholder="Max" min="0"></div></div>
          <div class="widget"><h4>Availability</h4><label class="chk"><input type="checkbox" id="fStock"> In stock only</label></div>
          ${brands.length > 1 ? `<div class="widget"><h4>Brand</h4>${brands.map((b) => `<label class="chk"><input type="checkbox" data-brand="${esc(b)}"> ${esc(b)} <span>${base.filter((p) => p.brand === b).length}</span></label>`).join("")}</div>` : ""}
          ${colors.length > 1 ? `<div class="widget"><h4>Colour</h4><div class="swatches">${colors.map((c) => `<button class="sw" data-fcolor="${esc(c)}" style="--c:${COLORS[c]}" title="${esc(c)}" aria-label="${esc(c)}"></button>`).join("")}</div></div>` : ""}
          <button class="btn btn-ghost btn-block" id="fReset">Clear filters</button>
        </aside>
        <div class="shop-main">
          <div class="toolbar">
            <button class="btn btn-sm btn-ghost only-m" id="sideOpen">${ic.filter} Filters</button>
            <span class="muted" id="resCount"></span>
            <div class="tb-tools">
              <label class="only-d">Show <select id="per"><option>9</option><option selected>12</option><option>18</option><option>24</option></select></label>
              <span class="cols only-d">${[2, 3, 4].map((n) => `<button data-cols="${n}" class="${st.cols === n ? "on" : ""}" aria-label="${n} per row">${"▮".repeat(n)}</button>`).join("")}</span>
              <select id="sort" aria-label="Sort"><option value="default">Default sorting</option><option value="pop">Sort by popularity</option><option value="rating">Sort by average rating</option><option value="new">Sort by latest</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option></select>
            </div>
          </div>
          <div class="grid" id="grid"></div>
          <nav class="pager" id="pager"></nav>
        </div>
      </div>`;

    const grid = $("#grid");
    function render() {
      let L = base.filter((p) => {
        if (st.min !== "" && p.price < +st.min) return false;
        if (st.max !== "" && p.price > +st.max) return false;
        if (st.inStock && !p.stock) return false;
        if (st.brands.size && !st.brands.has(p.brand)) return false;
        if (st.colors.size && !p.colors.some((c) => st.colors.has(c))) return false;
        return true;
      });
      const idx = (p) => S.products.indexOf(p);
      const sorts = { pop: (a, b) => b.reviews - a.reviews, rating: (a, b) => b.rating - a.rating, new: (a, b) => (b.tags.includes("new") - a.tags.includes("new")) || idx(b) - idx(a), asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price };
      if (sorts[st.sort]) L = [...L].sort(sorts[st.sort]);
      const pages = Math.max(1, Math.ceil(L.length / st.per));
      st.page = Math.min(st.page, pages);
      const from = (st.page - 1) * st.per, shown = L.slice(from, from + st.per);
      grid.style.setProperty("--cols", st.cols);
      grid.innerHTML = shown.length ? shown.map(card).join("") : `<div class="empty wide">${st.wish ? ic.heart + "<p>No saved products yet. Tap the heart on any product.</p>" : ic.search + "<p>No products match these filters.</p>"}<a class="btn" href="shop.html">Browse all products</a></div>`;
      $("#resCount").textContent = L.length ? `Showing ${from + 1}–${from + shown.length} of ${L.length} results` : "0 results";
      $("#pager").innerHTML = pages > 1 ? Array.from({ length: pages }, (_, i) => `<button class="${i + 1 === st.page ? "on" : ""}" data-page="${i + 1}">${i + 1}</button>`).join("") : "";
    }
    const debounce = (fn, t) => { let x; return (...a) => { clearTimeout(x); x = setTimeout(() => fn(...a), t); }; };
    $("#fMin").oninput = debounce((e) => { st.min = e.target.value; st.page = 1; render(); }, 300);
    $("#fMax").oninput = debounce((e) => { st.max = e.target.value; st.page = 1; render(); }, 300);
    $("#fStock").onchange = (e) => { st.inStock = e.target.checked; st.page = 1; render(); };
    $$("[data-brand]").forEach((b) => (b.onchange = () => { b.checked ? st.brands.add(b.dataset.brand) : st.brands.delete(b.dataset.brand); st.page = 1; render(); }));
    $$("[data-fcolor]").forEach((b) => (b.onclick = () => { const c = b.dataset.fcolor; st.colors.has(c) ? st.colors.delete(c) : st.colors.add(c); b.classList.toggle("on"); st.page = 1; render(); }));
    $("#fReset").onclick = () => { st.min = st.max = ""; st.inStock = false; st.brands.clear(); st.colors.clear(); $$("#sidebar input").forEach((i) => (i.type === "checkbox" ? (i.checked = false) : (i.value = ""))); $$("[data-fcolor]").forEach((b) => b.classList.remove("on")); render(); };
    $("#sort").onchange = (e) => { st.sort = e.target.value; render(); };
    $("#per").onchange = (e) => { st.per = +e.target.value; st.page = 1; render(); };
    $$("[data-cols]").forEach((b) => (b.onclick = () => { st.cols = +b.dataset.cols; store.set("ro_cols", st.cols); $$("[data-cols]").forEach((x) => x.classList.toggle("on", x === b)); render(); }));
    $("#pager").onclick = (e) => { const b = e.target.closest("[data-page]"); if (!b) return; st.page = +b.dataset.page; render(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    $("#sideOpen").onclick = () => $("#sidebar").classList.add("open");
    $("#sideClose").onclick = () => $("#sidebar").classList.remove("open");
    // re-render wishlist page when a heart is removed
    if (st.wish) document.addEventListener("click", (e) => { if (e.target.closest("[data-wish]")) setTimeout(() => location.reload(), 300); });
    render();
  }

  /* ---------- PRODUCT ---------- */
  function initProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const p = byId(id) || S.products[0];
    const c = catBySlug(p.cat);
    document.title = `${p.name} | ${S.name} ${S.tagline}`;
    recent = [p.id, ...recent.filter((x) => x !== p.id)].slice(0, 10); store.set("ro_recent", recent);
    let color = p.colors[0], qty = 1;
    const i = S.products.indexOf(p), prev = S.products[(i - 1 + S.products.length) % S.products.length], next = S.products[(i + 1) % S.products.length];
    const related = S.products.filter((x) => x.id !== p.id && (x.cat === p.cat || catBySlug(x.cat).top.slug === c.top.slug)).slice(0, 8);
    const watching = 3 + (p.id.length % 9);
    const sku = "RO-" + p.id.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    const views = ["main", "zoom", "flip"];

    $("#product").innerHTML = `
      <div class="wrap"><nav class="crumbs pd-crumbs"><a href="index.html">Home</a> / <a href="shop.html?cat=${c.top.slug}">${esc(c.top.name)}</a> / <a href="shop.html?cat=${c.slug}">${esc(c.name)}</a> / <span>${esc(p.name)}</span>
        <span class="pn"><a href="product.html?id=${prev.id}" title="${esc(prev.name)}">${ic.left}</a><a href="shop.html?cat=${c.slug}" title="Back to products">${ic.grid}</a><a href="product.html?id=${next.id}" title="${esc(next.name)}">${ic.right}</a></span></nav></div>
      <section class="wrap pd">
        <div class="gallery">
          <div class="thumbs">${views.map((v, k) => `<button class="${k ? "" : "on"}" data-view="${v}" aria-label="View ${k + 1}"><span class="v-${v}">${pic(p, color)}</span></button>`).join("")}</div>
          <div class="main-img v-main" id="mainImg">${pic(p, color)}${p.was ? `<span class="badge sale">-${Math.round((1 - p.price / p.was) * 100)}%</span>` : ""}</div>
        </div>
        <div class="pd-info">
          <a class="kicker" href="shop.html?cat=${c.slug}">${esc(c.name)}</a>
          <h1>${esc(p.name)}</h1>
          <div class="pd-meta">${stars(p.rating)}<a href="#tabs" data-tab-go="reviews">${p.reviews} customer reviews</a><span class="muted">SKU: ${sku}</span></div>
          <div class="price big">${money(p.price)}${p.was ? ` <del>${money(p.was)}</del>` : ""}</div>
          <p class="pd-short">${esc(p.desc)}</p>
          <div class="trust">${ic.shield}<div><b>Quality guarantee</b><span>Every product is checked by our workshop team. #RideWithConfidence</span></div></div>
          <div class="opt"><span>Colour: <b id="colorName">${esc(color)}</b></span><div class="swatches" id="pdSw">${p.colors.map((x, k) => `<button class="sw ${k ? "" : "on"}" data-color="${esc(x)}" style="--c:${COLORS[x]}" title="${esc(x)}" aria-label="${esc(x)}"></button>`).join("")}</div></div>
          <div class="stock ${p.stock ? "in" : "out"}">${p.stock ? (p.stock < 4 ? `Only ${p.stock} left in stock, order soon` : "In stock") : "Out of stock. Ask us on WhatsApp when it's back."}</div>
          <div class="buy">
            ${p.stock ? `<div class="qty"><button id="qMinus" aria-label="Less">−</button><span id="qVal">1</span><button id="qPlus" aria-label="More">+</button></div><button class="btn btn-lg" id="addBtn">${ic.cart} Add to basket</button>` : ""}
            <a class="btn btn-lg btn-wa" id="waBtn" target="_blank" rel="noopener" href="#">${ic.wa} ${p.stock ? "Order on WhatsApp" : "Notify me"}</a>
          </div>
          <div class="pd-links"><button class="linklike ${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}">${ic.heart} Add to wishlist</button><span class="muted">${ic.eye} ${watching} people are viewing this now</span></div>
          <div class="ship-box">
            <h4>Delivery options</h4>
            ${S.delivery.map((d) => `<div class="ship"><span>${d.id === "pick" ? ic.pin : ic.truck}</span><div><b>${esc(d.name)}</b><small>${esc(d.note)}</small></div><b>${d.fee ? money(d.fee) : "Free"}</b></div>`).join("")}
            <div class="ship"><span>${ic.money}</span><div><b>Pay on delivery</b><small>M-Pesa, cash or card in Nairobi</small></div></div>
            <div class="ship"><span>${ic.ret}</span><div><b>Free 7-day returns</b><small>Unused, in original packaging</small></div></div>
          </div>
        </div>
      </section>
      <section class="wrap tabs" id="tabs">
        <div class="tab-nav" role="tablist"><button class="on" data-tab="desc">Description</button><button data-tab="specs">Specifications</button><button data-tab="reviews">Reviews (${p.reviews})</button></div>
        <div class="tab on" data-pane="desc"><p>${esc(p.desc)}</p><p>Bought a bike? It comes assembled, tuned and safety-checked, with a free first check-up within 30 days. Not sure about size? WhatsApp us your height and we'll advise.</p></div>
        <div class="tab" data-pane="specs"><table class="specs"><tbody><tr><th>Brand</th><td>${esc(p.brand)}</td></tr>${Object.entries(p.specs || {}).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}<tr><th>Colours</th><td>${p.colors.map(esc).join(", ")}</td></tr><tr><th>SKU</th><td>${sku}</td></tr></tbody></table></div>
        <div class="tab" data-pane="reviews"><div class="rev-sum"><div class="rev-big">${p.rating.toFixed(1)}</div><div>${stars(p.rating)}<p class="muted">Based on ${p.reviews} reviews</p></div></div>
          <p class="muted">Sample reviews will show here once the shop is connected to a real store backend.</p>
          <form class="rev-form" data-review><h4>Write a review</h4><label>Your rating <select required><option value="">Choose…</option><option>5 – Excellent</option><option>4 – Good</option><option>3 – OK</option><option>2 – Poor</option><option>1 – Bad</option></select></label><label>Your review<textarea rows="4" required></textarea></label><button class="btn">Submit review</button></form></div>
      </section>
      ${related.length ? `<section class="wrap section"><div class="sec-head"><h2>Related products</h2></div>${carousel(related, "carRel")}</section>` : ""}
      ${p.stock ? `<div class="sticky-buy only-m"><div><b>${money(p.price)}</b><small>${esc(p.name)}</small></div><button class="btn" id="addBtn2">Add to basket</button></div>` : ""}`;

    const setWa = () => { $("#waBtn").href = waLink(p.stock ? `Hi, I'd like to order: ${qty} x ${p.name} (${color}) – ${money(p.price * qty)}` : `Hi, please tell me when ${p.name} (${color}) is back in stock.`); };
    const paint = () => { $("#mainImg").firstElementChild.outerHTML = pic(p, color); $$(".thumbs span").forEach((s) => (s.innerHTML = pic(p, color))); $("#colorName").textContent = color; setWa(); };
    $("#pdSw").onclick = (e) => { const b = e.target.closest(".sw"); if (!b) return; color = b.dataset.color; $$("#pdSw .sw").forEach((x) => x.classList.toggle("on", x === b)); paint(); };
    $$(".thumbs button").forEach((b) => (b.onclick = () => { $$(".thumbs button").forEach((x) => x.classList.toggle("on", x === b)); $("#mainImg").className = "main-img v-" + b.dataset.view; }));
    $("#mainImg").onclick = () => $("#mainImg").classList.toggle("zoomed");
    if (p.stock) {
      $("#qMinus").onclick = () => { qty = Math.max(1, qty - 1); $("#qVal").textContent = qty; setWa(); };
      $("#qPlus").onclick = () => { qty = Math.min(p.stock, qty + 1); $("#qVal").textContent = qty; setWa(); };
      $("#addBtn").onclick = () => addToCart(p.id, color, qty);
      $("#addBtn2").onclick = () => addToCart(p.id, color, qty);
    }
    const showTab = (n) => { $$(".tab-nav button").forEach((b) => b.classList.toggle("on", b.dataset.tab === n)); $$(".tab").forEach((t) => t.classList.toggle("on", t.dataset.pane === n)); };
    $$(".tab-nav button").forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
    $("[data-tab-go]").onclick = () => showTab("reviews");
    $("[data-review]").onsubmit = (e) => { e.preventDefault(); e.target.reset(); toast("Thanks! Your review will appear after approval."); };
    setWa(); bindCarousels();
  }

  /* ---------- CART / CHECKOUT ---------- */
  function initCart() {
    const root = $("#cartPage");
    let ship = store.get("ro_ship", "nbo");
    const draw = () => {
      if (!cart.length) { root.innerHTML = `<div class="page-head"><div class="wrap"><h1>Your basket</h1></div></div><div class="wrap"><div class="empty wide">${ic.cart}<p>Your basket is empty.</p><a class="btn" href="shop.html">Start shopping</a></div></div>`; return; }
      const sub = cartTotal();
      const d = S.delivery.find((x) => x.id === ship) || S.delivery[0];
      const fee = d.id === "nbo" && sub >= S.freeDeliveryOver ? 0 : d.fee;
      root.innerHTML = `<div class="page-head"><div class="wrap"><nav class="crumbs"><a href="index.html">Home</a> / <span>Basket</span></nav><h1>Your basket</h1></div></div>
      <div class="wrap cart-layout">
        <div><table class="cart-table"><thead><tr><th colspan="2">Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead><tbody>
          ${cart.map((l, i) => { const p = byId(l.id); return p ? `<tr><td class="ct-img">${pic(p, l.color)}</td><td><a href="product.html?id=${p.id}">${esc(p.name)}</a><small>Colour: ${esc(l.color)}</small></td><td data-l="Price">${money(p.price)}</td>
            <td data-l="Qty"><div class="qty sm"><button data-q="${i}" data-d="-1" aria-label="Less">−</button><span>${l.qty}</span><button data-q="${i}" data-d="1" aria-label="More">+</button></div></td><td data-l="Total"><b>${money(p.price * l.qty)}</b></td><td><button class="icon-btn" data-rm="${i}" aria-label="Remove">${ic.trash}</button></td></tr>` : ""; }).join("")}
        </tbody></table><a class="link" href="shop.html">← Continue shopping</a></div>
        <aside class="summary">
          <h3>Order summary</h3>
          <div class="row"><span>Subtotal</span><b>${money(sub)}</b></div>
          <h4>Delivery</h4>
          ${S.delivery.map((x) => `<label class="radio"><input type="radio" name="ship" value="${x.id}" ${x.id === d.id ? "checked" : ""}><span><b>${esc(x.name)}</b><small>${esc(x.note)}</small></span><em>${x.id === "nbo" && sub >= S.freeDeliveryOver ? "Free" : x.fee ? money(x.fee) : "Free"}</em></label>`).join("")}
          <div class="row total"><span>Total</span><b>${money(sub + fee)}</b></div>
          <form id="checkout" class="checkout">
            <h4>Your details</h4>
            <label>Full name<input name="name" required autocomplete="name"></label>
            <label>Phone (M-Pesa)<input name="phone" required type="tel" placeholder="07XX XXX XXX" pattern="^(\\+?254|0)?[17]\\d{8}$" title="Kenyan mobile number, e.g. 0712345678"></label>
            ${d.id !== "pick" ? `<label>Delivery location<input name="loc" required placeholder="Estate, street, town"></label>` : ""}
            <label>Payment<select name="pay"><option>M-Pesa on delivery</option><option>Cash on delivery</option><option>M-Pesa now (we'll send a paybill)</option><option>Card in store</option></select></label>
            <label>Notes (optional)<textarea name="notes" rows="2"></textarea></label>
            <button class="btn btn-lg btn-block btn-wa">${ic.wa} Place order on WhatsApp</button>
            <p class="muted small">Your order opens in WhatsApp so our team can confirm stock and delivery time.</p>
          </form>
        </aside>
      </div>`;
      $$("[name=ship]", root).forEach((r) => (r.onchange = () => { ship = r.value; store.set("ro_ship", ship); draw(); }));
      $("#checkout").onsubmit = (e) => {
        e.preventDefault();
        const f = new FormData(e.target);
        const lines = cart.map((l) => { const p = byId(l.id); return `• ${l.qty} x ${p.name} (${l.color}) – ${money(p.price * l.qty)}`; });
        const msg = [`New order – ${S.name} ${S.tagline}`, "", ...lines, "", `Subtotal: ${money(sub)}`, `Delivery: ${d.name} – ${fee ? money(fee) : "Free"}`, `TOTAL: ${money(sub + fee)}`, "",
          `Name: ${f.get("name")}`, `Phone: ${f.get("phone")}`, f.get("loc") ? `Location: ${f.get("loc")}` : "", `Payment: ${f.get("pay")}`, f.get("notes") ? `Notes: ${f.get("notes")}` : ""].filter((x, k, a) => x !== "" || a[k - 1] !== "").join("\n");
        window.open(waLink(msg), "_blank", "noopener");
        cart = []; save(); renderCartDrawer();
        root.innerHTML = `<div class="wrap"><div class="empty wide done">${ic.shield}<h2>Order sent!</h2><p>Finish sending the message in WhatsApp. We'll confirm your order within 30 minutes during shop hours.</p><a class="btn" href="index.html">Back to home</a></div></div>`;
      };
    };
    window.__cartPage = draw;
    draw();
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $("#site-header").innerHTML = header();
    $("#site-footer").innerHTML = footer();
    updateCounts(); renderCartDrawer(); bindSearchSuggest();
    const hdr = $("#siteHeader");
    addEventListener("scroll", () => hdr.classList.toggle("scrolled", scrollY > 60), { passive: true });
    const page = document.body.dataset.page;
    if (page === "home") initHome();
    if (page === "shop") initShop();
    if (page === "product") initProduct();
    if (page === "cart") initCart();
  });
})();
