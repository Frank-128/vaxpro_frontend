import { create } from "zustand";

const globalUser = create((set, get) => ({
  loggedInUser: false,
  authenticatedToken: "no set",
  setLoggedInUser: (data) => set({ loggedInUser: data }),
  setAuthenticatedToken: (token) => set(() => ({ authenticatedToken: token })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
export default globalUser;
