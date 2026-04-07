import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techname: string) => {
  const normalizedTechName = techname.replace(/[.]/g, "").toLocaleLowerCase();

  return techMap[normalizedTechName] ? `${techMap[normalizedTechName]} 
  colored` : "devicon-htmx-plain";
}

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

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
      return `${interval}${unit.label} ago`
    }
  }
  return "just now";
}