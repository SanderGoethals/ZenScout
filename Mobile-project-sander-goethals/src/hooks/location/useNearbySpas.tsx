import { useMemo } from "react";
import { Coordinate } from "../../components/domain/geoLocation/geo.types";
import { distanceInKm } from "../../components/domain/geoLocation/geo.utils";

export function useNearbySpas(
  userLocation: Coordinate | null,
  spas: SpaBase[],
  radiusKm?: number
): SpaBase[] {
  return useMemo(() => {
    if (!userLocation || radiusKm === undefined) {
      return spas;
    }

    return spas.filter(
      (spa) => distanceInKm(userLocation, spa) <= radiusKm
    );
  }, [userLocation, spas, radiusKm]);
}
