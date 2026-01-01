import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SpaListCard } from '../components/domain/spa/SpaListCard';
import TextMarkup from '../components/ui/TextMarkup';

import { useWellnessList } from '../hooks/useWellnessList';
import { useLocation } from '../hooks/location-hooks/useLocation';
import { useNearbySpas } from '../hooks/location-hooks/useNearbySpas';
import { useAppSelector } from '../hooks/reduxHooks';

import { getCategoryColor } from '../theme/categoryHelpers';

const RADIUS_KM = 10;

const HomeScreen = () => {
  const navigation = useNavigation();
  const favorites = useAppSelector(store => store.favorites);

  const [showList, setShowList] = useState(false);

  const {
    data: spaList,
    isLoading: spasLoading,
    isError,
    refetch,
    isRefetching,
  } = useWellnessList();

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocation();

  const nearbySpas = useNearbySpas(
    location,
    spaList ?? [],
    RADIUS_KM
  );

  if (isError || locationError || !location) {
    return (
      <View>
        <TextMarkup>
          Wellneslijst kon niet geladen worden.
        </TextMarkup>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Button
          title="Toon spa’s binnen 10 km"
          onPress={() => setShowList(true)}
        />
      </View>

      {showList && nearbySpas.length === 0 && (
        <View>
          <TextMarkup>
            Geen spa’s gevonden binnen {RADIUS_KM} km.
          </TextMarkup>
        </View>
      )}

      {showList && nearbySpas.length > 0 && (
        <FlatList
          data={nearbySpas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12 }}
          refreshing={isRefetching}
          onRefresh={refetch}
          renderItem={({ item, index }) => (
            <SpaListCard
              data={item}
              index={index}
              category="wellness"
              isFavorite={favorites.some(f => f.id === item.id)}
              onPress={(spa) =>
                navigation.navigate('wellnessDetails', { data: spa })
              }
            />
          )}
        />
      )}
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
