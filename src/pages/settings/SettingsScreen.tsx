import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import Navigation from "./components/navigation";
import SubNavigation from "./components/subNavigation";
import Content from "./components/content";
import useSettingsStore from "@/store/settings";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { SettingsProps } from "@/interfaces/settings";

type Nav = "general" | "notification" | "integrations" | "advanced";

const SettingsScreen: React.FC = () => {
  const { getQueryParam, setQueryParam } = useSetQueryParam();
  const { settings, setSettings } = useSettingsStore();
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    url: "/settings",
    mutationKey: ["settings"],
    requireAuth: true
  });
  const { data, isFetching } = useGeneralQuery<SettingsProps>({
    queryKey: ["settings"],
    url: "/settings",
    enabled: true
  });

  const navOptions: { [key in Nav]: { subLinks: string[] } } = useMemo(
    () => ({
      general: { subLinks: ["Store Information", "Invoicing", "Taxation", "Payment"] },
      notification: { subLinks: ["Channels", "Preferences"] },
      integrations: { subLinks: [] },
      advanced: { subLinks: [] }
    }),
    []
  );

  const initialNav = (getQueryParam("sideNav") as Nav) || "general";
  const [currentNav, setCurrentNav] = useState<Nav>(initialNav);
  const initialSubLink = getQueryParam("subLink") || navOptions[currentNav].subLinks[0];
  const [currentSubLink, setCurrentSubLink] = useState(initialSubLink);

  const handleNavChange = useCallback((nav: Nav) => {
    setCurrentNav(nav);
    setQueryParam("sideNav", nav);
    if (!navOptions[nav].subLinks.includes(currentSubLink)) {
      const newSubLink = navOptions[nav].subLinks[0] || "";
      setCurrentSubLink(newSubLink);
      setQueryParam("subLink", newSubLink);
    }
  }, []);

  const handleSubNavChange = useCallback((link: string) => {
    setCurrentSubLink(link);
    setQueryParam("subLink", link);
  }, []);

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  return (
    <DashboardLayout pageTitle="Settings" isLoading={isFetching}>
      <div className="flex w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 pt0">
          <div className="mx-auto grid w-full max-w-6xl gap-2"></div>
          <div className="mx-auto grid w-full max-w-6xl items-start lg:grid-cols-[220px_1fr]">
            <Navigation currentNav={currentNav} navOptions={navOptions} handleNavChange={handleNavChange} />
            <div className="grid gap-6">
              {navOptions[currentNav].subLinks.length > 0 && (
                <SubNavigation
                  currentSubLink={currentSubLink}
                  subLinks={navOptions[currentNav].subLinks}
                  handleSubNavChange={handleSubNavChange}
                />
              )}
              <div className="p-5 bg-white rounded">
                <Content
                  currentNav={currentNav}
                  currentSubLink={currentSubLink}
                  settings={settings}
                  isPending={isPending}
                  mutate={mutate}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default memo(SettingsScreen);
