import { TextInputProps, StyleProp } from 'react-native'
import { ViewStyle, TextStyle } from 'react-native'

export interface FormInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>   // styling van wrapper View
  inputStyle?: StyleProp<TextStyle>       // styling van TextInput
  error?: string
  isPassword?: boolean;
}