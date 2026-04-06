"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

interface LocalSearchProp {
  route?: string;
  icon: React.ReactNode;
  placeholder?: string;
  otherClasses?: string;
}

const LocalSearch = ({
  icon,
  placeholder = "Search...",
  otherClasses,
}: LocalSearchProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(query);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();

      const newUrl = trimmedQuery
        ? formUrlQuery({
            params: searchParamsString,
            key: "query",
            value: trimmedQuery,
          })
        : removeKeysFromQuery({
            params: searchParamsString,
            keysToRemove: ["query"],
          });

      const currentUrl = searchParamsString
        ? `${pathname}?${searchParamsString}`
        : pathname;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParamsString, pathname, router]);

  return (
    <div
      className={`bg-light-800 dark:bg-dark-400 flex min-h-14 grow items-center gap-4 rounded-2xl px-5 shadow-sm transition-all ${otherClasses}`}
    >
      {icon}

      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="paragraph-regular no-focus bg-light-800 border-none text-black shadow-none placeholder:text-gray-500 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400"
      />
    </div>
  );
};

export default LocalSearch;
