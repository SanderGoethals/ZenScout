export interface Coordinate {
  latitude: number;
  longitude: number;
};

export interface SpaMapProps {
  userLocation: Coordinate | null;
  spas: SpaBase[];
  radiusKm: number | undefined;
};