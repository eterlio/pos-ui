import PrimaryButton from "@/components/PrimaryButton";
import AddressBox from "@/components/customFields/address/AddressBox";
import InputField from "@/components/customFields/input/InputField";
import PhoneInputField from "@/components/customFields/input/Phone";
import { HandlerProps } from "@/components/customFields/type";
import { defaultSettings } from "@/defaults";
import { objectDifference } from "@/helpers";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { GeneralSettings } from "@/interfaces/settings";
import { hasValidPhone } from "@/utils";
import { Validator } from "@/validator";
import { CameraIcon } from "lucide-react";
import { FC } from "react";
import { PhoneProps } from "@/interfaces";
import { toast } from "sonner";

interface StoreInformationProps {
  data?: GeneralSettings["storeInformation"];
  mutate: any;
  isPending?: boolean;
}
const StoreInformationScreen: FC<StoreInformationProps> = ({ data, mutate, isPending }) => {
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(data);
  const { addErrors, errors, resetError } = useError<typeof data>();
  const validator = new Validator<typeof data>({
    formData: formValues,
    rules: {
      storeEmail: "required:isEmail",
      storeName: "required|minLength:5",
      storePhone: "required|customValidator"
    },
    customFieldKeys: {
      storeEmail: "Store email",
      storeName: "Store name",
      storePhone: "Store phone"
    }
  });
  validator.addCustomValidation({
    fieldKey: "storePhone",
    fieldPassed(value: PhoneProps) {
      return !!hasValidPhone(value);
    }
  } as any);
  const handleFieldChange = (formData: HandlerProps) => {
    const { key, value } = formData;
    updateFormFieldValue(key, value);
  };

  const payload = objectDifference(defaultSettings().general.storeInformation, formValues);

  const handleFormSubmit = () => {
    validator.validate();
    if (validator.failed()) {
      addErrors(validator.getValidationErrorsByIndex());
    } else {
      resetError();
      mutate(
        { payload: { general: { storeInformation: payload } } },
        {
          async onSuccess() {
            toast.success("Success", {
              description: "Store information updated"
            });
          }
        }
      );
    }
  };
  return (
    <div>
      <h1 className="text-lg">Store Information</h1>
      <div className="flex justify-center mb-5 ">
        <div className="w-28 h-28 bg-red-200 rounded-full relative peer">
          <div className="absolute bottom-0 right-2 z-50">
            <CameraIcon />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-4">
        <InputField
          fieldKey="storeName"
          handleInputChange={handleFieldChange}
          label="Store Name"
          isRequired
          value={formValues?.storeName}
          errorMessage={errors?.storeName}
        />
        <InputField
          fieldKey="storeEmail"
          handleInputChange={handleFieldChange}
          label="Store Email"
          isRequired
          value={formValues?.storeEmail}
          errorMessage={errors?.storeEmail}
        />
      </div>
      <PhoneInputField
        fieldKey="storePhone"
        handleInputChange={handleFieldChange}
        label="Store Phone"
        isRequired
        value={formValues?.storePhone}
        errorMessage={errors?.storePhone}
      />
      <AddressBox fieldKey="storeAddress" onChange={handleFieldChange} values={formValues?.storeAddress} />

      <div className="my-4 flex items-end justify-end">
        <PrimaryButton
          text="Save"
          className="w-1/3"
          onClick={handleFormSubmit}
          disabled={isPending}
          loading={isPending}
        ></PrimaryButton>
      </div>
    </div>
  );
};

export default StoreInformationScreen;
