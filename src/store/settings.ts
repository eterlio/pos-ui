import { create } from "zustand";
import { SettingsProps } from "@/interfaces/settings";

type SettingsStoreState = {
  settings: SettingsProps | null;
  setSettings: (settings: SettingsProps) => void;
};

const useSettingsStore = create<SettingsStoreState>((set) => ({
  settings: null,
  setSettings: (settings: SettingsProps) =>
    set(() => ({
      settings
    }))
}));

export default useSettingsStore;
