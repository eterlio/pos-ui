import React, { useState, ReactElement, MouseEvent } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="mx-auto">
      <div className="flex border-b border-gray-300 gap-3">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? "border-b-2 border-primary" : ""
            } text-primary font-medium py-2 min-w-[100px]`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
