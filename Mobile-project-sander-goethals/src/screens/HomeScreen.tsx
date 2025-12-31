import { StyleSheet, View } from 'react-native'
import React from 'react'
import TestReview from '../components/domain/reviews/testReview'
import SpaMapScreen from './SpaFinderScreen'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <TestReview /> */}

      <SpaMapScreen />
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