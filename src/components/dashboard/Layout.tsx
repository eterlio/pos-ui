import { useState, type ReactNode } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Content from "@/components/dashboard/Content";
import HeaderTitle from "./HeaderTitle";
import Preloader from "../Preloader";
import { ActionButtonProps } from "@/interfaces";
// import BreadCrumb from "./BreadCrumb";
import { useMediaQuery } from "@uidotdev/usehooks";
interface DashboardLayoutProps {
  children: ReactNode;
  showScrollToTopButton?: boolean;
  showSidebar?: boolean;
  showHeader?: boolean;
  pageTitle: string;
  pageDescription?: string;
  showPageExporter?: boolean;
  actionButton?: ActionButtonProps;
  showHeaderSearchBar?: boolean;
  showNotification?: boolean;
  isLoading?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showScrollToTopButton = false,
  showHeader = true,
  showSidebar = true,
  pageTitle,
  pageDescription,
  showPageExporter = false,
  actionButton,
  showHeaderSearchBar = true,
  showNotification = true,
  isLoading
}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");  const handleDisplaySidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };
  const [displaySidebar, setDisplaySidebar] = useState(false || isSmallDevice);
  return (
    <>
      {isLoading && <Preloader />}
      <div className="overflow-hidden w-full h-screen relative flex z-0 bg-gray-50">
        {showSidebar && <Sidebar displaySidebar={displaySidebar} handleDisplaySidebar={handleDisplaySidebar} />}
        <div
          className={`main-content relative flex h-full max-w-full flex-1 overflow-hidden ml-0 ${
            displaySidebar ? "ml-0" : "md:ml-[260px] lg:ml-[260px]"
          }`}
        >
          <div className="flex h-full max-w-full flex-1 flex-col">
            <main className="relative h-full w-full transition-width overflow-auto flex-1">
              <div className="h-full" role="presentation">
                {showHeader && (
                  <Header
                    handleDisplaySidebar={handleDisplaySidebar}
                    showHeaderSearchBar={showHeaderSearchBar}
                    showNotification={showNotification}
                    displaySidebar={displaySidebar}
                  />
                )}
                <Content showScrollToTopButton={showScrollToTopButton}>
                  <HeaderTitle
                    pageTitle={pageTitle}
                    pageDescription={pageDescription}
                    showPageExporter={showPageExporter}
                    actionButton={actionButton}
                  />
                  {/* <BreadCrumb /> */}

                  {children}
                </Content>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
