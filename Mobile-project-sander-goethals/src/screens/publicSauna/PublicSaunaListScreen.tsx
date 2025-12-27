import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/domain/spa/SpaListCard';
import TitleMarkup from '../../components/ui/TitleMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { usePublicSaunaList } from '../../hooks/usePublicSaunaList';
import { getCategoryColor } from '../../theme/categoryHelpers';


const PublicSaunaListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = usePublicSaunaList();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={getCategoryColor('publicSauna', 'loader')} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TitleMarkup>
          Publieke sauna lijst kon niet geladen worden.
        </TitleMarkup>
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
            category='publicSauna'
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