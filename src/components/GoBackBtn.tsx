"use client";

import { cn } from "@/lib/utils";
import { GoBackBtnProps } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GoBackBtn = ({
  route,
  className,
  children,
}: GoBackBtnProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Link
      href={route || "/"}
      onClick={handleClick}
      className={cn(
        "rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs bg-teal-green-400 hover:bg-teal-green-100 transition-all  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--themeColor) hover:scale-95",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default GoBackBtn;
