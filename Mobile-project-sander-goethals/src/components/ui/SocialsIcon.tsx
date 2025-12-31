import React, { FC, useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SocialIconProps } from "./ui.types";


const SocialIcon: FC<SocialIconProps> = ({ name, color, url, bgColor }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const open = () => {
    if (url) Linking.openURL(url);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={open}
    >
      <Animated.View style={[styles.iconShadow, { transform: [{ scale }], backgroundColor: bgColor }]}>
        <MaterialCommunityIcons name={name} size={60} color={color} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconShadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 999,
  },
});

export default SocialIcon;