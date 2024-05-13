import { PERMISSIONS_LIST, PermissionString } from "@/helpers/permission";

export const getErrorMessageFromApi = (error: any) => {
  return error?.response?.data?.response?.message || error.message;
};
// Define action types
type ActionType =
  | { type: "UPDATE_FIELD"; fieldName: string; value: string }
  | { type: "RESET_FIELDS" }
  | { type: "MAKE_REQUEST" }
  | { type: "REQUEST_DONE" }
  | { type: "FIELD_HAS_ERRORS"; errorMessages: { [key: string]: string } }
  | { type: "RESET_ERROR_FIELDS" };

// Define initial state
interface FormState {
  [key: string]: any;
}

// Reducer function
export const formReducer =
  (initialData: FormState) =>
  (state: FormState, action: ActionType): FormState => {
    const data = { ...initialData, isLoading: false, errors: {} };
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.fieldName]: action.value };
      case "MAKE_REQUEST":
        return { ...state, isLoading: true };
      case "REQUEST_DONE":
        return { ...state, isLoading: false };
      case "RESET_FIELDS":
        return data;
      case "FIELD_HAS_ERRORS":
        return { ...state, errors: action.errorMessages };
      case "RESET_ERROR_FIELDS":
        return { ...state, errors: {} };
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
    label: "Pending Approval",
    value: "pendingApproval"
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
