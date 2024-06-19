import { DefaultPluginProps } from ".";

// Interface definitions
interface PasswordPolicyProps {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialCharacters: boolean;
}

interface SecuritySettingsProps {
    enableMFA: boolean;
    enableBiometrics: boolean;
    passwordPolicy: PasswordPolicyProps;
}

interface NotificationChannelProps {
    type: string;
    enabled: boolean;
}

interface NotificationScheduleProps {
    startHour: number;
    endHour: number;
    timeZone: string;
}

interface NotificationPreferencesProps {
    sendClientBirthdayMessages: boolean;
    sendInvoiceNotification: boolean;
    sendDebitAlert: boolean;
    sendProductPromotions: boolean;
}

interface NotificationSettingsProps {
    enableNotifications: boolean;
    notificationChannels: NotificationChannelProps[];
    notificationSchedule: NotificationScheduleProps;
    notificationPreferences: NotificationPreferencesProps;
}

interface PaymentGatewayIntegrationProps {
    provider: string;
    apiKey: string;
    sandboxMode: boolean;
}

interface AccountingSoftwareIntegrationProps {
    provider: string;
    apiKey: string;
    syncFrequency: "daily" | "weekly" | "monthly";
}

interface IntegrationSettingsProps {
    paymentGateway?: PaymentGatewayIntegrationProps;
    accountingSoftware?: AccountingSoftwareIntegrationProps;
}

interface AddressProps {
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

interface StoreInformationProps {
    storeName: string;
    storeAddress: AddressProps;
    taxSettings: {
        taxType: string;
        taxRate: number;
    };
}

interface RequiredFieldsProps {
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
}

interface CustomerInformationProps {
    takeClientInformation: boolean;
    requiredFields: RequiredFieldsProps;
}

interface CashManagementProps {
    enableCashDrawer: boolean;
    enableCashCount: boolean;
    cashFloatAmount: number;
}

interface PaymentSettingsProps {
    acceptedPaymentMethods: string[];
    defaultPaymentMethod: string;
    cashManagement: CashManagementProps;
}

interface InvoiceSettingsProps {
    invoiceFormat: string;
    includeTaxBreakdown: boolean;
    includeDiscounts: boolean;
    includeProductDetails: boolean;
    receiptFooter: string;
}

interface GeneralSettings {
    storeInformation: StoreInformationProps;
    customerInformation: CustomerInformationProps;
    paymentSettings: PaymentSettingsProps;
    invoiceSettings: InvoiceSettingsProps;
}

interface EmployeeManagementProps {
    enableEmployeeManagement: boolean;
    enableTimeTracking: boolean;
    enableShiftManagement: boolean;
    roles: string[];
}

interface SalesReportsProps {
    enableSalesReports: boolean;
    reportType: string;
    reportFrequency: "daily" | "weekly" | "monthly";
    enableInventoryReports: boolean;
}

interface DataManagementProps {
    enableDataRetention: boolean;
    retentionPeriod: number;
    enableDataBackup: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
}

interface CustomerManagementProps {
    enableCustomerManagement: boolean;
    enableCustomerGroups: boolean;
    enableLoyaltyProgram: boolean;
    loyaltyProgramType: string;
}

interface AdvancedSettingsProps {
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