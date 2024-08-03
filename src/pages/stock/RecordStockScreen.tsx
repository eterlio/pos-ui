import { HandlerProps } from "@/components/customFields/type";
import { stockDefault } from "@/defaults";
// import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
// import { StockProps } from "@/interfaces/stock";
import { useNavigate } from "react-router-dom";
import { isObject } from "lodash";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { toast } from "sonner";
import { objectDifference } from "@/helpers";
import StockEditFieldsScreen from "./StockEditFieldsScreen";
import { StockProps } from "@/interfaces/stock";

const RecordStockScreen = () => {
  const navigate = useNavigate();
  //   const { addErrors, errors, resetError } = useError<StockProps>();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(stockDefault());
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["recordStock"],
    url: "/stocks"
  });

  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;

    if (isObject(value as Record<string, any>) && value.fieldKey && value.fieldKey === "stockData") {
      const updatedStockData = formValues.stockData.map((item, idx) => {
        if (idx === value.index) {
          return { ...item, [key]: value.value };
        }
        return item;
      });
      updateFormFieldValue("stockData", updatedStockData);
    } else {
      updateFormFieldValue(key, value);
    }
  };

  const payload = objectDifference(stockDefault(), formValues);

  const handleSubmit = () => {
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Stock Recorded created"
          });
          navigate("/stocks");
        }
      }
    );
  };

  return (
    <StockEditFieldsScreen
      buttonTitle="Create Stock"
      formFields={formValues as StockProps}
      formTitle="Stock Information"
      handleFormFieldChange={handleFieldChange}
      onsubmitHandler={handleSubmit}
      pageDescription="Fill the stock information to create stock"
      pageTitle="Create Stock"
      disabledButton={!Object.keys(payload).length}
      isLoading={isPending}
    />
  );
};

export default RecordStockScreen;
