import { ReactNode } from "react";

export const TabContent = ({ children }: { children: ReactNode }) => (
  <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">{children}</div>
);
