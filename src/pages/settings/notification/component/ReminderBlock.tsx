import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import SwitchField from "@/components/customFields/combo/SwitchField";
import { UserRole } from "@/interfaces/user";
import { startCase } from "lodash";
import { FC } from "react";

type Channels = "SMS" | "Email" | "In-App";
interface ReminderBlockProps {
  title: string;
  description: string;
  handleFieldChange: () => void;
  rolesApplicable?: UserRole[];
  channels: Channels[];
}

const ReminderBlock: FC<ReminderBlockProps> = ({
  title,
  description,
  handleFieldChange,
  rolesApplicable,
  channels
}) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="">
        <div className="space-y-0.5 flex flex-1">
          <div className="flex-1">
            <h1 className="text-base">{title}</h1>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <div className="flex items-center flex-1 justify-end gap-x-5">
            {channels &&
              channels.length > 0 &&
              channels.map((channel) => {
                return <SwitchField handleFieldChange={handleFieldChange} label={channel} />;
              })}
          </div>
        </div>
      </div>
      <div>
        {rolesApplicable && rolesApplicable.length > 0 && (
          <>
            <p className="text-sm font-light">Select roles applicable</p>
            <div className="flex gap-x-5 flex-wrap">
              {rolesApplicable.map((role, index) => {
                return <CheckBoxField label={startCase(role.split("-").join(" "))} value={role} key={index} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReminderBlock;
