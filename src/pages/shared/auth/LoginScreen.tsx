import Preloader from "@/components/Preloader";
import PrimaryButton from "@/components/PrimayButton";
import InputField from "@/components/customFields/input/InputField";
import PasswordInput from "@/components/customFields/input/Password";
import { HandlerProps } from "@/components/customFields/type";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { formReducer, getErrorMessageFromApi } from "@/utils";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { Validator } from "@/validator";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginScreen = () => {
  const { axiosInstance, getAuth } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { saveAuthUser, authUser } = useContext(StoreContext) as StoreContextProps;
  const initialData = {
    password: "",
    email: ""
  };
  const [state, dispatch] = useReducer(formReducer(initialData), initialData);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const verifyUserIsAuthenticated = async () => {
    try {
      await getAuth();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    verifyUserIsAuthenticated();
    if (authUser && authUser.role) {
      navigate(`/dashboard/${authUser?.role}`);
    }
  }, [authUser]);

  const formFieldHandler = (data: HandlerProps) => {
    dispatch({ type: "UPDATE_FIELD", fieldName: data.key, value: data.value });
  };

  const handleUserLogin = async () => {
    const validator = new Validator<typeof initialData>({
      formData: { email: state.email, password: state.password },
      rules: {
        email: "required|isEmail",
        password: "required"
      }
    });

    validator.validate();

    if (validator.failed()) {
      dispatch({ type: "FIELD_HAS_ERRORS", errorMessages: validator.getValidationErrorsByIndex() });
      return;
    } else {
      dispatch({ type: "RESET_ERROR_FIELDS" });
    }

    try {
      dispatch({ type: "MAKE_REQUEST" });
      const { data } = await axiosInstance.post("/auth/login", { email: state.email, password: state.password });
      saveAuthUser(data.response);
      dispatch({ type: "RESET_FIELDS" });

      navigate(`/dashboard/${data.response.role}`);

      toast.success("Success", {
        description: "Login successful. Redirecting user"
      });
    } catch (error) {
      toast.error("Error", {
        description: getErrorMessageFromApi(error)
      });
    } finally {
      dispatch({ type: "REQUEST_DONE" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {isLoading ? (
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
                  value={state.email}
                  isRequired
                  label={{ text: "Email" }}
                  errorMessage={state.errors?.email}
                />
              </div>
              <div>
                <PasswordInput
                  name="password"
                  handleInputChange={formFieldHandler}
                  value={state.password}
                  isRequired
                  label={{ text: "Password" }}
                  errorMessage={state.errors?.password}
                />
                <div className="flex items-center justify-end text-sm mb-8 mt-3">
                  <Link to="/auth/forgot-password">Forgot Password</Link>
                </div>
              </div>
              <div className="mt-4">
                <PrimaryButton
                  text="Login"
                  onClick={handleUserLogin}
                  loading={state.isLoading}
                  disabled={state.isLoading}
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
