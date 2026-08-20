/* ============================================================
   متجر آثر — نظام اللغتين (عربي / English) + بيانات الوضع الليلي
   عدّل النصوص من هنا فقط عند الحاجة.
   ============================================================ */

/* ---------- محرك الترجمة والوضع الليلي ---------- */
const I18N_KEY = "athar_lang";
const THEME_KEY = "athar_theme";

let I18N_CURRENT = "ar";

function t(key) {
  var lang = I18N[I18N_CURRENT] || I18N.ar;
  return lang[key] !== undefined ? lang[key] : I18N.ar[key];
}

function applyI18n() {
  document.documentElement.lang = I18N_CURRENT;
  document.documentElement.dir = I18N_CURRENT === "en" ? "ltr" : "rtl";
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var val = t(el.getAttribute("data-i18n"));
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var val = t(el.getAttribute("data-i18n-placeholder"));
    if (val !== undefined) el.setAttribute("placeholder", val);
  });
  var dt = document.getElementById("lang-toggle");
  if (dt) dt.textContent = I18N_CURRENT === "en" ? "ع" : "EN";
  var mt = document.getElementById("lang-toggle-m");
  if (mt) {
    mt.innerHTML = (I18N_CURRENT === "en" ? "ع" : "EN") + " <span>" + t("lang.toggle") + "</span>";
  }
  refreshDynamicI18n();
}

function setLang(lang) {
  if (!I18N[lang]) return;
  I18N_CURRENT = lang;
  try { localStorage.setItem(I18N_KEY, lang); } catch (e) {}
  applyI18n();
}

function getLang() {
  return I18N_CURRENT;
}

