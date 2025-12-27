import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import InputForm from "../../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProps } from "../../navigators/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import TitleMarkup from "../../components/TitleMarkup";
import { getCategoryColor } from "../../theme/categoryHelpers";
import { loginValidationSchema } from "../../validation/validation";


const LoginScreen = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const navigate = useNavigation<AuthStackNavProps<"login">["navigation"]>();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: getCategoryColor("login", "backgroundColor") }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welkom terug</Text>
        <Text style={styles.subtitle}>
          Ontspan en geniet van jouw wellnessmoment
        </Text>

        <InputForm
          placeholder="E-mailadres"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          error={formik.touched.email ? formik.errors.email : undefined}
        />

        <InputForm
          placeholder="Wachtwoord"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          secureTextEntry
          error={formik.touched.password ? formik.errors.password : undefined}
          isPassword
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: getCategoryColor("login", "buttonColor") }]}
          onPress={() => formik.handleSubmit()}
        >
          <TitleMarkup>Inloggen</TitleMarkup>
        </TouchableOpacity>

        {/* TODO: Forgot password functionality */}
        <TouchableOpacity style={styles.linkButton}>
          <TitleMarkup>Wachtwoord vergeten?</TitleMarkup>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <TitleMarkup>Nog geen account?</TitleMarkup>
          <TouchableOpacity
            onPress={() => navigate.replace("register")}
          >
            <TitleMarkup> Registreer hier</TitleMarkup>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#3A2F28",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#7A6E66",
    marginBottom: 36,
  },
  primaryButton: {
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
