import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import LogoWithName from "./LogoWithName";

const Footer = () => {
  return (
    <footer className="bg-slate-100 bottom-0 w-full py-14">
      <MaxWidthWrapper>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center max-md:gap-6">
          <div className="flex flex-col items-center md:items-start justify-center">
            <LogoWithName />

            <div className="pl-1">
              <span className="text-sm text-gray-700">
                &copy;{new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium text-gray-700/80 ">
            {[
              ["Terms", "/"],
              ["Privacy Policy", "/"],
              ["Content Policy", "/"],
            ].map(([name, href]) => (
              <Link key={name} href={href} className="hover:text-gray-900/90">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
