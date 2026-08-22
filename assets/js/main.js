/* ============================================================
   متجر آثر — المنطق التفاعلي المحسّن بالكامل (UI/UX Premium)
   يحتوي على: العرض السريع، البحث والتصفية، القائمة الجانبية، التنبيهات
   ============================================================ */

/* ---------- أدوات مساعدة وتنسيق الأرقام ---------- */
function formatPrice(n) {
  if (!n) return "0";
  try {
    return n.toLocaleString("ar-EG-u-nu-latn");
  } catch (e) {
    return String(n);
  }
}

function percentOff(price, oldPrice) {
  if (!price || !oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function orderMessage(name, price) {
  let msg = I18N_CURRENT === "en" ? "Hello, I want to order a product: " + name : "مرحبًا، أرغب في طلب منتج: " + name;
  if (price) msg += I18N_CURRENT === "en" ? " — at a price of " + price + " EGP" : " — بسعر " + price + " جنيه";
  return encodeURIComponent(msg + (I18N_CURRENT === "en" ? " from Athar store." : " من متجر آثر."));
}

function waLink(phone, text) {
  return "https://wa.me/" + phone + (text ? "?text=" + encodeURIComponent(text) : "");
}

function waPhone() {
  var m = String(SOCIALS.whatsapp).match(/wa\.me\/(\d+)/);
  return m ? m[1] : "";
}

/* ---------- بناء بطاقة منتج بلمسات Premium ---------- */
function productCard(cat, product, index) {
  var discount = percentOff(product.price, product.oldPrice);
  var imgSrc = cat.folder + "/" + product.image;
  var priceHTML = "";
  if (product.price > 0) {
    priceHTML =
      '<div class="price-row">' +
      '<span class="current">' + formatPrice(product.price) + ' ' + t("card.egp") + '</span>' +
      (product.oldPrice && product.oldPrice > product.price
        ? '<span class="old">' + formatPrice(product.oldPrice) + ' ' + t("card.egp") + '</span>'
        : "") +
      "</div>";
  } else {
    priceHTML = '<div class="price-row"><span class="current">' + t("card.noPrice") + "</span></div>";
  }

  var discountHTML = discount ? '<span class="discount">' + t("card.discount") + ' ' + discount + "%</span>" : "";

  return (
    '<article class="product-card spotlight" data-id="' + product.id + '" data-cat="' + cat.id + '">' +
    '<div class="product-media" onclick="openQuickView(\'' + cat.id + '\', \'' + product.id + '\')">' +
    '<img src="' + imgSrc + '" alt="' + product.name + '" loading="lazy">' +
    discountHTML +
    '<div class="quick-view-badge"><span>' + t("card.view") + "</span></div>" +
    "</div>" +
    '<div class="product-body">' +
    '<span class="num">' + t("card.num") + ' ' + index + "</span>" +
    '<h4 onclick="openQuickView(\'' + cat.id + '\', \'' + product.id + '\')">' + product.name + "</h4>" +
    priceHTML +
    '<div class="card-actions">' +
    '<button type="button" class="btn btn-accent" onclick="addToCart(\'' + cat.id + '\', \'' + product.id + '\')">' + t("card.order") + "</button>" +
    '<button class="btn-view" title="' + t("card.viewTitle") + '" onclick="openQuickView(\'' + cat.id + '\', \'' + product.id + '\')">👁️</button>' +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

/* بطاقة جاهزة لمنتجات المستقبل (صفحة الجديد) */
function readyCard(item, index) {
  var imgHTML = item.image
    ? '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy">'
    : '<span class="ph-icon">📦</span><span class="ph-text">' + t("new.readyImages") + "</span>";

  var priceHTML =
    item.price > 0
      ? '<div class="price-row"><span class="current">' + formatPrice(item.price) + ' ' + t("card.egp") + '</span>' +
        (item.oldPrice && item.oldPrice > item.price
          ? '<span class="old">' + formatPrice(item.oldPrice) + " " + t("card.egp") + "</span>"
          : "") +
        "</div>"
      : '<div class="price-row"><span class="current">' + t("card.noPrice") + "</span></div>";

  return (
    '<article class="product-card ready spotlight">' +
    '<div class="product-media">' +
    imgHTML +
    "</div>" +
    '<div class="product-body">' +
    '<span class="num">' + t("card.newNum") + ' ' + index + "</span>" +
    "<h4>" + item.name + "</h4>" +
    priceHTML +
    '<button type="button" class="btn btn-accent btn-shimmer" onclick="addItemToCart(' + index + ')">' + t("card.order") + "</button>" +
    "</div>" +
    "</article>"
  );
}

/* ---------- خلط قائمة المنتجات (ترتيب عشوائي بدون ترتيب ثابت) ---------- */
function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/* ---------- عرض المنتجات حسب الصفحة والتصنيف ---------- */
function renderProducts() {
  var root = document.getElementById("products-root");
  if (!root) return;

  var total = 0;
  CATEGORIES.forEach(function (cat) {
    total += cat.products.length;
  });

  var html = "";
  // القائمة الموحدة لتبويب "جميع المنتجات" — بدون ترتيب (عشوائي)
  html +=
    '<div class="cat-section" id="head-all">' +
    '<div class="section-head" style="margin-bottom: 32px;">' +
    '<span class="tag">' + t("products.allTag") + "</span>" +
    "<h2>" + t("products.allTitle") + "</h2>" +
    '<p id="all-count">' + total + " " + t("products.allRandom") + "</p>" +
    "</div>" +
    '<div class="products-grid" id="grid-all" style="display:grid;"></div>' +
    "</div>";

  CATEGORIES.forEach(function (cat) {
    var catTitle = t("cat." + cat.id);
    html +=
      '<div class="cat-section" id="cat-' + cat.id + '" style="display:none;">' +
      '<div class="section-head" style="margin-bottom: 32px;">' +
      '<span class="tag">' + cat.icon + " " + catTitle + "</span>" +
      "<h2>" + catTitle + "</h2>" +
      '<p>' + cat.products.length + " " + t("products.catDesc") + "</p>" +
      "</div>" +
      '<div class="products-grid" id="grid-' + cat.id + '"></div>' +
      "</div>";
  });
  root.innerHTML = html;

  // شبكة "جميع المنتجات" — كل الـ80 منتجًا مرة واحدة بترتيب عشوائي
  var allGrid = document.getElementById("grid-all");
  var allCards = [];
  CATEGORIES.forEach(function (cat) {
    cat.products.forEach(function (p, i) {
      allCards.push(productCard(cat, p, i + 1));
    });
  });
  allGrid.innerHTML = shuffleArray(allCards).join("");

  // شبكات التصنيفات — بالترتيب الطبيعي لكل تصنيف
  CATEGORIES.forEach(function (cat) {
    var grid = document.getElementById("grid-" + cat.id);
    if (!grid) return;
    var cards = cat.products
      .map(function (p, i) {
        return productCard(cat, p, i + 1);
      })
      .join("");
    grid.innerHTML = cards;
  });
}

/* ---------- عرض صفحة الجديد ---------- */
function renderNew() {
  var root = document.getElementById("new-root");
  if (!root) return;
  var cards = NEW_ITEMS.map(function (item, i) {
    return readyCard(item, i + 1);
  }).join("");
  root.innerHTML = cards;
}

/* ---------- بطاقة بوكس آثر (قائمة بوكسات آثر) ---------- */
function offerCard(offer, index) {
  var hasPrice = offer.price > 0;
  var boxIndex = index;
  var boxName = offer.name || t("offers.itemTitle") + " " + boxIndex;
  var imgSrc = offer.image ? offer.folder + "/" + offer.image : "";
  var discount = percentOff(offer.price, offer.oldPrice);

  var priceHTML = hasPrice
    ? '<div class="price-row offer-price-row">' +
      '<span class="current offer-current">' + formatPrice(offer.price) + ' ' + t("card.egp") + '</span>' +
      (offer.oldPrice > offer.price
        ? '<span class="offer-instead">' + t("offers.instead") + '</span><span class="old">' + formatPrice(offer.oldPrice) + ' ' + t("card.egp") + "</span>"
        : "") +
      "</div>"
    : '<div class="price-row offer-price-row"><span class="current offer-current">' + t("card.noPrice") + "</span></div>";

  var discountHTML = discount ? '<span class="discount">' + t("card.discount") + " " + discount + "%</span>" : "";
  var quickViewOpen = "openQuickView('offers', '" + offer.id + "')";

  return (
    '<article class="product-card offer-card spotlight" data-id="' + offer.id + '" data-cat="offers">' +
    '<div class="product-media offer-media" onclick="' + quickViewOpen + '">' +
    (imgSrc
      ? '<img src="' + imgSrc + '" alt="' + boxName + '" loading="lazy">'
      : '<span class="offer-fire">📦</span>') +
    discountHTML +
    '<div class="quick-view-badge"><span>' + t("card.view") + "</span></div>" +
    "</div>" +
    '<div class="product-body">' +
    '<span class="num">' + t("offers.boxTitle") + " " + boxIndex + "</span>" +
    '<h4 onclick="' + quickViewOpen + '">' + boxName + "</h4>" +
    priceHTML +
    '<div class="card-actions">' +
    '<button type="button" class="btn btn-accent" onclick="addToCart(\'offers\', \'' + offer.id + '\')">' + t("card.order") + "</button>" +
    '<button class="btn-view" title="' + t("card.viewTitle") + '" onclick="' + quickViewOpen + '">👁️</button>' +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

/* ---------- عرض صفحة عروض ال999جنية ---------- */
function renderOffers() {
  var root = document.getElementById("offers-root");
  if (!root) return;
  var cards = OFFERS.map(function (offer, i) {
    return offerCard(offer, i + 1);
  }).join("");
  root.innerHTML = cards;
}

/* ---------- نافذة المعاينة السريعة (Quick View Modal) ---------- */
function setupModalDOM() {
  if (document.getElementById("quick-view-modal")) return;
  var modalHTML =
    '<div class="modal-overlay" id="quick-view-modal" onclick="closeQuickViewOnBackdrop(event)">' +
    '<div class="modal-content">' +
    '<button class="modal-close" onclick="closeQuickView()" aria-label="إغلاق">&times;</button>' +
    '<div class="modal-grid" id="modal-body-content"></div>' +
    '</div>' +
    '</div>';
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

/* ---------- قفل تمرير الخلفية عند الفتح ---------- */
var bodyLockCount = 0;

function lockBodyScroll() {
  bodyLockCount++;
  if (bodyLockCount > 1) return;
  var html = document.documentElement;
  var body = document.body;
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
  var prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = "-" + scrollY + "px";
  body.style.left = "0";
  body.style.right = "0";
  body.dataset.scrollY = String(scrollY);
  body.dataset.prevBehavior = prevBehavior;
}

function unlockBodyScroll() {
  if (bodyLockCount > 0) bodyLockCount--;
  if (bodyLockCount > 0) return;
  var body = document.body;
  if (body.dataset.scrollY === undefined) return;
  var html = document.documentElement;
  var scrollY = parseInt(body.dataset.scrollY || "0", 10);
  var prevBehavior = body.dataset.prevBehavior || "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  delete body.dataset.scrollY;
  delete body.dataset.prevBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollY);
  html.style.scrollBehavior = prevBehavior;
}

function openQuickView(catId, productId) {
  setupModalDOM();
  var cat = null;
  var prod = null;
  var imgSrc = "";
  var catTitle = "";

  if (catId === "offers") {
    prod = OFFERS.find(function (p) { return p.id === productId; });
    if (!prod) return;
    imgSrc = prod.folder + "/" + prod.image;
    catTitle = t("offers.tag");
  } else {
    cat = CATEGORIES.find(function (c) { return c.id === catId; });
    if (!cat) return;
    prod = cat.products.find(function (p) { return p.id === productId; });
    if (!prod) return;
    imgSrc = cat.folder + "/" + prod.image;
    catTitle = t("cat." + cat.id);
  }

  var prodName = prod.name || t("offers.itemTitle") + " " + prod.id.replace("offer-", "#");
  var hasPrice = prod.price > 0;
  var discount = percentOff(prod.price, prod.oldPrice);
  var discountHTML = discount ? '<span class="discount" style="position:absolute; top:12px; right:12px; background:var(--grad-accent); color:#fff; font-weight:800; padding:6px 16px; border-radius:99px;">' + t("card.discount") + " " + discount + "%</span>" : '';

  var modalContent =
    '<div class="modal-media">' +
    '<img src="' + imgSrc + '" alt="' + prodName + '">' +
    discountHTML +
    '</div>' +
    '<div class="modal-details">' +
    '<span class="tag-badge">' + (cat ? cat.icon + ' ' : '') + catTitle + '</span>' +
    '<h3>' + prodName + '</h3>' +
    '<div class="price-row" style="margin-top:0;">' +
    (hasPrice
      ? '<span class="current" style="font-size:16px;">' + formatPrice(prod.price) + ' ' + t("card.egp") + '</span>'
      : '<span class="current" style="font-size:16px; color:var(--ink-muted);">' + t("card.noPrice") + '</span>') +
    (hasPrice && prod.oldPrice && prod.oldPrice > prod.price ? '<span class="old" style="font-size:11px;">' + formatPrice(prod.oldPrice) + ' ' + t("card.egp") + '</span>' : '') +
    '</div>' +
    '<p class="desc">' + t("modal.category") + ' <b>' + catTitle + '</b> ' + t("modal.desc") + '</p>' +
    '<ul class="specs-list">' +
    '<li>✨ <b>' + t("modal.guarantee") + ':</b> ' + t("modal.guaranteeVal") + '</li>' +
    '<li>🚚 <b>' + t("modal.delivery") + ':</b> ' + t("modal.deliveryVal") + '</li>' +
    '<li>💎 <b>' + t("modal.material") + ':</b> ' + t("modal.materialVal") + '</li>' +
    '</ul>' +
    '<div class="modal-actions">' +
    '<button type="button" class="btn btn-accent btn-lg" onclick="addFromQuickView(\'' + (catId === "offers" ? "offers" : cat.id) + '\', \'' + prod.id + '\')" style="width:100%; font-size:13px;">' + t("modal.orderBtn") + '</button>' +
    '<button class="btn btn-secondary" onclick="closeQuickView()" style="width:100%;">' + t("modal.continue") + '</button>' +
    '</div>' +
    '</div>';

  document.getElementById("modal-body-content").innerHTML = modalContent;
  var modal = document.getElementById("quick-view-modal");
  modal.classList.add("open");
  lockBodyScroll();
}

function closeQuickView() {
  var modal = document.getElementById("quick-view-modal");
  if (modal) {
    modal.classList.remove("open");
    unlockBodyScroll();
  }
}

function closeQuickViewOnBackdrop(e) {
  if (e.target.id === "quick-view-modal") {
    closeQuickView();
  }
}

/* ---------- سياسة الاستبدال والاسترجاع (Policy Modal) ---------- */
function openPolicy() {
  var existing = document.getElementById("policy-modal");
  if (existing) {
    existing.classList.add("open");
    lockBodyScroll();
    return;
  }

  var body = '<div class="policy-body">';

  body += '<p class="policy-intro">' + t("policy.intro") + "</p>";

  body +=
    '<h3 class="policy-h">' + t("policy.exchange.title") + "</h3>" +
    '<p class="policy-sub">' + t("policy.exchange.intro") + "</p>" +
    '<ul class="policy-list">' + polList(t("policy.exchange.items")) + "</ul>" +
    '<p class="policy-note">' + t("policy.exchange.note") + "</p>";

  body +=
    '<h3 class="policy-h">' + t("policy.return.title") + "</h3>" +
    '<p class="policy-sub">' + t("policy.return.intro") + "</p>" +
    '<ul class="policy-list">' + polList(t("policy.return.items")) + "</ul>";

  body +=
    '<h3 class="policy-h">' + t("policy.excluded.title") + "</h3>" +
    '<p class="policy-note">' + t("policy.excluded.text") + "</p>";

  body +=
    '<h3 class="policy-h">' + t("policy.shipping.title") + "</h3>" +
    "<p>" + polParas(t("policy.shipping.text")) + "</p>";

  body +=
    '<h3 class="policy-h">' + t("policy.refund.title") + "</h3>" +
    "<p>" + polParas(t("policy.refund.text")) + "</p>";

  body +=
    '<h3 class="policy-h">' + t("policy.contact.title") + "</h3>" +
    '<p class="policy-sub">' + t("policy.contact.intro") + "</p>" +
    '<ul class="policy-list">' + polList(t("policy.contact.items")) + "</ul>";

  body += '<p class="policy-slogan">' + t("policy.slogan") + "</p>";
  body += "</div>";

  var modalHTML =
    '<div class="modal-overlay" id="policy-modal" onclick="closePolicyOnBackdrop(event)">' +
    '<div class="modal-content policy-modal">' +
    '<button class="modal-close" onclick="closePolicy()" aria-label="إغلاق">&times;</button>' +
    '<h2 class="policy-title">' + t("policy.title") + "</h2>" +
    body +
    "</div>" +
    "</div>";

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  document.getElementById("policy-modal").classList.add("open");
  lockBodyScroll();
}

function polList(str) {
  return (str || "").split("##").map(function (item) {
    return "<li>" + item + "</li>";
  }).join("");
}

function polParas(str) {
  return (str || "").split("##").map(function (p) {
    return "<p>" + p + "</p>";
  }).join("");
}

function closePolicy() {
  var modal = document.getElementById("policy-modal");
  if (!modal) return;
  modal.classList.remove("open");
  unlockBodyScroll();
  setTimeout(function () {
    if (modal.parentNode) modal.parentNode.removeChild(modal);
  }, 350);
}

function closePolicyOnBackdrop(e) {
  if (e.target.id === "policy-modal") {
    closePolicy();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeQuickView();
    closePolicy();
  }
});

/* ---------- البحث والتصفية الحية في صفحة المنتجات ---------- */
function setupFilterAndSearch() {
  var searchInput = document.getElementById("search-input");
  var tabButtons = document.querySelectorAll(".tab-btn");
  if (!searchInput && !tabButtons.length) return;

  function filterItems() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var activeTab = document.querySelector(".tab-btn.active");
    var activeCatId = activeTab ? activeTab.getAttribute("data-cat") : "all";
    var allSection = document.getElementById("head-all");
    var allGrid = document.getElementById("grid-all");
    var allCount = document.getElementById("all-count");

    if (activeCatId === "all") {
      // إظهار القائمة الموحدة العشوائية وإخفاء تصنيفات الأقسام
      if (allSection) allSection.style.display = "block";
      if (allGrid) allGrid.style.display = "grid";
      CATEGORIES.forEach(function (cat) {
        var catSection = document.getElementById("cat-" + cat.id);
        if (catSection) catSection.style.display = "none";
      });

      var cards = allGrid ? allGrid.querySelectorAll(".product-card") : [];
      var visibleCount = 0;
      cards.forEach(function (card) {
        var titleEl = card.querySelector("h4");
        var titleText = titleEl ? titleEl.textContent.toLowerCase() : "";
        var matchQuery = !query || titleText.indexOf(query) !== -1;
        card.style.display = matchQuery ? "flex" : "none";
        if (matchQuery) visibleCount++;
      });
      if (allCount) {
        allCount.textContent = query
          ? visibleCount + " " + t("products.allMatched") + " " + cards.length
          : cards.length + " " + t("products.allRandom");
      }
      return;
    }

    // إخفاء القائمة الموحدة عند اختيار تصنيف محدد
    if (allSection) allSection.style.display = "none";

    CATEGORIES.forEach(function (cat) {
      var catSection = document.getElementById("cat-" + cat.id);
      if (!catSection) return;

      var matchCat = activeCatId === cat.id;
      if (!matchCat) {
        catSection.style.display = "none";
        return;
      }

      catSection.style.display = "block";
      var items = catSection.querySelectorAll(".product-card");
      var visibleCount = 0;

      items.forEach(function (card) {
        var titleEl = card.querySelector("h4");
        var titleText = titleEl ? titleEl.textContent.toLowerCase() : "";
        var matchQuery = !query || titleText.indexOf(query) !== -1;

        if (matchQuery) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      if (visibleCount > 0) {
        catSection.style.display = "block";
      } else {
        catSection.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterItems);
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      filterItems();
    });
  });
}

/* ---------- لوجوهات المنصات (SVG رسمية) ---------- */
function platformLogo(key) {
  var logos = {
    whatsapp:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  };
  return logos[key] || "";
}

/* ---------- عرض الفوتر وصفحة التواصل ---------- */
function renderFooterSocials() {
  var root = document.getElementById("footer-socials");
  if (!root) return;

  var items = [
    { key: "whatsapp", label: t("social.whatsapp"), url: SOCIALS.whatsapp },
    { key: "instagram", label: t("social.instagram"), url: SOCIALS.instagram },
    { key: "tiktok", label: t("social.tiktok"), url: SOCIALS.tiktok },
    { key: "facebook", label: t("social.facebook"), url: SOCIALS.facebook }
  ];

  var html = "";
  items.forEach(function (it) {
    if (it.url) {
      html +=
        '<a target="_blank" rel="noopener" href="' + it.url + '">' +
        "<span class=\"social-ico\">" + platformLogo(it.key) + "</span>" + it.label +
        "</a>";
    } else {
      html +=
        '<a href="#" class="js-social-missing" data-label="' + it.label + '">' +
        "<span class=\"social-ico\">" + platformLogo(it.key) + "</span>" + it.label +
        "</a>";
    }
  });
  root.innerHTML = html;
}

function renderSocialCards() {
  var root = document.getElementById("social-cards");
  if (!root) return;

  var items = [
    { key: "wa", label: t("social.whatsapp"), handle: t("contact.waHandle"), url: SOCIALS.whatsapp, cls: "wa" },
    { key: "ig", label: t("social.instagram"), handle: t("contact.igHandle"), url: SOCIALS.instagram, cls: "ig" },
    { key: "tt", label: t("social.tiktok"), handle: t("contact.ttHandle"), url: SOCIALS.tiktok, cls: "tt" },
    { key: "fb", label: t("social.facebook"), handle: t("contact.fbHandle"), url: SOCIALS.facebook, cls: "fb" }
  ];

  var html = "";
  items.forEach(function (it) {
    var href = it.url ? it.url : "#";
    var attrs = it.url ? 'target="_blank" rel="noopener"' : 'class="js-social-missing" data-label="' + it.label + '"';
    html +=
      '<div class="social-card">' +
      '<div class="icon ' + it.cls + '">' + platformLogo(it.key) + "</div>" +
      "<h4>" + it.label + "</h4>" +
      "<span>" + it.handle + "</span>" +
      '<a ' + attrs + ' class="btn btn-primary" href="' + href + '">' + (it.url ? t("contact.open") : t("contact.prepare")) + "</a>" +
      "</div>";
  });
  root.innerHTML = html;
}

function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector('[name="name"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !message) {
      showToast(t("contact.fillAll"));
      return;
    }

    var text =
      (I18N_CURRENT === "en" ? "Hello, I am " : "مرحبًا، أنا ") + name +
      "\n" + (I18N_CURRENT === "en" ? "Message: " : "الرسالة: ") + message;
    window.open(waLink("201040922823", text), "_blank");
  });
}

function setupHeaderScroll() {
  var header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function setupMenu() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function closeMenu() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    unlockBodyScroll();
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) lockBodyScroll();
    else unlockBodyScroll();
  });

  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeMenu();
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("#mobile-menu") && !e.target.closest("#menu-toggle")) {
      closeMenu();
    }
  });

  document.addEventListener("touchstart", function (e) {
    if (!e.target.closest("#mobile-menu") && !e.target.closest("#menu-toggle")) {
      closeMenu();
    }
  }, { passive: true });
}

