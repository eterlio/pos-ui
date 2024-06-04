import { Input } from "@/components/ui/input";
import { MessageSquare, BellIcon, Menu } from "lucide-react";
import { MouseEventHandler } from "react";
import UserNav from "./UserNav";

const Header = ({
  handleDisplaySidebar,
  showHeaderSearchBar,
  showNotification,
  // displaySidebar
}: {
  handleDisplaySidebar: MouseEventHandler;
  showHeaderSearchBar?: boolean;
  showNotification?: boolean;
  displaySidebar?: boolean;
}) => {
  return (
    <div className="header-container bg-white sticky top-0 z-[5]">
      <header className="flex h-[56px] items-center justify-between px-8 sticky top-0" role="banner">
        <div className="flex flex-1 items-center gap-5 mr-2">
          <Menu className="cursor-pointer block lg:hidden" onClick={handleDisplaySidebar} />
          {showHeaderSearchBar && (
            <Input
              type="email"
              placeholder="Search..."
              className="bg-gray-50 border-gray-50 md:w-[300px] lg:w-[300px]"
            />
          )}
        </div>
        <div className="flex items-center justify-end flex-shrink-0 gap-5">
          {showNotification && (
            <>
              <div className="message-box w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <div className="notification-icon w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center relative">
                <span className="w-2 h-2 block absolute top-[7px] right-[10px] rounded-full bg-green-400"></span>
                <BellIcon size={18} />
              </div>
            </>
          )}
          <div className="avatar">
            <UserNav />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
