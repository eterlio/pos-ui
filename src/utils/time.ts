import { differenceInMilliseconds, isValid } from "date-fns";

// Helper function to get ordinal suffix
export const getOrdinalSuffix = (n: number): string => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Format date function
export const formatDate = (date: Date): string => {
  const day = getOrdinalSuffix(date.getDate());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

// Define the timeago function with shortened labels
export const timeago = (timestamp: Date): string => {
  const diff = differenceInMilliseconds(new Date(), timestamp);

  // Define time intervals in milliseconds with shortened labels
  const intervals: { [key: string]: number } = {
    y: 31536000000,
    mo: 2592000000,
    d: 86400000,
    h: 3600000,
    min: 60000,
    s: 1000
  };

  // Iterate over intervals to find the appropriate unit
  for (const [unit, value] of Object.entries(intervals)) {
    const quotient = Math.floor(diff / value);
    if (quotient >= 1) {
      return `${quotient}${unit}${quotient > 1 ? "" : ""} ago`;
    }
  }

  // If less than a second, return "just now"
  return "just now";
};

// Main function to return either "time ago" or formatted date
export const timeAgoOrDate = (timestamp: Date): string => {
  const now = new Date();
  const diff = differenceInMilliseconds(now, timestamp);
  const oneDay = 86400000;

  if (diff < oneDay) {
    return timeago(timestamp);
  }

  let date = new Date(timestamp);
  if (!isValid(date)) return date.toString();
  return formatDate(date);
};