function setupSocialMissing() {
  document.addEventListener("click", function (e) {
    var target = e.target.closest(".js-social-missing");
    if (!target) return;
    e.preventDefault();
    showToast(t("contact.prepareMsg") + " " + target.getAttribute("data-label") + " " + t("contact.close"));
  });
}

function showToast(text) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function setupReveal() {
  var els = document.querySelectorAll(".reveal, .blur-fade");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach(function (el) {
    io.observe(el);
  });
}

/* ---------- شريط ماركوي مكرر بلا نهاية (Marquee) ---------- */
function setupMarquee() {
  document.querySelectorAll(".marquee").forEach(function (marquee) {
    var track = marquee.querySelector(".marquee-track");
    if (!track) return;
    if (marquee.dataset.duplicated) return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    marquee.dataset.duplicated = "1";
  });
}

/* ---------- عدادات رقمية متحركة (Numbers Counter) ---------- */
function animateCounter(el) {
  var target = parseInt(el.getAttribute("data-count"), 10);
  if (isNaN(target)) return;
  var suffix = el.getAttribute("data-suffix") || "";
  var start = 0;
  var duration = 1400;
  var startTime = null;

  function tick(now) {
    if (startTime === null) startTime = now;
    var progress = Math.min((now - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = Math.round(start + (target - start) * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function setupCounters() {
  var els = document.querySelectorAll(".stat b[data-count]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(animateCounter);
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  els.forEach(function (el) {
    io.observe(el);
  });
}

/* ---------- إمالة ثلاثية الأبعاد (Tilt Card) ---------- */
function setupTilt() {
  var cards = document.querySelectorAll(".tilt");
  if (!cards.length || !window.matchMedia("(hover: hover)").matches) return;
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        "perspective(900px) rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
}

/* ---------- تتبع إضاءة الماوس (Spotlight Card) ---------- */
function setupSpotlight() {
  var cards = document.querySelectorAll(".spotlight");
  if (!cards.length || !window.matchMedia("(hover: hover)").matches) return;
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  });
}

/* ---------- جزيئات متصاعدة في الهيرو (Particles) ---------- */
function setupParticles() {
  var container = document.getElementById("hero-particles");
  if (!container || !window.matchMedia("(hover: hover)").matches) return;
  var count = 26;
  for (var i = 0; i < count; i++) {
    var dot = document.createElement("i");
    var size = 2 + Math.random() * 4;
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.setProperty("--px", (Math.random() * 160 - 80) + "px");
    dot.style.animationDuration = (7 + Math.random() * 10) + "s";
    dot.style.animationDelay = (Math.random() * 10) + "s";
    dot.style.background = "rgba(255,255,255," + (0.2 + Math.random() * 0.5) + ")";
    container.appendChild(dot);
  }
}

/* ---------- تمرير سلس لأقسام المنتجات مع الهيدر الثابت ---------- */
function setupAnchorScroll() {
  var hash = window.location.hash;
  if (hash && hash.indexOf("#cat-") === 0) {
    setTimeout(function () {
      var catId = hash.slice(5);
      var btn = document.querySelector('.tab-btn[data-cat="' + catId + '"]');
      if (btn) btn.click();
      var el = document.querySelector(hash + " .section-head") || document.querySelector(hash);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }
}

/* ---------- سلة التسويق ---------- */
var CART_KEY = "athar_cart";
var cartItems = [];

function loadCart() {
  try {
    var saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    cartItems = Array.isArray(saved) ? saved : [];
  } catch (e) {
    cartItems = [];
  }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch (e) {}
  updateCartBadge();
}

function updateCartBadge() {
  var count = cartItems.length;
  var badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function findProduct(catId, productId) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id !== catId) continue;
    for (var j = 0; j < CATEGORIES[i].products.length; j++) {
      if (CATEGORIES[i].products[j].id === productId) {
        return { cat: CATEGORIES[i], product: CATEGORIES[i].products[j] };
      }
    }
  }
  return null;
}

function findCategoryOf(productId) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    for (var j = 0; j < CATEGORIES[i].products.length; j++) {
      if (CATEGORIES[i].products[j].id === productId) {
        return CATEGORIES[i];
      }
    }
  }
  return null;
}

function resolveCartImage(it) {
  var folder = it.folder || "";
  var file = it.image || "";
  if (!file) return "";
  if (!folder && it.id) {
    var cat = findCategoryOf(it.id);
    if (cat) folder = cat.folder;
  }
  return folder ? folder + "/" + file : file;
}

function addItemToCart(index) {
  var item = NEW_ITEMS[index - 1];
  if (!item) return;
  if (item.price <= 0 || !item.image) {
    showToast(item.price <= 0 ? "عذراً، هذا المنتج قيد التجهيز 🚧" : "");
    return;
  }
  addCartProduct({ id: item.id, name: item.name, price: item.price, oldPrice: item.oldPrice, image: item.image, folder: "" });
}

function addToCart(catId, productId) {
  if (catId === "offers") {
    var offer = OFFERS.find(function (p) { return p.id === productId; });
    if (!offer) return;
    if (offer.price <= 0) {
      showToast(t("offers.comingSoon"));
      return;
    }
    addCartProduct({
      id: offer.id,
      name: offer.name || t("offers.itemTitle") + " " + offer.id.replace("offer-", "#"),
      price: offer.price,
      oldPrice: offer.oldPrice,
      image: offer.image || "",
      folder: offer.folder || ""
    }, true);
    return;
  }
  var found = findProduct(catId, productId);
  if (!found) return;
  addCartProduct({
    id: found.product.id,
    name: found.product.name,
    price: found.product.price,
    oldPrice: found.product.oldPrice,
    image: found.product.image,
    folder: found.cat.folder
  }, true);
}

function addFromQuickView(catId, productId) {
  addToCart(catId, productId);
  closeQuickView();
}

function hideProductCards(productId) {
  closeQuickView();
  var cards = document.querySelectorAll('.product-card[data-id="' + productId + '"]');
  for (var i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
}

function addCartProduct(p, skipDrawer) {
  var existing = cartItems.find(function (it) { return it.id === p.id; });
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ id: p.id, name: p.name, price: p.price, oldPrice: p.oldPrice, image: p.image, folder: p.folder, qty: 1 });
  }
  saveCart();
  renderCart();
  if (!skipDrawer) openCart();
  else showToast(t("card.added"));
}

