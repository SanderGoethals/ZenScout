import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../../hooks/reduxHooks';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getCategoryColor } from '../../theme/categoryHelpers';

import InputForm from '../../components/InputForm';
import TextMarkup from '../../components/ui/TextMarkup';
import FavoritesCarousel from '../../components/domain/spa/FavoritesCarousel';
import { auth, db } from '../../config/firebase';
import {  signOut } from '@firebase/auth'; 
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";


const ProfileScreen = () => {
  const favorites = useAppSelector((store) => store.favorites);
  const bgColor = getCategoryColor('profile', 'even');
  
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [showChangeEmailWarning, setShowChangeEmailWarning] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('')

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
            ? data.birthDate.toDate().toISOString().split("T")[0]
            : ""
        );
      }
    } catch (error) {
      console.error("Fout bij ophalen profiel:", error);
    }
  };

  fetchUserProfile();
}, []);

const updateProfileField = async (updates: Record<string, any>) => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.profileForm, { backgroundColor: bgColor }]}>
          <InputForm
          inputStyle={styles.input}
          returnKeyType="done"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
          onBlur={() => updateProfileField({ nickname })}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="Naam"
          autoCapitalize="words"
          returnKeyType="next"
          value={name} 
          onChangeText={(text) => setName(text)}
          onBlur={() => updateProfileField({ firstName: name })}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="Achternaam"
          autoCapitalize="words"
          returnKeyType="next"
          value={lastName} 
          onChangeText={(text) => setLastName(text)}
          onBlur={() => updateProfileField({ lastName })}
        />

        {/* TODO: fix reauthication when changing email */}
        <InputForm
          inputStyle={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}

          editable={false}
          
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setShowChangeEmailWarning(true)}
          onBlur={() => setShowChangeEmailWarning(false)}
        />
        {showChangeEmailWarning && (
          <TextMarkup style={styles.emailWarning}>
            ⚠️ Als je je e-mailadres wijzigt, moet je opnieuw inloggen.
          </TextMarkup>
        )}


        <InputForm
          inputStyle={styles.input}
          placeholder="Telefoonnummer"
          keyboardType="phone-pad"
          returnKeyType="next"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          onBlur={() => updateProfileField({ phoneNumber })}
        />

        <InputForm 
          inputStyle={styles.input}
          placeholder="Geboortedatum"
          keyboardType="numeric"
          returnKeyType="done"
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
          onBlur={() => {updateProfileField({ birthDate: new Date(birthday) })}}
        />
      </View>

      <View style={styles.screen}>
        {favorites.length > 0 && (
          <>
            <TextMarkup style={styles.sectionTitle}>
              Jouw favorieten
            </TextMarkup>

            <FavoritesCarousel favorites={favorites} />
          </>
        )}
      </View>

      <TouchableOpacity style={[styles.primaryButton, { backgroundColor: getCategoryColor("login", "buttonColor") }]}
        onPress={async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.error("Error signing out: ", error);
          }
        }}>
        <TextMarkup style={styles.primaryButtonText}>Uitloggen</TextMarkup>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileForm: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF7E6',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  container: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
screen: {
    flex: 1,
    paddingTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F0F0F0',
    color: '#111111',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
    primaryButton: {
    marginTop: 18,
    marginHorizontal: 16,
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
  emailWarning: {
    marginTop: 6,
    fontSize: 13,
    color: "#B45309",
  },
});
