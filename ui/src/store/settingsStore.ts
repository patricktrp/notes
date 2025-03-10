import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type Settings = {
  theme: Theme;
};

type SettingsStore = {
  settings: Settings;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    theme: "system",
  },
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
