"use client";

import React from "react";

export default function CategoryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout completely overrides the default dashboard layout
  // No sidebar, no header - just the category dashboard content
  return (
    <div className="w-full h-screen overflow-auto">
      {children}
    </div>
  );
}
