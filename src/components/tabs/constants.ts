import {
    ArrowRightLeft,
    GitPullRequestDraft,
    HeartHandshake,
    LampWallDown,
    LucideBookUp,
    LucideIcon,
    Settings,
    Wallet,
  } from "lucide-react";
  
  export type TABS =
    | "overview"
    | "view_list"
    | "summary"
    | "payments"
    | "transactions"
    | "sponsorships"
    | "activities"
    | "wallets"
    | "details"
    | "settings";
  export const TABS: { label: string; value: TABS }[] = [
    {
      label: "Overview",
      value: "overview",
    },
    {
      label: "View List",
      value: "view_list",
    },
  ];
  
  export const CUSTOMER_UPDATE_TABS: {
    label: string;
    value: TABS;
    icon?: LucideIcon;
  }[] = [
    {
      label: "Summary",
      value: "summary",
      icon: LampWallDown,
    },
    {
      label: "Details",
      value: "details",
      icon: LucideBookUp,
    },
    {
      label: "Transactions",
      value: "transactions",
      icon: ArrowRightLeft,
    },
    {
      label: "Sponsorships",
      value: "sponsorships",
      icon: HeartHandshake,
    },
    {
      label: "Wallets",
      value: "wallets",
      icon: Wallet,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Settings,
    },
    {
      label: "Activities",
      value: "activities",
      icon: GitPullRequestDraft,
    },
  ];
  