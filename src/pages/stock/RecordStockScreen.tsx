import Container from "@/components/Container";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { stockDataDefault, stockDefault } from "@/defaults";
// import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
// import { StockProps } from "@/interfaces/stock";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/customFields/input/InputField";
import DatePicker from "@/components/customFields/date/DatePicker";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { SupplierProps } from "@/interfaces/supplier";
import SelectField from "@/components/customFields/Select/SelectField";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { PromiseSelect } from "@/components/customFields/Select/PromiseSelect";
import NumberField from "@/components/customFields/input/NumberField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { isObject } from "lodash";
import PrimaryButton from "@/components/PrimaryButton";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { toast } from "sonner";
import { objectDifference } from "@/helpers";

const RecordStockScreen = () => {
  const navigate = useNavigate();
  const defaultStockDataValues = stockDataDefault();
//   const { addErrors, errors, resetError } = useError<StockProps>();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(stockDefault());
  const { data: supplierData } = useGeneralQuery<GetManyProps<SupplierProps>>({
    queryKey: ["suppliers", {}],
    url: "/suppliers",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["recordStock"],
    url: "/stocks"
  });
  const supplierOptions =
    supplierData?.data.map((supplier) => {
      return {
        label: `${supplier.name}`,
        value: supplier._id
      };
    }) || [];

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

  const handleAddStockDataForm = () => {
    const newValues = [...formValues.stockData, defaultStockDataValues];
    updateFormFieldValue("stockData", newValues);
  };

  const handleRemoveStockDataForm = (index: number) => {
    const newValues = formValues.stockData.filter((_, itemIndex) => {
      return itemIndex !== index;
    });
    updateFormFieldValue("stockData", newValues);
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
    <DashboardLayout pageTitle="Record stock" pageDescription="Fill the form to record stocks" showScrollToTopButton>
      <Container className="border border-gray-50">
        <div className="">
          <h1 className="text-xl font-light mb-2">Stock information</h1>
          <div className="my-5 grid md:grid-cols-3 gap-5">
            <InputField
              fieldKey="batchId"
              handleInputChange={handleFieldChange}
              label="Batch Id"
              value={formValues?.batchId}
              isRequired
            />
            <SelectField
              fieldKey="supplierId"
              onChange={handleFieldChange}
              label="Supplier"
              options={supplierOptions}
              closeOnSelect
            //   errorMessage={errors?.supplierId}
              selectValue={formValues?.supplierId}
              isSearchable
              isRequired
            />
            <DatePicker
              fieldKey="receivedDate"
              onChange={handleFieldChange}
              label="Received Date"
              value={formValues?.receivedDate}
              isRequired
            />
          </div>
          <div>
            <InputField
              fieldKey="truckNumber"
              handleInputChange={handleFieldChange}
              label="Truck Number"
              value={formValues?.truckNumber}
              isRequired
            />
          </div>
          <div className="stockData">
            <div className="stock-form__container">
              <h1 className="text-xl font-light mb-2">Stock Data</h1>

              {formValues?.stockData.map((data, index) => {
                return (
                  <div className="my-5 border border-gray-200 p-2" key={index}>
                    <h1>Stock Item #{index + 1}</h1>
                    <div key={index} className="grid md:grid-cols-2 gap-x-5">
                      <PromiseSelect
                        fieldKey={`productId`}
                        labelKey="name"
                        searchKey="name"
                        url="/products"
                        valueKey="_id"
                        isRequired
                        query={{ deleted: false }}
                        label="Product"
                        value={data?.productId}
                        onChange={(fieldData) =>
                          handleFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                      />
                      <NumberField
                        fieldKey={`quantityExpected`}
                        handleInputChange={(fieldData) =>
                          handleFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        label="Expected Quantity"
                        value={data?.quantityExpected}
                        isRequired
                      />
                      <NumberField
                        fieldKey={`quantityReceived`}
                        handleInputChange={(fieldData) =>
                          handleFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        label="Quantity Received"
                        value={data?.quantityReceived}
                        isRequired
                      />
                      <InputField
                        fieldKey={`section`}
                        handleInputChange={(fieldData) =>
                          handleFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        label="Section"
                        value={data?.section}
                      />
                    </div>
                    <div>
                      <TextAreaField
                        handleInputChange={(fieldData) =>
                          handleFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        fieldKey={`remarks`}
                        label="Remarks"
                        value={data?.remarks}
                      />
                    </div>
                    <div className="flex items-end justify-end mt-3">
                      <span
                        className="cursor-pointer h-7 w-7 border rounded-full flex items-center justify-center peer hover:bg-red-500"
                        onClick={() => handleRemoveStockDataForm(index)}
                      >
                        <X className="text-gray peer-hover:text-white" size={18} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-stock__button flex items-end justify-end">
              <Button className="bg-transparent hover:bg-transparent text-primary h-0" onClick={handleAddStockDataForm}>
                <Plus size={18} /> <span>Add stock</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-end">
          <PrimaryButton text={"Record Stock"} disabled={isPending} loading={isPending} onClick={handleSubmit} />
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default RecordStockScreen;
