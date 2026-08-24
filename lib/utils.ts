import { BadgeCounts } from "@/app/types/global";
import { BADGE_CRITERIA } from "@/constants";
import { techMap } from "@/constants/techMap";
import { techDescriptionMap } from "@/constants/techMapDescription";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const initials = (word: string) =>
  word
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} 
  colored`
    : "devicon-htmx-plain";
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();

  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology, framework, library, or tool used in software development, providing valuable features and capabilities.`;
};

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label} ago`;
    }
  }
  return "just now";
};

export const formatNumber = (number: number): string => {
  const thousand: number = 1000;
  const million: number = 1000000;
  const billion: number = 1000000000;

  if (number >= billion) {
    const value = (number / billion).toFixed(1);
    return value.endsWith(".0") ? Math.floor(number / billion) + "B" : value + "B";
  } else if (number >= million) {
    const value = (number / million).toFixed(1);
    return value.endsWith(".0") ? Math.floor(number / million) + "M" : value + "M";
  } else if (number >= thousand) {
    const value = (number / thousand).toFixed(1);
    return value.endsWith(".0") ? Math.floor(number / thousand) + "K" : value + "K";
  } else {
    return number.toString();
  }
};

export const assignBadges = (params: {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
}

export const formatSalary = (salary: string | number | null | undefined): string => {
  if (!salary) return "Not Disclosed";

  if (typeof salary === "string" && /[$,-]/.test(salary)) {
    return salary;
  }

  if (typeof salary === "string") {
    const cleanNumber = salary.replace(/[^0-9]/g, "");
    if (cleanNumber.length > 0) {
      return `${Number(cleanNumber).toLocaleString()}`;
    }
  }

  if (typeof salary === "number") {
    return `${salary.toLocaleString()}`;
  }

  return "Not Disclosed";
}