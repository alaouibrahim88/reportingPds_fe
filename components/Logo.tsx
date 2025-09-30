import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
function Logo({
  fontSize = "text-2xl",
  logoType = "default",
  className,
}: {
  fontSize?: string;
  dashboard?: boolean;
  logoType?: "welcome" | "default";
  width?: number;
  height?: number;
  className?: string;
}) {
  const logoSrc = "/polydesignlogo.webp";

  const defaultStyke =
    logoType === "welcome"
      ? {
          width: 200,
          height: 90,
        }
      : {};

  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2 justfiy-center ",
        fontSize,
        className
      )}
    >
      <div className="rounded-xl p-1 flex items-center justify-center w-full">
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={defaultStyke}
        >
          <Image
            src={logoSrc}
            alt="logo"
            width={200}
            height={90}
            className="object-contain w-full h-full"
            priority
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default Logo;
