import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import InputField from "@/components/customFields/input/InputField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { FC } from "react";

interface EditProductCategoryFieldsProps {
  buttonTitle: string;
  formFields: Record<string, any>;
  onsubmitHandler: () => void;
  handleFormFieldChange: (data: HandlerProps) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
  pageTitle?: string;
  disabledButton?: boolean;
}
const EditProductCategoryFields: FC<EditProductCategoryFieldsProps> = ({
  handleFormFieldChange,
  onsubmitHandler,
  formFields,
  errors,
  isLoading,
  buttonTitle,
  pageTitle,
  disabledButton
}) => {
  return (
    <DashboardLayout
      pageTitle="Create Product Category"
      pageDescription="Fill the details to create a product category"
    >
      <Container className="border border-gray-50">
        <h1>{pageTitle}</h1>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            name="name"
            handleInputChange={handleFormFieldChange}
            label="Category name"
            isRequired
            errorMessage={errors?.name}
            value={formFields?.name}
            disabled={isLoading}
          />
          <InputField
            name="slug"
            handleInputChange={handleFormFieldChange}
            label="Category slug"
            isRequired
            errorMessage={errors?.slug}
            value={formFields?.slug}
            disabled={isLoading}
          />
        </div>
        <div>
          <TextAreaField
            name="description"
            handleInputChange={handleFormFieldChange}
            label="Category description"
            isRequired
            errorMessage={errors?.description}
            value={formFields?.description}
            disabled={isLoading}
          />
        </div>
        <div>
          <div className="flex items-center justify-end">
            <PrimaryButton
              text={buttonTitle}
              onClick={onsubmitHandler}
              loading={isLoading}
              disabled={disabledButton || isLoading}
              className="md:w-[200px]"
            />
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default EditProductCategoryFields;
