/*
  ============================================
  بيانات متجر آثر — كل البيانات منفصلة عن التصميم
  عدّل من هنا فقط: الأسماء، الأسعار، الصور، الروابط
  ============================================
*/

/* ====== هوية البراند ====== */
const BRAND = {
  name: "آثر",
  slogan: "منتج يسيب آثر كبير",
  description: "منتجات مصرية فخمة تجمع بين الجودة والشكل المميز والسعر المناسب، وكل منتج يترك آثر كبير.",
  logo: "1.png",
  heroImage: "2.png"
};

/* ====== روابط التواصل — عدّل الروابط من مكان واحد هنا ====== */
const SOCIALS = {
  whatsapp: "https://wa.me/201040922823",
  instagram: "https://www.instagram.com/athar_1_11/",
  tiktok: "https://www.tiktok.com/@athar_1_11",
  /* رابط صفحة فيسبوك الرسمي للتواصل مباشرة من خلاله */
  facebook: "https://www.facebook.com/share/1EbAAywa7r/?mibextid=wwXIfr"
};

/* ====== بيانات المنتجات ======
   كل تصنيف يحتوي على 20 منتجًا.
   image: اسم ملف الصورة داخل مجلد التصنيف (folder)
   price: السعر الحالي   |   oldPrice: السعر القديم (ضع null إن لم يوجد)
*/
const CATEGORIES = [
  {
    id: "perfumes",
    title: "العطور",
    folder: "perfumes",
    icon: "",
    products: [
      { id: "perfume-1",  name: "POLO BLACK",              price: 699, oldPrice: 1200, image: "0.jpeg" },
      { id: "perfume-2",  name: "BLACK SEDUCTION",         price: 699, oldPrice: 1200, image: "2.jpeg" },
      { id: "perfume-3",  name: "Yvesaintlaurent",         price: 699, oldPrice: 1200, image: "2 (2).jpeg" },
      { id: "perfume-4",  name: "BLEU DE CHANEL",          price: 699, oldPrice: 1200, image: "3.jpeg" },
      { id: "perfume-5",  name: "KHAMRAH",                 price: 699, oldPrice: 1200, image: "4.jpeg" },
      { id: "perfume-6",  name: "AMBASSADOR",              price: 699, oldPrice: 1200, image: "4 (2).jpeg" },
      { id: "perfume-7",  name: "SAUVAGE",                 price: 699, oldPrice: 1200, image: "5.jpeg" },
      { id: "perfume-8",  name: "MYSLF",                   price: 699, oldPrice: 1200, image: "5 (2).jpeg" },
      { id: "perfume-9",  name: "LACOSTE",                 price: 699, oldPrice: 1200, image: "6.jpeg" },
      { id: "perfume-10", name: "INVICTUS",                price: 699, oldPrice: 1200, image: "6 (2).jpeg" },
      { id: "perfume-11", name: "9PM",                     price: 699, oldPrice: 1200, image: "6 (3).jpeg" },
      { id: "perfume-12", name: "TOM FORD",                price: 699, oldPrice: 1200, image: "6 (4).jpeg" },
      { id: "perfume-13", name: "GAULTTER",                price: 699, oldPrice: 1200, image: "7.jpeg" },
      { id: "perfume-14", name: "SCANDAL",                 price: 699, oldPrice: 1200, image: "11.jpeg" },
      { id: "perfume-15", name: "AZZARO THE MOST",         price: 699, oldPrice: 1200, image: "13.jpeg" },
      { id: "perfume-16", name: "FAHRENHEIT",              price: 699, oldPrice: 1200, image: "14.jpeg" },
      { id: "perfume-17", name: "ASAD",                    price: 699, oldPrice: 1200, image: "15.jpeg" },
      { id: "perfume-18", name: "AZZARO THE MOST",         price: 699, oldPrice: 1200, image: "33.jpeg" },
      { id: "perfume-19", name: "BOSS",                    price: 699, oldPrice: 1200, image: "35.jpeg" },
      { id: "perfume-20", name: "DIOR HOMME",              price: 699, oldPrice: 1200, image: "80.jpeg" }
    ]
  },
  {
    id: "wallets",
    title: "محافظ رجالي",
    folder: "wallets",
    icon: "👝",
    products: [
      { id: "wallet-1",  name: "محفظة جلد لون أسود و بني",        price: 560, oldPrice: 850, image: "1.jpeg" },
      { id: "wallet-2",  name: "محفظة جلد لون أسود و بني",        price: 399, oldPrice: 600, image: "2.jpeg" },
      { id: "wallet-3",  name: "محفظة جلد قطيفة لون اسود و بني",  price: 399, oldPrice: 600, image: "3.jpeg" },
      { id: "wallet-4",  name: "ANGSAO & FASHON",                 price: 299, oldPrice: 400, image: "5.jpeg" },
      { id: "wallet-5",  name: "William_POLO",                   price: 499, oldPrice: 650, image: "6.jpeg" },
      { id: "wallet-6",  name: "LACOSTY",                        price: 399, oldPrice: 500, image: "6 (2).jpeg" },
      { id: "wallet-7",  name: "محفظة لون أسود ساده",             price: 250, oldPrice: 400, image: "7.jpeg" },
      { id: "wallet-8",  name: "محفظة قطيفة لون جملي",            price: 499, oldPrice: 650, image: "8.jpeg" },
      { id: "wallet-9",  name: "محفظة جلد بني",                   price: 499, oldPrice: 750, image: "9.jpeg" },
      { id: "wallet-10", name: "محفظة كروت جلد لون بني",          price: 399, oldPrice: 600, image: "10.jpeg" },
      { id: "wallet-11", name: "William_POLO+Zipper wallet",     price: 499, oldPrice: 700, image: "11.jpeg" },
      { id: "wallet-12", name: "William_POLO+French wallet",     price: 399, oldPrice: 500, image: "12.jpeg" },
      { id: "wallet-13", name: "DIOR+Navy blue",                 price: 399, oldPrice: 500, image: "13.jpeg" },
      { id: "wallet-14", name: "محفظة CUCCL+Black",              price: 450, oldPrice: 600, image: "17.jpeg" },
      { id: "wallet-15", name: "DIOR+ Black",                    price: 399, oldPrice: 500, image: "19.jpeg" },
      { id: "wallet-16", name: "كراتة لون اسود",                  price: 450, oldPrice: 600, image: "20.jpeg" },
      { id: "wallet-17", name: "LOUIS VUITTON+Black",            price: 499, oldPrice: 600, image: "100.jpeg" },
      { id: "wallet-18", name: "محفظة جلد لون جملي",              price: 399, oldPrice: 500, image: "IMG_4955.jpeg" },
      { id: "wallet-19", name: "طقم CUCCL لون أسود",              price: 799, oldPrice: 999, image: "IMG_4970.jpeg" },
      { id: "wallet-20", name: "طقم محفظة جلد + ساعة لون بني",    price: 850, oldPrice: 110, image: "IMG_4972.jpeg" }
    ]
  },
  {
    id: "watches",
    title: "ساعات رجالي",
    folder: "watches",
    icon: "⌚",
    products: [
      { id: "watch-1",  name: "ترند الساعات الحديث",       price: 350, oldPrice: 490, image: "1.jpeg" },
      { id: "watch-2",  name: "موديل فاخر",                price: 350, oldPrice: 490, image: "2.jpeg" },
      { id: "watch-3",  name: "الأسود الفخم",              price: 350, oldPrice: 490, image: "3.jpeg" },
      { id: "watch-4",  name: "حديث الساعات",              price: 350, oldPrice: 490, image: "4.jpeg" },
      { id: "watch-5",  name: "حديث الفخامة الجديدة",       price: 350, oldPrice: 630, image: "5.jpeg" },
      { id: "watch-6",  name: "جمال الساعات الحديثه",       price: 300, oldPrice: 400, image: "6.jpeg" },
      { id: "watch-7",  name: "جمال الاسود",               price: 450, oldPrice: 650, image: "7.jpeg" },
      { id: "watch-8",  name: "اللون البرونزي الامع",       price: 500, oldPrice: 700, image: "8.jpeg" },
      { id: "watch-9",  name: "ساعات نادره",               price: 350, oldPrice: 450, image: "9.jpeg" },
      { id: "watch-10", name: "الفضي الحديث",              price: 500, oldPrice: 650, image: "10.jpeg" },
      { id: "watch-11", name: "تخلاط الالوان",             price: 450, oldPrice: 550, image: "11.jpeg" },
      { id: "watch-12", name: "فضي فخم",                   price: 300, oldPrice: 400, image: "12.jpeg" },
      { id: "watch-13", name: "احدث السعات",               price: 400, oldPrice: 650, image: "13.jpeg" },
      { id: "watch-14", name: "الاسود الجذاب",             price: 400, oldPrice: 550, image: "14.jpeg" },
      { id: "watch-15", name: "جلد طبيعي مميز",            price: 550, oldPrice: 690, image: "15.jpeg" },
      { id: "watch-16", name: "جمال الوان الجلد في الساعات", price: 450, oldPrice: 500, image: "16.jpeg" },
      { id: "watch-17", name: "فخامة الساعات",             price: 300, oldPrice: 490, image: "17.jpeg" },
      { id: "watch-18", name: "ساعة مميزة الشكل",          price: 500, oldPrice: 650, image: "18.jpeg" },
      { id: "watch-19", name: "ساعات نادرة مميزة",         price: 300, oldPrice: 400, image: "19.jpeg" },
      { id: "watch-20", name: "أصل الساعات",               price: 300, oldPrice: 400, image: "IMG_4896.jpeg" }
    ]
  },
  {
    id: "accessories",
    title: "إكسسوارات",
    folder: "accessories",
    icon: "💎",
    products: [
      { id: "acc-1",  name: "سلسلة استلس بيور",                     price: 299, oldPrice: 350, image: "1.jpeg" },
      { id: "acc-2",  name: "سلسلة استلس بيور",                     price: 190, oldPrice: 250, image: "2.jpeg" },
      { id: "acc-3",  name: "سلسلة استلس بيور",                     price: 250, oldPrice: 400, image: "3.jpeg" },
      { id: "acc-4",  name: "الاجمل في الشكل",                      price: 280, oldPrice: 350, image: "4.jpeg" },
      { id: "acc-5",  name: "الفضة اللامع",                         price: 299, oldPrice: 480, image: "4 (2).jpeg" },
      { id: "acc-6",  name: "سلسلة استلس بيور",                     price: 210, oldPrice: 350, image: "7.jpeg" },
      { id: "acc-7",  name: "اسورة LACOSTE متاحة بي اللون الفضي",   price: 450, oldPrice: 650, image: "8.jpeg" },
      { id: "acc-8",  name: "الأسود النادر",                        price: 499, oldPrice: 700, image: "9.jpeg" },
      { id: "acc-9",  name: "نادره ومش ف اي مكان",                  price: 350, oldPrice: 450, image: "10.jpeg" },
      { id: "acc-10", name: "اسورة استلس آيه الكرسي",               price: 290, oldPrice: 450, image: "11.jpeg" },
      { id: "acc-11", name: "الاجمل في المظهر",                     price: 210, oldPrice: 340, image: "13.jpeg" },
      { id: "acc-12", name: "انسيال استلس بيور",                    price: 210, oldPrice: 355, image: "14.jpeg" },
      { id: "acc-13", name: "انسيال استلس بيور",                    price: 499, oldPrice: 650, image: "15.jpeg" },
      { id: "acc-14", name: "متاحة الأن",                           price: 310, oldPrice: 550, image: "31.jpeg" },
      { id: "acc-15", name: "دبلة استلس بيور",                      price: 205, oldPrice: 390, image: "33.jpeg" },
      { id: "acc-16", name: "طقم مكون من انسيال وسلسلة بيور",       price: 450, oldPrice: 500, image: "101.jpeg" },
      { id: "acc-17", name: "طقم مكون من انسيال وسلسلة بيور",       price: 499, oldPrice: 750, image: "IMG_4864.jpeg" },
      { id: "acc-18", name: "طقم مكون من انسيال وسلسلة بيور",       price: 499, oldPrice: 650, image: "IMG_4876.jpeg" },
      { id: "acc-19", name: "طقم مكون من انسيال وسلسلة بيور",       price: 499, oldPrice: 670, image: "IMG_4877.jpeg" },
      { id: "acc-20", name: "طقم مكون من اسورة وخاتم استلس بيور",   price: 499, oldPrice: 650, image: "IMG_4922.jpeg" }
    ]
  }
];

