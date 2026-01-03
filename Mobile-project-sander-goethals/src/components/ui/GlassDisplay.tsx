import React, { FC } from "react";
import { StyleSheet, View, ScrollView, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { GlassDisplayProps } from "../ui/ui.types";
import TextMarkup from "./TextMarkup";

const GlassDisplay: FC<GlassDisplayProps> = ({
  title,
  subtitle,
  content,
  containerStyle,
  children,
  scrollable = false,
  scrollHeight,
}) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <View style={[styles.container, containerStyle]}>
      <BlurView intensity={60} tint="prominent" style={styles.wrapper}>
        {children && (
          <ContentWrapper
            style={scrollHeight ? { height: scrollHeight } : undefined}
            showsVerticalScrollIndicator={scrollable}
            nestedScrollEnabled={scrollable}
          >
            {children}
          </ContentWrapper>
        )}
      </BlurView>
    </View>
  );
};

export default GlassDisplay;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },

  wrapper: {
    backgroundColor: "rgba(180, 225, 230, 0.6)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(140, 200, 205)",
    padding: 18,
    shadowColor: "rgba(180, 225, 230, 0.5)",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    overflow: "hidden",
  },
});
