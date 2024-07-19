import PrimaryButton from "@/components/PrimaryButton";
import ReminderScreen from "./component/ReminderScreen";
import { memo } from "react";

const PreferencesScreen = () => {
  return (
    <>
      <ReminderScreen />
      <div className="my-4 flex items-end justify-end">
        <PrimaryButton text="Save Changes" className="w-1/4"></PrimaryButton>
      </div>
    </>
  );
};

export default memo(PreferencesScreen);
