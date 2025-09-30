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
  
  // Check if user has access token in localStorage
  const hasToken = typeof window !== 'undefined' && localStorage.getItem('access_token') !== null;
  const isAuthenticated = document.cookie.includes("auth=true");

  // DISABLED: Skip authentication check
  // if (isAuthenticated===false) {
  //     router.push('/login');
  //   }
   


  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-background border-b">
          <div className="flex flex-row justify-between px-40 w-full">
            <BreadCrumbHeader />
            <div className="gap-2 sm:gap-4 flex items-center">
              <ModeToggle />
              {hasToken && <LogoutButton />}
            </div>
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
