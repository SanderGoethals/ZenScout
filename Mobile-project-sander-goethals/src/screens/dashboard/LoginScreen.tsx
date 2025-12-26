import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputForm from "../../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProps } from "../../navigators/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})