// import { FC } from "react";
// import SelectField from "../Select/Select";
// import { eachMonthOfInterval, format } from "date-fns";
// import { FormIconProps } from "@/formBuilder/type";

// interface MonthPickerProps {
//   type: "number" | "fullMonth" | "shortMonth";
//   value?: string | number;
//   onChange?: (selectedValues: number) => void;
//   label?: string | { text: string; icon?: FormIconProps; className?: string };
//   isRequired?: boolean;
//   id?: string;
// }

// const MonthPicker: FC<MonthPickerProps> = ({
//   value,
//   type,
//   onChange,
//   label,
//   id,
//   isRequired,
// }) => {
//   const startDate = new Date("2023-01-01");
//   const endDate = new Date("2023-12-31");
//   const months = eachMonthOfInterval({ start: startDate, end: endDate });

//   const formatArray = (formatType: string) =>
//     months.map((month) => format(month, formatType));

//   const monthOption: { [key in MonthPickerProps["type"]]: string[] } = {
//     fullMonth: formatArray("MMMM"),
//     shortMonth: formatArray("MMM"),
//     number: formatArray("MM"),
//   };

//   const monthOptions = monthOption[type].map((month) => ({
//     label: String(month),
//     value: month,
//   }));

//   return (
//     <SelectField
//       options={monthOptions}
//       closeOnSelect
//       placeholder="Select Month"
//       selectValue={value}
//       onChange={onChange}
//       isRequired={isRequired}
//       label={label}
//       id={id}
//     />
//   );
// };

// export default MonthPicker;
