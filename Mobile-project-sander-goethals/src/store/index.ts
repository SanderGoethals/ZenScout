import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorites/slice';

export const store = configureStore(
    {
        reducer: favoriteReducer,        
    }
);

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;