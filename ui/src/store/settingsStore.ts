import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type Settings = {
  theme: Theme;
};

type SettingsStore = {
  settings: Settings;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    theme: "system",
  },
}));
