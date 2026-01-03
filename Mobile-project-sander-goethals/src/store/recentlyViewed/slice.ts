import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MAX_RECENT = 10;

const initialState: SpaBase[] = [];

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<SpaBase>) => {
      const index = state.findIndex(
        item => item.id === action.payload.id
      );

      if (index !== -1) {
        state.splice(index, 1);
      }

      state.unshift(action.payload);

      if (state.length > MAX_RECENT) {
        state.pop();
      }
    },
    clearRecentlyViewed: () => {
      return [];
    },
  },
});

export const {
  addRecentlyViewed,
  clearRecentlyViewed,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;