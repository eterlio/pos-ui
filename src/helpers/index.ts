import { AddressProps, PhoneProps, UploadedFileProps } from "@/interfaces";
import { UserRole, specialRoles } from "@/interfaces/users";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { isEmpty, transform } from "lodash";
import { capitalize, words } from "lodash";

export const formatCurrency = (amount: number, currency = "GHS") => {
  if (!amount) return 0;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export function formatQueryParams(params?: Record<string, any>): string {
  let formattedQueryString: string = "";
  const query = new URLSearchParams(params as any);
  if (params && Object.keys(params).length) {
    formattedQueryString = `?${query}`;
  }
  return formattedQueryString;
}
export function objectToQueryString(obj: Record<string, any>) {
  const keys = obj ? Object.keys(obj) : [];
  const keyValuePairs = keys.map((key) => {
    const value = obj[key];

    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        // If the value is an array with elements, join them with ","
        return encodeURIComponent(key) + "=" + encodeURIComponent(value.join(","));
      } else if ((typeof value === "string" && value !== "") || typeof value === "number") {
        // If the value is a non-empty string or a number, include it in the query string
        return encodeURIComponent(key) + "=" + encodeURIComponent(value.toString());
      }
    }

    return ""; // Skip keys with empty or undefined values
  });

  return keyValuePairs.filter((pair) => pair !== "").join("&");
}

export function cleanObject(obj: Record<string, any>) {
  return transform(
    obj,
    (result: Record<string, any>, value, key) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          // If it's a non-empty array, convert it to a comma-separated string
          result[key] = value.join(",");
        } else if (typeof value === "string" && value !== "") {
          // If it's a non-empty string, include it
          result[key] = value;
        } else if (typeof value === "number") {
          // If it's a number, include it
          result[key] = value;
        }
      }
    },
    {}
  );
}

export function objectDifference(
  baseObject?: Record<string, any>,
  objectToCompare?: Record<string, any>
): Record<string, any> {
  const diff: Record<string, any> = {};

  if (!objectToCompare || !baseObject) return diff;

  const baseKeys = Object.keys(baseObject);
  const compareKeys = Object.keys(objectToCompare);

  // Iterate over the keys of baseObject
  for (const key of baseKeys) {
    const baseValue = baseObject[key];
    const compareValue = objectToCompare[key];

    if (compareKeys.includes(key)) {
      if (Array.isArray(baseValue) && Array.isArray(compareValue)) {
        // Handle arrays
        if (JSON.stringify(baseValue) !== JSON.stringify(compareValue)) {
          diff[key] = compareValue;
        }
      } else if (
        typeof baseValue === "object" &&
        baseValue !== null &&
        typeof compareValue === "object" &&
        compareValue !== null
      ) {
        // Recursively compare nested objects
        const nestedDiff = objectDifference(baseValue, compareValue);
        if (!isEmpty(nestedDiff)) {
          diff[key] = nestedDiff;
        }
      } else if (baseValue !== compareValue) {
        if (
          !(baseValue === "" && compareValue === "") &&
          !(baseValue == null && compareValue == null) &&
          !(
            typeof baseValue === "number" &&
            typeof compareValue === "number" &&
            isNaN(baseValue) &&
            isNaN(compareValue)
          )
        ) {
          console.log({ compareValue, hh: typeof compareValue });

          diff[key] = compareValue;
        }
      }
    } else {
      diff[key] = baseObject[key];
    }
  }

  // Add keys from objectToCompare that are not in baseObject
  for (const key of compareKeys) {
    if (!baseKeys.includes(key)) {
      diff[key] = objectToCompare[key];
    }
  }

  return diff;
}

type SizeUnit = "B" | "KB" | "MB" | "GB" | "TB";

const sizeMap: Record<SizeUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024
};

export function formatFileSize(sizeInBytes: number): string {
  for (const unit of ["B", "KB", "MB", "GB", "TB"] as SizeUnit[]) {
    if (sizeInBytes < sizeMap[unit]) {
      return `${(sizeInBytes / sizeMap[unit]).toFixed(2)} ${unit}`;
    }
  }
  return `${sizeInBytes} B`;
}

export function combineWithOr(strings: string[]) {
  if (strings.length === 0) {
    return "";
  } else if (strings.length === 1) {
    return strings[0];
  } else {
    const lastString = strings.pop();
    return `${strings.join(", ")} or ${lastString}`;
  }
}

export function validateFile(uploadedFile: UploadedFileProps) {
  return !!(uploadedFile.fileURL && Object.keys(uploadedFile).length);
}
export const formatDate = (date: string, formatType = "MMM dd yyyy") => {
  if (!date) return "";
  return format(parseISO(date), formatType);
};

export const camelCaseToSentence = (word: string) => {
  if (!word) return "";
  const wordsArr = words(word).join(" ");
  return capitalize(wordsArr);
};

export const getTimeAgo = (dateToCompare: string) => {
  if (!dateToCompare) return "N/A";
  return formatDistanceToNow(parseISO(dateToCompare), { addSuffix: true });
};

export function formatAddressToString(address: AddressProps) {
  if (!address) return "N/A";

  const { zipCode = "", country, city, street, state } = address;

  const formattedAddress = `${street}, ${city}, ${state} ${zipCode}, ${country}`;

  return formattedAddress.trim();
}
export const formatPhoneToString = (phone: PhoneProps) => {
  if (!phone) return "N/A";
  const { number = "", prefix = "" } = phone;
  return `+${prefix} ${number}`;
};

export const isSpecialRole = (role: UserRole): boolean => {
  return specialRoles.includes(role);
};

export const addressValidationProps = {
  validation: {
    "address.city": "required",
    "address.country": "required",
    "address.poBox": "required",
    "address.state": "required"
  },
  customFields: {
    "address.city": "City",
    "address.country": "Country",
    "address.poBox": "po Box",
    "address.state": "State"
  }

};
