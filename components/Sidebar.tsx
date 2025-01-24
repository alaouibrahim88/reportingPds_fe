"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import UserAvailableCreditsBadge from "@/components/UserAvailableCreditsBadge";

const routes = [
  {
    href: "",
    label: "Overview",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Security",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) =>
        route.href === ""
          ? pathname === "/" // Handle home route
          : pathname.startsWith(`/${route.href}`) // Handle other routes
    ) || routes[0];

  return (
    <div className="text-muted-foreground relative hidden h-screen w-full min-w-[280px] max-w-[280px] overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground md:block border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-2">
        <Logo />
      </div>
      <div className="p-2">{/* <UserAvailableCreditsBadge /> */}</div>
      <div className="flex flex-col p-1 gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={buttonVariants({
              variant:
                route === activeRoute ? "sidebarActiveItem" : "sidebarItem",
            })}
          >
            <route.icon size={20} className="mr-2" />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) =>
        route.href === ""
          ? pathname === "/" // Handle home route
          : pathname.startsWith(`/${route.href}`) // Handle other routes
    ) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="flex items-center justify-between pr-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side="left"
          >
            <Logo />
            {/* <UserAvailableCreditsBadge /> */}
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={`/${route.href}`}
                  className={buttonVariants({
                    variant:
                      route === activeRoute
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <route.icon size={20} className="mr-2" />
                  {route.label}
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
