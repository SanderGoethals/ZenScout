import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import TextMarkup from "../ui/TextMarkup";

import { OPTIONS } from "../../constants/radiusOptions";
import { RadiusSelectorProps } from "./ui.types";

const RadiusSelector = ({
  radiusKm,
  onChange,
}: RadiusSelectorProps) => {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isActive = option.value === radiusKm;

        return (
          <Pressable
            key={option.label}
            onPress={() => onChange(option.value)}
            style={[
              styles.chip,
              isActive && styles.activeChip,
            ]}
          >
            <TextMarkup
              variant={isActive ? "extraBold" : "semiBold"}
              style={isActive && styles.activeText}
            >
              {option.label}
            </TextMarkup>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadiusSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#E6EAEA",
  },
  activeChip: {
    backgroundColor: "#2F3E3E",
  },
  activeText: {
    color: "#FFFFFF",
  },
});
