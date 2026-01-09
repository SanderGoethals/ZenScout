import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

import TextMarkup from "../../ui/TextMarkup";
import {
  SpaCategory,
  CATEGORY_COLLECTION_MAP,
} from "../../../constants/categories";
import { PROVINCES } from "../../../constants/provinces";

const ALL_PROVINCES = "ALL";
interface SpaFiltersProps {
  category: SpaCategory;
  province?: string;
  onCategoryChange: (category: SpaCategory) => void;
  onProvinceChange: (province?: string) => void;
}

const SpaFilters = ({
  category,
  province,
  onCategoryChange,
  onProvinceChange,
}: SpaFiltersProps) => {
  return (
    <View style={styles.container}>
      {/* Categorie buttons */}
      <View style={styles.categoryRow}>
        {Object.entries(CATEGORY_COLLECTION_MAP).map(([key, label]) => {
          const isActive = key === category;

          return (
            <Pressable
              key={key}
              onPress={() => onCategoryChange(key as SpaCategory)}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
            >
              <TextMarkup
                variant={isActive ? "extraBold" : "semiBold"}
                style={isActive && styles.categoryTextActive}
              >
                {label}
              </TextMarkup>
            </Pressable>
          );
        })}
      </View>

      {/* Provincie picker */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={province ?? ALL_PROVINCES}
          onValueChange={(value) =>
            onProvinceChange(value === ALL_PROVINCES ? undefined : value)
          }
        >
          <Picker.Item
            label="Alle provincies"
            value={ALL_PROVINCES}
          />
          {PROVINCES.map((p) => (
            <Picker.Item key={p} label={p} value={p} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SpaFilters;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#E6EAEA",
  },
  categoryChipActive: {
    backgroundColor: "#2F3E3E",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
  },
});
