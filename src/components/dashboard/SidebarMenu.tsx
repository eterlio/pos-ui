import React, { memo, useMemo } from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import { MenuSidebarRoute } from "@/route/sidebar";

interface SidebarMenuProps {
  title: string;
  routesData: MenuSidebarRoute[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ title, routesData }) => {
  const processedItems = useMemo(() => {
    return routesData.map((item) => ({
      ...item
    }));
  }, []);

  return (
    <div className="my-5">
      <p className="section-title  pl-3 text-[0.655rem] text-white font-bold">{title}</p>
      <ul>
        {processedItems &&
          processedItems.length &&
          processedItems.map((data, index) => {
            return (
              <SidebarMenuItem
                icon={data.icon && ((<data.icon size={19} className="group-hover:text-green-400" />) as any)}
                title={data.title}
                url={data.url}
                key={index}
                subLinks={data.subLinks}
                isDisabled={data.isDisabled}
                isVisible={data.isVisible}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default memo(SidebarMenu);
