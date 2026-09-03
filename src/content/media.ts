/**
 * Teacher Motors have **one million** Instagram followers.
 *
 * No other business in this series is within two orders of magnitude of that,
 * and the reason is in their own Facebook bio: they do not call themselves a
 * dealership. They call themselves "the Fastest Growing Automotive Lending
 * Centre in Egypt". The finance is the product; the car is the advertisement.
 *
 * Which is exactly what the captions do. Five of the last ten carry the same
 * two lines — 0% down payment, instalments up to 7 years — attached to a Rolls
 * Royce Cullinan and to a Jeep Grand Cherokee alike. One carries 30% instead.
 * Four carry no finance line at all, and three of those four are the cars they
 * published real performance figures for.
 *
 * Nothing here is a price: they publish none, anywhere.
 */

export type CarId =
  | "brabus"
  | "cullinan"
  | "boxster"
  | "gle450"
  | "cherokee"
  | "cla200"
  | "silverado"
  | "modelx"
  | "velar-zero"
  | "velar";

/** What a caption actually promised about money. `null` = it said nothing. */
export type Offer = { deposit: string; term: string } | null;

export type Car = {
  id: CarId;
  marque: string;
  model: string;
  /** Their own headline words for it, verbatim. */
  billing?: string;
  offer: Offer;
  /** Figures they published, verbatim, in their order. */
  figures?: { label: string; value: string }[];
  /** Equipment they listed, verbatim. */
  kit?: string[];
  frames: string[];
  postUrl: string;
  /** Which of their numbers appeared on this post, in the posted order. */
  phones: string[];
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const f = (s: string, n = 3) => Array.from({ length: n }, (_, i) => `/media/${s}-${i + 1}.jpg`);

const ZERO: Offer = { deposit: "0%", term: "7 years" };

/** Newest first, as posted. */
export const CARS: Car[] = [
  {
    id: "brabus",
    marque: "Brabus",
    model: "930",
    billing: "1 OF 1 in Egypt",
    offer: null,
    figures: [
      { label: "platform", value: "Mercedes-Benz ///AMG S 63 S-E Performance" },
      { label: "engine", value: "V8 Bi-Turbo (Hybrid E-Motor)" },
      { label: "power", value: "930 HP" },
      { label: "torque", value: "1,510 N·m" },
      { label: "acceleration", value: "0–100 in 3.2 sec" },
      { label: "transmission", value: "9G-Tronic, all-wheel drive" },
    ],
    frames: f("brabus"),
    postUrl: post("DYhPeujCMeT"),
    phones: ["01148924070", "01004759207", "01061037530"],
  },
  {
    id: "cullinan",
    marque: "Rolls-Royce",
    model: "Cullinan",
    billing: "One of the most luxurious cars in the world",
    offer: ZERO,
    frames: f("cullinan", 1),
    postUrl: post("C_5Y43VIxIC"),
    phones: ["01148924070"],
  },
  {
    id: "boxster",
    marque: "Porsche",
    model: "718 Boxster",
    billing: "Brand new · Style Edition",
    offer: ZERO,
    kit: ["Exterior colour: Crayon", "Interior colour: red"],
    frames: f("boxster"),
    postUrl: post("Dci5aRwiCVI"),
    phones: ["01148924070", "01061037530", "01004759207", "01127854453"],
  },
  {
    id: "gle450",
    marque: "Mercedes-Benz",
    model: "GLE 450",
    offer: ZERO,
    frames: f("gle450"),
    postUrl: post("DcgBc3dCJE-"),
    phones: ["01148924070", "01004759207", "01127854453", "01061037530"],
  },
  {
    id: "cherokee",
    marque: "Jeep",
    model: "Grand Cherokee",
    offer: ZERO,
    figures: [
      { label: "year", value: "2024" },
      { label: "mileage", value: "38,000 km" },
    ],
    frames: f("cherokee"),
    postUrl: post("DcbLcWACAbe"),
    phones: ["01148924070", "01061037530", "01004759207"],
  },
  {
    id: "cla200",
    marque: "Mercedes-Benz",
    model: "CLA 200 AMG",
    billing: "Brand new · Special colour",
    offer: ZERO,
    kit: [
      "Night package",
      "Full memory package",
      "Heating seats",
      "Camera 360",
      "Panoramic sunroof",
    ],
    frames: f("cla200"),
    postUrl: post("DcWOMewiIh5"),
    phones: ["01148924070", "01004759207", "01061037530", "01127854453"],
  },
  {
    id: "silverado",
    marque: "Chevrolet",
    model: "Silverado",
    billing: "Elegance and strength of performance",
    // The exception. Every other financed car on the account is 0% down.
    offer: { deposit: "30%", term: "7 years" },
    frames: f("silverado"),
    postUrl: post("DcJHQhWiOCV"),
    phones: ["01148924070", "01092762502", "01061037530", "01127854453"],
  },
  {
    id: "modelx",
    marque: "Tesla",
    model: "Model X Plaid",
    offer: null,
    figures: [
      { label: "power", value: "1,020 hp" },
      { label: "acceleration", value: "0–100 in 2.5 sec" },
      { label: "rangeEpa", value: "540 km per full charge" },
      { label: "rangeWltp", value: "560–600 km" },
      { label: "towing", value: "2,250 kg" },
    ],
    frames: f("modelx"),
    postUrl: post("DcD2ggmCFE0"),
    phones: ["01148924070", "01004759207", "01061037530", "01127854453"],
  },
  {
    id: "velar-zero",
    marque: "Range Rover",
    model: "Velar Zero",
    offer: null,
    frames: f("velar-zero"),
    postUrl: post("Dbx6Hr1CJ4E"),
    phones: ["01148924070", "01004759207", "01127854453", "01061037530"],
  },
  {
    id: "velar",
    marque: "Range Rover",
    model: "Velar",
    offer: null,
    figures: [
      { label: "year", value: "MY 2025" },
      { label: "engine", value: "2,000 cc" },
      { label: "power", value: "250 hp" },
      { label: "torque", value: "365 N·m" },
    ],
    frames: f("velar"),
    postUrl: post("Dbsi-TnCCDO"),
    phones: ["01148924070", "01061037530", "01004759207", "01127854453"],
  },
];

export const FINANCED = CARS.filter((c) => c.offer !== null);
export const ZERO_DOWN = CARS.filter((c) => c.offer?.deposit === "0%");
export const NO_OFFER = CARS.filter((c) => c.offer === null);
export const WITH_FIGURES = CARS.filter((c) => c.figures && c.figures.length > 2);

/** Their five numbers, and how often each appeared across the ten posts. */
export const PHONES = (() => {
  const counts = new Map<string, number>();
  for (const car of CARS) for (const p of car.phones) counts.set(p, (counts.get(p) ?? 0) + 1);
  return [...counts.entries()]
    .map(([number, posts]) => ({ number, posts }))
    .sort((a, b) => b.posts - a.posts);
})();

/**
 * The scale comparison the hero field runs. Each is a follower count this
 * project has actually read off the account in question — nothing modelled.
 */
export const SCALE = [
  { id: "teacher", followers: 1_000_000, label: "Teacher Motors", figure: "1,000,000" },
  { id: "kauto", followers: 22_000, label: "K.auto", figure: "22,000" },
  { id: "autohub", followers: 104, label: "Auto Hub Egypt", figure: "104" },
] as const;

export const HERO_FRAME = "/media/brabus-1.jpg";

export const PROFILE = {
  instagram: "https://www.instagram.com/teachermotorss/",
  facebook: "https://www.facebook.com/TeacherMotors/",
  site: "https://teachermotor.com",
  maps: "https://www.google.com/maps/search/?api=1&query=Teacher+Motors+Cairo+Alexandria+Desert+Road+Sheikh+Zayed",
  /** The number on all ten posts. */
  phone: "01148924070",
  phoneHref: "tel:+201148924070",
  landline: "01011399095",
  email: "info@teachermotor.com",
  address: "Cairo–Alexandria Desert Road, Sheikh Zayed, Giza",
  addressAr: "طريق مصر إسكندرية الصحراوي، الشيخ زايد، الجيزة",
  /** Their own line, from the Facebook page's Intro. */
  intro:
    "Teacher Motors is the Fastest Growing Automotive Lending Centre in Egypt. We have thousands of new and used vehicles for you to choose from!",
  introAr:
    "تيتشر موتورز هو أسرع مركز تمويل سيارات نموًا في مصر. لدينا آلاف السيارات الجديدة والمستعملة لتختار من بينها!",
  igFollowers: 1_000_000,
  igFollowersLabel: "1M",
  igPosts: "442",
  igFollowing: "4",
  fbFollowers: "49K",
} as const;
