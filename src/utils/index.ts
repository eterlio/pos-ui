import { PERMISSIONS_LIST, PermissionString } from "@/helpers/permission";
import { PhoneProps } from "@/interfaces";
import { toLower, trim } from "lodash";

export const getErrorMessageFromApi = (error: any) => {
  return error?.response?.data?.response?.message || error.message;
};

// Define action types
type ActionType = { type: "UPDATE_FIELD"; fieldName: string; value: any } | { type: "RESET_FIELDS" };

// Define initial state
type FormState = {
  [P in string]: any;
};

// Reducer function
export const formReducer =
  (initialData: FormState) =>
  (state: FormState, action: ActionType): FormState => {
    const data = { ...initialData };
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.fieldName]: action.value };
      case "RESET_FIELDS":
        return data;
      default:
        return state;
    }
  };

export const ROLE_OPTIONS = [
  {
    label: "Admin",
    value: "admin"
  },
  {
    label: "Manager",
    value: "manager"
  },
  {
    label: "Sales Personnel",
    value: "salesPersonnel"
  }
];

export const GENDER_OPTIONS = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  }
];

export const USER_STATUS_OPTIONS = [
  {
    label: "Active",
    value: "active"
  },
  {
    label: "Suspended",
    value: "suspended"
  },
  {
    label: "Pending",
    value: "pending"
  },
  {
    label: "Inactive",
    value: "inactive"
  }
];

const notValidPermission = ["settings", "faqs", "calendar"];
export const permissionResources: PermissionString[] = PERMISSIONS_LIST.filter((resource) => {
  return !notValidPermission.includes(resource);
});
export const isActualObject = (obj: Record<string, any>): boolean =>
  !!(!Array.isArray(obj) && obj && Object.keys(obj).length);

export const hasValidPhone = (phone: PhoneProps): boolean => {
  return !!(
    isActualObject(phone) &&
    phone.number &&
    phone.number.length === 9 &&
    phone.prefix &&
    phone.prefix.length === 3 &&
    ["233"].includes(phone.prefix)
  );
};

export const createSlug = (str: string) => {
  let lowerStr = toLower(str);

  // Remove non-alphanumeric characters (excluding hyphens and spaces)
  let cleanedStr = lowerStr.replace(/[^a-z0-9\s-]/g, "");

  // Replace spaces and consecutive hyphens with a single hyphen
  let hyphenatedStr = cleanedStr.replace(/[\s-]+/g, "-");

  // Trim any leading or trailing hyphens
  let slug = trim(hyphenatedStr, "-");

  return slug;
};
export function formatQueryParams(params?: Record<string, any>): string {
  let formattedQueryString: string = "";
  const query = new URLSearchParams(params as any);
  if (params && Object.keys(params).length) {
    formattedQueryString = `?${query}`;
  }
  return formattedQueryString;
}