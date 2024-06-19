import { NotificationProps } from "@/interfaces/notification";
import { AuthUserResponse } from "@/interfaces/users";
import { createContext, useState } from "react";

export type StoreContextProps = {
  saveAuthUser: (user: AuthUserResponse) => void;
  authUser: AuthUserResponse | null;
  clearAuthUser: () => void;
  notifications: NotificationProps[] | null;
  setNotificationData: (notification: NotificationProps) => void;
};

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserResponse | null>(null);
  const [notifications, setNotifications] = useState<NotificationProps[] | null>(null);

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

  return (
    <StoreContext.Provider
      value={{
        saveAuthUser,
        authUser,
        clearAuthUser,
        notifications,
        setNotificationData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
