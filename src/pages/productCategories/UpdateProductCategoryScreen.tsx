import { HandlerProps } from "@/components/customFields/type";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Validator } from "@/validator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EditProductCategoryFields from "./EditProductCategoryFields";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { ProductCategoryProps } from "@/interfaces/productCategories";
import { objectDifference } from "@/helpers";
import { useEffect } from "react";

interface ValidatorProps {
  name: string;
  description: string;
  slug: string;
}
const UpdateProductCategoryScreen = () => {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const buttonTitle = "Update";
  const { addErrors, errors, resetError } = useError<ValidatorProps>();
  const { data } = useGeneralQuery<ProductCategoryProps>({
    queryKey: ["productCategory", categoryId],
    url: `/product-categories/${categoryId}`,
    enabled: !!categoryId
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateCategory", categoryId as string],
    url: `/product-categories/${categoryId}`
  });
  const validator = new Validator<Partial<ValidatorProps>>({
    formData: formValues as ValidatorProps,
    rules: {
      description: "required|minLength:5",
      name: "required:minLength:3"
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
            description: "Product category updated"
          });
          navigate("/product-categories");
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
    <EditProductCategoryFields
      pageTitle="Update Product Category"
      buttonTitle={buttonTitle}
      formFields={formValues as Record<string, any>}
      handleFormFieldChange={handleFormFieldChange}
      onsubmitHandler={onsubmitHandler}
      errors={errors as Record<string, any>}
      isLoading={isPending}
      disabledButton={!Object.keys(payload).length}
      formTitle="Product category information"
      pageDescription="Edit the fields to update the product category"
    />
  );
};

export default UpdateProductCategoryScreen;
