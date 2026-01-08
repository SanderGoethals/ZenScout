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
  blackItalic: { fontFamily: 'Playfair-BlackItalic' },
  boldItalic: { fontFamily: 'Playfair-BoldItalic' },
  extraBold: { fontFamily: 'Playfair-ExtraBold' },
  semiBold: { fontFamily: 'Playfair-SemiBold' },
  semiBoldItalic: { fontFamily: 'Playfair-SemiBoldItalic' },
})

export default TextMarkup
