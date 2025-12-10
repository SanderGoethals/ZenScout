import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SpaListCard from '../../components/SpaListCard';
import TitleMarkup from '../../components/TitleMarkup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { usePublicSaunaList } from '../../hooks/usePublicSaunaList';

const EVEN_COLOR   = '#EEE7F4'; 
const ODD_COLOR    = '#D8CDE8'; 
const LOADER_COLOR = '#9B86B8'; 

const PublicSaunaListScreen = () => {
  const navigation = useNavigation();
   const favorites = useAppSelector(store => store.favorites);

  const {
    data: spaList, isLoading, isError, refetch, isRefetching, } = usePublicSaunaList();

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
            item={item}
            index={index}
            evenColor={EVEN_COLOR}
            oddColor={ODD_COLOR}
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={(spa) =>
              navigation.navigate('publicSaunaDetails', { data: spa })
            }
          >
            {/* <Text style={styles.offerTitle}>
              {item.offerTitle}
            </Text>

            <Text style={styles.offerDuration}>
              {item.offerDuration}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text> */}
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