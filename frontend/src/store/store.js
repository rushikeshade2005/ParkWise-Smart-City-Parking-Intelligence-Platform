import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

export const useParkingStore = create((set) => ({
  parkingAreas: [],
  nearbyAreas: [],
  selectedArea: null,
  isLoading: false,
  error: null,
  setParkingAreas: (areas) => set({ parkingAreas: areas }),
  setNearbyAreas: (areas) => set({ nearbyAreas: areas }),
  setSelectedArea: (area) => set({ selectedArea: area }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export const useBookingStore = create((set) => ({
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  setBookings: (bookings) => set({ bookings }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
