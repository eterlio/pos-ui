import { FC } from "react";
import { FormIconProps } from "../type";
import InputLabel from "../FieldLabel";


interface RadioBoxFieldProps {
  value: any;
  name?: string;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  description?: string;
}
const RadioBoxField: FC<RadioBoxFieldProps> = ({
  value,
  isRequired,
  label,
  name,
  id,
  description,
}) => {
  const handleOnChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        <input
          name={name}
          id={id}
          aria-describedby="helper-radio-text"
          type="radio"
          value={value}
          className="w-5 h-5"
          onChange={handleOnChange}
        />
      </div>
      <div className="ms-2 text-sm">
        {label && (
          <InputLabel id={id} required={isRequired || false} label={label} />
        )}
        <p
          id="helper-radio-text"
          className="text-xs font-normal text-gray-500 dark:text-gray-300"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default RadioBoxField;
