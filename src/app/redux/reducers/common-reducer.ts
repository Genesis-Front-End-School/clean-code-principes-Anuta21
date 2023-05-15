import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonReducerState } from "./models";

const initialState = { darkMode: true } as ICommonReducerState;

export const commonSlice = createSlice({
  name: "commonReducer",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});
