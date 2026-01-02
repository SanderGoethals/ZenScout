import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { FormInputProps } from "./ui.types";

const InputForm: FC<FormInputProps> = ({
  containerStyle,
  inputStyle,
  multiline = false,
  error,
  isPassword = false,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const secure = isPassword && !visible;
  const showError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      <BlurView
        intensity={60}
        tint="light"
        style={[
          styles.inputWrapper,
          isFocused && styles.focused,
          showError && styles.error,
        ]}
      >
        <TextInput
          {...props}
          style={[
            styles.input,
            multiline && styles.multiline,
            isPassword && styles.passwordPadding,
            inputStyle,
          ]}
          placeholderTextColor="rgba(47, 94, 96, 0.6)"
          multiline={multiline}
          secureTextEntry={secure}
          textAlignVertical={multiline ? "top" : "center"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(v => !v)}
            style={styles.iconWrapper}
            hitSlop={8}
          >
            <MaterialCommunityIcons
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={
                showError
                  ? "#C46A6A"
                  : isFocused
                  ? "#4FA6A8"
                  : "#4F8F91"
              }
            />
          </TouchableOpacity>
        )}
      </BlurView>
    </View>
  );
};

export default InputForm;


const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",

    backgroundColor: "rgba(180, 225, 230, 0.28)",
    borderRadius: 18,

    borderWidth: 1,
    borderColor: "rgba(140, 200, 205, 0.35)",

    shadowColor: "rgba(180, 225, 230, 0.5)",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },

    elevation: 4,
    overflow: "hidden",
  },

  focused: {
    backgroundColor: "rgba(200, 235, 240, 0.4)",
    borderColor: "rgba(90, 170, 175, 0.8)",
    shadowOpacity: 0.28,
  },

  error: {
    backgroundColor: "rgba(255, 220, 220, 0.7)",
    borderColor: "rgba(200, 100, 100, 0.7)",
    shadowColor: "rgba(255, 150, 150, 0.7)",
  },

  input: {
    height: 54,
    paddingHorizontal: 18,
    fontSize: 15,
    color: "#2F3E3E",
    backgroundColor: "transparent",
  },

  passwordPadding: {
    paddingRight: 52,
  },

  multiline: {
    paddingVertical: 14,
    height: 140,
  },
  iconWrapper: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
