import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { useAppSelector } from "../../hooks/reduxHooks";

import InputForm from "../../components/ui/InputForm";
import TextMarkup from "../../components/ui/TextMarkup";
import FavoritesCarousel from "../../components/domain/spa/FavoritesCarousel";
import GlassButton from "../../components/ui/GlassButton";

import { auth, db } from "../../config/firebase";
import { signOut } from "@firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import ReviewsCarousel from "../../components/domain/reviews/ReviewsCarousel";

const ProfileScreen = () => {
  const favorites = useAppSelector((store) => store.favorites);

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [showChangeEmailWarning, setShowChangeEmailWarning] =
    useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setNickname(data.nickname ?? "");
          setName(data.firstName ?? "");
          setLastName(data.lastName ?? "");
          setEmail(data.email ?? "");
          setPhoneNumber(data.phoneNumber ?? "");
          setBirthday(
            data.birthDate
              ? data.birthDate
                  .toDate()
                  .toISOString()
                  .split("T")[0]
              : ""
          );
        }
      } catch (error) {
        console.error("Fout bij ophalen profiel:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const updateProfileField = async (
    updates: Record<string, any>
  ) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Fout bij opslaan profiel:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/ZenScout_SplashPage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <InputForm
            value={nickname}
            onChangeText={setNickname}
            onBlur={() => updateProfileField({ nickname })}
            placeholder="Nickname"
          />

          <InputForm
            placeholder="Naam"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            onBlur={() =>
              updateProfileField({ firstName: name })
            }
          />

          <InputForm
            placeholder="Achternaam"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
            onBlur={() =>
              updateProfileField({ lastName })
            }
          />

          <InputForm
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            editable={false}
            onFocus={() =>
              setShowChangeEmailWarning(true)
            }
            onBlur={() =>
              setShowChangeEmailWarning(false)
            }
          />

          {showChangeEmailWarning && (
            <TextMarkup style={styles.emailWarning}>
              ⚠️ Bij wijzigen van e-mail moet je
              opnieuw inloggen.
            </TextMarkup>
          )}

          <InputForm
            placeholder="Telefoonnummer"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onBlur={() =>
              updateProfileField({ phoneNumber })
            }
          />

          <InputForm
            placeholder="Geboortedatum (YYYY-MM-DD)"
            keyboardType="numeric"
            value={birthday}
            onChangeText={setBirthday}
            onBlur={() =>
              updateProfileField({
                birthDate: new Date(birthday),
              })
            }
          />
        </View>

        {/* Favorieten */}
        {favorites.length > 0 && (
          <View style={styles.section}>
            <TextMarkup variant="blackItalic" style={styles.sectionTitle}>
              Jouw favorieten
            </TextMarkup>
              <FavoritesCarousel favorites={favorites} />
          </View>
        )}

        {/* Reviews */}
        <View style={styles.section}>
          <TextMarkup variant="blackItalic" style={styles.sectionTitle}>
            Jouw reviews
          </TextMarkup>
            <ReviewsCarousel userId={auth.currentUser?.uid} />
        </View>

        {/* Logout */}
        <GlassButton
          title="Uitloggen"
          onPress={async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error(
                "Error signing out:",
                error
              );
            }
          }}
          style={styles.logoutButton}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    paddingTop: 32,
    paddingBottom: 48,
  },

  profileCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,

    backgroundColor: "rgba(140, 200, 225, 0.35)",
    borderRadius: 24,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.45)",

    shadowColor: "#6BA8A9",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },

    elevation: 4,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 26,
    marginHorizontal: 16,
    marginBottom: 14,
    color: "#2F3E3E",
  },

  emailWarning: {
    marginTop: 6,
    fontSize: 13,
    color: "#B45309",
    opacity: 0.9,
  },

  logoutButton: {
    marginHorizontal: 16,
  },
});
