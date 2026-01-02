import React from 'react';
import { useRoute } from '@react-navigation/native';

import { RootStackNavProps } from '../../navigators/navigation.types';
import {SpaDetailsView} from '../../components/domain/spa/SpaDetailsView';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggle } from '../../store/favorites/slice';

const PublicSaunaDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);

  const {
    params: { data },
  } =
    useRoute<
      RootStackNavProps<'publicSaunaDetails'>['route']
    >();

  return (
    <SpaDetailsView
      data={data}
      isFavorite={favorites.some(f => f.id === data.id)}
      onToggleFavorite={(item) => dispatch(toggle(item))}
      category="publicSauna"
    />
  );
};

export default PublicSaunaDetailsScreen;
