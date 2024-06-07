import { HandlerProps } from "@/components/customFields/type";
import { productDefaults } from "@/defaults";
import { objectDifference } from "@/helpers";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { ProductProps } from "@/interfaces/products";
import { Validator } from "@/validator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductEditFields from "./ProductEditFields";

const CreateProductScreen = () => {
  const navigate = useNavigate();
  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    if (key && key === "canExpire" && !value) {
      updateFormFieldValue("expirationDate", null);
    }
    updateFormFieldValue(key, value);
  };
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["createProduct"],
    url: "/products",
    requireAuth: true
  });
  const { addErrors, errors, resetError } = useError<ProductProps>();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(productDefaults());

  const handleSubmit = () => {
    const validator = new Validator<ProductProps>({
      formData: formValues as any,
      rules: {
        brandId: "required",
        availability: "required",
        categoryId: "required",
        description: "required|minLength:5",
        name: "required|minLength:5",
        barcodeSymbology: "required",
        productCodeId: "required",
        productSellingPrice: "required|isNumber|minValue:0.1",
        productUnitPrice: "required|isNumber|minValue:0.1",
        unitId: "required",
        status: "required|in:active,inactive,draft",
        supplierId: "required",
        weight: "required|isNumber"
      },
      customFieldKeys: {
        brandId: "Product brand",
        availability: "Availability",
        categoryId: "Product category",
        description: "Product description",
        name: "Product name",
        barcodeSymbology: "Barcode symbology",
        productCodeId: "Product code",
        productSellingPrice: "Selling price",
        productUnitPrice: "Unit price",
        unitId: "Product unit",
        status: "Status",
        supplierId: "Product Supplier",
        weight: "Weight"
      }
    });

    validator.validate();
    if (validator.failed()) {
      return addErrors(validator.getValidationErrorsByIndex());
    }
    resetError();

    const payload = objectDifference(productDefaults(), formValues);
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Product created"
          });
          navigate("/products");
        }
      }
    );
  };
  return (
    <ProductEditFields
      buttonTitle="Create Product"
      formFields={formValues}
      handleFormFieldChange={handleFieldChange}
      onsubmitHandler={handleSubmit}
      errors={errors}
      isLoading={isPending}
      pageTitle="Create Product"
      formTitle="Product Information"
      pageDescription="Fill the form to create a product"
    />
  );
};

export default CreateProductScreen;
