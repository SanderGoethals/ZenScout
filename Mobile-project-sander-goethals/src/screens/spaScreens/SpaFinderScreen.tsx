import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocation } from '../../hooks/location/useLocation';
import { useNearbySpas } from '../../hooks/location/useNearbySpas';
import { SpaMap } from '../../components/domain/geoLocation/SpaMap';
import { useSpas } from '../../hooks/firebase/useSpasFromFirebase';
import { SpaCategory } from '../../constants/categories';

export default function SpaMapScreen() {
  const radiusKm = 10;

  const category: SpaCategory = 'wellness';

  const {
    data: spas,
    isLoading: spasLoading,
    error: spasError,
  } = useSpas(category);

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocation();

  const nearbySpas = useNearbySpas(
    location,
    spas ?? [],
    radiusKm
  );

  if (spasLoading || locationLoading) {
    return <ActivityIndicator />;
  }

  if (spasError || locationError || !location) {
    return <Text>Kon gegevens niet laden</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SpaMap
        userLocation={location}
        spas={nearbySpas}
        radiusKm={radiusKm}
      />
    </View>
  );
}