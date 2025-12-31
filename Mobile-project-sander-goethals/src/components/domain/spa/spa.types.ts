import { CategoryKey } from "../../../theme/categories";

export interface FavoriteCarouselProps {
  favorites: SpaBase[];
};

export interface CardProps {
  data: any;                        
  index: number;                    
  isFavorite: boolean;              
  onPress: (item: any) => void;     
  category: CategoryKey;  
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

export interface FacilitiesViewProps {
  facilities: string[]
}

export interface FacilitiesCollapsibleProps {
  facilities: string[]
  collapsedHeight?: number
  title?: string
  bgColor: string
}
