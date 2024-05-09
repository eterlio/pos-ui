import { Input } from '@/components/ui/input';
import { MessageSquare, BellIcon, Menu } from 'lucide-react';
import { MouseEventHandler } from 'react';
import UserNav from './UserNav';
const Header = ({
  handleDisplaySidebar,
  showHeaderSearchBar,
  showNotification,
  displaySidebar
}: {
  handleDisplaySidebar: MouseEventHandler;
  showHeaderSearchBar?: boolean;
  showNotification?: boolean;
  displaySidebar?: boolean;
}) => {
  return (
    <div className="header-container bg-white sticky top-0 z-[5] shadow-sm">
      <header className="flex h-[56px] items-center justify-between px-8  sticky top-0" role="banner">
        <div className="flex flex-1 items-center gap-5 mr-2">
          {displaySidebar && <Menu className=" cursor-pointer" onClick={handleDisplaySidebar} />}
          {showHeaderSearchBar && (
            <Input type="email" placeholder="Search..." className="bg-[#fafafa] lg:flex md:w-[300px] lg:w-[300px]" />
          )}
        </div>
        <div className="flex items-center justify-end flex-shrink-0 gap-5">
          {showNotification && (
            <>
              <div className="message-box">
                <MessageSquare size={19} />
              </div>
              <div className="notification-icon">
                <BellIcon size={19} />
              </div>
            </>
          )}
          <div className="avatar">
            <UserNav  />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
