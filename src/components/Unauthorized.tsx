import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="my-4 font-bold text-3xl">Unauthorized</div>
      <p>You're not authorized to access this resource</p>
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
};

export default Unauthorized;
