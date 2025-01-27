"use client";

import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
// import { SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LogoutButton } from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = document.cookie.includes("auth=true");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4 h-[50px] container bg-background">
          <BreadCrumbHeader />
          <div className="gap-2 sm:gap-4 flex items-center">
            <ModeToggle />
            <LogoutButton />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 text-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
