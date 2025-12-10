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

export interface DetailProps {
  data: any;                       
  isFavorite: boolean;             
  onToggleFavorite: (item: any) => void; 
  evenColor: string;               
  oddColor: string;                
}

export interface CardProps {
  item: any;                        
  index: number;                    
  isFavorite: boolean;              
  onPress: (item: any) => void;     
  evenColor: string;                
  oddColor: string;                 
  children?: React.ReactNode;       
}