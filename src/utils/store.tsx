import { NotificationProps } from "@/interfaces/notification";
import { SettingsProps } from "@/interfaces/settings";
import { AuthUserResponse } from "@/interfaces/users";
import { createContext, useState } from "react";

export type StoreContextProps = {
  saveAuthUser: (user: AuthUserResponse) => void;
  authUser: AuthUserResponse | null;
  clearAuthUser: () => void;
  notifications: NotificationProps[] | null;
  setNotificationData: (notification: NotificationProps) => void;
  setHasUnreadNotificationData: (data: boolean) => void;
  hasUnreadNotification: boolean;
  setSettingsData: (settings: SettingsProps | null) => void;
  settings: SettingsProps | null;
};

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserResponse | null>(null);
  const [notifications, setNotifications] = useState<NotificationProps[] | null>(null);
  const [settings, setSettings] = useState<SettingsProps | null>(null);
  const [hasUnreadNotification, setHasUnreadNotification] = useState<boolean>(false);

  const saveAuthUser = (currentAuthUser: AuthUserResponse) => {
    setAuthUser((previousUser) => {
      return { ...previousUser, ...currentAuthUser };
    });
  };

  const clearAuthUser = () => {
    setAuthUser(null);
  };

  const setNotificationData = (notification: NotificationProps) => {
    setNotifications((prevNotifications) => {
      if (prevNotifications && prevNotifications.length) {
        return [...prevNotifications, notification];
      } else {
        return [notification];
      }
    });
  };

  const setHasUnreadNotificationData = (data: boolean) => {
    setHasUnreadNotification(data);
  };

  const setSettingsData = (settings: SettingsProps | null) => {
    setSettings((previousSettings: any) => {
      return {
        ...previousSettings,
        ...settings
      };
    });
  };
  return (
    <StoreContext.Provider
      value={{
        saveAuthUser,
        authUser,
        clearAuthUser,
        notifications,
        setNotificationData,
        setHasUnreadNotificationData,
        hasUnreadNotification,
        setSettingsData,
        settings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
