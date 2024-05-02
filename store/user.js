import { create } from "zustand";

const useGlobal = create((set, get) => ({
  loggedInUser: false,
  authenticatedToken: "",
  setLoggedInUser: (data) => set(() => ({ loggedInUser: data })),
  setAuthenticatedToken: (token) => set(() => ({ authenticatedToken: token })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
export default useGlobal;
