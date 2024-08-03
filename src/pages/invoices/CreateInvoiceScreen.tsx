import SelectField from "@/components/customFields/Select/SelectField";
import DatePicker from "@/components/customFields/date/DatePicker";
import DashboardLayout from "@/components/dashboard/Layout";
import PageContainer from "@/components/dashboard/PageContainer";
import { Button } from "@/components/ui/button";
import { PencilLine, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InvoiceItemModal from "./components/InvoiceItemModal";
import InvoiceItemHeader from "./components/InvoiceItemHeader";
import InvoiceItem from "./components/InvoiceItem";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import NumberField from "@/components/customFields/input/NumberField";
import { HandlerProps } from "@/components/customFields/type";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { invoiceDefault } from "@/defaults";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { CustomerProps } from "@/interfaces/customer";
import { GetManyProps } from "@/hooks/types";
import { OptionsProps } from "@/interfaces";
import {
  INVOICE_DISCOUNT_TYPE_OPTIONS,
  INVOICE_FREQUENCY_OPTIONS,
  InvoiceItem as InvoiceItemProps
} from "@/interfaces/invoice";
import { addMonths } from "date-fns";
import { ProductProps } from "@/interfaces/products";
import PrimaryButton from "@/components/PrimaryButton";
import { formatCurrency, objectDifference } from "@/helpers";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { toast } from "sonner";

const CreateInvoiceScreen = () => {
  const navigate = useNavigate();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(invoiceDefault());
  const invoiceItemDefault = {
    _id: "",
    quantity: 0,
    price: 0,
    name: ""
  };
  const {
    formValues: invoiceItemValues,
    updateFormFieldValue: updateInvoiceItemFormValue,
    setFormValues: resetInvoiceItemValues
  } = useFormFieldUpdate(invoiceItemDefault);
  const [showModal, setShowModal] = useState(false);
  const handleShowAddItemModal = () => {
    setShowModal(!showModal);
  };

  const handleFormFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    if (key && key === "invoiceDate") {
      updateFormFieldValue("dueDate", addMonths(value, 1));
    }
    if (key === "hasDiscount" && !value) {
      updateFormFieldValue("discount", undefined);
    }
    if (key === "discount.value" && value > 100) {
      updateFormFieldValue(key, 0);
    }
    updateFormFieldValue(key, value);
  };
  const handleInvoiceItemFormFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    const product = products?.data.find((prod) => prod._id === value);
    if (key === "_id") {
      updateInvoiceItemFormValue("price", product?.productSellingPrice);
    }
    updateInvoiceItemFormValue(key, value);
  };

  const { data: customers, isFetching } = useGeneralQuery<GetManyProps<CustomerProps[]>>({
    queryKey: ["customers"],
    url: "/customers",
    query: { deleted: false },
    enabled: true,
    requireAuth: true
  });
  const { data: products, isFetching: isFetchingProducts } = useGeneralQuery<GetManyProps<ProductProps[]>>({
    queryKey: ["products"],
    url: "/products",
    query: { deleted: false },
    enabled: true,
    requireAuth: true
  });

  const customerOptions: OptionsProps[] =
    customers?.data.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer._id || ""
      };
    }) || [];
  const productsOptions: OptionsProps[] =
    products?.data.map((product) => {
      return {
        label: `${product.name}`,
        value: product._id || ""
      };
    }) || [];

  const handleInvoiceItemAdded = (item: InvoiceItemProps) => {
    const getItem = productsOptions.find((prod) => prod.value === item._id);
    const finalItem = {
      ...item,
      name: getItem?.label
    };
    const items = formValues.items;
    items.push(finalItem);
    updateFormFieldValue("items", items);
    resetInvoiceItemValues(invoiceItemDefault);
  };
  const handleInvoiceItemRemove = (id: string) => {
    const items = formValues.items.filter((item) => item._id !== id);
    updateFormFieldValue("items", items);
  };
  const calculateDiscountAmount = function (totalItemAmount: number): number {
    if (formValues?.discount) {
      const invoiceValue = formValues?.discount.value || 0;
      if (formValues?.discount.type === "fixed") {
        return invoiceValue;
      } else if (formValues?.discount.type === "percentage") {
        return (invoiceValue / 100) * totalItemAmount;
      }
    }

    return 0;
  };
  const invoiceSubTotal = formValues.items.reduce((inc, item) => item.price * item.quantity + inc, 0);
  const invoiceDiscountTotal = calculateDiscountAmount(invoiceSubTotal);
  const payload = objectDifference(invoiceDefault(), formValues);

  const enableInvoiceButton = Boolean(formValues?.items.length && formValues?.customerId && formValues?.invoiceDate);

  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["createInvoice"],
    url: "/invoices"
  });
  const handleItemSubmit = () => {
    console.log(payload);
    mutate(
      { payload },
      {
        onSettled() {
          toast.success("Success", {
            description: "Invoice created"
          });
          navigate("/invoices");
        }
      }
    );
  };
  return (
    <DashboardLayout pageTitle="New invoice" isLoading={isFetching || isFetchingProducts}>
      <PageContainer>
        <div className="flex items-center justify-end">
          <div className="w-1/3">
            <SelectField
              options={customerOptions}
              fieldKey="customerId"
              label="Customer"
              onChange={handleFormFieldChange}
              selectValue={formValues?.customerId}
            />
          </div>
        </div>
        <div className="flex items-center justify-between relative">
          <div className="relative">
            <p className="text-gray-500 text-sm">BILLING FROM</p>
            <h1 className="text-2x font-medium">Oseikrom Hardware Enterprise</h1>
            <span className="text-xs">admin@oseikrom.com</span>
            <div className="my-7 text-sm">
              <p>P.O BOX 34, Agona Swdru</p>
              <p>Akwamkurom</p>
              <p>(233) 543814868</p>
              <Link to="" className="font-bold text-primary my-3 flex items-center gap-x-1">
                <span>
                  <PencilLine size={18} />
                </span>
                <span>Edit Info</span>
              </Link>
            </div>
          </div>
          <div className="absolute border-r h-full bg-red-50 left-1/2"></div>
          <div className="relative">
            <p className="text-gray-500 text-sm">BILLING TO</p>
            <h1 className="text-2x font-medium">Oseikrom Hardware Enterprise</h1>
            <span className="text-xs">admin@oseikrom.com</span>
            <div className="my-7 text-sm">
              <p>P.O BOX 34, Agona Swdru</p>
              <p>Akwamkurom</p>
              <p>(233) 543814868</p>
              <Link to="" className="font-bold text-primary my-3 flex items-center gap-x-1">
                <span>
                  <PencilLine size={18} />
                </span>
                <span>Edit Info</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-[40%] flex justify-between gap-x-4">
            <div className="flex-1">
              <DatePicker
                fieldKey="invoiceDate"
                label="Invoice Date"
                onChange={handleFormFieldChange}
                value={formValues?.invoiceDate}
              />
            </div>
            <div className="flex-1">
              <DatePicker
                fieldKey="dueDate"
                label="Invoice Due Date"
                onChange={handleFormFieldChange}
                value={formValues?.dueDate}
              />
            </div>
          </div>
        </div>

        {false && (
          <div className="recurring_container flex items-center justify-between gap-x-5">
            <div className="flex-1">
              <CheckBoxField
                fieldKey="isRecurring"
                label="Is invoice recurring?"
                handleFieldChange={handleFormFieldChange}
                value={formValues?.isRecurring}
              />
            </div>
            {formValues?.isRecurring && (
              <>
                <div className="flex-1">
                  <SelectField
                    options={INVOICE_FREQUENCY_OPTIONS}
                    label="Frequency"
                    fieldKey="recurrence.frequency"
                    onChange={handleFormFieldChange}
                    selectValue={formValues?.recurrence?.frequency}
                  />
                </div>
                <div className="flex-1">
                  <NumberField
                    fieldKey="recurrence.interval"
                    label="Interval"
                    handleInputChange={handleFormFieldChange}
                    value={formValues?.recurrence?.interval}
                  />
                </div>
                <div className="flex-1">
                  <NumberField
                    fieldKey="recurrence.cycle"
                    label="Cycle"
                    handleInputChange={handleFormFieldChange}
                    value={formValues?.recurrence?.cycle}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div className="items-container my-10 border py-5 px-10 space-y-5">
          <h1 className="font-medium">Invoice Details</h1>
          <InvoiceItemHeader />
          {formValues?.items &&
            formValues?.items.length > 0 &&
            formValues.items.map((item) => {
              return (
                <InvoiceItem
                  item={{ amount: item.price, name: item.name || "", quantity: item.quantity }}
                  key={item._id}
                  handleInvoiceItemRemove={handleInvoiceItemRemove}
                  id={item._id || ""}
                />
              );
            })}
        </div>
        <div className="add_item_container flex justify-end">
          <Button variant={"link"} className="font-bold" onClick={handleShowAddItemModal}>
            <span>
              <Plus size={16} />
            </span>
            <span>Add item</span>
          </Button>
        </div>

        {formValues?.items?.length > 0 && (
          <div className="discount_container flex items-center justify-between gap-x-5">
            <div className="flex-1">
              <CheckBoxField
                fieldKey="hasDiscount"
                label="Invoice has discount?"
                handleFieldChange={handleFormFieldChange}
                value={formValues?.hasDiscount}
                disabled={invoiceSubTotal === 0}
              />
            </div>
            {formValues?.hasDiscount && (
              <>
                <div className="flex-1">
                  <SelectField
                    options={INVOICE_DISCOUNT_TYPE_OPTIONS}
                    label="Discount Type"
                    fieldKey="discount.type"
                    onChange={handleFormFieldChange}
                    selectValue={formValues?.discount?.type}
                  />
                </div>
                <div className="flex-1">
                  <NumberField
                    fieldKey="discount.value"
                    handleInputChange={handleFormFieldChange}
                    label="Discount Value"
                    value={formValues?.discount?.value}
                    max={100}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div className="my-5 flex items-center justify-between gap-x-5">
          <div className="flex-1 w-full">
            <TextAreaField
              fieldKey="termsAndConditions"
              handleInputChange={handleFormFieldChange}
              label={"Terms and conditions"}
              value={formValues?.termsAndCondition}
            />
          </div>
          <div className="flex-1 w-full">
            <TextAreaField
              fieldKey="note"
              handleInputChange={handleFormFieldChange}
              label={"Notes"}
              value={formValues?.note}
            />
          </div>
        </div>
        <div className="flex item-center justify-end">
          <div className="w-1/2 flex items-end justify-end flex-col">
            <div className="invoice-summary flex-1 w-full text-right mb-5">
              <div className="text-sm flex items-end justify-end flex-col space-y-1">
                <p className="w-[40%] flex justify-between items-center">
                  <span>Sub Total: </span>
                  <span>{formatCurrency({ value: invoiceSubTotal })}</span>
                </p>
                <p className="w-[40%] flex justify-between items-center">
                  <span>
                    Discount(
                    {formValues?.discount?.type === "percentage"
                      ? `${formValues?.discount?.value || 0}%`
                      : formValues?.discount?.value || 0}
                    ):
                  </span>
                  <span>{formatCurrency({ value: invoiceDiscountTotal })}</span>
                </p>
                <p className="font-medium w-[40%] flex justify-between items-center">
                  <span>Total:</span> <span>{formatCurrency({ value: invoiceSubTotal - invoiceDiscountTotal })}</span>
                </p>
                <p className="font-medium w-[40%] flex justify-between items-center">
                  <span>Amount Due:</span>
                  <span>{formatCurrency({ value: invoiceSubTotal - invoiceDiscountTotal })}</span>
                </p>
              </div>
            </div>
            <div className="Submit-button w-1/3 flex justify-end flex-1">
              <PrimaryButton
                text="Save invoice"
                onClick={handleItemSubmit}
                disabled={!enableInvoiceButton || isPending || isFetching || isFetchingProducts}
                loading={isFetching || isFetchingProducts || isPending}
              />
            </div>
          </div>
        </div>
        {showModal && (
          <InvoiceItemModal
            handleShowModal={handleShowAddItemModal}
            showModal={showModal}
            invoiceItem={invoiceItemValues}
            handleFormFieldChange={handleInvoiceItemFormFieldChange}
            productOptions={productsOptions}
            emitInvoiceItem={handleInvoiceItemAdded}
          />
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default CreateInvoiceScreen;
