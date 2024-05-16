import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { useCreateMutation } from "@/hooks/request/useUserRequest";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EditUserFields from "./EditUserFields";
import { useHandlerUserFormFieldValidation } from "@/hooks/useHandlerUserFormFieldValidation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";

const CreateUserScreen = () => {
  const userDefaultObj = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
    phone: {
      prefix: "",
      number: "",
      country: ""
    },
    status: "pending",
    userPermission: null,
    confirmPassword: "",
    gender: ""
  };
  const { isPending, mutate } = useCreateMutation();
  const { validate } = useHandlerUserFormFieldValidation();
  const navigate = useNavigate();
  const { errors, resetError, addErrors } = useError<typeof userDefaultObj>();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(userDefaultObj);

  const handleFormFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    if (data.key === "role") {
      if (data.value === "admin") {
        updateFormFieldValue(key, "*");
      } else {
        updateFormFieldValue(key, value);
      }
    }
    updateFormFieldValue(key, value);
  };
  const createUserHandler = async () => {
    const { errorObj, formIsValid } = validate<typeof formValues>(formValues);

    console.log({ errorObj, formIsValid });

    if (!formIsValid) {
      return addErrors(errorObj);
    } else {
      resetError();
    }

    mutate(
      { payload: formValues as any },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "User created"
          });
          navigate("/users");
        }
      }
    );
  };
  return (
    <DashboardLayout pageTitle="Create User">
      <EditUserFields
        buttonTitle="Create"
        formFields={formValues}
        handleFormFieldChange={handleFormFieldChange}
        onSubmitHandler={createUserHandler}
        errors={errors as any}
        isLoading={isPending}
        isNew
        pageTitle="Create user information"
      />
    </DashboardLayout>
  );
};

export default CreateUserScreen;
