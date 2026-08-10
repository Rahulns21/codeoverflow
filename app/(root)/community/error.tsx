"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(80vh-80px)] w-full flex-col items-center justify-center bg-light-900 dark:bg-dark-100">
      <h2 className="h2-bold text-dark100_light900 mb-4">Something went wrong!</h2>
      
      <button 
        className="primary-gradient cursor-pointer rounded-md px-5 py-2 text-white" 
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}