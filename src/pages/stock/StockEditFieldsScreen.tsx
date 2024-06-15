import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
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
import { ProductProps } from "@/interfaces/products";
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
  pageLoading?: boolean;
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
  formTitle,
  pageLoading
}) => {
  const defaultStockDataValues = stockDataDefault();

  const { data: supplierData } = useGeneralQuery<GetManyProps<SupplierProps>>({
    queryKey: ["suppliers", {}],
    url: "/suppliers",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const { data: productData } = useGeneralQuery<GetManyProps<ProductProps>>({
    queryKey: ["products", {}],
    url: "/products",
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
  const productsOptions =
    productData?.data.map((product) => {
      return {
        label: `${product.name}`,
        value: product._id
      };
    }) || [];

  const handleAddStockDataForm = () => {
    const newValues = [...formFields.stockData, defaultStockDataValues];
    handleFormFieldChange({ key: "stockData", value: newValues });
  };

  const handleRemoveStockDataForm = (index: number) => {
    const newValues = formFields.stockData.filter((_, itemIndex) => {
      return itemIndex !== index;
    });
    handleFormFieldChange({ key: "stockData", value: newValues });
  };
  return (
    <DashboardLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      showScrollToTopButton
      isLoading={pageLoading}
    >
      <Container className="border border-gray-50">
        <div className="">
          <h1 className="text-xl font-light mb-2">{formTitle}</h1>
          <div className="my-5 grid md:grid-cols-3 gap-5">
            <InputField
              fieldKey="deliveryId"
              handleInputChange={handleFormFieldChange}
              label="Delivery Code"
              value={formFields?.deliveryId}
              isRequired
              disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
              isDisabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
            />
            <DatePicker
              fieldKey="receivedDate"
              onChange={handleFormFieldChange}
              label="Received Date"
              value={formFields?.receivedDate}
              isRequired
              disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
            />
          </div>
          <div>
            <InputField
              fieldKey="truckNumber"
              handleInputChange={handleFormFieldChange}
              label="Truck Number"
              value={formFields?.truckNumber}
              isRequired
              disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
                      <SelectField
                        fieldKey="productId"
                        onChange={(fieldData) =>
                          handleFormFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        label="Product"
                        options={productsOptions}
                        closeOnSelect
                        //   errorMessage={errors?.supplierId}
                        selectValue={data?.productId}
                        isSearchable
                        isRequired
                        isDisabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
                      />
                      <InputField
                        fieldKey={`batchId`}
                        handleInputChange={(fieldData) =>
                          handleFormFieldChange({
                            key: fieldData.key,
                            value: { fieldKey: "stockData", index, value: fieldData.value }
                          })
                        }
                        label="Batch Code"
                        value={data?.batchId}
                        isRequired
                        disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
                        min={0}
                        disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
                        min={0}
                        disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
                        disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
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
                        disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
                      />
                    </div>
                    {formFields?.status && formFields?.status === "pending" && (
                      <div className="flex items-end justify-end mt-3">
                        <span
                          className="cursor-pointer h-7 w-7 border rounded-full flex items-center justify-center peer hover:bg-red-500"
                          onClick={() => handleRemoveStockDataForm(index)}
                        >
                          <X className="text-gray peer-hover:text-white" size={18} />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {formFields?.status && formFields?.status === "pending" && (
              <div className="add-stock__button flex items-end justify-end">
                <Button
                  className="bg-transparent hover:bg-transparent text-primary h-0"
                  onClick={handleAddStockDataForm}
                  disabled={isLoading || Boolean(formFields?.status && formFields?.status !== "pending")}
                >
                  <Plus size={18} /> <span>Add stock</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-end justify-end gap-5">
          {formFields?.status && formFields?.status === "pending" && (
            <PrimaryButton
              text={buttonTitle}
              disabled={disabledButton || isLoading}
              loading={isLoading}
              onClick={onsubmitHandler}
            />
          )}
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default StockEditFieldsScreen;
