import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Button,
} from 'react-native';
import SpaMapScreen from './SpaFinderScreen';
import GlassButton from '../components/ui/GlassButton';

const HomeScreen = () => {
  const [mapVisible, setMapVisible] = useState(false);

  return (
    <View style={styles.container}>
      <GlassButton
        title="Toon spa's op de kaart"
        onPress={() => setMapVisible(true)}
      />

      <Modal
        animationType="fade"
        transparent
        visible={mapVisible}
        onRequestClose={() => setMapVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setMapVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={() => {}}
          >
            <SpaMapScreen />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});
