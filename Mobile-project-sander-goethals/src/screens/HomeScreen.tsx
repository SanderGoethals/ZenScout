import { Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import TestReview from '../components/domain/reviews/testReview'
import SpaMapScreen from './SpaFinderScreen'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      
      
      <Modal      
        animationType="fade"
        transparent={true}
        visible={true}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <SpaMapScreen />
            </View>
          </View> 
        </Modal>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});