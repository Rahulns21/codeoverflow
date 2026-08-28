"use client";

import { GlobalSearchResult } from "@/app/types/action";
import { globalSearch } from "@/lib/actions/global.action";
import { useEffect, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import Link from "next/link";
import ROUTES from "@/constants/route";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const res = await globalSearch({ query, type });
        if (res.success) {
          setResults(res.data ?? []);
        }
        setIsLoading(false);
      } else {
        setResults([]);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, type]);

  return (
    <div className="relative w-full max-w-162.5">
      {/* Search Input */}
      <div className="bg-light-800 dark:bg-dark-400 flex items-center gap-2 rounded-xl px-4 py-2">
        <SearchIcon className="size-4 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search anything..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.trim() && (
        <div className="bg-light-900 dark:bg-dark-200 absolute top-full z-50 mt-2 w-full rounded-xl p-4 shadow-lg">
          {/* Filter Tabs */}
          <div className="mb-4 flex gap-2">
            {["all", "question", "answer", "user", "tag"].map((item) => (
              <button
                key={item}
                onClick={() => setType(item)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize cursor-pointer ${type === item ? "bg-primary-500 text-white" : "bg-light-800 dark:bg-dark-400 text-gray-500"}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="border-t-primary-500 size-6 animate-spin rounded-full border-2 border-gray-300"></div>
            </div>
          )}

            {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase text-gray-500">Top Match</p>
              {results.map((result: GlobalSearchResult) => (
                <Link
                  key={`${result.type}-${result.id.toString()}`}
                  href={
                    result.type === "question"
                      ? ROUTES.QUESTION(result.id.toString())
                      : result.type === "user"
                      ? ROUTES.PROFILE(result.id.toString())
                      : result.type === "tag"
                      ? ROUTES.TAG(result.id.toString())
                      : ROUTES.QUESTION(result.id.toString()) // For answers, use the question ID
                  }
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-2 rounded-lg p-2 hover:bg-light-800 dark:hover:bg-dark-400"
                >
                  <span className="text-xs text-gray-500">{result.type}</span>
                  <p className="line-clamp-1 text-sm font-medium text-dark200_light900">
                    {result.title}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && results.length === 0 && (
            <p className="py-4 text-center text-sm text-gray-500">
                No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;