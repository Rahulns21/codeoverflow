"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter") || "";

  const handleTypeClick = (filter: string) => {
    const filterValue = filter.toString();
    const isActive = active === filterValue;

    const newUrl = isActive
    ? removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"]
    })
    : formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filterValue
    });

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="mt-5 hidden flex-wrap justify-start gap-5 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            `body-medium cursor-pointer rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 dark:text-light-500 hover:bg-light-800 dark:bg-dark-300 text-gray-600"
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
