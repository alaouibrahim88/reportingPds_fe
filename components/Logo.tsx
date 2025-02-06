import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl  p-2">
        <Image
          src="/polydesignlogo.webp"
          alt="logo"
          width={160}
          height={160}
          priority
        />
      </div>
    </Link>
  );
}

export default Logo;
