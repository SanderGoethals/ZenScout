import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RatingStarsProps } from "./types";

const RatingStars: FC<RatingStarsProps> = ({
  score,
  size = 30,
  color = "#FFD700",
}) => {

  // Score 0–10 omzetten naar 0–5
  const stars = score / 2;

  const fullStars = Math.floor(stars);       // volledige sterren
  const halfStar = stars % 1 >= 0.5;         // boolean
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: "row" }}>
      {/* Volledige sterren */}
      {[...Array(fullStars)].map((_, i) => (
        <MaterialCommunityIcons
          key={`full-${i}`}
          name="star"
          size={size}
          color={color}
        />
      ))}

      {/* Halve ster */}
      {halfStar && (
        <MaterialCommunityIcons
          name="star-half-full"
          size={size}
          color={color}
        />
      )}

      {/* Lege sterren */}
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
