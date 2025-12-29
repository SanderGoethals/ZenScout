import { StyleSheet, Text, TextProps } from 'react-native';
import React from 'react';

const TitleMarkup = ({ style, children, ...rest }: TextProps) => {
  return (
    <Text
      style={[styles.titleText, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'BBHBartle',
  },
});

export default TitleMarkup;
