import React from "react";
import { Text, StyleSheet } from "react-native";

interface TitleTextMarkupProps {
  children: string;
  size?: number;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: "normal" | "500" | "600" | "700" | "bold";
  marginBottom?: number;
}

const TitleTextMarkup: React.FC<TitleTextMarkupProps> = ({
  children,
  size = 24,
  color = "#1A1A1A",
  align = "left",
  weight = "700",
  marginBottom = 12,
}) => {
  return (
    <Text
      style={[
        styles.title,
        {
          fontSize: size,
          color,
          textAlign: align,
          fontWeight: weight,
          marginBottom,
        },
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: 0.3,
  },
});

export default TitleTextMarkup;
