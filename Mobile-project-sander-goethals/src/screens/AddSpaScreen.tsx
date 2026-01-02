import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";

import InputForm from "../components/ui/InputForm";
import TextMarkup from "../components/ui/TextMarkup";
import { addSpaValidationSchema } from "../validation/validation";
import { Formik } from "formik";

const AddWellnessScreen = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!name || !location || !description) {
      Alert.alert("Fout", "Gelieve alle velden in te vullen.");
      return;
    }

    await MailComposer.composeAsync({
      recipients: ["sander.goethals2@student.hogent.be"],
      subject: "Nieuwe wellness voorgesteld",
      body: `
      Naam: ${name}
      Locatie: ${location}

      Beschrijving:
      ${description}
      `,
    });
  };

return (
    <ImageBackground
      source={require("../../assets/ZenScout_SplashPage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TextMarkup style={styles.title}>
            Niet de spa gevonden die je zoekt?{"\n"}
            Laat het ons weten en na verificatie krijg jij een korting op jouw
            volgende bezoek!
          </TextMarkup>

          <Formik
            initialValues={{
              name: "",
              location: "",
              description: "",
            }}
            validationSchema={addSpaValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <View style={styles.profileCard}>
                {touched.name && errors.name && (
                  <TextMarkup style={styles.error}>
                    {errors.name}
                  </TextMarkup>
                )}
                <InputForm
                  placeholder="Naam van de wellness"
                  autoCapitalize="words"
                  returnKeyType="next"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={errors.name}
                />

                {touched.location && errors.location && (
                  <TextMarkup style={styles.error}>
                    {errors.location}
                  </TextMarkup>
                )}
                <InputForm
                  placeholder="Locatie"
                  autoCapitalize="words"
                  returnKeyType="next"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  error={errors.location}
                />

                {touched.description && errors.description && (
                  <TextMarkup style={styles.error}>
                    {errors.description}
                  </TextMarkup>
                )}
                <InputForm
                  placeholder="Beschrijving"
                  inputStyle={{ height: 100, textAlignVertical: "top" }}
                  returnKeyType="done"
                  autoCapitalize="sentences"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  multiline
                  error={errors.description}
                />

                <Pressable
                  style={styles.button}
                  onPress={() => {
                    if (Object.keys(errors).length > 0) {
                      Alert.alert(
                        "Fout",
                        "Controleer de ingevoerde velden."
                      );
                      return;
                    }
                    handleSubmit();
                  }}
                >
                  <Text style={styles.buttonText}>
                    Verstuur voorstel
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddWellnessScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    paddingTop: 32,
    paddingBottom: 48,
  },

  title: {
    fontSize: 26,
    paddingTop: 60,
    marginHorizontal: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#2F3E3E",
  },

  profileCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,

    backgroundColor: "rgba(140, 200, 225, 0.55)",
    borderRadius: 24,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.45)",

    shadowColor: "#6BA8A9",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },

    elevation: 4,
  },

  button: {
    marginTop: 30,
    backgroundColor: "rgba(46, 125, 107, 0.75)",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    color: "#B45309",
  },
});
