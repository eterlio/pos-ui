import { Input } from "@/components/ui/input";
import { MessageSquare, Menu } from "lucide-react";
import { MouseEventHandler, useContext, useEffect } from "react";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { eventSourceHandler } from "@/lib/eventManager";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import Notification from "./Notification";

const Header = ({
  handleDisplaySidebar,
  showHeaderSearchBar = true,
  showNotification,
  displaySidebar
}: {
  handleDisplaySidebar: MouseEventHandler;
  showHeaderSearchBar?: boolean;
  showNotification?: boolean;
  displaySidebar?: boolean;
}) => {
  const { authUser, setNotificationData, setHasUnreadNotificationData, hasUnreadNotification } = useContext(
    StoreContext
  ) as StoreContextProps;

  useEffect(() => {
    eventSourceHandler.setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${authUser?.accessToken}`
    });

    const handleMessage = (msg: EventSourceMessage) => {
      if (msg && msg.event && msg.event === "stock-taken") {
        const notification = JSON.parse(msg.data);
        setNotificationData(notification);
        setHasUnreadNotificationData(true);
      }
    };

    eventSourceHandler.start(handleMessage);

    return () => {
      eventSourceHandler.stop();
    };
  }, []);

  return (
    <div className="header-container bg-white sticky top-0 z-[5]">
      <header className="flex h-[56px] items-center justify-between px-8 sticky top-0" role="banner">
        <div className="flex flex-1 items-center gap-5 mr-2">
          {displaySidebar && <Menu className="cursor-pointer" onClick={handleDisplaySidebar} />}
          {showHeaderSearchBar && (
            <Input
              type="email"
              placeholder="Search..."
              className="bg-gray-50 border-gray-50 hidden md:w-[300px] lg:w-[300px]"
            />
          )}
          <Link
            className="flex items-center justify-center gap-5 ml-5 rounded border-dotted border-[1.9px] min-w-20 px-1 py-0.5 text-center border-primary text-primary"
            to="/pos"
          >
            POS
          </Link>
        </div>
        <div className="flex items-center justify-end flex-shrink-0 gap-5">
          {showNotification && (
            <>
              <div className="message-box w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <Notification hasUnreadNotification={hasUnreadNotification} />
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
