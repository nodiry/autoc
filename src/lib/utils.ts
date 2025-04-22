import { siteConfig } from "@/config/site";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = async () => {
  try {
    await fetch(siteConfig.links.logout, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
