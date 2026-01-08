import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRadiusState } from "../types";

const initialState: SearchRadiusState = {
  radiusKm: 25,
};

const searchRadiusSlice = createSlice({
  name: "searchRadius",
  initialState,
  reducers: {
    setRadiusKm(state, action: PayloadAction<number>) {
      state.radiusKm = action.payload;
    },
  },
});

export const { setRadiusKm } = searchRadiusSlice.actions;
export default searchRadiusSlice.reducer;
