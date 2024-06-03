import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SelectField from "@/components/customFields/Select/SelectField";
import AddressBox from "@/components/customFields/address/AddressBox";
import InputField from "@/components/customFields/input/InputField";
import PhoneInputField from "@/components/customFields/input/Phone";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { supplierDefaults } from "@/defaults";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";

const CreateSupplierScreen = () => {
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(supplierDefaults());
  const handleChange = (data: HandlerProps) => {
    updateFormFieldValue(data.key, data.value);
  };
  const onsubmitHandler = () => {};
  return (
    <DashboardLayout pageTitle="Create Supplier">
      <Container>
        <div>
          <h1 className="text-xl mb-4">Supplier Information</h1>
          <div className="grid md:grid-cols-3 gap-5">
            <InputField fieldKey="name" handleInputChange={handleChange} label="Supplier Name" />
            <InputField fieldKey="email" handleInputChange={handleChange} label="Supplier Email" />
            <PhoneInputField
              fieldKey="phone"
              handleInputChange={handleChange}
              isRequired
              errorMessage=""
              value={formValues.phone}
              label="Phone"
            />
          </div>
        </div>
        <AddressBox fieldKey="address" values={formValues.address} onChange={handleChange} />
        <div className="grid md:grid-cols-3 gap-5">
          <SelectField
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" }
            ]}
            onChange={handleChange}
            key="status"
            label="Status"
            selectValue={formValues.status}
          />
        </div>
        <PrimaryButton text={"Create Supplier"} onClick={onsubmitHandler} loading={false} className="md:w-[200px]" />
      </Container>
    </DashboardLayout>
  );
};

export default CreateSupplierScreen;
