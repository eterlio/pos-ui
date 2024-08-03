import PrimaryButton from "@/components/PrimaryButton";
import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import { HandlerProps } from "@/components/customFields/type";
import { channels } from "@/defaults";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { Channels, SettingsProps } from "@/interfaces/settings";
import { FC, memo } from "react";
import { toast } from "sonner";

interface ChannelsProps {
  mutate: any;
  data?: SettingsProps["notification"]["notificationChannels"];
  isPending?: boolean;
}

const ChannelsScreen: FC<ChannelsProps> = ({ mutate, data, isPending }) => {
  const { formValues, updateFormFieldValue } = useFormFieldUpdate({ notificationChannels: data });

  const handleFormFieldChange = (formData: HandlerProps, channel: Channels) => {
    let updatedData = formValues?.notificationChannels?.map((ch) => {
      return ch.type === channel ? { ...ch, enabled: formData.value } : ch;
    });

    // Check if the channel exists in the formValues
    const channelExists = formValues?.notificationChannels?.some((ch) => ch.type === channel);

    // If the channel doesn't exist, add it to the updatedData
    if (!channelExists) {
      updatedData = [...(formValues?.notificationChannels || []), { enabled: formData.value, type: channel }];
    }

  

    updateFormFieldValue(formData.key, updatedData);
  };

  const handleChannelSubmit = () => {
    mutate(
      { payload: { notification: formValues } },
      {
        async onSuccess() {
          toast.success("Success", {
            description: "Channels updated"
          });
        }
      }
    );
  };

  return (
    <>
      <div className="py-4">
        <h1 className="text-lg">Channels</h1>
        <p className="text-[12px] text-gray-500">
          Channels allow you to select the medium to which notifications can be sent
        </p>
      </div>

      <div className="my-10 space-y-2">
        {channels.map((channel, index) => {
          return (
            <CheckBoxField
              label={channel}
              value={formValues?.notificationChannels?.find((ch) => ch.type === channel)?.enabled || false}
              checked={formValues?.notificationChannels?.find((ch) => ch.type === channel)?.enabled || false}
              handleFieldChange={(e) => handleFormFieldChange(e, channel)}
              key={index}
              id={`notificationChannels_${index}`}
              fieldKey="notificationChannels"
            />
          );
        })}
      </div>
      <div className="my-4 flex items-end justify-end">
        <PrimaryButton
          text="Save Changes"
          className="w-1/4"
          onClick={handleChannelSubmit}
          disabled={isPending}
          loading={isPending}
        ></PrimaryButton>
      </div>
    </>
  );
};

export default memo(ChannelsScreen);
