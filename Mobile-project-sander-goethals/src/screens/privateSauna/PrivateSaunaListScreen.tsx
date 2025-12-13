import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/SpaListCard';
import TitleMarkup from '../../components/TitleMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { usePrivateSaunaList } from '../../hooks/usePrivateSaunaList';

const EVEN_COLOR   = '#DCE9F2'; 
const ODD_COLOR    = '#C4D7E6'; 
const LOADER_COLOR = '#7FA9C9'; 


const PrivateSaunaListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = usePrivateSaunaList();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={LOADER_COLOR} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <TitleMarkup>
          Private sauna lijst kon niet geladen worden.
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
            evenColor={EVEN_COLOR}
            oddColor={ODD_COLOR}
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={(spa) =>
              navigation.navigate('privateSaunaDetails', { data: spa })
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

export default PrivateSaunaListScreen;