import React, { FC } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import TextMarkup from "../ui/TextMarkup";
import { GlassButtonProps } from "./ui.types";


const GlassButton: FC<GlassButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  useBlur = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const Content = (
    <>
      {loading ? (
        <ActivityIndicator color="#2F3E3E" />
      ) : (
        <TextMarkup
          variant="boldItalic"
          style={[styles.text, textStyle]}
        >
          {title}
        </TextMarkup>
      )}
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {useBlur ? (
        <BlurView
          intensity={45}
          tint="light"
          style={styles.blurContainer}
        >
          {Content}
        </BlurView>
      ) : (
        Content
      )}
    </TouchableOpacity>
  );
};

export default GlassButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 20,

    backgroundColor: "rgba(120, 190, 195, 0.45)",

    borderWidth: 1,
    borderColor: "rgba(120, 190, 225, 0.6)",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "rgba(120, 190, 225, 0.6)",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },

    elevation: 6,
  },

  blurContainer: {
    width: "100%",
    alignItems: "center",
  },

  text: {
    fontSize: 30,
    letterSpacing: 1,
    color: "#1F3E40",
  },

  disabled: {
    opacity: 0.6,
  },
});