const I18N = {
  ar: {
    "brand.name": "آثر",
    "brand.tag": "منتج يسيب آثر كبير",
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.new": "الجديد",
    "nav.about": "من نحن",
    "nav.offers": "بوكسات آثر",
    "nav.contact": "تواصل معنا",
    "cta.order": "اطلب الآن 💬",
    "hero.tag": "✨ براند مصري بلمسة فاخرة",
    "hero.titleA": "آثر",
    "hero.titleX": "×",
    "hero.titleB": "منتج يسيب آثر.",
    "hero.slogan.prefix": "منتج",
    "hero.slogan.highlight": "يسيب آثر كبير",
    "hero.desc": "في آثر نقدم منتجات فخمة تجمع بين الجودة العالية، الشكل المميز والسعر المناسب، ونعتني بكل تفصيلة حتى تقتني منتجًا يترك آثرًا لا يُنسى.",
    "hero.btnProducts": "تصفح المنتجات",
    "hero.btnOffers": "بوكسات آثر 🎁",
    "hero.noOffers": "لا يوجد عروض الآن",
    "stat.products": "منتج مصمم بعناية",
    "stat.cats": "تصنيفات رئيسية",
    "stat.quality": "جودة واستبدال",
    "badge.title": "فخامة التفاصيل",
    "badge.sub": "منتج يسيب آثر كبير",
    "cats.tag": "تسوق حسب الفئة",
    "cats.title": "أقسام منتجات آثر",
    "cats.sub": "اكتشف تشكيلاتنا المميزة المصممة بعناية لتناسب ذوقك.",
    "cat.perfumes": "العطور",
    "cat.wallets": "محافظ رجالي",
    "cat.watches": "ساعات رجالي",
    "cat.accessories": "إكسسوارات",
    "cat.count": "منتج فاخر",
    "cat.arrow": "استكشف المجموعة ←",
    "features.tag": "لماذا تختار آثر؟",
    "features.title": "تجربة تسوق تستحق التكرار",
    "feat.qualityTitle": "جودة استثنائية",
    "feat.qualityDesc": "خامات ممتازة واهتمام بأدق التفاصيل.",
    "feat.priceTitle": "سعر مناسب",
    "feat.priceDesc": "أعلى فخامة وقيمة مقابل أفضل سعر.",
    "feat.deliveryTitle": "توصيل لكافة المحافظات",
    "feat.deliveryDesc": "شحن سريع وسلس مع إمكانية المعاينة.",
    "feat.serviceTitle": "خدمة عملاء راقية",
    "feat.serviceDesc": "متابعة شخصية من الاختيار حتى الاستلام.",
    "cta.title": "تابع أحدث التشكيلات والوصلات",
    "cta.desc": "نضيف منتجات جديدة وتشكيلات حصريّة باستمرار لنمنحك دائمًا تجربة فريدة.",
    "cta.btn": "تصفح الجديد الآن ✨",
    "footer.about": "نقدم منتجات فخمة تجمع بين الجودة والشكل المميز والسعر المناسب، لأن التفاصيل الصغيرة هي التي تصنع الفرق الكبير.",
    "footer.links": "روابط سريعة",
    "footer.cats": "دليل آثر",
    "footer.policy": "سياسة الاستبدال والاسترجاع",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة © 2026 <b>آثر</b> — منتج يسيب آثر كبير.",
    "policy.title": "سياسة الاستبدال والاسترجاع",
    "policy.intro": "في أثر، هدفنا إنك تكون راضي تمامًا عن طلبك، وعلشان كده وفرنا لك سياسة واضحة وسهلة للاستبدال والاسترجاع.",
    "policy.exchange.title": "الاستبدال",
    "policy.exchange.intro": "يمكنك طلب استبدال المنتج في حالة:",
    "policy.exchange.items": "وصول المنتج تالفًا أو به عيب واضح.##استلام منتج مختلف عن المنتج الذي تم طلبه.##عدم مطابقة المنتج للمواصفات الموضحة في الموقع.",
    "policy.exchange.note": "يجب التواصل معنا خلال 48 ساعة من استلام الطلب مع إرسال صور واضحة للمنتج والمشكلة الموجودة به.",
    "policy.return.title": "الاسترجاع",
    "policy.return.intro": "يمكن طلب استرجاع المنتج في حالة عدم الرغبة فيه، بشرط:",
    "policy.return.items": "أن يكون المنتج بحالته الأصلية.##عدم استخدام المنتج أو ارتدائه.##الحفاظ على التغليف والملحقات الخاصة بالمنتج.##تقديم طلب الاسترجاع خلال <b>48 ساعة</b> من استلام الطلب.",
    "policy.excluded.title": "المنتجات غير القابلة للاسترجاع",
    "policy.excluded.text": "لا يمكن استرجاع أو استبدال المنتجات التي تم استخدامها أو التي تعرضت للتلف بسبب سوء الاستخدام، أو المنتجات التي تم تغيير حالتها الأصلية بعد الاستلام.",
    "policy.shipping.title": "رسوم الشحن",
    "policy.shipping.text": "في حالة وجود خطأ من جانبنا، مثل إرسال منتج خاطئ أو وصول المنتج تالفًا، تتحمل أثر تكاليف الاستبدال أو الاسترجاع.##أما في حالة الاسترجاع أو الاستبدال بسبب تغيير رأي العميل، فقد يتم خصم تكلفة الشحن حسب الحالة.",
    "policy.refund.title": "استرداد المبلغ",
    "policy.refund.text": "بعد استلام المنتج والتأكد من مطابقته لشروط الاسترجاع، سيتم بدء إجراءات رد المبلغ وفقًا لطريقة الدفع المتاحة.##<b>ملاحظة:</b> قد تستغرق عملية استرداد المبلغ بعض الوقت حسب طريقة الدفع أو الجهة المسؤولة عن عملية الدفع.",
    "policy.contact.title": "التواصل معنا",
    "policy.contact.intro": "لإتمام عملية الاستبدال أو الاسترجاع، يرجى التواصل مع خدمة عملاء أثر وإرسال:",
    "policy.contact.items": "رقم الطلب.##اسم المنتج.##سبب الاستبدال أو الاسترجاع.##صور واضحة للمنتج في حالة وجود مشكلة.",
    "policy.slogan": "أثر — لأن التفاصيل تصنع الفرق.",
    "marquee.perfumes": "عطور فاخرة",
    "marquee.wallets": "محافظ رجالي",
    "marquee.watches": "ساعات أنيقة",
    "marquee.accessories": "إكسسوارات مميزة",
    "marquee.quality": "جودة مضمونة",
    "marquee.delivery": "توصيل لجميع المحافظات",
    "social.whatsapp": "واتساب",
    "social.instagram": "إنستجرام",
    "social.tiktok": "تيك توك",
    "social.facebook": "فيسبوك",
    "products.heroTitle": "منتجات آثر الفاخرة",
    "products.heroDesc": "لأي استفسار بخصوص أي منتج، يُرجى التقاط Screenshot للمنتج وإرساله عبر الواتساب، وسيتم الرد عليك في أقرب وقت",
    "products.searchPlaceholder": "ابحث باسم المنتج...",
    "products.tabAll": "جميع المنتجات",
    "products.tabPerfumes": "العطور",
    "products.tabWallets": "محافظ رجالي",
    "products.tabWatches": "ساعات رجالي",
    "products.tabAccessories": "إكسسوارات",
    "products.allTag": "🎯 جميع المنتجات",
    "products.allTitle": "قائمة كل المنتجات",
    "products.allRandom": "منتج بترتيب عشوائي",
    "products.allMatched": "منتج مطابق من",
    "products.catDesc": "منتجات مختارة بعناية وفخامة عالية",
    "card.num": "منتج رقم",
    "card.newNum": "منتج جديد رقم",
    "card.order": "إضافة لسلة الشراء 🛒",
    "card.added": "تم أضافة المنتج بنجاح ✅",
    "card.view": "معاينة سريعة 👁️",
    "card.viewTitle": "معاينة سريعة",
    "card.noPrice": "السعر يحدد لاحقًا",
    "card.egp": "جنيه",
    "card.discount": "خصم",
    "cart.title": "سلة التسويق",
    "cart.empty": "سلتك فارغة حالياً",
    "cart.total": "الإجمالي",
    "cart.checkout": "تأكيد الطلب عبر واتساب 💬",
    "cart.phone": "201040922823",
    "cart.remove": "إزالة",
    "cart.clearAll": "مسح الكل 🗑️",
    "cart.cleared": "تم مسح السلة 🗑️",
    "cart.unit": "قطعة",
    "cart.nameValue": "{name} × {qty}",
    "modal.category": "منتج عالي الجودة من تشكيلة",
    "modal.desc": "في متجر آثر. نضمن لك أعلى مستويات الفخامة والتصميم المميز والتغليف الراقي.",
    "modal.guarantee": "الضمان",
    "modal.guaranteeVal": "جودة مضمونة ومعاينة عند الاستلام",
    "modal.delivery": "التوصيل",
    "modal.deliveryVal": "شحن سريع لجميع محافظات مصر",
    "modal.material": "الخامة",
    "modal.materialVal": "تشكيلة ممتازة تم اختيارها بعناية",
    "modal.orderBtn": "إضافة لسلة الشراء 🛒",
    "modal.continue": "متابعة التسوق",
    "modal.close": "إغلاق",
    "new.heroTitle": "الجديد في آثر ✨",
    "new.heroDesc": "20 مجلد وبطاقة مجهزة مسبقًا لإضافة أحدث المنتجات والوصلات فور توفرها.",
    "new.tag": "وصل حديثًا",
    "new.title": "بطاقات المنتجات الجديدة",
    "new.sub": "تصميمات مجهزة وجاهزة لإطلاق المنتجات القادمة بسهولة بدون إعادة التكويد.",
    "new.readyImages": "مكان الصورة — جاهز لإضافة المنتج",
    "offers.heroTitle": "بوكسات آثر 🎁",
    "offers.heroDesc": "لأي استفسار بخصوص أي بوكس، يُرجى التقاط Screenshot للبوكس وإرساله عبر الواتساب، وسيتم الرد عليك في أقرب وقت.",
    "offers.tag": "قائمة مستقلة",
    "offers.title": "بوكسات آثر",
    "offers.sub": "منتجات آثر.. منتج يسيب آثر كبير.",
    "offers.itemTitle": "بوكس آثر",
    "offers.boxTitle": "بوكس آثر",
    "offers.placeholder": "الصورة · الاسم · السعر — جاهز للتعديل",
    "offers.comingSoon": "هذا البوكس قيد التجهيز — سعره قريبًا 🚧",
    "offers.instead": "بدلاً من",
    "about.heroTitle": "من نحن",
    "about.heroDesc": "تعرّف على رؤيتنا وقيمنا في بناء براند يترك آثرًا كبيرًا.",
    "about.title": "عن آثر",
    "about.p1": "في آثر نؤمن أن التفاصيل الصغيرة هي التي تصنع الفرق، وأن كل منتج نختاره لك يجب أن يترك آثرًا كبيرًا.",
    "about.p2": "نقدم مجموعة مميزة من المنتجات التي تجمع بين الجودة، الأناقة، والسعر المناسب، لنمنحك تجربة مختلفة من أول اختيارك للمنتج وحتى وصوله إليك.",
    "about.p3": "نسعى دائمًا لاختيار منتجات تناسب ذوقك واحتياجاتك، مع الاهتمام بالتفاصيل التي تجعل كل تجربة مع آثر تجربة تستحق التكرار.",
    "about.signature": "آثر — منتج يسيب آثر كبير.",
    "value.quality": "الجودة العالية",
    "value.qualityDesc": "اختيار دقيق وعناية بأدق التفاصيل والخامات.",
    "value.shape": "الشكل المميز",
    "value.shapeDesc": "تصميمات أنيقة تليق بشخصيتك وتلفت الأنظار.",
    "value.price": "السعر المناسب",
    "value.priceDesc": "فخامة وتوفير معًا لتجربة تسوق مثالية.",
    "contact.heroTitle": "تواصل معنا 💬",
    "contact.heroDesc": "يسعدنا دائمًا الإجابة على استفساراتك وتلبية طلباتك عبر منصاتنا الرسمية.",
    "contact.tag": "منصات التواصل",
    "contact.title": "تواصل عبر قنواتنا الرسمية",
    "contact.sub": "اختر المنصة المناسبة لك للوصول إلينا فورًا.",
    "contact.waHandle": "محادثة مباشرة 01040922823",
    "contact.igHandle": "athar_1_11",
    "contact.ttHandle": "athar_1_11",
    "contact.fbHandle": "Athar111",
    "contact.open": "افتح المنصة الآن",
    "contact.prepare": "يتم تجهيز الرابط",
    "contact.formTitle": "أرسل رسالة مباشرة 📨",
    "contact.nameLabel": "الاسم الكريم",
    "contact.namePlaceholder": "اكتب اسمك هنا",
    "contact.chatLabel": "رقم المحادثة",
    "contact.phoneLabel": "رقم الهاتف / الواتساب",
    "contact.phonePlaceholder": "01xxxxxxxxx",
    "contact.msgLabel": "تفاصيل الرسالة أو الاستفسار",
    "contact.msgPlaceholder": "اكتب استفسارك أو طلبك هنا...",
    "contact.send": "إرسال الرسالة عبر الواتساب 💬",
    "contact.fillAll": "من فضلك املأ جميع الحقول لنسعد بخدمتك",
    "contact.prepareMsg": "سيتم إضافة حساب",
    "contact.close": "قريبًا",
    "toast.order": "اكتب استفسارك أو طلبك هنا...",
    "mode.toggle": "الوضع الليلي",
    "mode.toggleDark": "الوضع النهاري",
    "lang.toggle": "English"
  },
  en: {
    "brand.name": "Athar",
    "brand.tag": "A product that leaves a big mark",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.new": "New",
    "nav.about": "About",
    "nav.offers": "Athar Boxes",
    "nav.contact": "Contact",
    "cta.order": "Order now 💬",
    "hero.tag": "✨ An Egyptian brand with a luxury touch",
    "hero.titleA": "Athar",
    "hero.titleX": "×",
    "hero.titleB": "A product that leaves a mark.",
    "hero.slogan.prefix": "A product that",
    "hero.slogan.highlight": "leaves a big mark",
    "hero.desc": "At Athar we offer premium products combining great quality, a distinctive look and a fair price. We care about every detail so you own a product that leaves an unforgettable mark.",
    "hero.btnProducts": "Browse products",
    "hero.btnOffers": "Athar Boxes 🎁",
    "hero.noOffers": "No offers available now",
    "stat.products": "Carefully crafted products",
    "stat.cats": "Main categories",
    "stat.quality": "Quality & replacement",
    "badge.title": "Luxury in details",
    "badge.sub": "A product that leaves a big mark",
    "cats.tag": "Shop by category",
    "cats.title": "Athar product sections",
    "cats.sub": "Discover our distinctive collections crafted with care for your refined taste.",
    "cat.perfumes": "Perfumes",
    "cat.wallets": "Men's Wallets",
    "cat.watches": "Men's Watches",
    "cat.accessories": "Accessories",
    "cat.count": "premium products",
    "cat.arrow": "Explore the collection ←",
    "features.tag": "Why choose Athar?",
    "features.title": "A shopping experience worth repeating",
    "feat.qualityTitle": "Exceptional quality",
    "feat.qualityDesc": "Excellent materials and attention to the finest details.",
    "feat.priceTitle": "Fair price",
    "feat.priceDesc": "Maximum luxury and value at the best price.",
    "feat.deliveryTitle": "Delivery to all cities",
    "feat.deliveryDesc": "Fast and smooth shipping with inspection on delivery.",
    "feat.serviceTitle": "Premium customer service",
    "feat.serviceDesc": "Personal follow-up from selection to delivery.",
    "cta.title": "Follow the latest collections and arrivals",
    "cta.desc": "We constantly add new products and exclusive collections to always give you a unique experience.",
    "cta.btn": "Browse what's new now ✨",
    "footer.about": "We offer premium products combining quality, a distinctive look and a fair price, because the small details make the big difference.",
    "footer.links": "Quick Links",
    "footer.cats": "Athar Guide",
    "footer.policy": "Exchange & Return Policy",
    "footer.contact": "Contact Us",
    "footer.rights": "All rights reserved © 2026 <b>Athar</b> — A product that leaves a big mark.",
    "policy.title": "Exchange & Return Policy",
    "policy.intro": "At Athar, your complete satisfaction is our goal. That's why we provide a clear and easy policy for exchange and return.",
    "policy.exchange.title": "Exchange",
    "policy.exchange.intro": "You can request an exchange if:",
    "policy.exchange.items": "The product arrives damaged or with an obvious defect.##You receive a product different from the one you ordered.##The product does not match the specifications shown on the site.",
    "policy.exchange.note": "You must contact us within 48 hours of receiving your order and send clear photos of the product and the issue.",
    "policy.return.title": "Return",
    "policy.return.intro": "You can request a return if you no longer want the product, provided that:",
    "policy.return.items": "The product is in its original condition.##The product has not been used or worn.##The packaging and accessories are kept intact.##The return request is submitted within <b>48 hours</b> of receiving the order.",
    "policy.excluded.title": "Non-returnable Products",
    "policy.excluded.text": "Products that have been used, damaged by misuse, or whose original condition was changed after receipt cannot be returned or exchanged.",
    "policy.shipping.title": "Shipping Fees",
    "policy.shipping.text": "If there is an error on our side, such as sending the wrong product or a damaged product arrives, Athar covers the exchange or return costs.##If the return or exchange is due to a change of mind, shipping costs may be deducted depending on the case.",
    "policy.refund.title": "Refund",
    "policy.refund.text": "After receiving the product and verifying it meets the return conditions, the refund process will begin according to the available payment method.##<b>Note:</b> The refund process may take some time depending on the payment method or the party responsible for the payment.",
    "policy.contact.title": "Contact Us",
    "policy.contact.intro": "To complete an exchange or return, please contact Athar customer service and send:",
    "policy.contact.items": "Order number.##Product name.##Reason for the exchange or return.##Clear photos of the product if there is an issue.",
    "policy.slogan": "Athar — because details make the difference.",
    "marquee.perfumes": "Luxury perfumes",
    "marquee.wallets": "Men's wallets",
    "marquee.watches": "Elegant watches",
    "marquee.accessories": "Distinctive accessories",
    "marquee.quality": "Guaranteed quality",
    "marquee.delivery": "Delivery to all cities",
    "social.whatsapp": "WhatsApp",
    "social.instagram": "Instagram",
    "social.tiktok": "TikTok",
    "social.facebook": "Facebook",
    "products.heroTitle": "Athar's Luxury Products",
    "products.heroDesc": "For any inquiry about a product, please take a Screenshot of the product and send it via WhatsApp, and you will be replied to as soon as possible",
    "products.searchPlaceholder": "Search by product name...",
    "products.tabAll": "All products",
    "products.tabPerfumes": "Perfumes",
    "products.tabWallets": "Men's Wallets",
    "products.tabWatches": "Men's Watches",
    "products.tabAccessories": "Accessories",
    "products.allTag": "🎯 All products",
    "products.allTitle": "All products list",
    "products.allRandom": "products in random order",
    "products.allMatched": "matching products of",
    "products.catDesc": "carefully selected premium products",
    "card.num": "Product #",
    "card.newNum": "New product #",
    "card.order": "Add to cart 🛒",
    "card.added": "Product added successfully ✅",
    "card.view": "Quick view 👁️",
    "card.viewTitle": "Quick view",
    "card.noPrice": "Price to be announced",
    "card.egp": "EGP",
    "card.discount": "OFF",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Confirm order via WhatsApp 💬",
    "cart.phone": "201040922823",
    "cart.remove": "Remove",
    "cart.clearAll": "Clear all 🗑️",
    "cart.cleared": "Cart cleared 🗑️",
    "cart.unit": "pcs",
    "cart.nameValue": "{name} × {qty}",
    "modal.category": "A high quality product from the",
    "modal.desc": "collection at Athar store. We guarantee you the highest levels of luxury, distinctive design and premium packaging.",
    "modal.guarantee": "Warranty",
    "modal.guaranteeVal": "Quality guaranteed with inspection on delivery",
    "modal.delivery": "Delivery",
    "modal.deliveryVal": "Fast shipping to all governorates of Egypt",
    "modal.material": "Material",
    "modal.materialVal": "An excellent selection carefully curated",
    "modal.orderBtn": "Add to cart 🛒",
    "modal.continue": "Continue shopping",
    "modal.close": "Close",
    "new.heroTitle": "What's New at Athar ✨",
    "new.heroDesc": "20 folders and pre-made cards ready to add the latest products and arrivals.",
    "new.tag": "Just arrived",
    "new.title": "New products cards",
    "new.sub": "Pre-built designs ready to launch upcoming products easily without re-coding.",
    "new.readyImages": "Image placeholder — ready for the product",
    "offers.heroTitle": "Athar Boxes 🎁",
    "offers.heroDesc": "For any inquiry about a box, please take a Screenshot of the box and send it via WhatsApp, and you will be replied to as soon as possible.",
    "offers.tag": "Standalone list",
    "offers.title": "Athar Boxes",
    "offers.sub": "Athar products.. a product that leaves a big mark.",
    "offers.itemTitle": "Athar Box",
    "offers.boxTitle": "Box",
    "offers.placeholder": "Image · Name · Price — ready to edit",
    "offers.comingSoon": "This box is being prepared — price soon 🚧",
    "offers.instead": "instead of",
    "about.heroTitle": "About Us",
    "about.heroDesc": "Learn about our vision and values in building a brand that leaves a big mark.",
    "about.title": "About Athar",
    "about.p1": "At Athar we believe the small details make the difference, and that every product we choose for you should leave a big mark.",
    "about.p2": "We offer a distinctive selection of products combining quality, elegance and a fair price, to give you a different experience from your first choice until it reaches you.",
    "about.p3": "We always strive to choose products that suit your taste and needs, caring for the details that make every experience with Athar worth repeating.",
    "about.signature": "Athar — A product that leaves a big mark.",
    "value.quality": "High quality",
    "value.qualityDesc": "Careful selection and attention to the finest details and materials.",
    "value.shape": "Distinctive look",
    "value.shapeDesc": "Elegant designs worthy of your personality and turning heads.",
    "value.price": "Fair price",
    "value.priceDesc": "Luxury and savings together for a perfect shopping experience.",
    "contact.heroTitle": "Contact Us 💬",
    "contact.heroDesc": "We are always happy to answer your questions and fulfill your orders through our official platforms.",
    "contact.tag": "Our Platforms",
    "contact.title": "Reach us through our official channels",
    "contact.sub": "Choose the platform that suits you to reach us instantly.",
    "contact.waHandle": "Direct chat 01040922823",
    "contact.igHandle": "athar_1_11",
    "contact.ttHandle": "athar_1_11",
    "contact.fbHandle": "Athar111",
    "contact.open": "Open the platform",
    "contact.prepare": "Link being prepared",
    "contact.formTitle": "Send a direct message 📨",
    "contact.nameLabel": "Your name",
    "contact.namePlaceholder": "Type your name here",
    "contact.chatLabel": "Chat number",
    "contact.phoneLabel": "Phone / WhatsApp number",
    "contact.phonePlaceholder": "01xxxxxxxxx",
    "contact.msgLabel": "Message or inquiry details",
    "contact.msgPlaceholder": "Type your inquiry or order here...",
    "contact.send": "Send the message via WhatsApp 💬",
    "contact.fillAll": "Please fill in all fields so we can serve you",
    "contact.prepareMsg": "Adding this account",
    "contact.close": "soon",
    "toast.order": "Type your inquiry or order here...",
    "mode.toggle": "Night mode",
    "mode.toggleDark": "Day mode",
    "lang.toggle": "العربية"
  }
};

