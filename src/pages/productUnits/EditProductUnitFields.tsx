import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import InputField from "@/components/customFields/input/InputField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { FC } from "react";

interface EditProductUnitFieldsProps {
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
const EditProductUnitFields: FC<EditProductUnitFieldsProps> = ({
  handleFormFieldChange,
  onsubmitHandler,
  formFields,
  errors,
  isLoading,
  buttonTitle,
  pageTitle,
  disabledButton,
  formTitle,
  pageDescription
}) => {
  return (
    <DashboardLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <Container className="border border-gray-50">
        <h1>{formTitle}</h1>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            fieldKey="title"
            handleInputChange={handleFormFieldChange}
            label="Unit title"
            isRequired
            errorMessage={errors?.title}
            value={formFields?.title}
            disabled={isLoading}
            placeholder="Eg: Kilograms"
          />
          <InputField
            fieldKey="name"
            handleInputChange={handleFormFieldChange}
            label="Unit name"
            isRequired
            errorMessage={errors?.name}
            value={formFields?.name}
            disabled={isLoading}
            placeholder="Eg: kg"
          />
        </div>
        <div>
          <TextAreaField
            fieldKey="description"
            handleInputChange={handleFormFieldChange}
            label="Unit description"
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

export default EditProductUnitFields;
