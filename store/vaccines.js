import { create } from "zustand";

const globalVaccines = create((set, get) => ({
    vaccines: [],
    setVaccines: (data) => set({ vaccines: data }),

}));
export default globalVaccines;
