import { InputProps } from "@/components/ui/input";
import { FormIconProps } from "../type";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FC, useState } from "react";
import InputLabel from "../FieldLabel";
import InputField from "./InputField";
import InputError from "./InputError";

interface PasswordInputProps extends InputProps {
  placeholder?: string;
  handleInputChange: (data: { key: string; value: any }) => void;
  id?: string;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  errorMessage?: string;
  fieldKey: string;
}
const PasswordInput: FC<PasswordInputProps> = ({
  placeholder,
  handleInputChange,
  id,
  label,
  isRequired,
  errorMessage,
  fieldKey,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {label && (
        <div className="my-1.5">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <div className="relative flex items-center">
        <InputField
          handleInputChange={handleInputChange}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...rest}
          id={id}
          fieldKey={fieldKey}
        />
        <div className="absolute right-0 pr-3 cursor-pointer" onClick={handleShowPassword}>
          {!showPassword && <EyeIcon size={20} />}
          {showPassword && <EyeOffIcon size={20} />}
        </div>
      </div>
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default PasswordInput;
