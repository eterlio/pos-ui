import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import { PromiseSelect } from "@/components/customFields/Select/PromiseSelect";
import SelectField from "@/components/customFields/Select/SelectField";
import DatePicker from "@/components/customFields/date/DatePicker";
import InputField from "@/components/customFields/input/InputField";
import NumberField from "@/components/customFields/input/NumberField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { stockDataDefault } from "@/defaults";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { StockDataProps, StockProps } from "@/interfaces/stock";
import { SupplierProps } from "@/interfaces/supplier";
import { Plus, X } from "lucide-react";
import { FC } from "react";

interface EditProductCategoryFieldsProps {
  buttonTitle: string;
  formFields: StockProps;
  onsubmitHandler: () => void;
  handleFormFieldChange: (data: HandlerProps) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
  pageTitle: string;
  disabledButton?: boolean;
  formTitle: string;
  pageDescription: string;
}
const StockEditFieldsScreen: FC<EditProductCategoryFieldsProps> = ({
  handleFormFieldChange,
  onsubmitHandler,
  formFields,
  //   errors,
  isLoading,
  buttonTitle,
  pageTitle,
  disabledButton,
  pageDescription,
  formTitle
}) => {
  const defaultStockDataValues = stockDataDefault();
  const { data: supplierData } = useGeneralQuery<GetManyProps<SupplierProps>>({
    queryKey: ["suppliers", {}],
    url: "/suppliers",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const supplierOptions =
    supplierData?.data.map((supplier) => {
      return {
        label: `${supplier.name}`,
        value: supplier._id
      };
    }) || [];
  const { updateFormFieldValue } = useFormFieldUpdate(formFields);

  const handleAddStockDataForm = () => {
    const newValues = [...formFields.stockData, defaultStockDataValues];
    updateFormFieldValue("stockData", newValues);
  };

  const handleRemoveStockDataForm = (index: number) => {
    const newValues = formFields.stockData.filter((_, itemIndex) => {
      return itemIndex !== index;
    });
    updateFormFieldValue("stockData", newValues);
  };
  return (
    <DashboardLayout pageTitle={pageTitle} pageDescription={pageDescription} showScrollToTopButton>
      <Container className="border border-gray-50">
        <div className="">
          <h1 className="text-xl font-light mb-2">{formTitle}</h1>
          <div className="my-5 grid md:grid-cols-3 gap-5">
            <InputField
              fieldKey="batchId"
              handleInputChange={handleFormFieldChange}
              label="Batch Id"
              value={formFields?.batchId}
              isRequired
            />
            <SelectField
              fieldKey="supplierId"
              onChange={handleFormFieldChange}
              label="Supplier"
              options={supplierOptions}
              closeOnSelect
              selectValue={formFields?.supplierId}
              isSearchable
              isRequired
            />
            <DatePicker
              fieldKey="receivedDate"
              onChange={handleFormFieldChange}
              label="Received Date"
              value={formFields?.receivedDate}
              isRequired
            />
          </div>
          <div>
            <InputField
              fieldKey="truckNumber"
              handleInputChange={handleFormFieldChange}
              label="Truck Number"
              value={formFields?.truckNumber}
              isRequired
            />
          </div>
          <div className="stockData">
            <div className="stock-form__container">
              <h1 className="text-xl font-light mb-2">Stock Data</h1>

              {((formFields?.stockData as StockDataProps[]) || []).map((data, index) => {
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
                          handleFormFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                      />
                      <NumberField
                        fieldKey={`quantityExpected`}
                        handleInputChange={(fieldData) =>
                          handleFormFieldChange({
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
                          handleFormFieldChange({
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
                          handleFormFieldChange({
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
                          handleFormFieldChange({
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
        <div className="mt-4 flex items-end justify-end gap-5">
          <PrimaryButton
            text={buttonTitle}
            disabled={disabledButton || isLoading}
            loading={isLoading}
            onClick={onsubmitHandler}
          />
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default StockEditFieldsScreen;
