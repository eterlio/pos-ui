import SidebarMenu from "./SidebarMenu";
import { MouseEventHandler, memo } from "react";
import { generalSidebarRoutes, menuSidebarRoutes } from "@/route/sidebar";
import { ChevronsLeft } from "lucide-react";
const DashboardSidebar = ({
  displaySidebar,
  handleDisplaySidebar,
}: {
  displaySidebar: boolean;
  handleDisplaySidebar: MouseEventHandler;
}) => {
  return (
    <div
      className={`flex-shrink-0 overflow-x-hidden dark ${
        displaySidebar ? "left-[-100%] w-0" : "left-0"
      } w-[260px] lg:block md:block bg-white z-[900] shadow-md fixed bottom-0 top-0`}
    >
      <div className="h-full w-full p-5">
        <div className="flex h-full min-h-0 flex-col">
          <div className="relative h-full w-full flex-1 items-start border-white/20 flex flex-col">
            <div className="sidebar-main__content flex-grow w-full">
              <div className="logo mb-10 flex items-center justify-between">
                {/* <img src=Logo} alt="Logo" className="w-[120px]" /> */}
                <span>
                Logo
                </span>
                <ChevronsLeft  onClick={handleDisplaySidebar} className=" cursor-pointer" size={19}/>
              </div>
              <div className="menu-items">
                <SidebarMenu
                  title={menuSidebarRoutes.title}
                  routesData={menuSidebarRoutes.routeLinks}
                />
                <hr />
                <SidebarMenu
                  title={generalSidebarRoutes.title}
                  routesData={generalSidebarRoutes.routeLinks}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
};

export default memo(DashboardSidebar);
