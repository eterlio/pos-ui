// import { FC } from "react";
// import SelectField from "../Select/Select";
// import { FormIconProps } from "../type";


// interface DayPickerProps {
//   value?: number;
//   onChange?: (selectedValues: number) => void;
//   label?: string | { text: string; icon?: FormIconProps; className?: string };
//   isRequired?: boolean;
//   id?: string;
// }
// const DayPicker: FC<DayPickerProps> = ({
//   value,
//   onChange,
//   label,
//   isRequired,
//   id,
// }) => {
//   const dayOptions = Array.from({ length: 31 }, (_, index) => ({
//     label: String(index + 1),
//     value: index + 1,
//   }));

//   return (
//     <SelectField
//       options={dayOptions}
//       closeOnSelect
//       placeholder="Select day"
//       value={value}
//       onChange={onChange}
//       isRequired={isRequired}
//       label={label}
//       isMulti={false}
//       id={id}
//     />
//   );
// };

// export default DayPicker;
