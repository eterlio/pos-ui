import React, { ReactNode } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <div aria-label={label}>{children}</div>;
};

export default Tab;
