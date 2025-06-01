import { create } from "zustand";

interface TourState {
  isRunning: boolean;
  startTour: () => void;
  stopTour: () => void;
  resetTour: () => void;
}

export const useTourStore = create<TourState>((set) => ({
  isRunning: false,
  startTour: () => {
    set({ isRunning: false });
    setTimeout(() => set({ isRunning: true }), 50);
  },
  stopTour: () => set({ isRunning: false }),
  resetTour: () => {
    set({ isRunning: false });
    setTimeout(() => set({ isRunning: true }), 100);
  },
}));
