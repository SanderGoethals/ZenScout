import { StyleSheet, View } from 'react-native'
import React from 'react'
import TestReview from '../components/domain/reviews/testReview'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TestReview />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
  padding: 16,
  flex: 1,
}
})