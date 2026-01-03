import React, { FC } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RatingStarsProps } from "./ui.types";

const RatingStars: FC<RatingStarsProps> = ({
  score,
  size = 30,
  color = "#FFD700",
}) => {
  // Sanitize input
  const safeScore = Number.isFinite(score) ? score : 0;
  
  const stars = safeScore / 2;
  
  // Derive star counts safely
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = Math.max(0, 5 - fullStars - halfStar);

  return (
    <View style={{ flexDirection: "row" }}>
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
