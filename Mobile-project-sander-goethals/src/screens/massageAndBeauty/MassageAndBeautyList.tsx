import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {SpaListCard} from '../../components/SpaListCard';
import TitleMarkup from '../../components/TitleMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useMassageAndBeautyList } from '../../hooks/useMassageAndBeautyList';
import { RatingDetailsView } from '../../components/RatingDetailsView';
import { DrawerItem } from '@react-navigation/drawer';

const EVEN_COLOR   = '#F2DDD8'; 
const ODD_COLOR    = '#E6C7BF'; 
const LOADER_COLOR = '#B27C76'; 

const MassageAndBeautyListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = useMassageAndBeautyList();

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
          Massage & Beauty lijst kon niet geladen worden.
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
              navigation.navigate('massageAndBeautyDetails', { data: spa })
            }>
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

export default MassageAndBeautyListScreen;