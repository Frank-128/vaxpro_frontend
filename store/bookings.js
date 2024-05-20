import { create } from "zustand";

const globalBookings = create((set) => ({
  bookings: [],
  setBookings: (value) => {
    set(() => ({
      bookings: value,
    }));
  },
}));

export default globalBookings;
