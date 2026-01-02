// ReviewTestScreen.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { createReview } from "../../../services/reviews.service";
import InputForm from "../../ui/InputForm";
import GlassButton from "../../ui/GlassButton";
import { Formik } from "formik";
import { reviewValidationSchema} from "../../../validation/validation";

const TEST_SPA_ID = "850";

const AddReview = ({ onClose }: { onClose?: () => void }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ comment: "", score: "" }}
      validationSchema={reviewValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setLoading(true);

          await createReview({
            spaId: TEST_SPA_ID,
            comment: values.comment,
            rating: Number(values.score),
          });

          Alert.alert("Success", "Review created successfully");
          resetForm();
          onClose?.();
        } catch (error) {
          Alert.alert("Error", "Failed to create review");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({        
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Review schrijven</Text>

          {touched.comment && errors.comment && (
            <Text style={styles.error}>{errors.comment}</Text>
          )} 
          <InputForm
            autoCapitalize="sentences"
            placeholder="Comment"
            multiline
            value={values.comment}
            onChangeText={handleChange("comment")}
            style={styles.input}
            error={errors.comment}
          />
          
          {touched.score && errors.score && (
            <Text style={styles.error}>{errors.score}</Text>
          )}
          <InputForm
            placeholder="Score (1-10)"
            value={values.score}
            onChangeText={handleChange("score")}
            keyboardType="numeric"
            style={styles.input}
            error={errors.score}
          />


          <GlassButton
            title={isSubmitting ? "Saving..." : "Verstuur review"}
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      )}
    </Formik>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
    error: {
    color: "#DC2626",
    marginBottom: 4,
    fontSize: 13,
  },
});
