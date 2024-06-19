import { Input } from "@/components/ui/input";
import { MessageSquare, BellIcon, Menu } from "lucide-react";
import { MouseEventHandler } from "react";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
// import { StoreContext, StoreContextProps } from "@/utils/store";
// import { eventSourceHandler } from "@/lib/eventManager";
// import { EventSourceMessage } from "@microsoft/fetch-event-source";

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
  // const { authUser } = useContext(StoreContext) as StoreContextProps;

  // useEffect(() => {
  //   eventSourceHandler.setHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${authUser?.accessToken}`
  //   });

  //   const handleMessage = (msg: EventSourceMessage) => {
  //     console.log(msg);
  //   };

  //   eventSourceHandler.start(handleMessage);

  //   return () => {
  //     eventSourceHandler.stop();
  //   };
  // }, []);
  return (
    <div className="header-container bg-white sticky top-0 z-[5]">
      <header className="flex h-[56px] items-center justify-between px-8  sticky top-0" role="banner">
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
