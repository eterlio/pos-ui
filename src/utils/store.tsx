import { AuthUserResponse } from "@/interfaces/users";
import { createContext, useState } from 'react';
export type StoreContextProps = {
  saveAuthUser: (user: AuthUserResponse) => void;
  authUser: AuthUserResponse | null;
  clearAuthUser: ()=> void
};
export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserResponse | null>(null);
  const saveAuthUser = (currentAuthUser: AuthUserResponse) => {
    setAuthUser((previousUser)=>{
      return {...previousUser, ...currentAuthUser};
    });
  };
  const clearAuthUser = () => {
    setAuthUser(null);
  }

  return <StoreContext.Provider value={{ saveAuthUser, authUser, clearAuthUser }}>{children}</StoreContext.Provider>;
};
