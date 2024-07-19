import { create } from "zustand";
import { SettingsProps } from "@/interfaces/settings";

type SettingsStoreState = {
  settings: SettingsProps | null;
  setSettingsData: (settings: SettingsProps) => void;
};

const useSettingsStore = create<SettingsStoreState>((set) => ({
  settings: null,
  setSettingsData: (settings: SettingsProps) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...settings
      }
    }))
}));

export default useSettingsStore;
