import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { TextMarkupProps } from './ui.types'

const TextMarkup = ({
  variant = 'semiBold',
  style,
  children,
  ...rest
}: TextMarkupProps) => {
  return (
    <Text
      {...rest}
      style={[styles[variant], style]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  semiBold: { fontFamily: 'Playfair-SemiBold' },
  semiBoldItalic: { fontFamily: 'Playfair-SemiBoldItalic' },
  boldItalic: { fontFamily: 'Playfair-BoldItalic' },
  extraBold: { fontFamily: 'Playfair-ExtraBold' },
  blackItalic: { fontFamily: 'Playfair-BlackItalic' },
})

export default TextMarkup
