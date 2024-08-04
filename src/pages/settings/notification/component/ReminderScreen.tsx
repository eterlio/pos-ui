import ReminderBlock from "./ReminderBlock";

const ReminderScreen = () => {
  const handleFieldChange = () => {
  };

  return (
    <div className="space-y-10">
      <h1 className="my-5 text-lg">Notification Reminder</h1>

      <ReminderBlock
        description="Send invoice debt reminders"
        handleFieldChange={handleFieldChange}
        title="Invoice Reminder"
        channels={["Email", "In-App"]}
      />
      <ReminderBlock
        description="Send product sale summary to client after product purchase"
        handleFieldChange={handleFieldChange}
        title="Product Sale"
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Notify when new inventory is taken"
        handleFieldChange={handleFieldChange}
        title="Inventory Alert"
        rolesApplicable={["admin", "manager", "sales-personnel"]}
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Notify when inventory levels are low"
        handleFieldChange={handleFieldChange}
        title="Low Stock Alert"
        rolesApplicable={["admin", "manager", "sales-personnel"]}
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Send daily sales summary"
        handleFieldChange={handleFieldChange}
        title="Daily Sales Summary"
        rolesApplicable={["admin", "manager", "sales-personnel"]}
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Notify admin of system errors"
        handleFieldChange={handleFieldChange}
        title="System Error Alert"
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Notify admin of suspicious activities"
        handleFieldChange={handleFieldChange}
        title="Security Alert"
        channels={["Email", "In-App", "SMS"]}
      />
      <ReminderBlock
        description="Send birthday messages to clients"
        handleFieldChange={handleFieldChange}
        title="Customer Birthday Notification"
        channels={["Email", "In-App", "SMS"]}
      />
    </div>
  );
};

export default ReminderScreen;
