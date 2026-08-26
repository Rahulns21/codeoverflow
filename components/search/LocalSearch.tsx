"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type IconPosition = "left" | "right";

interface LocalSearchProp {
  route?: string;
  icon: React.ReactNode;
  iconPosition?: IconPosition;
  placeholder?: string;
  otherClasses?: string;
  searchKey?: string;
}

const LocalSearch = ({
  icon,
  placeholder = "Search...",
  otherClasses,
  iconPosition = "left",
  route,
  searchKey = "query",
}: LocalSearchProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get(searchKey) || "";
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(query);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();

      const basePath = route || pathname;

      // ✅ THE FIX: Use raw URLSearchParams! No weird encoding!
      const params = new URLSearchParams(searchParamsString);
      
      if (trimmedQuery) {
        params.set(searchKey, trimmedQuery);
      } else {
        params.delete(searchKey);
      }
      
      params.delete("page"); // <-- Always delete page when searching!

      const newUrl = `${basePath}?${params.toString()}`;

      const currentUrl = `${basePath}?${searchParamsString}`;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParamsString, pathname, router, route, searchKey]);

  return (
    <div
      className={`bg-light-800 dark:bg-dark-400 flex min-h-14 grow items-center gap-4 rounded-2xl px-5 shadow-sm transition-all ${otherClasses}`}
    >
      {iconPosition === "left" && icon}

      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="paragraph-regular no-focus bg-light-800 border-none text-black shadow-none placeholder:text-gray-500 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400"
      />

      {iconPosition === "right" && icon}
    </div>
  );
};

export default LocalSearch;