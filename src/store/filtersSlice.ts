import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IFilters {
  search: string;
  roles: string[];
  locations: string[];
  experience: number | undefined;
  minBasePay: number | undefined;
  appliedFilters: Record<Exclude<keyof IFilters, "appliedFilters">, boolean>;
}
const initialState: IFilters = {
  search: "",
  roles: [],
  locations: [],
  experience: undefined,
  minBasePay: undefined,
  appliedFilters: {
    search: false,
    roles: false,
    locations: false,
    experience: false,
    minBasePay: false,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      state.search = search;
      state.appliedFilters.search = !!search;
    },
    setRoles: (state, action: PayloadAction<string[]>) => {
      const roles = action.payload;
      state.roles = roles;
      state.appliedFilters.roles = roles.length > 0;
    },
    setLocations: (state, action: PayloadAction<string[]>) => {
      const locations = action.payload;
      state.locations = locations;
      state.appliedFilters.locations = locations.length > 0;
    },
    setExperience: (state, action: PayloadAction<number>) => {
      const experience = action.payload;
      state.experience = experience;
      state.appliedFilters.experience = typeof experience === "number";
    },
    setMinBasePay: (state, action: PayloadAction<number>) => {
      const minBasePay = action.payload;
      state.minBasePay = minBasePay;
      state.appliedFilters.minBasePay = typeof minBasePay === "number";
    },
  },
});

export const {
  setSearch,
  setRoles,
  setLocations,
  setExperience,
  setMinBasePay,
} = filtersSlice.actions;

export default filtersSlice.reducer;
