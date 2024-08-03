import PrimaryButton from "@/components/PrimaryButton";
import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import TextAreaField from "@/components/customFields/input/TextAreaField";

const InvoicingScreen = () => {
  const handleFieldChange = () => {};
  return (
    <div>
      <h1 className="text-lg">Invoicing</h1>
      <CheckBoxField fieldKey="" handleFieldChange={handleFieldChange} label={"Include Discount"} />
      <CheckBoxField fieldKey="" handleFieldChange={handleFieldChange} label={"Include Tax Breakdown"} />
      <CheckBoxField fieldKey="" handleFieldChange={handleFieldChange} label={"Include Product Details"} />
      <div className="mt-5">
        <TextAreaField fieldKey="" handleInputChange={handleFieldChange} label={"Invoice footer content"} />
      </div>
      <div className="my-4 flex items-end justify-end">
        <PrimaryButton text="Save Changes" className="w-1/4"></PrimaryButton>
      </div>
    </div>
  );
};

export default InvoicingScreen;
