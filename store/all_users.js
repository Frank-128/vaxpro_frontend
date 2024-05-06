import { create } from "zustand";

const globalAllUsers = create((set, get) => ({
  allUsers: [],
  setAllUsers: (data) => set(() => ({ allUsers: data })),
}));
export default globalAllUsers;


