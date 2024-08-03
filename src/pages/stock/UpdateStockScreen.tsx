import { HandlerProps } from "@/components/customFields/type";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";

import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { StockProps } from "@/interfaces/stock";
import { useEffect } from "react";
import StockEditFieldsScreen from "./StockEditFieldsScreen";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { objectDifference } from "@/helpers";
import { toast } from "sonner";
import { isObject } from "lodash";

const UpdateStockScreen = () => {
  const params = useParams<{ id: string }>();
  const stockId = params.id;
  const buttonTitle = "Update Stock";
  const { data, isFetching } = useGeneralQuery<StockProps>({
    queryKey: ["stock", stockId],
    url: `/stocks/${stockId}`,
    enabled: !!stockId
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateStock", stockId as string],
    url: `/stocks/${stockId}`
  });

  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;

    if (isObject(value as Record<string, any>) && value.fieldKey && value.fieldKey === "stockData") {
      const updatedStockData = formValues?.stockData.map((item, idx) => {
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

  const payload = objectDifference(data, formValues);

  const onsubmitHandler = () => {
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Stock updated updated"
          });
          navigate("/stocks");
        }
      }
    );
  };
  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [params.id, data]);
  return (
    <StockEditFieldsScreen
      buttonTitle={buttonTitle}
      formFields={formValues as StockProps}
      formTitle="Stock Information"
      handleFormFieldChange={handleFieldChange}
      onsubmitHandler={onsubmitHandler}
      pageDescription="Edit the stock information to update the stock data"
      pageTitle="Update Stock"
      disabledButton={!Object.keys(payload).length}
      isLoading={isPending}
      pageLoading={isFetching}
    />
  );
};

export default UpdateStockScreen;
