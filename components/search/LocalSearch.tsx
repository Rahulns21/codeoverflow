"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
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

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();

      const newUrl = trimmedQuery
        ? formUrlQuery({
            params: searchParams.toString(),
            key: "query",
            value: trimmedQuery,
          })
        : removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

      router.replace(newUrl, { scroll: false });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParams, router]);

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
        className="paragraph-regular no-focus bg-light-800 border-none text-black shadow-none 
        placeholder:text-gray-500 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400"
      />
    </div>
  );
};

export default LocalSearch;
