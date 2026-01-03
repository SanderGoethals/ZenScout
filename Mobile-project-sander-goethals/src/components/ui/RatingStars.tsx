import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RatingStarsProps } from "./ui.types";

const RatingStars: FC<RatingStarsProps> = ({
  score,
  size = 30,
  color = "#FFD700",
  withBackground = false,
}) => {
  const safeScore = Number.isFinite(score) ? score : 0;
  const stars = safeScore / 2;

  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = Math.max(0, 5 - fullStars - halfStar);

  return (
    <View
      style={[
        styles.row,
        withBackground && styles.background,
      ]}
    >
      {[...Array(fullStars)].map((_, i) => (
        <MaterialCommunityIcons
          key={`full-${i}`}
          name="star"
          size={size}
          color={color}
        />
      ))}

      {halfStar === 1 && (
        <MaterialCommunityIcons
          name="star-half-full"
          size={size}
          color={color}
        />
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color={color}
        />
      ))}
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.14)",
  },
});
