import { hasValidPhone } from "@/utils";
import { Validator } from "@/validator";
import { PhoneProps } from "@/interfaces";

export const useHandlerUserFormFieldValidation = (isNew?: boolean) => {

  const validate = <T>(formField: T) => {

    // const formData =  
    const validator = new Validator<Partial<typeof formField>>({
      formData: formField,
      rules: {
        firstName: "required|minLength:3|maxLength:20",
        lastName: "required|minLength:3|maxLength:20",
        email: "required|isEmail",
        phone: "required|customValidator",
        password: "required|isPassword",
        confirmPassword: "required|sameAs:password",
        gender: "required|in:male,female",
        status: "required|in:active,pending,inactive,suspended",
        role: "required:in:admin,manager,salesPersonnel"
      }
    });

    validator.addCustomValidation({
      fieldKey: "phone",
      fieldPassed(value: PhoneProps) {
        return !!hasValidPhone(value);
      }
    });
    validator.validate();

    console.log(validator.passed(), validator.errors());

    return {
      formIsValid: validator.passed(),
      errorObj: validator.getValidationErrorsByIndex() as T
    };
  };
  return { validate };
};
