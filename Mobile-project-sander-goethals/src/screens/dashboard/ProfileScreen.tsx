import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../../hooks/reduxHooks';
import { StyleSheet, View } from 'react-native';

import InputForm from '../../components/InputForm';
import TitleMarkup from '../../components/TitleMarkup';
import FavoritesCarousel from '../../components/FavoritesCarousel';

const ProfileScreen = () => {
  const favorites = useAppSelector((store) => store.favorites);
  
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileForm}>
          <InputForm
          inputStyle={styles.input}
          placeholder="Nickname"
          returnKeyType="done"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="Naam"
          autoCapitalize="words"
          returnKeyType="next"
          value={name} 
          onChangeText={(text) => setName(text)}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="Achternaam"
          autoCapitalize="words"
          returnKeyType="next"
          value={lastName} 
          onChangeText={(text) => setLastName(text)}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <InputForm
          inputStyle={styles.input}
          placeholder="Telefoonnummer"
          keyboardType="phone-pad"
          returnKeyType="next"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <InputForm 
          inputStyle={styles.input}
          placeholder="Geboortedatum"
          keyboardType="numeric"
          returnKeyType="done"
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
        />
      </View>

      <View style={styles.screen}>
        {favorites.length > 0 && (
          <>
            <TitleMarkup style={styles.sectionTitle}>
              Jouw favorieten
            </TitleMarkup>

            <FavoritesCarousel favorites={favorites} />
          </>
        )}
      </View>
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
    // gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  container: {
    paddingVertical: 16,
    paddingBottom: 40,
    // backgroundColor: '#FFF',
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
});
