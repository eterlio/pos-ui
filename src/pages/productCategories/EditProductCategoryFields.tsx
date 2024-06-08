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
  pageTitle: string;
  disabledButton?: boolean;
  formTitle: string;
  pageDescription: string;
}
const EditProductCategoryFields: FC<EditProductCategoryFieldsProps> = ({
  handleFormFieldChange,
  onsubmitHandler,
  formFields,
  errors,
  isLoading,
  buttonTitle,
  pageTitle,
  disabledButton,
  pageDescription,
  formTitle
}) => {
  return (
    <DashboardLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <Container className="border border-gray-50">
        <h1>{formTitle}</h1>
        <div className="grid grid-cols-1 gap-5">
          <InputField
            fieldKey="name"
            handleInputChange={handleFormFieldChange}
            label="Category name"
            isRequired
            errorMessage={errors?.name}
            value={formFields?.name}
            disabled={isLoading}
          />
        </div>
        <div>
          <TextAreaField
            fieldKey="description"
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
