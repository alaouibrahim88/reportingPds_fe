"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MobileSidebar } from "@/components/Sidebar";

function BreadCrumbHeader() {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname?.split("/");

  return (
    <div className="flex items-center gap-4">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  className="capitalize text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" 
                  href={`/${path}`}
                >
                  {path === "" ? "Home" : path.replace("-", " ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== paths.length - 1 && (
                <BreadcrumbSeparator className="text-muted-foreground/50" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumbHeader;