/* ====== صفحة الجديد — 20 بطاقة جاهزة لإضافة منتجات مستقبلية ======
   عدّل name / price / oldPrice / image لكل منتج جديد.
   اترك name = "منتج جديد" و price = 0 لعرضها كبطاقات جاهزة. */
const NEW_ITEMS = [];
for (let i = 1; i <= 20; i++) {
  NEW_ITEMS.push({ id: "new-" + i, name: "منتج جديد", price: 0, oldPrice: 0, image: "" });
}

/* ====== صفحة بوكسات آثر — 20 منتجًا مرقّماً من 1 إلى 20 ======
   الصور مضافة بترتيب ملفات مجلد "بوكسات آثر" (من 1 إلى 20).
   عدّل لاحقًا: name (الاسم)، price (السعر الحالي)، oldPrice (السعر القديم).
   لا تُضاف هذه المنتجات إلى أقسام التصنيفات — قائمة مستقلة تمامًا. */
const OFFERS = [];
(function () {
  var boxImages = [
    "1 (2).jpeg",
    "1 (3).jpeg",
    "1 (4).jpeg",
    "1 (5).jpeg",
    "1 (6).jpeg",
    "1 (7).jpeg",
    "1.jpeg",
    "12.jpeg",
    "13.jpeg",
    "15 (2).jpeg",
    "15 (3).jpeg",
    "15.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "8.jpeg",
    "9.jpeg",
    "IMG_5099.jpeg",
    "IMG_5201.jpeg"
  ];
  var boxPrices = [
    { price: 699,  oldPrice: 800  },
    { price: 999,  oldPrice: 1300 },
    { price: 799,  oldPrice: 1000 },
    { price: 899,  oldPrice: 1200 },
    { price: 1600, oldPrice: 1900 },
    { price: 899,  oldPrice: 1100 },
    { price: 699,  oldPrice: 800  },
    { price: 1100, oldPrice: 1300 },
    { price: 799,  oldPrice: 1100 },
    { price: 999,  oldPrice: 1400 },
    { price: 999,  oldPrice: 1300 },
    { price: 1499, oldPrice: 1900 },
    { price: 699,  oldPrice: 1000 },
    { price: 899,  oldPrice: 1100 },
    { price: 699,  oldPrice: 850  },
    { price: 699,  oldPrice: 850  },
    { price: 899,  oldPrice: 1100 },
    { price: 750,  oldPrice: 900  },
    { price: 1100, oldPrice: 1400 },
    { price: 699,  oldPrice: 850  }
  ];
  for (var i = 0; i < 20; i++) {
    OFFERS.push({ id: "offer-" + (i + 1), name: "", price: boxPrices[i].price, oldPrice: boxPrices[i].oldPrice, image: boxImages[i], folder: "بوكسات آثر" });
  }
})();
