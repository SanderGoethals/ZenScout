import { useMemo } from 'react';
import { Coordinate } from '../../components/domain/geoLocation/geo.types';
import { distanceInKm } from '../../components/domain/geoLocation/geo.utils';

export function useNearbySpas(
  userLocation: Coordinate | null,
  spas: SpaBase[],
  radiusKm: number
) {
  return useMemo(() => {
    if (!userLocation) return [];

    return spas.filter(spa => {
      return (
        distanceInKm(userLocation, spa) <= radiusKm
      );
    });
  }, [userLocation, spas, radiusKm]);
}
