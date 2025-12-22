import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CategoryKey } from "../theme/categories";
import { TextInputProps, StyleProp } from 'react-native'
import { ViewStyle, TextStyle } from 'react-native'

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
  rounded?: boolean;
  height: number;
}

export interface FavoriteCarouselProps {
  favorites: SpaBase[];
};

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
  category: CategoryKey;          
  ratingDetails?: RatingDetailsProps;                 
}

export interface RatingDetailsProps {
  data: SpaBase;
  evenColor: string;
  oddColor: string;
}

export interface FacilityItemProps {
  facilities: string[];
}

export interface FacilitiesCollapsibleProps {
  facilities: string[]
  collapsedHeight?: number
  title?: string
  bgColor: string
}

export interface FormInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>   // styling van wrapper View
  inputStyle?: StyleProp<TextStyle>       // styling van TextInput
}