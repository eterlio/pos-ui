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
import { SupplierProps } from "@/interfaces/supplier";
import SupplierEditFields from "./SupplierEditFields";
import { hasValidPhone } from "@/utils";
import { PhoneProps } from "@/interfaces";

const UpdateSupplierScreen = () => {
  const params = useParams<{ id: string }>();
  const supplierId = params.id;
  const buttonTitle = "Update";
  const { addErrors, errors, resetError } = useError<any>();
  const { data } = useGeneralQuery<SupplierProps>({
    queryKey: ["supplier", supplierId],
    url: `/suppliers/${supplierId}`,
    enabled: true
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data!);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateSupplier", supplierId as string],
    url: `/suppliers/${supplierId}`
  });

  const validator = new Validator<SupplierProps>({
    formData: formValues,
    rules: {
      ...addressValidationProps.validation,
      name: "required|minLength:3",
      email: "required|isEmail",
      phone: "required|customValidator"
    },
    customFieldKeys: {
      ...addressValidationProps.customFields
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
            description: "Supplier details updated"
          });
          navigate("/suppliers");
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
    <SupplierEditFields
      pageTitle="Update Supplier"
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

export default UpdateSupplierScreen;
