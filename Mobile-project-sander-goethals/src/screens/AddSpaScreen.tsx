import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import * as MailComposer from 'expo-mail-composer'
import InputForm from '../components/InputForm'
import TitleMarkup from '../components/ui/TitleMarkup'
import { getCategoryColor } from '../theme/categoryHelpers'

const AddWellnessScreen = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const cardBgColor = getCategoryColor('profile', 'odd');
  const cardBorderColor = getCategoryColor('profile', 'even');
  const containerColor = getCategoryColor('profile', 'loader');

  const handleSubmit = async () => {
    if (!name || !location || !description) {
      Alert.alert('Fout', 'Gelieve alle velden in te vullen.')
      return
    }

    await MailComposer.composeAsync({
      recipients: ['sander.goethals2@student.hogent.be'],
      subject: 'Nieuwe wellness voorgesteld',
      body: `
          Naam: ${name}
          Locatie: ${location}

          Beschrijving:
          ${description}
      `,
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { backgroundColor: containerColor }]}>
        <TitleMarkup>
          Niet de spa gevonden die je zoekt?{'\n'}
          Laat het ons weten en na verificatie krijg jij een korting op jouw volgende bezoek!
        </TitleMarkup>

        <View style={[styles.formCard, { backgroundColor: cardBgColor, borderColor: cardBorderColor, borderWidth: 2 }]}>
          <InputForm
            placeholder="Naam van de wellness"
            autoCapitalize="words"
            returnKeyType="next"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <InputForm
            placeholder="Locatie"
            autoCapitalize="words"
            returnKeyType="next"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />

          <InputForm
            placeholder="Beschrijving"
            inputStyle={{ height: 100, textAlignVertical: 'top' }}
            returnKeyType="done"
            autoCapitalize="sentences"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Verstuur voorstel</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddWellnessScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 80,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  formCard: {
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2E7D6B',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
