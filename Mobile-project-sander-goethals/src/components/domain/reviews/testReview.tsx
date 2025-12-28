import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../../../config/firebase";
import { createReview } from "../../../services/reviews.service";
import InputForm from "../../InputForm";

const TEST_SPA_ID = "850";

const ReviewTestScreen = () => {
  const user = auth.currentUser;

  const [comment, setComment] = useState("");
  const [score, setScore] = useState("5");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    try {
      setLoading(true);

      await createReview({
        spaId: TEST_SPA_ID,
        comment,
        rating: Number(score),
      });

      Alert.alert("Success", "Review created successfully");

      setComment("");
      setScore("5");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Test Screen</Text>

      <Text>UID:</Text>
      <Text selectable style={styles.mono}>
        {user?.uid}
      </Text>

      <InputForm
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />

      <InputForm
        placeholder="Score (1-5)"
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={loading ? "Saving..." : "Create Review"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default ReviewTestScreen;

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
  mono: {
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 16,
  },
});
