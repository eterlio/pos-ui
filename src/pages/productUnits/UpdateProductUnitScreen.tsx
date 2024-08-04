import { HandlerProps } from "@/components/customFields/type";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Validator } from "@/validator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EditProductUnitFields from "./EditProductUnitFields";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { ProductUnitProps } from "@/interfaces/productUnits";
import { objectDifference } from "@/helpers";
import { useEffect } from "react";

interface ValidatorProps {
  name: string;
  description: string;
  title: string;
}
const UpdateProductUnitScreen = () => {
  const params = useParams<{ id: string }>();
  const unitId = params.id;
  const buttonTitle = "Update";
  const { addErrors, errors, resetError } = useError<ValidatorProps>();
  const { data } = useGeneralQuery<ProductUnitProps>({
    queryKey: ["productUnit", unitId],
    url: `/product-units/${unitId}`,
    enabled: !!unitId
  });

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);
  const navigate = useNavigate();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateUnit", unitId as string],
    url: `/product-units/${unitId}`
  });
  const validator = new Validator<Partial<ValidatorProps>>({
    formData: formValues as ValidatorProps,
    rules: {
      description: "required|minLength:3",
      name: "required:minLength:3",
      title: "required:minLength:3"
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
            description: "Product unit updated"
          });
          navigate("/product-units");
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
    <EditProductUnitFields
      pageTitle="Update Product Unit"
      buttonTitle={buttonTitle}
      formFields={formValues as Record<string, any>}
      handleFormFieldChange={handleFormFieldChange}
      onsubmitHandler={onsubmitHandler}
      errors={errors as Record<string, any>}
      isLoading={isPending}
      disabledButton={!Object.keys(payload).length}
      formTitle="Product unit information"
      pageDescription="Edit the product unit to update the unit"
    />
  );
};

export default UpdateProductUnitScreen;
