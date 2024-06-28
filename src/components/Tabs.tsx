import React, { useState, ReactElement, MouseEvent, useEffect } from "react";

interface TabProps {
  label: React.ReactNode;
  children: React.ReactNode;
  value: string;
}

interface TabsProps {
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
  getActiveTab?: (tab: { value: string }) => void;
}

const Tabs: React.FC<TabsProps> = ({ children, getActiveTab }) => {
  const childrenArray = React.Children.toArray(children) as ReactElement<TabProps>[];

  const [activeTab, setActiveTab] = useState(childrenArray.length > 0 ? childrenArray[0].props.value : "");

  const handleClick = (e: MouseEvent<HTMLButtonElement>, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
    if (getActiveTab) {
      getActiveTab({
        value: newActiveTab
      });
    }
  };

  useEffect(() => {
    if (getActiveTab) {
      getActiveTab({ value: activeTab });
    }
  }, []);
  return (
    <div>
      <div className="flex border-b border-gray-300 gap-3">
        {childrenArray.map((child) => (
          <button
            key={child.props.value}
            className={`${
              activeTab === child.props.value ? "border-b-[1.8px] border-primary text-primary" : ""
            } text-gray-400 font-medium text-sm py-2 min-w-[100px]`}
            onClick={(e) => handleClick(e, child.props.value)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {childrenArray.map((child) => {
          if (child.props.value === activeTab) {
            return <div key={child.props.value}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
