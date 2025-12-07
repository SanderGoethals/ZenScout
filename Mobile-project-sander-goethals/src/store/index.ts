import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorites/slice';

export const store = configureStore(
    {
        reducer:
        {
            favorites: favoriteReducer,
        },        
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;