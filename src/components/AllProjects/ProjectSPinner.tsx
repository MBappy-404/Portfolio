  export const ProjectCardSkeleton = () => (
    <div className="group cursor-pointer relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-video overflow-hidden bg-gray-300 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-8">
        <div className="mb-4">
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        
        <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        </div>

        {/* Tech Stack Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );