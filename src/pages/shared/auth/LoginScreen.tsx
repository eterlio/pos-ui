import Preloader from "@/components/Preloader";
import PrimaryButton from "@/components/PrimaryButton";
import InputField from "@/components/customFields/input/InputField";
import PasswordInput from "@/components/customFields/input/Password";
import { HandlerProps } from "@/components/customFields/type";
import { useAuthLogin, useGetAuthUser } from "@/hooks/request/useAuthRequest";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { Validator } from "@/validator";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const authDefault = {
    password: "",
    email: ""
  };
  const { authUser } = useContext(StoreContext) as StoreContextProps;
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(authDefault);
  const { isFetching } = useGetAuthUser();
  const { mutateAsync, isPending } = useAuthLogin();
  const navigate = useNavigate();
  const { addErrors, errors, resetError } = useError<Partial<typeof formValues>>();

  useEffect(() => {
    if (authUser && authUser?.role) {
      navigate(`/dashboard/${authUser?.role}`);
    }
  }, [authUser]);
  const formFieldHandler = (data: HandlerProps) => {
    const { key, value } = data;
    updateFormFieldValue(key, value);
  };

  const handleUserLogin = async () => {
    const validator = new Validator<typeof formValues>({
      formData: formValues,
      rules: {
        email: "required|isEmail",
        password: "required"
      }
    });

    validator.validate();

    validator.validate();
    if (!validator.passed()) {
      return addErrors(validator.getValidationErrorsByIndex());
    } else {
      resetError();
    }

    await mutateAsync(formValues);
  };

  return (
    <div className="min-h-screen flex">
      {isFetching ? (
        <Preloader />
      ) : (
        <>
          <div className="min-h-full bg-red-200 flex-1 hidden md:block w-full"></div>
          <div className="flex items-center justify-center p-2 flex-1">
            <div className="md:max-w-[450px] m-auto p-5 w-full">
              <div className="heading my-4 space-y-1">
                <h1 className="text-xl font-medium">Login</h1>
                <p className="text-sm font-light">Enter your details to login</p>
              </div>
              <div>
                <InputField
                  name="email"
                  handleInputChange={formFieldHandler}
                  value={formValues.email}
                  isRequired
                  label={{ text: "Email" }}
                  errorMessage={errors?.email}
                />
              </div>
              <div>
                <PasswordInput
                  name="password"
                  handleInputChange={formFieldHandler}
                  value={formValues.password}
                  isRequired
                  label={{ text: "Password" }}
                  errorMessage={errors?.password}
                />
                <div className="flex items-center justify-end text-sm mb-8 mt-3">
                  <Link to="/auth/forgot-password">Forgot Password</Link>
                </div>
              </div>
              <div className="mt-4">
                <PrimaryButton
                  text="Login"
                  onClick={handleUserLogin}
                  loading={isFetching || isPending}
                  disabled={isFetching || isPending}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginScreen;
