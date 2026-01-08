import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import favoriteReducer from './favorites/slice';
import recentlyViewedReducer from './recentlyViewed/slice';
import searchRadiusReducer from './searchRadius/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites', 'recentlyViewed', 'searchRadius'],
};

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  recentlyViewed: recentlyViewedReducer,
  searchRadius: searchRadiusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
