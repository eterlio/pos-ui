import { useNavigate } from "react-router-dom";
import { HandlerProps } from "@/components/customFields/type";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { invoiceDefault } from "@/defaults";
import { addMonths } from "date-fns";
import { objectDifference } from "@/helpers";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { toast } from "sonner";
import InvoiceEditFields from "./components/InvoiceEditFields";

const CreateInvoiceScreen = () => {
  const navigate = useNavigate();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(invoiceDefault());

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

  const payload = objectDifference(invoiceDefault(), formValues);

  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["createInvoice"],
    url: "/invoices"
  });
  const handleItemSubmit = () => {
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Invoice created"
          });
          navigate("/invoices");
        }
      }
    );
  };
  return (
    <InvoiceEditFields
      buttonTitle="Save invoice"
      handleFormFieldChange={handleFormFieldChange}
      onsubmitHandler={handleItemSubmit}
      pageDescription="Fill the form to create a new invoice"
      pageTitle="New Invoice"
      disabledButton={isPending}
      formFields={formValues}
    />
  );
};

export default CreateInvoiceScreen;
