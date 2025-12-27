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
              color="#7A6E66"
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
    padding: 16,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  passwordPadding: {
    paddingRight: 44,
  },
  multiline: {
    minHeight: 120,
    paddingVertical: 12,
  },
  iconWrapper: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
