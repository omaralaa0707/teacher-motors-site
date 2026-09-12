import type { TeacherContent } from "./schema-ext";
import { PROFILE } from "./media";

export const ar: TeacherContent = {
  locale: "ar",
  dir: "rtl",

  brand: {
    name: "تيتشر موتورز",
    shortName: "TM",
    tagline: "أسرع مركز تمويل سيارات نموًا في مصر",
  },

  nav: [
    { label: "العروض", href: "#offers" },
    { label: "الأرقام الفنية", href: "#figures" },
    { label: "أرقام التواصل", href: "#numbers" },
  ],

  hero: {
    eyebrow: "الشيخ زايد، الجيزة",
    headline: "مليون متابع لشركة تمويل تبيع السيارات أيضًا",
    sub: "تيتشر موتورز يصفون أنفسهم في بروفايلهم بمركز تمويل قبل أن يصفوا أنفسهم بمعرض سيارات. كل نقطة في الحقل أعلاه متابع واحد — مليون منهم، مرسومة نقطة نقطة، لأن رقمًا بهذا الحجم على صفحة لا يحمل معناه إلا بجوار حسابات أصغر منه.",
    primaryCta: "اتصل بتيتشر موتورز",
    secondaryCta: "شاهد العروض",
    audienceAlt: "حقل من مليون نقطة، نقطة لكل متابع على إنستغرام، يتضاءل للمقارنة بحسابين أصغر في هذه السلسلة.",
    followersLabel: "متابع",
    postsLabel: "منشور",
    followingLabel: "يتابع",
    scaleLine: "هذا يساوي ٤٥ ضعف متابعي K.auto وحوالي ٩٦٠٠ ضعف متابعي أوتو هَب إيجيبت — الحسابان الآخران في هذه السلسلة.",
    scaleHint: "اختر حسابًا لترى نصيبه الفعلي من هذا الحقل.",
    followersOf: "متابع",
  },

  about: {
    heading: "تيتشر موتورز",
    body: [PROFILE.introAr],
  },

  services: { heading: "العروض", items: [] },
  gallery: { heading: "العروض", items: [] },

  offers: {
    eyebrow: "العروض",
    heading: "عشرة منشورات، وما وعد به كل واحد فعليًا",
    intro:
      "ستة من آخر عشرة منشورات تحمل سطر تمويل. خمسة منها تقول الشيء نفسه — مقدم صفر، تقسيط حتى ٧ سنوات — على رولز رويس كولينان وجيب جراند شيروكي على حد سواء. السادس يقول شيئًا مختلفًا، وأربعة منشورات لا تحمل سطر تمويل إطلاقًا. لا شيء هنا سعر — فهم لا ينشرون أسعارًا في أي مكان.",
    zeroTag: "مقدم صفر · ٧ سنوات",
    otherTag: "شروط مختلفة",
    noneTag: "بلا سطر تمويل",
    depositLabel: "المقدم",
    termLabel: "المدة",
    viewPost: "شاهد المنشور",
    exception:
      "السيلفرادو هو المنشور الوحيد الذي يخالف النمط: مقدم ٣٠٪ بدلًا من الصفر، بنفس مدة السبع سنوات. كل سيارة أخرى ممولة في الحساب مقدمها صفر.",
  },

  figures: {
    eyebrow: "ما يقيسونه",
    heading: "السيارات التي أعطوها أرقامًا حقيقية",
    intro:
      "أغلب المنشورات لا تحمل أي مواصفات. ثلاثة فقط تحمل أرقامًا حقيقية — قوة وعزم وتسارع ومدى — وكل الثلاثة سيارات بلا سطر تمويل مرفق. حين يريد تيتشر موتورز بيع السيارة نفسها ينشرون أرقامها، وحين يريدون بيع الخطة ينشرون الخطة.",
    note: "هذا الاقتران منهم. وهذه الصفحة تضع النوعين من المنشورات جنبًا إلى جنب فقط.",
    specLabels: {
      platform: "المنصة",
      engine: "المحرك",
      power: "القوة",
      torque: "عزم الدوران",
      acceleration: "التسارع ٠–١٠٠",
      transmission: "ناقل الحركة",
      year: "السنة",
      mileage: "الممشى",
      rangeEpa: "المدى (EPA)",
      rangeWltp: "المدى (WLTP)",
      towing: "قدرة السحب",
    },
  },

  numbers: {
    eyebrow: "خمسة أرقام",
    heading: "كيف تصل إليهم فعليًا",
    intro:
      "رقم هاتف واحد يظهر في كل واحد من المنشورات العشرة المرصودة لهذه الصفحة. البقية تتناوب — لا يقل عن رقم واحد ولا يزيد عن أربعة — بالطريقة التي ينشر بها مركز اتصالات بنكًا من الخطوط لا مكتبًا واحدًا.",
    postsSuffix: "من ١٠ منشورات",
    note: "مرصودة فقط عبر العشرة منشورات المصدر لهذه الصفحة، لا كامل حسابهم.",
  },

  contact: {
    heading: "تواصل معهم",
    addressLabel: "العنوان",
    address: PROFILE.addressAr,
    phoneLabel: "اتصال",
    phones: [PROFILE.phone],
    landlineLabel: "أرضي",
    landline: PROFILE.landline,
    emailLabel: "بريد",
    email: PROFILE.email,
    siteLabel: "الموقع",
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "اتصل بتيتشر موتورز",
  },

  footer: {
    rights: "© تيتشر موتورز. كل الحقوق محفوظة.",
  },

  a11y: {
    toggleLanguage: "Switch to English",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
  },
};
