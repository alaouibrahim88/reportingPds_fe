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

// matchDarkPage: on the dark category pages, the dark theme uses the page colors (slate-900)
function DesktopSidebar({ matchDarkPage = false }: { matchDarkPage?: boolean }) {
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
      matchDarkPage && "dark:border-slate-700/50 dark:bg-slate-900"
    )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-1 top-6 z-10 h-8 w-8 rounded-full border bg-background shadow-sm",
          matchDarkPage &&
            "dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white"
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
          matchDarkPage && "dark:border-slate-700/50"
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
              matchDarkPage && "dark:hover:bg-slate-800",
              matchDarkPage && pathname === `/${route.href}` && "dark:bg-slate-800"
            )}
          >
            {pathname === `/${route.href}` && (
              <div
                className={cn(
                  "absolute left-0 h-full w-1 bg-primary",
                  matchDarkPage && "dark:bg-blue-500"
                )}
              />
            )}
            <route.icon
              size={20}
              className={cn(
                "shrink-0 text-muted-foreground transition-colors",
                matchDarkPage && "dark:text-gray-400 dark:group-hover:text-white",
                pathname === `/${route.href}` && "text-primary",
                matchDarkPage && pathname === `/${route.href}` && "dark:text-blue-400",
                !isCollapsed && "mr-2"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground transition-all duration-300",
                matchDarkPage && "dark:text-gray-300",
                pathname === `/${route.href}` && "text-foreground",
                matchDarkPage && pathname === `/${route.href}` && "dark:text-white",
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
