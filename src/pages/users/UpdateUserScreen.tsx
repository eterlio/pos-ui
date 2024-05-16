import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { useCreateMutation, useFetchUserQuery } from "@/hooks/request/useUserRequest";
import { useNavigate, useParams } from "react-router-dom";
import EditUserFields from "./EditUserFields";
import { useHandlerUserFormFieldValidation } from "@/hooks/useHandlerUserFormFieldValidation";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { useEffect } from "react";
import { objectDifference } from "@/helpers";

const UpdateUserScreen = () => {
  const { isPending, mutate } = useCreateMutation();
  const params = useParams<{ id: string }>();
  const { data, isFetching } = useFetchUserQuery(params.id as string);
  const { errors, resetError, addErrors } = useError<typeof data>();

  const { validate } = useHandlerUserFormFieldValidation(true);
  const navigate = useNavigate();

  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(data);

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

  const updateUserHandler = async () => {
    const { errorObj, formIsValid } = validate<typeof formValues>(formValues);
    console.log("HELLO WORLD", { formIsValid });

    if (!formIsValid) {
      addErrors(errorObj);
      return;
    } else {
      resetError();
    }
    const dd = objectDifference(data, formValues);
    console.log({ dd });

    // mutate(
    //   { payload: formValues as UserProps },
    //   {
    //     onSuccess: () => {
    //       toast.success("Success", {
    //         description: "User created"
    //       });
    //       navigate("/users");
    //     }
    //   }
    // );
  };

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [params.id, data]);

  return (
    <DashboardLayout pageTitle="Create User" isLoading={isFetching}>
      <EditUserFields
        buttonTitle="Update"
        formFields={formValues as Record<string, any>}
        errors={errors as any}
        handleFormFieldChange={handleFormFieldChange}
        onSubmitHandler={updateUserHandler}
        isLoading={isPending}
        pageTitle="Update User Information"
        key={params.id}
      />
    </DashboardLayout>
  );
};

export default UpdateUserScreen;
