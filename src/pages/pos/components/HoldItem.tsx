import SelectField from "@/components/customFields/Select/SelectField";
import OrderSummary from "./OrderSummary";
import usePosStore from "@/store/pos";
import { HandlerProps } from "@/components/customFields/type";
import { FC } from "react";
import { OptionsProps } from "@/interfaces";
import TextAreaField from "@/components/customFields/input/TextAreaField";

interface PayNowProps {
  customers: OptionsProps[];
}
const HoldItem: FC<PayNowProps> = ({ customers }) => {
  const { getItemTotalAmount, getTotalItems, setState, getState } = usePosStore();
  const state = getState();
  const handleFieldChange = (data: HandlerProps) => {
    setState({ [data.key]: data.value });
  };

  return (
    <div className="relative">
      <SelectField
        fieldKey="customerId"
        onChange={handleFieldChange}
        options={customers}
        label="Customer"
        selectValue={state.customerId}
        isRequired
      />
      <TextAreaField
        fieldKey="description"
        handleInputChange={handleFieldChange}
        label="Invoice Description"
        value={state.description}
        isRequired
      />
      <div className="my-5">
        <OrderSummary totalItemAmount={getItemTotalAmount()} totalItems={getTotalItems()} title="Invoice summary" />
      </div>
    </div>
  );
};

export default HoldItem;
