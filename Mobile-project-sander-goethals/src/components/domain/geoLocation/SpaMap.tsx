import React, { FC } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SpaMapProps } from './geo.types';

export const SpaMap: FC<SpaMapProps> = ({
  userLocation,
  spas,
  radiusKm,
}) => {
  if (!userLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      showsUserLocation
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      {/* Radius cirkel */}
      <Circle
        center={userLocation}
        radius={radiusKm * 1000} // km → meters
        strokeWidth={2}
        strokeColor="rgba(0,122,255,0.8)"
        fillColor="rgba(0,122,255,0.2)"
      />

      {/* Spa markers */}
      {spas.map(spa => (
        <Marker
          key={spa.id}
          coordinate={{
            latitude: spa.latitude,
            longitude: spa.longitude,
          }}
          title={spa.name}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
