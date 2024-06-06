import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import "../../../style/loader.css";
import { Check, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getErrorMessageFromApi } from "@/utils";
import { useEffect } from "react";

const VerifyAccountScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  const { isFetching, error, data } = useGeneralQuery<{ message: string }>({
    queryKey: ["verify-account"],
    url: `/auth/email/verify?token=${token}`
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isFetching && (
        <div>
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          <div className="mt-4 text-center text-lg font-medium text-gray-800">Verifying account...</div>
        </div>
      )}

      <div className="verify-container min-w-[600px] p-2">
        <div className="alert flex items-center justify-center">
          {data && (
            <div className="success flex-1  flex items-center justify-center flex-col space-y-3">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={30} strokeWidth={4} className="text-white" />
              </div>
              <h1 className="text-2xl">Account Verified</h1>
              <p>Account verified successfully.</p>
              <p>To ensure extra security, you can reset your password</p>
              <Link
                to="/auth/reset-password"
                className=" mt-2 h-10 bg-primary min-w-40 rounded-sm text-white text-center flex items-center justify-center"
              >
                Reset Password
              </Link>
              <p>OR</p>
              <Link to="/auth/login" className="text-gray-500 underline">
                I'll reset later
              </Link>
            </div>
          )}
          {error && (
            <div className="success flex-1  flex items-center justify-center flex-col space-y-3">
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
                <X size={30} strokeWidth={4} className="text-white" />
              </div>
              <h1 className="text-2xl">Account Verification failed</h1>
              <p>{getErrorMessageFromApi(error)}</p>
              <Link
                to="/auth/login"
                className=" mt-2 h-10 bg-primary min-w-40 rounded-sm text-white text-center flex items-center justify-center"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountScreen;
