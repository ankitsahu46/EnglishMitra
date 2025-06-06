import GoBackBtn from "@/components/GoBackBtn";
import React from "react";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-(--themeColor)">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <GoBackBtn>Go back home</GoBackBtn>
          {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support 
              <span aria-hidden="true">&rarr;</span>
            </a> */}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
