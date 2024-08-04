import React, { memo } from "react";
import { SettingsProps } from "@/interfaces/settings";
import InvoicingScreen from "../general/InvoicingScreen";
import StoreInformationScreen from "../general/StoreInformation";
import PreferencesScreen from "../notification/PreferencesScreen";
import ChannelsScreen from "../notification/ChannelsScreen";

interface ContentProps {
  currentNav: string;
  currentSubLink: string;
  settings: SettingsProps | null;
  isPending?: boolean;
  mutate: any;
}

const Content: React.FC<ContentProps> = ({ currentNav, currentSubLink, settings, mutate, isPending }) => {
  if (currentNav === "general") {
    if (currentSubLink === "Store Information")
      return (
        <StoreInformationScreen data={settings?.general?.storeInformation} mutate={mutate} isPending={isPending} />
      );
    if (currentSubLink === "Invoicing") return <InvoicingScreen />;
  }

  if (currentNav === "notification") {
    if (currentSubLink === "Preferences") return <PreferencesScreen />;
    if (currentSubLink === "Channels")
      return (
        <ChannelsScreen mutate={mutate} data={settings?.notification.notificationChannels} isPending={isPending} />
      );
  }

  return null;
};

export default memo(Content);
