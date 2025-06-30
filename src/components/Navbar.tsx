import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import LogoWithName from "./LogoWithName";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-white/10 border border-b-gray-500/20 shadow-white backdrop-blur-xs sticky top-0 z-50 shadow-sm w-full">
      <MaxWidthWrapper className="">
        <div className=" w-full h-14  flex items-center justify-between">
          <LogoWithName className="bg-white/60 backdrop-blur-lg rounded-lg" />
          <SearchBar />
          <div className="flex items-center justify-center text-center gap-1 md:gap-4 bg-white/60 backdrop-blur-lg rounded-lg select-none">
            {[
              ["Home", "/daily-learning"],
              ["Dictionary", "/"],
              ["AI tutor", "/"],
              ["More", "/"],
            ].map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
