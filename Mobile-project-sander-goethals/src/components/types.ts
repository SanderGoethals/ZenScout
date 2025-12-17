import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CategoryKey } from "../theme/categories";

export interface SocialIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap; // icoonnaam
  color: string;
  url?: string;
  bgColor?: string;
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

export interface CardProps {
  data: any;                        
  index: number;                    
  isFavorite: boolean;              
  onPress: (item: any) => void;     
  category: CategoryKey;
  children?: React.ReactNode;       
}

export interface DetailProps {
  data: any;                       
  isFavorite: boolean;             
  onToggleFavorite: (item: any) => void; 
  evenColor: string;               
  oddColor: string;                
  ratingDetails?: RatingDetailsProps;                 
}

export interface RatingDetailsProps {
  data: SpaBase;
  evenColor: string;
  oddColor: string;
}