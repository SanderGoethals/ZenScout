import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface SocialIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap; // icoonnaam
  color: string;
  url?: string;
}

export interface RatingStarsProps {
  score: number;      
  size?: number;      
  color?: string;     
}

export interface ImageCarouselProps {
  images: { src: string; alt?: string }[];
  height?: number;
}