import { ReactNode } from "react";
interface ContentProps {
  children: ReactNode;
}
const Content: React.FC<ContentProps> = ({ children }) => {
  const userDetails: Record<string, any> = {};
  return (
    <>
      {userDetails && userDetails.status === "pending" && (
        <div className="bg-yellow-100 p-5">
          <p className="text-yellow-900">Your account is not verified yet. Check your email to verify account</p>
        </div>
      )}
      <div className="dashboard-content p-8">{children}</div>
    </>
  );
};

export default Content;
