import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRadiusState } from "../types";

const initialState: SearchRadiusState = {
  radiusKm: undefined,
};

const searchRadiusSlice = createSlice({
  name: "searchRadius",
  initialState,
  reducers: {
    setRadiusKm(state, action: PayloadAction<number | undefined>) {
      state.radiusKm = action.payload;
    },
  },
});

export const { setRadiusKm } = searchRadiusSlice.actions;
export default searchRadiusSlice.reducer;