/* ---------- الوضع الليلي / النهاري ---------- */
function getTheme() {
  return "dark";
}

function applyTheme() {
  var theme = getTheme();
  document.documentElement.setAttribute("data-theme", theme);
  var ml = document.getElementById("mode-label-m");
  if (ml) ml.textContent = theme === "dark" ? t("mode.toggleDark") : t("mode.toggle");
}

function setTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  applyTheme();
}

function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/* ---------- ربط أزرار اللغة والوضع ---------- */
function setupI18nToggles() {
  var lt = document.getElementById("lang-toggle");
  var ltM = document.getElementById("lang-toggle-m");
  var tt = document.getElementById("theme-toggle");
  var ttM = document.getElementById("theme-toggle-m");
  if (lt) lt.addEventListener("click", function () { setLang(getLang() === "ar" ? "en" : "ar"); });
  if (ltM) ltM.addEventListener("click", function () { setLang(getLang() === "ar" ? "en" : "ar"); });
  if (tt) tt.addEventListener("click", toggleTheme);
  if (ttM) ttM.addEventListener("click", toggleTheme);
}

/* ---------- إعادة عرض المحتوى الديناميكي عند تغيير اللغة ---------- */
function refreshDynamicI18n() {
  if (typeof renderProducts === "function") renderProducts();
  if (typeof renderNew === "function") renderNew();
  if (typeof renderOffers === "function") renderOffers();
  if (typeof renderFooterSocials === "function") renderFooterSocials();
  if (typeof renderSocialCards === "function") renderSocialCards();
}

/* ---------- التهيئة ---------- */
(function initI18n() {
  var saved = null;
  try { saved = localStorage.getItem(I18N_KEY); } catch (e) {}
  if (I18N[saved]) I18N_CURRENT = saved;
  document.addEventListener("DOMContentLoaded", function () {
    setupI18nToggles();
    applyTheme();
    applyI18n();
  });
})();