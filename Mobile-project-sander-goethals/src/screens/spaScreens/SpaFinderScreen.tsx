import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useWellnessList } from '../../hooks/useWellnessList';
import { useLocation } from '../../hooks/location-hooks/useLocation';
import { useNearbySpas } from '../../hooks/location-hooks/useNearbySpas';
import { SpaMap } from '../../components/domain/geoLocation/SpaMap';

export default function SpaMapScreen() {
  const radiusKm = 10;

  const {
    data: spas,
    isLoading: spasLoading,
    error: spasError,
  } = useWellnessList();

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

