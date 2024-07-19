import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Tabs from "../Tabs";
import Tab from "../Tab";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BellIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { memo, useState } from "react";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { NotificationActionType, NotificationProps } from "@/interfaces/notification";
import { GetManyProps } from "@/hooks/types";
import { startCase } from "lodash";
import { timeAgoOrDate } from "@/utils/time";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import Loader from "../Loader";
import useAuthStore from "@/store/auth";

const Shimmer = () => {
  return (
    <div className="flex gap-4 animate-pulse p-2 border-b mt-3">
      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};
const Notification = ({ hasUnreadNotification }: { hasUnreadNotification: boolean }) => {
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const { authUser } = useAuthStore();
  const { data: notifications, isFetching } = useGeneralQuery<GetManyProps<NotificationProps>>({
    queryKey: ["notification", openNotificationModal],
    url: "/notifications",
    requireAuth: true,
    query: {
      limit: 3
    },
    enabled: openNotificationModal
  });
  const { mutate, isPending } = useGeneralMutation({
    httpMethod: "patch",
    url: `/notifications/read`,
    mutationKey: ["notification"]
  });
  const handleReadNotification = (ids?: string[]) => {
    mutate({ payload: { ...(ids?.length && { ids }) } });
  };

  const hasNotifications = !!(notifications && notifications?.data?.length > 0);
  const hasAtLeastOneUnread = () => {
    if (!notifications?.data?.length) return false;
    return notifications.data.some((notification) => !notification.readUsers?.includes(authUser?._id || ""));
  };
  return (
    <div className="notification-icon w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center relative">
      {hasUnreadNotification && (
        <span className="w-2 h-2 block absolute top-[7px] right-[10px] rounded-full bg-green-400"></span>
      )}
      <DropdownMenu
        open={openNotificationModal}
        onOpenChange={(data) => {
          setOpenNotificationModal(data);
        }}
      >
        <DropdownMenuTrigger className="outline-none">
          <div className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center">
            <BellIcon size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[400px] rounded-md min-h-[150px] flex flex-col">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {hasAtLeastOneUnread() && (
              <Button
                className="bg-transparent h-2 hover:bg-transparent font-normal text-[12px] text-primary underline opacity-90"
                onClick={() => handleReadNotification()}
                disabled={isFetching || isPending}
              >
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>
          {isPending && (
            <div className="flex items-end justify-end mr-5">
              <Loader />
            </div>
          )}
          <div className="flex-1 px-2 h-full flex flex-col">
            {isFetching ? (
              <div className="flex flex-col gap-4">
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </div>
            ) : (
              <>
                {!hasNotifications && (
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-gray-500 text-[12px]">No notifications found</span>
                  </div>
                )}

                {hasNotifications && (
                  <Tabs>
                    <Tab label="All" value="all">
                      {notifications.data.map((notification, index) => {
                        return (
                          <div
                            className="notification-content hover:bg-gray-100 p-2 rounded mb-2 border-b flex gap-3 justify-between"
                            onClick={() => handleReadNotification([notification._id || ""])}
                            key={index}
                          >
                            <div className="notification-item flex items-start gap-4 flex-1">
                              <Link to="">
                                <Avatar className="h-8 w-8 outline-none">
                                  <AvatarImage src="https://github.com/shadcn.pg" alt="Avatar" />
                                  <AvatarFallback>
                                    {`${notification?.createdByData?.firstName?.[0]}${notification?.createdByData?.lastName?.[0]}` ||
                                      "N/A"}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <div>
                                <div className="text-sm font-medium">
                                  {notification?.createdByData?.fullName || "N/A"} {notification.message}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {notification.timestamp && timeAgoOrDate(notification.timestamp)} |
                                  {startCase(notification?.service)}
                                </div>
                                {notification.actions?.map((action, i) => {
                                  return (
                                    <span key={i}>
                                      {action.actionType === NotificationActionType.NAVIGATE && (
                                        <Link to={action.payload.url} className="text-xs underline">
                                          {action?.label}
                                        </Link>
                                      )}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            {!notification?.readUsers?.includes(authUser?._id || "") && (
                              <div className="h-2.5 w-2.5 bg-primaryButton rounded-full mt-1.5"></div>
                            )}
                          </div>
                        );
                      })}
                    </Tab>
                  </Tabs>
                )}
              </>
            )}
            {hasNotifications && notifications.data.length > 2 && (
              <div className="text-xs text-primary font-medium text-center mb-2">
                <Link to="">View All</Link>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(Notification);
