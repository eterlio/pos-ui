import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SelectField from "@/components/customFields/Select/SelectField";
import AddressBox from "@/components/customFields/address/AddressBox";
import DatePicker from "@/components/customFields/date/DatePicker";
import InputField from "@/components/customFields/input/InputField";
import PhoneInputField from "@/components/customFields/input/Phone";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { GENDER_OPTIONS } from "@/utils";
import { FC } from "react";

interface CustomerEditFieldsProps {
  buttonTitle: string;
  formFields: Record<string, any>;
  onsubmitHandler: () => void;
  handleFormFieldChange: (data: HandlerProps) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
  pageTitle?: string;
  disabledButton?: boolean;
  disableField?: boolean;
}
const CustomerEditFields: FC<CustomerEditFieldsProps> = ({
  handleFormFieldChange,
  onsubmitHandler,
  formFields,
  errors,
  isLoading,
  buttonTitle,
  pageTitle,
  disabledButton,
  disableField
}) => {
  return (
    <DashboardLayout
      pageTitle={pageTitle}
      pageDescription="Fill the details to create a customer"
      isLoading={isLoading}
    >
      <Container>
        <div>
          <h1>{pageTitle}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-5 gap-x-5">
            <InputField
              fieldKey="firstName"
              handleInputChange={handleFormFieldChange}
              label="First Name"
              value={formFields?.firstName}
              isRequired
              errorMessage={errors?.firstName}
              disabled={isLoading || disableField}
            />
            <InputField
              fieldKey="lastName"
              handleInputChange={handleFormFieldChange}
              label="Last Name"
              value={formFields?.lastName}
              isRequired
              errorMessage={errors?.lastName}
              disabled={isLoading || disableField}
            />
            <InputField
              fieldKey="email"
              handleInputChange={handleFormFieldChange}
              label="Supplier Email"
              value={formFields?.email}
              isRequired
              errorMessage={errors?.email}
              disabled={isLoading || disableField}
            />
            <PhoneInputField
              fieldKey="phone"
              handleInputChange={handleFormFieldChange}
              isRequired
              errorMessage={errors?.phone}
              value={formFields?.phone}
              label="Phone"
              disabled={isLoading || disableField}
            />
            <SelectField
              options={GENDER_OPTIONS}
              closeOnSelect
              isRequired
              onChange={handleFormFieldChange}
              label={"Gender"}
              fieldKey={"gender"}
              selectValue={formFields?.gender}
              errorMessage={errors?.gender}
              isDisabled={isLoading || disableField}
              key={formFields?.gender}
            />
            <DatePicker
              fieldKey="dateOfBirth"
              disabled={isLoading || disableField}
              onChange={handleFormFieldChange}
              value={formFields?.dateOfBirth}
              label={"Date of birth"}
            />
          </div>
        </div>
        <AddressBox
          fieldKey="address"
          values={formFields?.address}
          onChange={handleFormFieldChange}
          errors={errors as any}
          disabled={isLoading || disableField}
        />
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

export default CustomerEditFields;
