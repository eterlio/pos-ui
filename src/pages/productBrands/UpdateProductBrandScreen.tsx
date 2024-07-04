import { HandlerProps } from "@/components/customFields/type";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Validator } from "@/validator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EditProductBrandFields from "./EditProductBrandFields";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { ProductCategoryProps } from "@/interfaces/productCategories";
import { objectDifference } from "@/helpers";
import { useEffect } from "react";

interface ValidatorProps {
  name: string;
  description: string;
}
const UpdateProductBrandScreen = () => {
  const params = useParams<{ id: string }>();
  const brandId = params.id;
  const buttonTitle = "Update";
  const { addErrors, errors, resetError } = useError<ValidatorProps>();
  const { data } = useGeneralQuery<ProductCategoryProps>({
    queryKey: ["productBrand", brandId],
    url: `/product-brands/${brandId}`,
    enabled: !!brandId
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateBrand", brandId as string],
    url: `/product-brands/${brandId}`
  });
  const validator = new Validator<Partial<ValidatorProps>>({
    formData: formValues as ValidatorProps,
    rules: {
      name: "required:minLength:3",
      description: "required|minLength:3"
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
            description: "Product brand updated"
          });
          navigate("/product-brands");
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
    <EditProductBrandFields
      pageTitle="Update Product Brand"
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

export default UpdateProductBrandScreen;
