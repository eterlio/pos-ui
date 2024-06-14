import { FC } from "react";
import { Button, ButtonProps } from "./ui/button"; // Assuming ButtonProps contains the props required for the Button component

interface PrimaryButtonProps extends ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ className, disabled, text, loading, ...props }) => {
  return (
    <Button className={`w-full ${className || ""}`} disabled={disabled} {...props}>
      {!loading ? (
        text
      ) : (
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-gray-100"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-gray-100"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-gray-100"></div>
        </div>
      )}
    </Button>
  );
};

export default PrimaryButton;
