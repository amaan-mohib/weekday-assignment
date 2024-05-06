import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./store/filtersSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
