import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Pressable,
  FlatList,
  View,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SpaListCard } from "../components/domain/spa/SpaListCard";
import SpaFilters from "../components/domain/spa/SpaFilters";
import RecentlyViewedCarousel from "../components/domain/spa/RecentlyViewedCarousel";
import { SpaMap } from "../components/domain/geoLocation/SpaMap";
import TextMarkup from "../components/ui/TextMarkup";
import RadiusSelector from "../components/ui/RadiusSelector";

import { useLocation } from "../hooks/location/useLocation";
import { useNearbySpas } from "../hooks/location/useNearbySpas";

import { useFacilityFilter } from "../hooks/useFacilityFilter";
import { useSpas } from "../hooks/firebase/useSpasFromFirebase";
import { useAppSelector } from "../hooks/reduxHooks";

import { SpaCategory } from "../constants/categories";
import FacilityFilterModal from "../components/domain/spa/FacilityFilterModal";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// sanderMaptTest@Test.com
// MapTest1234+

const HomeScreen = () => {
  const navigation = useNavigation();
  const favorites = useAppSelector((store) => store.favorites);

  const [category, setCategory] = useState<SpaCategory>("wellness");
  const [province, setProvince] = useState<string | undefined>();
  const [radiusKm, setRadiusKm] = useState<number>(25);
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [spaFinderOpen, setSpaFinderOpen] = useState(false);


  const {
    data: spaList,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useSpas(category, province);

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocation();

  const nearbySpas = useNearbySpas(
    location,
    spaList ?? [],
    radiusKm
  );

  const filteredSpas = useFacilityFilter(
    nearbySpas,
    selectedFacilities
  );

  if (isLoading || locationLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || locationError) {
    return (
      <View style={styles.center}>
        <TextMarkup>
          Wellneslijst kon niet geladen worden.
        </TextMarkup>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={filteredSpas}
      keyExtractor={(item) => item.id}
      refreshing={isRefetching}
      onRefresh={refetch}
      renderItem={({ item, index }) => (
        <SpaListCard
          data={item}
          index={index}
          category={category}
          isFavorite={favorites.some((f) => f.id === item.id)}
          onPress={(spa) =>
            navigation.navigate("spaDetails", { data: spa })
          }
        />
      )}
      ListHeaderComponent={
        <>
          <SpaFilters
            category={category}
            province={province}
            onCategoryChange={setCategory}
            onProvinceChange={setProvince}
          />

          <View style={styles.row}>
              <RadiusSelector
                radiusKm={radiusKm}
                onChange={setRadiusKm}
              />

            <Pressable
              style={styles.categoryChip}
              onPress={() => setSpaFinderOpen(true)}
            >
              <TextMarkup>Kaart</TextMarkup>
            </Pressable>

            <Pressable
              style={styles.categoryChip}
              onPress={() => setFacilityModalOpen(true)}
            >
              <TextMarkup>Faciliteiten</TextMarkup>
            </Pressable>
          </View>

          <FacilityFilterModal
            visible={facilityModalOpen}
            selected={selectedFacilities}
            onApply={(facilities) => {
              setSelectedFacilities(facilities);
              setFacilityModalOpen(false);
            }}
            onClose={() => setFacilityModalOpen(false)}
          />

          <Modal
            visible={spaFinderOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setSpaFinderOpen(false)}
          >
            <Pressable
              onPress={() => setSpaFinderOpen(false)}
            />

            <View style={styles.modalCard}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSpaFinderOpen(false)}
              >
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </Pressable>

              <SpaMap
                userLocation={location}
                spas={filteredSpas}
                radiusKm={radiusKm}
              />
            </View>
          </Modal>


          {filteredSpas.length === 0 && (
            <View style={styles.emptyState}>
              <TextMarkup>
                Geen spa’s gevonden
                {radiusKm ? ` binnen ${radiusKm} km` : ""}.
              </TextMarkup>
            </View>
          )}
        </>
      }
      ListFooterComponent={
        <View style={styles.recentSection}>
          <TextMarkup variant="boldItalic" style={styles.recentTitle}>
            Onlangs bekeken
          </TextMarkup>
          <RecentlyViewedCarousel />
        </View>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  emptyState: {
    marginVertical: 16,
    alignItems: "center",
  },
  recentSection: {
    marginTop: 32,
    paddingBottom: 32,
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    letterSpacing: 0.6,
    color: "#2F3E3E",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#E6EAEA",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  modalCard: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    width: "92%",
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
  },

closeButton: {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 10,
  padding: 8,
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: 20,
},
});
