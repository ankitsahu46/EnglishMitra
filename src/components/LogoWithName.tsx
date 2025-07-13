import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoWithName = ({ className }: { className?: string }) => {
  return (
    <Link href="#" className={cn("flex gap-1 items-center", className)}>
      <Image
        src="/logo.png"
        alt="logo"
        width={32}
        height={32}
        className="size-8"
      />
      <p className="inline text-center font-bold text-gray-900 text-sm md:text-base lg:text-lg pr-2 rounded-sm py-1.5 pb-2">
        English<span className="text-teal-green-400">Mitra</span>
      </p>
    </Link>
  );
};

export default LogoWithName;
