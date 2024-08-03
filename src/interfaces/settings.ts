import { DefaultPluginProps, PhoneProps } from ".";
import { UserRole } from "./user";

// Interface definitions
export interface PasswordPolicyProps {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialCharacters: boolean;
}

export interface SecuritySettingsProps {
  enableMFA: boolean;
  enableBiometrics: boolean;
  passwordPolicy: PasswordPolicyProps;
}
export type Channels = "SMS" | "Email" | "In-App";

export interface NotificationChannelProps {
  type: Channels;
  enabled: boolean;
}

export interface NotificationScheduleProps {
  startHour: number;
  endHour: number;
  timeZone: string;
}

type Preference = {
  channels: {
    [key in Channels]: {
      enabled: boolean;
    };
  };
  roles?: UserRole[];
};
export interface NotificationPreferencesProps {
  sendClientBirthdayMessages: Preference;
  sendInvoiceNotification: Preference;
  sendInvoiceReminder: Preference;
  sendDebitAlert: Preference;
  sendProductSaleReminder: Preference;
}

export interface NotificationSettingsProps {
  enableNotifications: boolean;
  notificationChannels: NotificationChannelProps[];
  notificationSchedule: NotificationScheduleProps;
  notificationPreferences: NotificationPreferencesProps;
}

export interface PaymentGatewayIntegrationProps {
  provider: string;
  apiKey: string;
  sandboxMode: boolean;
}

export interface AccountingSoftwareIntegrationProps {
  provider: string;
  apiKey: string;
  syncFrequency: "daily" | "weekly" | "monthly";
}

export interface IntegrationSettingsProps {
  paymentGateway?: PaymentGatewayIntegrationProps;
  accountingSoftware?: AccountingSoftwareIntegrationProps;
}

export interface AddressProps {
  isGpsAddress?: boolean;
  gpsAddress?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  poBox?: string;
  isPoBox?: boolean;
}

export interface StoreInformationProps {
  storeName: string;
  storeAddress: AddressProps;
  storePhone: PhoneProps;
  storeEmail: string;
  taxSettings: {
    taxType: string;
    taxRate: number;
  };
}

export interface RequiredFieldsProps {
  name: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
}

export interface CustomerInformationProps {
  takeClientInformation: boolean;
  requiredFields: RequiredFieldsProps;
}

export interface CashManagementProps {
  enableCashDrawer: boolean;
  enableCashCount: boolean;
  cashFloatAmount: number;
}

export interface PaymentSettingsProps {
  acceptedPaymentMethods: string[];
  defaultPaymentMethod: string;
  cashManagement: CashManagementProps;
}

export interface InvoiceSettingsProps {
  invoiceFormat: string;
  includeTaxBreakdown: boolean;
  includeDiscounts: boolean;
  includeProductDetails: boolean;
  receiptFooter: string;
}

export interface GeneralSettings {
  storeInformation: StoreInformationProps;
  customerInformation: CustomerInformationProps;
  paymentSettings: PaymentSettingsProps;
  invoiceSettings: InvoiceSettingsProps;
}

export interface EmployeeManagementProps {
  enableEmployeeManagement: boolean;
  enableTimeTracking: boolean;
  enableShiftManagement: boolean;
  roles: string[];
}

export interface SalesReportsProps {
  enableSalesReports: boolean;
  reportType: string;
  reportFrequency: "daily" | "weekly" | "monthly";
  enableInventoryReports: boolean;
}

export interface DataManagementProps {
  enableDataRetention: boolean;
  retentionPeriod: number;
  enableDataBackup: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
}

export interface CustomerManagementProps {
  enableCustomerManagement: boolean;
  enableCustomerGroups: boolean;
  enableLoyaltyProgram: boolean;
  loyaltyProgramType: string;
}

export interface AdvancedSettingsProps {
  employeeManagement: EmployeeManagementProps;
  salesReports: SalesReportsProps;
  dataManagement: DataManagementProps;
  customerManagement: CustomerManagementProps;
}

export interface SettingsProps extends DefaultPluginProps {
  security: SecuritySettingsProps;
  notification: NotificationSettingsProps;
  integrations: IntegrationSettingsProps;
  general: GeneralSettings;
  advanced: AdvancedSettingsProps;
  accountId?: string;
  warehouseId?: string;
}
