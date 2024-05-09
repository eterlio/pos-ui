import PrimaryButton from "@/components/PrimayButton";
import InputField from "@/components/customFields/input/InputField";
import { HandlerProps } from "@/components/customFields/type";
import { BaseResponse } from "@/helpers/baseResponse";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { formReducer, getErrorMessageFromApi } from "@/utils";
import { Validator } from "@/validator";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgotPasswordScreen = () => {
  const initialData = {
    email: ""
  };
  const [state, dispatch] = useReducer(formReducer(initialData), initialData);
  const { axiosInstance } = useBaseRequestService();
  const formFieldHandler = (data: HandlerProps) => {
    dispatch({ type: "UPDATE_FIELD", fieldName: data.key, value: data.value });
  };
  const handleForgotPassword = async () => {
    const validator = new Validator<typeof initialData>({
      formData: { email: state.email },
      rules: {
        email: "required|isEmail"
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
      const {
        data: {
          response: { message }
        }
      } = await axiosInstance.patch<BaseResponse<{ message: string }>>("/auth/password-recovery", {
        email: state.email
      });
      toast.success("Success", {
        description: message
      });
      dispatch({ type: "RESET_FIELDS" });
    } catch (error) {
      toast.error("Error", {
        description: getErrorMessageFromApi(error)
      });
    } finally {
      dispatch({ type: "REQUEST_DONE" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="md:min-w-[450px] m-auto p-5">
        <div className="heading my-4 space-y-1">
          <h1 className="text-xl font-medium">Forgot Password</h1>
          <p className="text-sm font-light">Enter your email to and receive a password reset link</p>
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
        <div className="mt-4">
          <PrimaryButton
            text="Submit"
            loading={state.isLoading}
            disabled={state.isLoading}
            onClick={handleForgotPassword}
          />
        </div>
        <div className="mt-6 text-center text-sm">
          <p>
            <span className="text-gray-500">Already have an account?</span>{" "}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
