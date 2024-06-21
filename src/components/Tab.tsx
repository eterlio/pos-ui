import React, { ReactNode } from "react";

interface TabProps {
  label: ReactNode;
  children: ReactNode;
  value: string;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export default Tab;
