import React from "react";

const SkeletonCard = () => (
  <div className="animate-pulse  flex flex-col md:flex-row gap-6 bg-white dark:bg-[#1A1A24]    rounded-xl overflow-hidden shadow-md p-6">
    {/* Image Placeholder (Left side) */}
    <div className="w-full md:w-1/2 h-90 bg-gray-200 dark:bg-gray-800 rounded-lg" />

    {/* Content Placeholder (Right side) */}
    <div className="flex-1  justify-start items-center space-y-4">
      {/* Title */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" ></div>

      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

const AllProjectsSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-16 mb-20 pt-32">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default AllProjectsSkeleton;
