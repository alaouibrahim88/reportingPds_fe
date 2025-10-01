"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
  ShieldXIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BadgeDollarSign,
  TrendingUpIcon,
  GlobeIcon,
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
    icon: HomeIcon,
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

function DesktopSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const activeRoute =
    routes.find((route) =>
      route.href === ""
        ? pathname === "/"
        : pathname.startsWith(`/${route.href}`)
    ) || routes[0];

  return (
    <div
    className={cn(
      "relative hidden h-screen border-r bg-background lg:block transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[220px]"
    )}
    >
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 h-8 w-8 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </Button>

      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
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
              isCollapsed && "justify-center px-0"
            )}
          >
            {pathname === `/${route.href}` && (
              <div className="absolute left-0 h-full w-1 bg-primary" />
            )}
            <route.icon
              size={20}
              className={cn(
                "shrink-0 text-muted-foreground transition-colors",
                pathname === `/${route.href}` && "text-primary",
                !isCollapsed && "mr-2"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground transition-all duration-300",
                pathname === `/${route.href}` && "text-foreground",
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
