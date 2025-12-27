import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputForm from "../../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProps } from "../../navigators/types";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getCategoryColor } from "../../theme/categoryHelpers";
import TitleMarkup from "../../components/TitleMarkup";

const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geef een geldig email adres in")
    .required("Email is verplicht"),
  password: Yup.string()
    .min(6, "Wachtwoord moet minstens 6 karakters bevatten")
    .required("Wachtwoord is verplicht"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Wachtwoorden komen niet overeen")
    .required("Bevestig je wachtwoord"),
});

const RegisterScreen = () => {
  const navigate = useNavigation<AuthStackNavProps<"register">["navigation"]>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
          email: values.email,
          nickname: values.email.split("@")[0],
          firstName: "",
          lastName: "",
          phoneNumber: "",
          birthDate: null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        
        navigate.replace("login");
      } catch (error) {
        console.log("Registratiefout:", error);
      }
    },
  });
  

  return (
  <KeyboardAvoidingView
    style={[styles.container, { backgroundColor: getCategoryColor("login", "backgroundColor") }]}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.innerContainer}>
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
          error={formik.touched.email ? formik.errors.email : undefined}
        />
      </View>

      <View style={styles.field}>
        <TitleMarkup style={styles.label}>Wachtwoord</TitleMarkup>
        <InputForm
          placeholder="Geef je wachtwoord in"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          secureTextEntry
          error={formik.touched.password ? formik.errors.password : undefined}
        />
      </View>

      <View style={styles.field}>
        <TitleMarkup style={styles.label}>Bevestig wachtwoord</TitleMarkup>
        <InputForm
          placeholder="Bevestig je wachtwoord"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          secureTextEntry
          error={
            formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : undefined
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: getCategoryColor("login", "buttonColor") }]}
        onPress={() => { formik.handleSubmit(); }}
      >
        <TitleMarkup style={styles.primaryButtonText}>Registreren</TitleMarkup>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TitleMarkup style={styles.footerText}>Heb je al een account?</TitleMarkup>
        <TouchableOpacity onPress={() => navigate.replace("login")}>
          <TitleMarkup style={styles.footerLink}> Log hier in</TitleMarkup>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "center",
    paddingHorizontal: 28,
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
});
