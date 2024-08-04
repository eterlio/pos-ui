import { create } from "zustand";
import { NotificationProps } from "@/interfaces/notification";

type NotificationStoreState = {
  notifications: NotificationProps[] | null;
  hasUnreadNotification: boolean;
  setNotificationData: (notification: NotificationProps) => void;
  setHasUnreadNotificationData: (data: boolean) => void;
};

const useNotificationStore = create<NotificationStoreState>((set) => ({
  notifications: null,
  hasUnreadNotification: false,
  setNotificationData: (notification: NotificationProps) =>
    set((state) => ({
      notifications: state.notifications ? [...state.notifications, notification] : [notification]
    })),
  setHasUnreadNotificationData: (data: boolean) =>
    set(() => ({
      hasUnreadNotification: data
    }))
}));

export default useNotificationStore;
