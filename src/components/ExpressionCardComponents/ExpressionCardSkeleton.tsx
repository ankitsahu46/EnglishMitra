
export const ExpressionCardSkeleton = () => (
  <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16 animate-pulse">
    {/* Bar Skeleton */}
    <div className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2" />

    <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-md:w-full w-full">
      {/* Example Image Skeleton */}
      <div className="col-span-2 flex items-center justify-center p-4">
        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-inner" />
      </div>
      {/* Content Skeleton */}
      <div className="col-span-3 lg:bg-white lg:border lg:border-gray-900/10 lg:border-l-transparent lg:shadow-lg lg:rounded-r-lg max-md:w-full py-6">
        <div className="flex justify-between items-center w-full px-5">
          <div className="flex flex-col items-start gap-2">
            <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
          </div>
        </div>
        <div className="mt-1 pt-2 px-5">
          <div className="pt-2 border-t border-gray-300" />
          <div className="h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded my-2" />
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded my-2" />
          <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded my-2" />
        </div>
      </div>
    </div>
  </div>
);
