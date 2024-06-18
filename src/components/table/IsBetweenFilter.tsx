import { Input } from "../ui/input";
import { ChangeEvent, memo, useState } from "react";
import { useSetQueryParam } from "./hooks/useSetQueryParam";
import DatePicker from "../customFields/date/DatePicker";

const IsBetweenFilter = ({
  column,
  handleIsBetweenValues,
  isDate
}: {
  column: string;
  handleIsBetweenValues: (data: { name: string; value: string | Date }) => void;
  isDate?: boolean;
}) => {
  const { getQueryParam } = useSetQueryParam();
  const less = getQueryParam(`${column}_gte`);
  const high = getQueryParam(`${column}_lte`);

  const [lesserValue, setLessValue] = useState(!isDate &&  less ? less : "");
  const [higherValue, setHigherValue] = useState(!isDate &&  high ? high : "");

  const [lesserDateValue, setLesserDateValue] = useState<Date | undefined>(isDate ? (less ? new Date(less) : undefined) : undefined);
  const [higherDateValue, setHigherDateValue] = useState<Date | undefined>(isDate ? (high ? new Date(high) : undefined) : undefined);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "lesserValue") {
      setLessValue(value);
      handleIsBetweenValues({ name, value });
    }
    if (name === "higherValue") {
      setHigherValue(value);
      handleIsBetweenValues({ name, value });
    }
  };

  const handleDateChange = (name: string, value: Date) => {
    if (name === "lesserValue") {
      setLesserDateValue(value);
      handleIsBetweenValues({ name, value });
    }
    if (name === "higherValue") {
      setHigherDateValue(value);
      handleIsBetweenValues({ name, value });
    }
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      {isDate ? (
        <>
          <DatePicker
            fieldKey={`${column}_gte`}
            value={lesserDateValue}
            onChange={(data) => handleDateChange("lesserValue", data.value)}
            className="w-full"
          />
          <span>and</span>
          <DatePicker
            fieldKey={`${column}_lte`}
            value={higherDateValue}
            onChange={(data) => handleDateChange("higherValue", data.value)}
            className="w-full"
          />
        </>
      ) : (
        <>
          <Input
            type="number"
            className="h-10"
            value={lesserValue}
            name="lesserValue"
            onChange={handleInputChange}
          />
          <span>and</span>
          <Input
            type="number"
            className="h-10"
            value={higherValue}
            name="higherValue"
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};

export default memo(IsBetweenFilter);
