import { useState, useEffect } from "react";
import { PermissionString, permissionOperations, decipherPermission, PermissionOperation } from "@/helpers/permission";
import CheckBoxField from "../combo/CheckBoxField";
import { capitalize, startCase } from "lodash";
import { HandlerProps } from "../type";

const Permission = ({
  permissionResources,
  cypheredPermissions,
  fieldKey,
  onChange,
  disabled
}: {
  permissionResources: PermissionString[];
  cypheredPermissions?: string;
  fieldKey: string;
  disabled?: boolean;
  onChange: (data: {
    key: string;
    value: {
      [key in PermissionString]: PermissionOperation[];
    };
  }) => void;
}) => {
  const [permissions, setPermissions] = useState<{
    [key in PermissionString]: PermissionOperation[];
  }>(
    permissionResources.reduce((acc: any, permission) => {
      acc[permission] = [];
      return acc;
    }, {})
  );

  useEffect(() => {
    if (cypheredPermissions) {
      const decryptedPermissions = decipherPermission(cypheredPermissions);

      setPermissions(decryptedPermissions);
    }
  }, [cypheredPermissions]);

  const handleTogglePermission = (permission: PermissionString, operation: PermissionOperation) => {
    console.log(permission, operation);
    
    setPermissions((prevPermissions) => {
      const currentPermissions = prevPermissions[permission] || [];
      let updatedPermissions: string[] = [];

      if (currentPermissions.includes(operation)) {
        updatedPermissions = currentPermissions.filter((op) => op !== operation);
      } else {
        updatedPermissions = [...currentPermissions, operation];
      }

      if (operation === "read" && !updatedPermissions.includes("read")) {
        updatedPermissions = [];
      }

      const newPermissions: any = {
        ...prevPermissions,
        [permission]: updatedPermissions
      };

      // Remove keys with empty arrays
      Object.keys(newPermissions).forEach((key) => {
        if (newPermissions[key].length === 0) {
          delete newPermissions[key];
        }
      });

      onChange({ key: fieldKey, value: newPermissions });

      return newPermissions as {
        [key in PermissionString]: PermissionOperation[];
      };
    });
  };

  const handleCheckAllPermissions = (data: HandlerProps) => {
    const result = permissionResources.reduce((acc: any, permission) => {
      acc[permission] = data.value ? permissionOperations : [];
      return acc;
    }, {});
    setPermissions(result);

    
  };
  useEffect(() => {
    onChange({ key: fieldKey, value: permissions });
  }, [permissions]);

  const formatPermissionResource = (resource: string) => {
    const spacedStr = resource.replace(/([A-Z])/g, " $1");
    return startCase(spacedStr.trim());
  };
  const disablePermissionResource = (resource: PermissionString) => {
    return !(permissions[resource] && permissions[resource].length && permissions[resource].includes("read"));
  };
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex items-center gap-4">
        <p>Check all permissions</p>
        <CheckBoxField handleFieldChange={handleCheckAllPermissions} className="w-[20px] h-[20px]" disabled={disabled} fieldKey="checkAll" />
      </div>

      <div className="flex items-end justify-between">
        <p className="flex-1 font-bold">Permissions</p>
        <div className="flex flex-1 justify-between items-center gap-3">
          {permissionOperations.map((operation) => (
            <p key={operation} className="text-sm">
              {capitalize(operation)}
            </p>
          ))}
        </div>
      </div>
      <div className="my-5">
        {permissionResources.map((permission) => (
          <div className="flex gap-10 justify-between items-center overflow-x-auto" key={permission}>
            <p className="flex-1 mb-2 pb-1">{formatPermissionResource(permission)}</p>
            <div className="flex items-center justify-between flex-1 gap-4">
              {permissionOperations.map((operation, index) => (
                <CheckBoxField
                  key={index}
                  checked={permissions[permission] && permissions[permission].includes(operation)}
                  handleFieldChange={() => handleTogglePermission(permission, operation)}
                  className="w-[20px] h-[20px]"
                  disabled={disabled || (disablePermissionResource(permission) && operation !== "read")}
                  fieldKey={fieldKey}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permission;
