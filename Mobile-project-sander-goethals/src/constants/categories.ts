export type SpaCategory =
  | "wellness"
  | "publicSauna"
  | "privateSauna"
  | "massageBeauty";

export const CATEGORY_COLLECTION_MAP: Record<SpaCategory, string> = {
  wellness: "Wellness overnachting",
  publicSauna: "Publieke sauna",
  privateSauna: "Privé sauna",
  massageBeauty: "Beauty & Massage",
};