import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

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
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Poly
        </span>
        <span className="text-foreground">design</span>
      </div>
    </Link>
  );
}

export default Logo;
