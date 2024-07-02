import { create } from "zustand";

const globalBookings = create((set) => ({
  bookings: [],
  pendingBookings:[],
  setBookings: (value) => {
    set(() => ({
      bookings: value,
    }));
  },
  setPendingBookings: (value) => set({ pendingBookings: value }),

}));

export default globalBookings;
