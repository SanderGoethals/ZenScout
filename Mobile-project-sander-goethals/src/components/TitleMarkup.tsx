import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'

const TitleMarkup = (props: TextProps) => {
  return (
      <Text style={[styles.TitleText, props.style]}
      >{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  TitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  }
})

export default TitleMarkup