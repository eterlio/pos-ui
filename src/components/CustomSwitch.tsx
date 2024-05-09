import { FC, ReactNode, useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

interface CustomSwitchProps {
  children: ReactNode;
}
TopBarProgress.config({
  barColors: {
    "0": "#ffb103",
    "1.0": "#fff",
  },
  shadowBlur: 5
});
const CustomSwitch: FC<CustomSwitchProps> = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
};

export default CustomSwitch;
