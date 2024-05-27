import { create } from "zustand";

const globalAllUsers = create((set, get) => ({
  allUsers: [],
  allChildren:null,
  setAllUsers: (data) => set(() => ({ allUsers: data })),
  setAllChildren: (data) => set(() => ({ allChildren: data })),
}));
export default globalAllUsers;


