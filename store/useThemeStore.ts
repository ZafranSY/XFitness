
import { create } from 'zustand';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light', // Default theme
  // ✅ Fixed TS7006: added explicit parameter type for state
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useThemeStore;
