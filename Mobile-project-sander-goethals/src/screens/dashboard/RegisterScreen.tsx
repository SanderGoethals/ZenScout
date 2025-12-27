import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import InputForm from "../../components/InputForm";
import TitleMarkup from "../../components/ui/TitleMarkup";

import { AuthStackNavProps } from "../../navigators/types";
import { getCategoryColor } from "../../theme/categoryHelpers";
import { registerValidationSchema } from "../../validation/validation";
import { registerUser } from "../../services/auth.service";

const RegisterScreen = () => {
  const navigate =
    useNavigation<AuthStackNavProps<"register">["navigation"]>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await registerUser({
          email: values.email,
          password: values.password,
        });

      } catch (error) {
        console.log("Registratiefout:", error);
      }
    },
  });

  const isDisabled = !formik.isValid;

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: getCategoryColor(
            "login",
            "backgroundColor"
          ),
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.innerContainer}>
        <TitleMarkup style={styles.title}>Registreren</TitleMarkup>
        <TitleMarkup style={styles.subtitle}>
          Maak een account aan en begin je wellnesservaring
        </TitleMarkup>

        <View style={styles.field}>
          <TitleMarkup style={styles.label}>E-mailadres</TitleMarkup>
          <InputForm
            placeholder="Geef je e-mailadres in"
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
        </View>

        <InputForm
          placeholder="Geef je wachtwoord in"
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

        {formik.touched.confirmPassword &&
          formik.errors.confirmPassword && (
            <TitleMarkup style={styles.errorText}>
              {formik.errors.confirmPassword}
            </TitleMarkup>
          )}

        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => formik.handleSubmit()}
          style={[
            styles.primaryButton,
            {
              backgroundColor: isDisabled
                ? getCategoryColor(
                    "login",
                    "disabledButtonColor"
                  )
                : getCategoryColor("login", "buttonColor"),
              opacity: isDisabled ? 0.6 : 1,
            },
          ]}
        >
          <TitleMarkup
            style={[
              styles.primaryButtonText,
              {
                color: isDisabled ? "#A0A0A0" : "#FFFFFF",
              },
            ]}
          >
            Registreren
          </TitleMarkup>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TitleMarkup style={styles.footerText}>
            Heb je al een account?
          </TitleMarkup>
          <TouchableOpacity
            onPress={() => navigate.replace("login")}
          >
            <TitleMarkup style={styles.footerLink}>
              Log hier in
            </TitleMarkup>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#3A2F28",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#7A6E66",
    marginBottom: 36,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#5E534A",
    marginBottom: 6,
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
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerText: {
    color: "#6F655D",
    fontSize: 14,
  },
  footerLink: {
    color: "#8B6F47",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    marginTop: 4,
    color: "#D9534F",
    fontSize: 12,
  },
});
