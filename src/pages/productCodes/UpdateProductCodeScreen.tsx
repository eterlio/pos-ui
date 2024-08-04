import { HandlerProps } from "@/components/customFields/type";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Validator } from "@/validator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { objectDifference } from "@/helpers";
import { useEffect } from "react";
import EditProductCodeFields from "./EditProductCodeFields";
import { ProductCodeProps } from "@/interfaces/productCode";

interface ValidatorProps {
  code: string;
  description: string;
}
const UpdateProductCodeScreen = () => {
  const params = useParams<{ id: string }>();
  const codeId = params.id;
  const buttonTitle = "Update";
  const { addErrors, errors, resetError } = useError<ValidatorProps>();
  const { data } = useGeneralQuery<ProductCodeProps>({
    queryKey: ["productCode", codeId],
    url: `/product-codes/${codeId}`,
    enabled: true
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateCode", codeId as string],
    url: `/product-codes/${codeId}`
  });
  const validator = new Validator<Partial<ValidatorProps>>({
    formData: formValues as ValidatorProps,
    rules: {
      description: "required|minLength:3",
      code: "required:minLength:3"
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
            description: "Product code updated"
          });
          navigate("/product-codes");
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
    <EditProductCodeFields
      pageTitle="Update Product Code"
      buttonTitle={buttonTitle}
      formFields={formValues as Record<string, any>}
      handleFormFieldChange={handleFormFieldChange}
      onsubmitHandler={onsubmitHandler}
      errors={errors as Record<string, any>}
      isLoading={isPending}
      disabledButton={!Object.keys(payload).length}
      formTitle="Product code information"
      pageDescription="Update the product details"
    />
  );
};

export default UpdateProductCodeScreen;
