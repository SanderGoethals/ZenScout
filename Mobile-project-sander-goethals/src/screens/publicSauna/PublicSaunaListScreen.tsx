import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/domain/spa/SpaListCard';
import TextMarkup from '../../components/ui/TextMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCategoryColor } from '../../theme/categoryHelpers';
import { SpaCategory } from '../../constants/categories';
import { useSpas } from '../../hooks/firebase/useSpasFromFirebase';

const PublicSaunaListScreen = () => {
  const navigation = useNavigation();
  const favorites = useAppSelector(store => store.favorites);
  
  const category: SpaCategory = "publicSauna";

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = useSpas(category);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={getCategoryColor(category, 'third')} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TextMarkup>
          Publieke sauna lijst kon niet geladen worden.
        </TextMarkup>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={spaList}
        keyExtractor={(item: SpaBase) => item.id}
        contentContainerStyle={{ padding: 12 }}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({ item, index }) => (
          <SpaListCard
            data={item}
            index={index}
            category={category}
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={(spa) =>
              navigation.navigate('publicSaunaDetails', { data: spa })
            }
          >
          </SpaListCard>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PublicSaunaListScreen;