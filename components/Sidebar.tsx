"use client";

import {
  CoinsIcon,
  PackageOpen,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
  ShieldXIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BadgeDollarSign,
  TrendingUpIcon,
  GlobeIcon,
  UploadIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import UserAvailableCreditsBadge from "@/components/UserAvailableCreditsBadge";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "scrap",
    label: "Scrap",
    icon: PackageOpen,
  },
  {
    href: "workflows",
    label: "Coûts",
    icon: CoinsIcon,
  },
  {
    href: "executive-horizon",
    label: "Executive Horizon",
    icon: TrendingUpIcon,
  },
  {
    href: "global-ops",
    label: "GlobalOps",
    icon: GlobeIcon,
  },
  {
    href: "importation",
    label: "Importation",
    icon: UploadIcon,
  },
  {
    href: "scrap-setting",
    label: "Paramétrage",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Contrôle d'accès",
    icon: ShieldXIcon,
   },
];

// tone: on the category pages the sidebar follows the page, whatever the theme:
// "dark" = page colours (slate-900, slight gradient), "light" = white like the Programs page.
// Without tone it follows the theme.
function DesktopSidebar({ tone }: { tone?: "dark" | "light" }) {
  const matchDarkPage = tone === "dark";
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const activeRoute =
    routes.find((route) =>
      route.href === ""
        ? pathname === "/"
        : pathname.startsWith(`/${route.href}`)
    ) || routes[0];

  return (
    <div
    className={cn(
      "relative hidden h-screen border-r bg-background lg:block transition-all duration-300 shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
      isCollapsed ? "w-[60px]" : "w-[220px]",
      matchDarkPage && "border-slate-700/50 bg-slate-900 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950",
      // Light theme colours even when the dark theme is on (tokens reset in globals.css)
      tone === "light" && "theme-light"
    )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-1 top-6 z-10 h-8 w-8 rounded-full border bg-background shadow-sm",
          matchDarkPage &&
            "border-slate-700 bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </Button>

      {/* Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          matchDarkPage && "border-slate-700/50"
        )}
      >
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
          )}
        >
          <Logo logoType="default" className="flex-shrink-0" />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-2 py-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={cn(
              "group relative flex h-12 items-center px-4 transition-colors hover:bg-accent/50",
              pathname === `/${route.href}` && "bg-accent",
              isCollapsed && "justify-center px-0",
              matchDarkPage && "hover:bg-slate-800/70",
              matchDarkPage && pathname === `/${route.href}` && "bg-blue-500/10"
            )}
          >
            {pathname === `/${route.href}` && (
              <div
                className={cn(
                  "absolute left-0 h-full w-1 bg-primary",
                  matchDarkPage && "bg-blue-500"
                )}
              />
            )}
            <route.icon
              size={20}
              className={cn(
                "shrink-0 text-muted-foreground transition-colors",
                matchDarkPage && "text-gray-400 group-hover:text-white",
                pathname === `/${route.href}` && "text-primary",
                matchDarkPage && pathname === `/${route.href}` && "text-blue-400",
                !isCollapsed && "mr-2"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground transition-all duration-300",
                matchDarkPage && "text-gray-300",
                pathname === `/${route.href}` && "text-foreground",
                matchDarkPage && pathname === `/${route.href}` && "text-white",
                isCollapsed && "w-0 opacity-0"
              )}
            >
              {route.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="block border-b bg-background lg:hidden">
      <nav className="flex h-16 items-center px-4">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex h-16 items-center border-b px-6">
              <Logo logoType="default" />
            </div>
            {/* <UserAvailableCreditsBadge /> */}
            <div className="space-y-2 py-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={`/${route.href}`}
                  className={cn(
                    "group relative flex h-12 items-center px-6 transition-colors hover:bg-accent/50",
                    pathname === `/${route.href}` && "bg-accent"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {pathname === `/${route.href}` && (
                    <div className="absolute left-0 h-full w-1 bg-primary" />
                  )}
                  <route.icon
                    size={20}
                    className={cn(
                      "mr-2 shrink-0 text-muted-foreground transition-colors",
                      pathname === `/${route.href}` && "text-primary"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium text-muted-foreground",
                      pathname === `/${route.href}` && "text-foreground"
                    )}
                  >
                    {route.label}
                  </span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
