import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormInputProps } from "./types";

const InputForm: FC<FormInputProps> = ({
  containerStyle,
  inputStyle,
  multiline = false,
  error,
  isPassword = false,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const secure = isPassword && !visible;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
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
              color="#4F8F91"
            />
          </TouchableOpacity>
        )}
      </View>
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

    backgroundColor: "rgba(180, 225, 230, 0.35)",
    borderRadius: 18,

    borderWidth: 1,
    borderColor: "rgba(140, 200, 205, 0.45)",
    shadowColor: "#6BA8A9",
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },

    elevation: 4,
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
    minHeight: 120,
    paddingVertical: 14,
  },

  iconWrapper: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
