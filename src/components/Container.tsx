import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // The className you want to add
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const containerClasses = `h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white min-h-[400px] ${className}`;

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
