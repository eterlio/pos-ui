import { FC, useEffect, useState } from "react";
import Tab from "@/components/tabs/Tab";
import { TABS } from "./constants";
import { LucideIcon } from "lucide-react";

interface TabsProps {
  tabs: {
    label: string;
    value: TABS;
    icon?: LucideIcon;
  }[];
  handleTabClick: (activeTab: TABS) => void;
}
const Tabs: FC<TabsProps> = ({ tabs, handleTabClick }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const handleActiveTabClick = (activeTab: TABS) => {
    setActiveTab(activeTab);
    handleTabClick(activeTab);
  };

  useEffect(() => {
    handleTabClick(activeTab);
  }, []);
  return (
    <div className="w-full -mt-10">
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-scroll">
        {tabs &&
          tabs.map((tab) => {
            return (
              <Tab
                isActiveTab={activeTab === tab.value}
                label={tab.label}
                onClick={() => handleActiveTabClick(tab.value)}
                key={tab.value}
                icon={tab.icon}
              />
            );
          })}
      </div>

      <div></div>
    </div>
  );
};

export default Tabs;
