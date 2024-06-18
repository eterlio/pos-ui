import { FC } from "react";

interface ViewElementProps {
  title: string;
  description?: string;
}
const ViewElement: FC<ViewElementProps> = ({ title, description = "" }) => {
  return (
    <div className="relative">
      <h1 className="font-medium">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ViewElement;
