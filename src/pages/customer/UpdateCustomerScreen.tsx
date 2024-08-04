import { HandlerProps } from "@/components/customFields/type";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Validator } from "@/validator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { addressValidationProps, objectDifference } from "@/helpers";
import { useEffect } from "react";
import { hasValidPhone } from "@/utils";
import { PhoneProps } from "@/interfaces";
import CustomerEditFields from "./CustomerEditFields";
import { CustomerProps } from "@/interfaces/customer";

const UpdateCustomerScreen = () => {
  const params = useParams<{ id: string }>();
  const customerId = params.id;
  const buttonTitle = "Update Customer";
  const { addErrors, errors, resetError } = useError<any>();
  const { data } = useGeneralQuery<CustomerProps>({
    queryKey: ["customer", customerId],
    url: `/customers/${customerId}`,
    enabled: true
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data!);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateCustomer", customerId as string],
    url: `/customers/${customerId}`
  });

  const validator = new Validator<CustomerProps>({
    formData: formValues,
    rules: {
      ...addressValidationProps.validation,
      firstName: "required|minLength:3",
      lastName: "required|minLength:3",
      email: "required|isEmail",
      phone: "required|customValidator"
    },
    customFieldKeys: {
      ...addressValidationProps.customFields,
      phone: "Phone",
      email: "Email",
      lastName: "Last name",
      firstName: "First name"
    }
  });
  validator.addCustomValidation({
    fieldKey: "phone",
    fieldPassed(value: PhoneProps) {
      return !!hasValidPhone(value);
    }
  });
  const handleFormFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    updateFormFieldValue(key, value);
  };

  const payload = objectDifference(data, formValues);

  const onsubmitHandler = () => {
    validator.validate();

    if (validator.failed()) {
      return addErrors(validator.getValidationErrorsByIndex());
    } else {
      resetError();
    }

    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Customer details updated"
          });
          navigate("/customers");
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
    <CustomerEditFields
      pageTitle="Update Customer"
      buttonTitle={buttonTitle}
      formFields={formValues as Record<string, any>}
      handleFormFieldChange={handleFormFieldChange}
      onsubmitHandler={onsubmitHandler}
      errors={errors as Record<string, any>}
      isLoading={isPending}
      disabledButton={!Object.keys(payload).length}
    />
  );
};

export default UpdateCustomerScreen;
