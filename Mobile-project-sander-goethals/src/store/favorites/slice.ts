import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SpaBase[] = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<SpaBase>) => {
      const exists = state.some(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return [...state, action.payload];
    }
  }
});

export const { toggle } = favoriteSlice.actions;
export default favoriteSlice.reducer;