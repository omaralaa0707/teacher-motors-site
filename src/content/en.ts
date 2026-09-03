import type { TeacherContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: TeacherContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Teacher Motors",
    shortName: "TM",
    tagline: "Fastest Growing Automotive Lending Centre in Egypt",
  },

  nav: [
    { label: "The offers", href: "#offers" },
    { label: "The figures", href: "#figures" },
    { label: "The numbers", href: "#numbers" },
  ],

  hero: {
    eyebrow: "Sheikh Zayed, Giza",
    headline: "One million people follow a finance company that also sells cars",
    sub: "Teacher Motors call themselves a lending centre before they call themselves a dealership, and their own bio says so. Every point on the field above is a follower — a million of them, rendered one at a time, because a number this size on a page does not carry what it means next to the accounts around it.",
    primaryCta: "Call Teacher Motors",
    secondaryCta: "See the offers",
    audienceAlt:
      "A field of one million points, one per Instagram follower, thinning to a scale comparison against two smaller accounts in this series.",
    followersLabel: "Followers",
    postsLabel: "Posts",
    followingLabel: "Following",
    scaleLine: "That is 45× K.auto and roughly 9,600× Auto Hub Egypt — the other two accounts sourced for this series.",
    scaleHint: "Choose an account to see its actual share of this field.",
    followersOf: "followers",
  },

  about: {
    heading: "Teacher Motors",
    body: [PROFILE.intro],
  },

  services: { heading: "The offers", items: [] },
  gallery: { heading: "The offers", items: [] },

  offers: {
    eyebrow: "The offers",
    heading: "Ten posts, and what each one actually promised",
    intro:
      "Six of the last ten posts carry a finance line. Five say the same thing — 0% down, up to 7 years — on a Rolls-Royce Cullinan and a Jeep Grand Cherokee alike. The sixth says something different, and four posts carry no finance line at all. Nothing below is a price: they publish none, anywhere.",
    zeroTag: "0% down · 7 years",
    otherTag: "Different terms",
    noneTag: "No finance line",
    depositLabel: "Deposit",
    termLabel: "Term",
    viewPost: "See the post",
    exception:
      "The Silverado is the one post that breaks the pattern: 30% down rather than 0%, with the same seven-year term. Every other financed car on the account is zero down.",
  },

  figures: {
    eyebrow: "What they measure",
    heading: "The cars they give real numbers for",
    intro:
      "Most posts carry no specification at all. Three carry real ones — power, torque, acceleration, range — and all three are the cars with no finance line attached. When Teacher Motors want to sell the car itself, they publish figures; when they want to sell the plan, they publish the plan.",
    note: "The pairing is theirs. This page only lays the two kinds of post side by side.",
    specLabels: {
      platform: "Platform",
      engine: "Engine",
      power: "Power",
      torque: "Torque",
      acceleration: "0–100 km/h",
      transmission: "Transmission",
      year: "Year",
      mileage: "Mileage",
      rangeEpa: "Range (EPA)",
      rangeWltp: "Range (WLTP)",
      towing: "Towing capacity",
    },
  },

  numbers: {
    eyebrow: "Five numbers",
    heading: "How to actually reach them",
    intro:
      "One phone number appears on every one of the ten posts read for this page. The rest rotate — never fewer than one, never more than four — the way a call centre publishes a bank of lines rather than one desk.",
    postsSuffix: "of 10 posts",
    note: "Counted only across the ten posts sourced for this page, not their full account.",
  },

  contact: {
    heading: "Get in touch",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Call",
    phones: [PROFILE.phone],
    landlineLabel: "Landline",
    landline: PROFILE.landline,
    emailLabel: "Email",
    email: PROFILE.email,
    siteLabel: "Website",
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call Teacher Motors",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official Teacher Motors site, and not affiliated with them. All photography, marks and quoted copy belong to Teacher Motors.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
