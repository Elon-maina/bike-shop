# RideOn Cycles – bike shop website

A bike shop website with a layout similar to bike.co.ke (Woodmart-style WooCommerce look).
Plain HTML/CSS/JS with no build step. Open `index.html` in a browser.

## Pages
- `index.html` – home: slider, promo banners, categories, best sellers, deal of the week with countdown, new arrivals, DIY banner, service booking, articles, stores
- `shop.html` – category/search/deals/wishlist (`?cat=bikes`, `?q=helmet`, `?tag=deal`, `?wish=1`), filters, sort, grid size, pages
- `product.html?id=...` – gallery, colours, quantity, delivery options, tabs, related products
- `cart.html` – basket, delivery choice, checkout that sends the order to WhatsApp

## Where to change things
- `assets/js/data.js` – shop name, phone, WhatsApp number, delivery fees, menu, products, slides, articles, stores
- `assets/css/style.css` – colours and fonts at the top (`--accent`, `--ink`, fonts)
- Product pictures are drawn placeholders. To use a real photo, add `img: "images/xyz.jpg"` to a product.

The basket and wishlist are saved in the visitor's browser. There is no server, payments or accounts yet.
