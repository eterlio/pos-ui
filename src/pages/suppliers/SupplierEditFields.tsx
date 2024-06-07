import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SelectField from "@/components/customFields/Select/SelectField";
import AddressBox from "@/components/customFields/address/AddressBox";
import InputField from "@/components/customFields/input/InputField";
import PhoneInputField from "@/components/customFields/input/Phone";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { FC } from "react";

interface SupplierEditFieldsProps {
  buttonTitle: string;
  formFields: Record<string, any>;
  onsubmitHandler: () => void;
  handleFormFieldChange: (data: HandlerProps) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
  pageTitle?: string;
  disabledButton?: boolean;
}
const SupplierEditFields: FC<SupplierEditFieldsProps> = ({
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
      pageTitle="Create Supplier"
      pageDescription="Fill the details to create a supplier"
    >
      <Container>
        <div>
          <h1>{pageTitle}</h1>
          <div className="grid md:grid-cols-3 gap-5">
            <InputField
              fieldKey="name"
              handleInputChange={handleFormFieldChange}
              label="Supplier Name"
              value={formFields?.name}
              isRequired
              errorMessage={errors?.name}
              disabled={isLoading}
            />
            <InputField
              fieldKey="email"
              handleInputChange={handleFormFieldChange}
              label="Supplier Email"
              value={formFields?.email}
              isRequired
              errorMessage={errors?.email}
              disabled={isLoading}
            />
            <PhoneInputField
              fieldKey="phone"
              handleInputChange={handleFormFieldChange}
              isRequired
              errorMessage={errors?.phone}
              value={formFields?.phone}
              label="Phone"
              disabled={isLoading}
            />
          </div>
        </div>
        <AddressBox
          fieldKey="address"
          values={formFields?.address}
          onChange={handleFormFieldChange}
          errors={errors as any}
          disabled={isLoading}
        />
        <div className="grid md:grid-cols-3 gap-5">
          <SelectField
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" }
            ]}
            onChange={handleFormFieldChange}
            fieldKey="status"
            label="Status"
            selectValue={formFields?.status}
            isDisabled={isLoading}
            isRequired
            errorMessage={errors?.status}
          />
        </div>
        <PrimaryButton
          text={buttonTitle}
          onClick={onsubmitHandler}
          loading={isLoading}
          className="md:w-[200px]"
          disabled={disabledButton || isLoading}
        />
      </Container>
    </DashboardLayout>
  );
};

export default SupplierEditFields;
