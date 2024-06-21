import { DefaultPluginProps } from ".";
import { UserRole } from "./users";

export interface NotificationProps extends DefaultPluginProps {
  id?: string;
  type: NotificationTypeProps;
  message: string;
  timestamp: Date;
  status?: NotificationStatusProps;
  priority: NotificationPriorityProps;
  actions?: NotificationActionProps[];
  read?: boolean;
  recipients: string[];
  recipientsByRole?: UserRole;
  context?: NotificationContextProps;
  metadata?: Record<string, any>;
  warehouseId?: string;
  accountId?: string;
  service?: "stock";
}

export enum NotificationTypeProps {
  TRANSACTION = "transaction",
  ALERT = "alert",
  SYSTEM = "system",
  PROMOTION = "promotion",
  REMINDER = "reminder"
}

export enum NotificationStatusProps {
  NEW = "new",
  VIEWED = "viewed",
  DISMISSED = "dismissed",
  ACTION_TAKEN = "action_taken"
}

export enum NotificationPriorityProps {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

export interface NotificationActionProps {
  label: string;
  actionType: NotificationActionType;
  payload?: any;
}

export enum NotificationActionType {
  NAVIGATE = "navigate",
  EXECUTE = "execute",
  MARK_AS_READ = "mark_as_read",
  DISMISS = "dismiss",
  CUSTOM = "custom"
}

interface NotificationContextProps {
  transactionId?: string;
  orderId?: string;
  customerId?: string;
  productId?: string;
  stockId?: string;
  [key: string]: any;
}
