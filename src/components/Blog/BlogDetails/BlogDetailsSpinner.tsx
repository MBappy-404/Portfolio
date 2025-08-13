"use client";
import React from "react";

export const BlogDetailSkeleton = () => {
  return (
    <div className="min-h-screen lg:container max-w-[1400px]    py-36 px-4 animate-pulse w-full">
      <div className="  mx-auto flex flex-col md:flex-row gap-8">
        {/* Main Blog Skeleton */}
        <div className="flex-1 space-y-6">
          {/* Back link */}
          <div className="w-40 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

          {/* Title */}
          <div className="h-10 w-6/6 bg-gray-300 dark:bg-gray-700 rounded" />

          {/* Image */}
          <div className="w-full h-96 rounded-2xl bg-gray-300 dark:bg-gray-700" />

          {/* Author */}
          <div className="flex items-center justify-between gap-4 p-3 md:p-6 rounded-xl bg-white dark:bg-[#1A1A24]">
          <div className="flex items-center gap-2 md:gap-4 ">
              <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>

            {/* Category + Date */}
            <div className="flex items-center flex-col gap-4">
              <div className="w-24 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="w-20 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>

          {/* Description Text Blocks */}
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded bg-gray-300 dark:bg-gray-700 ${
                  i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-4/5" : "w-2/3"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Suggested Articles Skeleton */}
        <aside className="w-full md:w-[320px] lg:w-[360px] shrink-0 space-y-6 mt-10 md:mt-0">
          <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1A24]"
            >
              <div className="w-24 h-24 rounded-lg bg-gray-300 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="w-24 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};
