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
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TableZone() {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const data = [
    {
      time: "2024-01-15 06:00:00 AM",
      machine: "CITIZEN 19",
      job: "349455|26",
      count: 18,
      reason: "Tool Change / Offset Scrap",
      message: "parts were not put in last night",
      type: "Scrap",
      status: "warning",
      color: "bg-yellow-500",
    },
    {
      time: "2024-01-15 10:19:43 AM",
      machine: "CITIZEN 36",
      job: "31003887-05|6",
      count: 9,
      reason: "Dimensional",
      message: "Boring bar chipped",
      type: "Scrap",
      status: "alert",
      color: "bg-red-500",
    },
    {
      time: "2024-01-15 11:30:32 PM",
      machine: "CITIZEN 20",
      job: "600213-2|15",
      count: 18,
      reason: "Dimensional",
      message: "Step on .4835 diameter",
      type: "Scrap",
      status: "good",
      color: "bg-green-500",
    },
    {
      time: "2024-01-14 08:37:11 PM",
      machine: "CITIZEN 53",
      job: "06-135925-000|99",
      count: 14,
      reason: "Dimensional",
      message: "Thru hole go pin won't go",
      type: "Scrap",
      status: "alert",
      color: "bg-red-500",
    },
    {
      time: "2024-01-14 03:24:58 PM",
      machine: "CITIZEN 18",
      job: "1000879|55",
      count: 12,
      reason: "Dimensional",
      message: "Set up pcs",
      type: "Scrap",
      status: "warning",
      color: "bg-yellow-500",
    },
    {
      time: "2024-01-14 02:15:32 PM",
      machine: "CITIZEN 25",
      job: "450789|12",
      count: 15,
      reason: "Surface Finish",
      message: "Poor surface quality on OD",
      type: "Scrap",
      status: "good",
      color: "bg-green-500",
    },
    {
      time: "2024-01-13 11:45:22 AM",
      machine: "CITIZEN 42",
      job: "789123|33",
      count: 7,
      reason: "Tool Life",
      message: "Insert worn out prematurely",
      type: "Scrap",
      status: "warning",
      color: "bg-yellow-500",
    },
    {
      time: "2024-01-13 09:30:15 AM",
      machine: "CITIZEN 31",
      job: "654321|08",
      count: 22,
      reason: "Material Issue",
      message: "Material hardness out of spec",
      type: "Scrap",
      status: "alert",
      color: "bg-red-500",
    },
    {
      time: "2024-01-13 08:20:45 AM",
      machine: "CITIZEN 15",
      job: "987654|41",
      count: 11,
      reason: "Setup Error",
      message: "Wrong offset applied",
      type: "Scrap",
      status: "good",
      color: "bg-green-500",
    },
    {
      time: "2024-01-12 04:55:33 PM",
      machine: "CITIZEN 27",
      job: "246813|19",
      count: 16,
      reason: "Program Error",
      message: "Wrong program version used",
      type: "Scrap",
      status: "warning",
      color: "bg-yellow-500",
    },
    {
      time: "2024-01-12 02:40:18 PM",
      machine: "CITIZEN 33",
      job: "135790|22",
      count: 13,
      reason: "Coolant Issue",
      message: "Insufficient coolant pressure",
      type: "Scrap",
      status: "alert",
      color: "bg-red-500",
    },
    {
      time: "2024-01-12 01:15:27 PM",
      machine: "CITIZEN 48",
      job: "864209|15",
      count: 19,
      reason: "Tool Breakage",
      message: "Drill broke during operation",
      type: "Scrap",
      status: "good",
      color: "bg-green-500",
    },
    {
      time: "2024-01-11 10:05:42 AM",
      machine: "CITIZEN 22",
      job: "753951|27",
      count: 8,
      reason: "Material Handling",
      message: "Bar feeder misalignment",
      type: "Scrap",
      status: "warning",
      color: "bg-yellow-500",
    },
    {
      time: "2024-01-11 09:30:55 AM",
      machine: "CITIZEN 39",
      job: "159753|36",
      count: 24,
      reason: "Quality Check",
      message: "Failed final inspection",
      type: "Scrap",
      status: "alert",
      color: "bg-red-500",
    },
    {
      time: "2024-01-11 08:15:20 AM",
      machine: "CITIZEN 44",
      job: "951753|48",
      count: 17,
      reason: "Machine Maintenance",
      message: "Spindle alignment issue",
      type: "Scrap",
      status: "good",
      color: "bg-green-500",
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenRows([]); // Reset open rows when changing pages
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <FolderIcon className="w-5 h-5 text-primary" />
          <h2 className="font-medium">Production Issues</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Track and manage production issues and scrap reports
        </p>
      </div>

      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="font-medium">Time</TableHead>
              <TableHead className="font-medium">Machine</TableHead>
              <TableHead className="font-medium">Job</TableHead>
              <TableHead className="font-medium">Count</TableHead>
              <TableHead className="font-medium">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-gray-50/50",
                    openRows.includes(index) && "bg-gray-50/80"
                  )}
                  onClick={() => toggleRow(index)}
                >
                  <TableCell className="w-[50px]">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-gray-100 transition-colors">
                      {openRows.includes(index) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.time}</TableCell>
                  <TableCell>{item.machine}</TableCell>
                  <TableCell>{item.job}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {item.count}
                    </span>
                  </TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
                {openRows.includes(index) && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-0">
                      <div className="bg-gray-50/50 border-l-2 border-primary">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-sm text-gray-500 mb-1">Type</p>
                              <p className="font-medium">{item.type}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-sm text-gray-500 mb-1">
                                Message
                              </p>
                              <p className="font-medium">{item.message}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-sm text-gray-500 mb-1">
                                Job Details
                              </p>
                              <p className="font-medium">{item.job}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-sm text-gray-500 mb-1">
                                Status
                              </p>
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                  {
                                    "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20":
                                      item.status === "good",
                                    "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20":
                                      item.status === "warning",
                                    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20":
                                      item.status === "alert",
                                  }
                                )}
                              >
                                {item.status === "good" && "Resolved"}
                                {item.status === "warning" && "Pending"}
                                {item.status === "alert" && "Critical"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg hover:bg-gray-100 transition-colors",
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-sm transition-colors",
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg hover:bg-gray-100 transition-colors",
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
