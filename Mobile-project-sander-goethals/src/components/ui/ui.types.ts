import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextProps } from "react-native";
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
  showThumbnails?: boolean;
  thumbnailHeight?: number;
}

export interface TextMarkupProps extends TextProps {
  variant?:  'semiBold' | 'semiBoldItalic' | 'boldItalic' | 'extraBold' | 'blackItalic'
}

export interface FormInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>   // styling van wrapper View
  inputStyle?: StyleProp<TextStyle>       // styling van TextInput
  error?: string
  isPassword?: boolean;
}

export interface GlassButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  useBlur?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};
