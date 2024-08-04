import { HandlerProps } from "@/components/customFields/type";
import { defaultCustomer } from "@/defaults";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { hasValidPhone } from "@/utils";
import { Validator } from "@/validator";
import { PhoneProps } from "@/interfaces";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { addressValidationProps, objectDifference } from "@/helpers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CustomerProps } from "@/interfaces/customer";
import CustomerEditFields from "./CustomerEditFields";
const CreateCustomerScreen = () => {
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(defaultCustomer());
  const { errors, resetError, addErrors } = useError<any>();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["createCustomer"],
    url: "/customers"
  });
  const navigate = useNavigate();
  const handleChange = (data: HandlerProps) => {
    updateFormFieldValue(data.key, data.value);
  };
  const onsubmitHandler = () => {
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
    validator.validate();

    if (validator.failed()) {
      return addErrors(validator.getValidationErrorsByIndex());
    }
    resetError();

    const payload = objectDifference(defaultCustomer(), formValues);
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Customer created"
          });
          navigate("/customers");
        }
      }
    );
  };
  return (
    <CustomerEditFields
      buttonTitle="Create Customer"
      formFields={formValues}
      handleFormFieldChange={handleChange}
      onsubmitHandler={onsubmitHandler}
      disabledButton={isPending}
      isLoading={isPending}
      errors={errors as any}
      pageTitle="Create Customer"
    />
  );
};

export default CreateCustomerScreen;
