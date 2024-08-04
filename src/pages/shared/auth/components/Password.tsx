import PasswordInput from "@/components/customFields/input/Password";
import { HandlerProps } from "@/components/customFields/type";
import { FC } from "react";

interface PasswordProps {
  isLoading: boolean;
  handleFormFieldChange: (data: HandlerProps) => void;
  formValues: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}
const Password: FC<PasswordProps> = ({ handleFormFieldChange, isLoading, formValues }) => {
  return (
    <div className="space-y-4">
      <PasswordInput
        fieldKey="oldPassword"
        handleInputChange={handleFormFieldChange}
        label="Current Password"
        placeholder="Current Password"
        value={formValues?.oldPassword}
        disabled={isLoading}
      />
      <PasswordInput
        fieldKey="newPassword"
        handleInputChange={handleFormFieldChange}
        label="New Password"
        placeholder="New Password"
        value={formValues?.newPassword}
        disabled={isLoading}
      />
      <PasswordInput
        fieldKey="confirmPassword"
        handleInputChange={handleFormFieldChange}
        label="Confirm Password"
        placeholder="Confirm Password"
        value={formValues?.confirmPassword}
        disabled={isLoading}
      />
    </div>
  );
};

export default Password;
