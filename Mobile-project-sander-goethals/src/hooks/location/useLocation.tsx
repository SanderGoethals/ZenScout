import { useEffect, useState } from 'react';
import { Coordinate } from '../../components/domain/geoLocation/geo.types';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const load = async () => {
      console.log('requesting location...');

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Locatie toestemming geweigerd');
        setLoading(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('location success', pos.coords);

      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      setLoading(false);
    };

    load().catch(err => {
      console.log('location error', err);
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return { location, loading, error };
}