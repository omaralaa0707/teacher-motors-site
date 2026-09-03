import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Teacher Motors call themselves a lending centre, not a dealership, and
 * their captions are built almost entirely from a finance line repeated
 * across ten posts and a scale (1M followers) no other site in this series
 * is within two orders of magnitude of. The shared schema has no vocabulary
 * for either.
 */
export type TeacherContent = SiteContent & {
  hero: SiteContent["hero"] & {
    audienceAlt: string;
    followersLabel: string;
    postsLabel: string;
    followingLabel: string;
    scaleLine: string;
    scaleHint: string;
    followersOf: string;
  };
  offers: {
    eyebrow: string;
    heading: string;
    intro: string;
    zeroTag: string;
    otherTag: string;
    noneTag: string;
    depositLabel: string;
    termLabel: string;
    viewPost: string;
    exception: string;
  };
  figures: {
    eyebrow: string;
    heading: string;
    intro: string;
    note: string;
    specLabels: Record<
      | "platform"
      | "engine"
      | "power"
      | "torque"
      | "acceleration"
      | "transmission"
      | "year"
      | "mileage"
      | "rangeEpa"
      | "rangeWltp"
      | "towing",
      string
    >;
  };
  numbers: {
    eyebrow: string;
    heading: string;
    intro: string;
    postsSuffix: string;
    note: string;
  };
  contact: SiteContent["contact"] & {
    landlineLabel: string;
    landline: string;
    emailLabel: string;
    email: string;
    siteLabel: string;
  };
};

export function useTeacher() {
  return useContent() as TeacherContent;
}