function changeQty(id, delta) {
  var it = cartItems.find(function (x) { return x.id === id; });
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) {
    cartItems = cartItems.filter(function (x) { return x.id !== id; });
  }
  saveCart();
  renderCart();
  updateCartBadge();
}

function removeCartItem(id) {
  cartItems = cartItems.filter(function (x) { return x.id !== id; });
  saveCart();
  renderCart();
  updateCartBadge();
}

function clearCart() {
  if (!cartItems.length) {
    showToast(t("cart.empty"));
    return;
  }
  cartItems = [];
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(t("cart.cleared"));
}

function renderCart() {
  var list = document.getElementById("cart-items");
  var empty = document.getElementById("cart-empty");
  var foot = document.getElementById("cart-foot");
  if (!list) return;

  if (!cartItems.length) {
    list.innerHTML = "";
    if (empty) empty.style.display = "flex";
    if (foot) foot.style.display = "none";
    var totalEl = document.getElementById("cart-total");
    if (totalEl) totalEl.textContent = "";
    updateCartBadge();
    return;
  }

  if (empty) empty.style.display = "none";
  if (foot) foot.style.display = "block";

  var html = "";
  var total = 0;
  cartItems.forEach(function (it) {
    var img = resolveCartImage(it);
    var imgEl = img
      ? '<img src="' + img + '" alt="' + it.name + '" onerror="this.style.display=\'none\';this.parentNode.classList.add(\'ci-broken\')">'
      : '<span class="cart-ph">📦</span>';
    var lineTotal = it.price * it.qty;
    total += lineTotal;
    html +=
      '<div class="cart-item">' +
      '<div class="ci-media">' + imgEl + "</div>" +
      '<div class="ci-body">' +
      "<h5>" + it.name + "</h5>" +
      '<span class="ci-price">' + formatPrice(it.price) + ' ' + t("card.egp") + "</span>" +
      '<div class="ci-qty">' +
      '<button type="button" onclick="changeQty(\'' + it.id + '\', -1)">−</button>' +
      "<b>" + it.qty + "</b>" +
      '<button type="button" onclick="changeQty(\'' + it.id + '\', 1)">+</button>' +
      "</div>" +
      "</div>" +
      '<button type="button" class="ci-remove" title="' + t("cart.remove") + '" onclick="removeCartItem(\'' + it.id + '\')">&times;</button>' +
      "</div>";
  });
  list.innerHTML = html;

  var totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = formatPrice(total) + " " + t("card.egp");

  var waBtn = document.getElementById("cart-wa");
  if (waBtn) waBtn.href = buildCartWhatsApp();
}

