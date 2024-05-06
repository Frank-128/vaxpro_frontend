import { create } from "zustand";

const globalAddress = create((set, get) => ({
  regions: [],
  districts: [],
  wards: [],
  setRegions: (state) => set(() => ({ regions: state })),
  setDistricts: (state) => set(() => ({ districts: state })),
  setWards: (state) => set(() => ({ wards: state })),
}));

export default globalAddress;
