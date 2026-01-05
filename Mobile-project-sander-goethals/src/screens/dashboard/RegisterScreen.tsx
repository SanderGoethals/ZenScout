import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import InputForm from "../../components/ui/InputForm";
import TextMarkup from "../../components/ui/TextMarkup";
import GlassButton from "../../components/ui/GlassButton";

import { AuthStackNavProps } from "../../navigators/navigation.types";
import { registerValidationSchema } from "../../validation/validation";
import { registerUser } from "../../services/auth.service";

const RegisterScreen = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const navigate =
    useNavigation<AuthStackNavProps<"register">["navigation"]>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    // validateOnMount: true,
   onSubmit: async (values) => {
      setAuthError(null);
      try {
        await registerUser({
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        setAuthError(
          "Registreren mislukt. Controleer je gegevens of probeer later opnieuw."
        );
        console.error("Registratiefout:", error);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../../assets/ZenScout_SplashPage.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          <TextMarkup style={styles.title}>
            Registreren
          </TextMarkup>

          <TextMarkup style={styles.subtitle}>
            Maak een account aan en begin je wellnesservaring
          </TextMarkup>
          
          {authError && (
            <TextMarkup style={styles.error}>
              {authError}
            </TextMarkup>
          )}

          {formik.touched.email && formik.errors.email && (
            <TextMarkup style={styles.error}>
              {formik.errors.email}
            </TextMarkup>
          )}
          <InputForm
            placeholder="E-mailadres"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            error={
              formik.touched.email
                ? formik.errors.email
                : undefined
            }
          />

          {formik.touched.password && formik.errors.password && (
            <TextMarkup style={styles.error}>
              {formik.errors.password}
            </TextMarkup>
          )}
          <InputForm
            placeholder="Wachtwoord"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            isPassword
            error={
              formik.touched.password
                ? formik.errors.password
                : undefined
            }
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <TextMarkup style={styles.error}>
              {formik.errors.confirmPassword}
            </TextMarkup>
          )}
          <InputForm
            placeholder="Bevestig wachtwoord"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            isPassword
            error={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />

          <GlassButton
            title="Registreren"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            // disabled={!formik.isValid}
          />

          <View style={styles.footer}>
            <TextMarkup style={styles.footerText}>
              Heb je al een account?
            </TextMarkup>
            <TouchableOpacity
              onPress={() => navigate.replace("login")}
            >
              <TextMarkup
                variant="boldItalic"
                style={styles.footerLink}
              >
                {" "}Log hier in
              </TextMarkup>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
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
  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerText: {
    fontSize: 18,
    color: "#3A2F28",
  },
  footerLink: {
    fontSize: 20,
    color: "#6BA8A9",
  },
    error: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    color: "#B45309",
  },
});
