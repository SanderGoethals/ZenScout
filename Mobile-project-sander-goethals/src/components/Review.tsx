import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Review = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Schrijf je review..."
        placeholderTextColor="#999"
        multiline
      />
    </View>
  )
}

export default Review

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top', // belangrijk voor multiline op Android
    backgroundColor: '#fafafa',
  },
})
