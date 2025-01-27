"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableFilter } from "./TableFilter";
import { FolderIcon } from "lucide-react";

interface TableZoneProps {
  data: Array<{
    name: string;
    zoneJava: number;
    zonePython: number;
    zoneRust: number;
    zoneGo: number;
    zoneKotlin: number;
    details: Array<any>;
  }>;
}

export default function TableZone({ data }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderIcon className="w-5 h-5 text-primary" />
            <h2 className="font-medium">Production Issues</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and manage production issues and scrap reports
          </p>
        </div>
        <TableFilter onFilterChange={() => {}} />
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Pipeline</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                {item.details.map((detail, detailIndex) => (
                  <TableRow key={`${index}-${detailIndex}`}>
                    <TableCell>
                      <button
                        onClick={() => toggleRow(index)}
                        className="p-1 hover:bg-muted rounded-lg"
                      >
                        {openRows.includes(index) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>{detail.time}</TableCell>
                    <TableCell>{detail.machine}</TableCell>
                    <TableCell>{detail.job}</TableCell>
                    <TableCell>{detail.count}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          detail.status === "good" &&
                            "bg-green-100 text-green-700",
                          detail.status === "warning" &&
                            "bg-yellow-100 text-yellow-700",
                          detail.status === "alert" && "bg-red-100 text-red-700"
                        )}
                      >
                        {detail.status}
                      </span>
                    </TableCell>
                    <TableCell>{detail.assignee || "Unassigned"}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
