import PasswordInput from '@/components/customFields/input/Password';
import { HandlerProps } from '@/components/customFields/type';
import { Button } from '@/components/ui/button';
import { useBaseRequestService } from '@/hooks/request/useAxiosPrivate';
import { formReducer, getErrorMessageFromApi } from '@/utils';
import { useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPasswordScreen = () => {
  const location = useLocation();
  const { axiosInstance } = useBaseRequestService();
  const initialData = {
    password: '',
    confirmPassword: ''
  };
  const [state, dispatch] = useReducer(formReducer(initialData), initialData);

  const formFieldHandler = (data: HandlerProps) => {
    dispatch({ type: 'UPDATE_FIELD', fieldName: data.key, value: data.value });
  };

  const handleForgotPassword = async () => {
    const [, token] = location.search.split('=');
    dispatch({ type: 'MAKE_REQUEST' });

    try {
      await axiosInstance.put('/auth/reset-password', { password: state.password, confirmPassword: '', token });
      toast.success('Success', {
        description: 'Password reset successful'
      });
      dispatch({ type: 'RESET_FIELDS' });
    } catch (error) {
      toast.error('Error', {
        description: getErrorMessageFromApi(error)
      });
    } finally {
      dispatch({ type: 'REQUEST_DONE' });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="md:min-w-[450px] m-auto p-5 space-y-3">
        <div className="heading my-4 space-y-1">
          <h1 className="text-xl font-medium">Reset Password</h1>
          <p className="text-sm font-light">Enter your new password to reset the password</p>
        </div>
        <div>
          <PasswordInput
            name="password"
            handleInputChange={formFieldHandler}
            value={state.password}
            isRequired
            label={{ text: 'New Password' }}
          />
        </div>
        <div>
          <PasswordInput
            name="confirmPassword"
            handleInputChange={formFieldHandler}
            value={state.confirmPassword}
            isRequired
            label={{ text: 'Confirm password' }}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleForgotPassword} className="w-full">
            Submit
          </Button>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>
            <span className="text-gray-500">Already have an account?</span>{' '}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
