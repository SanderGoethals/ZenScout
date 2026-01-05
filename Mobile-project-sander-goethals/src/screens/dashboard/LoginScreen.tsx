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

import { AuthStackNavProps } from "../../navigators/navigation.types";
import { loginValidationSchema } from "../../validation/validation";
import { loginUser } from "../../services/auth.service";
import GlassButton from "../../components/ui/GlassButton";

const LoginScreen = () => {
  const navigate =
    useNavigation<AuthStackNavProps<"login">["navigation"]>();

  const [authError, setAuthError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setAuthError(null);
      try {
        await loginUser({
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        setAuthError(
          "Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord."
        );
        console.error("Login error:", error);
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
          <TextMarkup style={styles.title}>Welkom terug</TextMarkup>
          <TextMarkup style={styles.subtitle}>
            Ontspan en vind jouw wellnessmoment
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

          <GlassButton
            title="Inloggen"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
          />

          <TouchableOpacity style={styles.linkButton}>
            <TextMarkup>Wachtwoord vergeten?</TextMarkup>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <TextMarkup style={{ fontSize: 18 }}>
              Nog geen account?
            </TextMarkup>
            <TouchableOpacity
              onPress={() => navigate.replace("register")}
            >
              <TextMarkup
                variant="boldItalic"
                style={{ color: "#6BA8A9", fontSize: 20 }}
              >
                {" "}
                Registreer hier
              </TextMarkup>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#7A6E66",
    marginBottom: 36,
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
  error: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    color: "#B45309",
  },
});