function buildCartWhatsApp() {
  var lines = cartItems.map(function (it) {
    return (I18N_CURRENT === "en" ? "- " : "- ") + it.name + " × " + it.qty + (it.price > 0 ? " = " + formatPrice(it.price * it.qty) + " " + t("card.egp") : "");
  });
  var total = cartItems.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
  var msg =
    (I18N_CURRENT === "en" ? "Hello, I want to confirm my order:\n" : "مرحباً، أريد تأكيد طلبي:\n") +
    lines.join("\n") +
    "\n" + (I18N_CURRENT === "en" ? "Total: " : "الإجمالي: ") + formatPrice(total) + " " + t("card.egp") +
    (I18N_CURRENT === "en" ? "\nName: " : "\nالاسم: ");
  return "https://wa.me/" + t("cart.phone") + "?text=" + encodeURIComponent(msg);
}

function openCart() {
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");
  if (drawer) drawer.classList.add("open");
  if (overlay) overlay.classList.add("open");
  lockBodyScroll();
}

function closeCart() {
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  unlockBodyScroll();
}

function setupCart() {
  var toggle = document.getElementById("cart-toggle");
  var close = document.getElementById("cart-close");
  var overlay = document.getElementById("cart-overlay");
  if (toggle) toggle.addEventListener("click", function () {
    if (!cartItems.length) {
      showToast(t("cart.empty"));
      return;
    }
    renderCart();
    openCart();
  });
  if (close) close.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCart();
  });
  loadCart();
  renderCart();
  updateCartBadge();
}

/* ---------- تهيئة النظام عند التحميل ---------- */
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderNew();
  renderOffers();
  renderFooterSocials();
  renderSocialCards();
  setupContactForm();
  setupCart();
  setupHeaderScroll();
  setupMenu();
  setupSocialMissing();
  setupFilterAndSearch();
  setupReveal();
  setupModalDOM();
  setupMarquee();
  setupCounters();
  setupTilt();
  setupSpotlight();
  setupParticles();
  setupAnchorScroll();
});
