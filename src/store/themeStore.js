import { create } from 'zustand';
import { createTheme } from '@mui/material';

export const useThemeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setDarkMode: (value) => set({ darkMode: value }),
  getTheme: (darkMode) =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }),
}));
