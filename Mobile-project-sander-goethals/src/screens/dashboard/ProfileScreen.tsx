import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import FavoritesCarousel from '../../components/FavoritesCarousel';
import TitleMarkup from '../../components/TitleMarkup';

const ProfileScreen = () => {
  const favorites = useAppSelector((store) => store.favorites);

  return (
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
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginBottom: 12,
  },
});
