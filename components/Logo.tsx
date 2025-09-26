import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
function Logo({
  fontSize = "text-2xl",
  logoType = "default",
  width,
  height,
  className,
}: {
  fontSize?: string;  
  dashboard?: boolean;
  logoType?: "welcome" | "default";
  width?: number;
  height?: number;
  className?: string;
}) {
  const logoSrc =  "/polydesignlogo.webp";
  
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize,
        className
      )}
    >
      <div className="rounded-xl p-2">
        {logoType === "welcome" ? (
          <div 
            className="relative overflow-hidden"
            
          >
            <Image
              src={logoSrc}
              alt="logo"
              width={width}
              height={height}
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <Image
            src={logoSrc}
            alt="logo"
            width={width}
            height={height}
            priority
          />
        )}
      </div>
    </Link>
  );
}

export default Logo;
