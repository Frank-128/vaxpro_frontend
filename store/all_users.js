import { create } from "zustand";

const useAllUserGlobal = create((set, get) => ({
  allUsers: [],
  setAllUsers: (data) => set(() => ({ allUsers: data })),
}));
export default useAllUserGlobal;
