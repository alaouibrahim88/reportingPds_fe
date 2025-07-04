"use client";

import React, { useState, HTMLAttributes } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TableFilter } from "./TableFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ProductionIssueDetail, ProductionIssuesApiResponse, CellCalculRefDetail } from "@/types";
import { fetchZoneCalculationDetails } from "@/actions/cost/dashboard";

interface TableZoneProps {
  data: ProductionIssuesApiResponse | undefined;
}

export default function TableZone({ data }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoneDetails, setZoneDetails] = useState<Record<number, CellCalculRefDetail[]>>({});
  const [loadingZones, setLoadingZones] = useState<Set<number>>(new Set());
  const itemsPerPage = 5;

  const toggleRow = async (index: number, detail: ProductionIssueDetail) => {
    const isOpening = !openRows.includes(index);
    
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // If opening row and we don't have data yet, fetch it
    if (isOpening && !zoneDetails[detail.zone_id]) {
      setLoadingZones(prev => new Set(prev).add(detail.zone_id));
      
      try {
        const response = await fetchZoneCalculationDetails(detail.zone_id);
        if (response?.details) {
          setZoneDetails(prev => ({
            ...prev,
            [detail.zone_id]: response.details
          }));
        }
      } catch (error) {
        console.error("Error fetching zone details:", error);
      } finally {
        setLoadingZones(prev => {
          const newSet = new Set(prev);
          newSet.delete(detail.zone_id);
          return newSet;
        });
      }
    }
  };
  
  const details = data?.details || [];
  const totalItems = details.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginatedData = (): ProductionIssueDetail[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return details.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenRows([]); // Reset open rows when changing pages
  };

  return (
    <div className="py-2 px-4">
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
            <TableRow className="h-9">
              <TableHead className="py-1 w-[50px] text-sm"></TableHead>
              <TableCell className="py-1 text-sm">Zone</TableCell>
              <TableHead className="py-1 text-sm">Periode</TableHead>
              <TableHead className="py-1 text-sm">Heures Réel</TableHead>
              <TableHead className="py-1 text-sm">Heures Standart </TableHead>
              <TableHead className="py-1 text-sm">C.Réel </TableHead>
              <TableHead className="py-1 text-sm">C.Standart</TableHead>
              <TableHead className="py-1 text-sm">Ecart</TableHead>
              <TableHead className="py-1 text-sm">Ecart Global</TableHead>
              <TableHead className="py-1 text-sm">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((detail, detailIndex) => (
              <React.Fragment key={`${detail.zone_id}-${detail.period}-${detailIndex}`}>
                <TableRow className="h-9">
                  <TableCell className="py-1 text-sm">
                    <button
                      onClick={() => toggleRow(detailIndex, detail)}
                      className="p-0.5 hover:bg-muted rounded-lg"
                    >
                      {openRows.includes(detailIndex) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="py-1 text-sm">{detail.zone_name}</TableCell>
                  <TableCell className="py-1 text-sm">{detail.period}</TableCell>
                  <TableCell className="py-1 text-sm">
                    {detail.heures_reel}
                  </TableCell>
             
                  <TableCell className="py-1 text-sm">
                    {detail.heures_standart}{" "}
                  </TableCell>
                  <TableCell className="py-1 text-sm">
                    {detail.cout_reel}
                  </TableCell>
                  <TableCell className="py-1 text-sm">
                    {detail.cout_standart}
                  </TableCell>
                  <TableCell className="py-1 text-sm">
                    {detail.ecart}
                  </TableCell>
                  <TableCell className="py-1 text-sm">
                    {detail.ecart_global}
                  </TableCell>
                  <TableCell className="py-1 text-sm">
                    <Link href={`/workflows/details/${detail.zone_id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs px-2"
                      >
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                {openRows.includes(detailIndex) && (
                 <tr>
                 <td colSpan={10}>
                   <div className="overflow-x-auto p-4">
                     {loadingZones.has(detail.zone_id) ? (
                       <div className="flex justify-center items-center p-8">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                         <span className="ml-2 text-sm text-muted-foreground">Loading zone details...</span>
                       </div>
                     ) : (
                       <table className="table-auto w-full border-collapse border border-gray-400 text-sm text-center">
                         <thead>
                           <tr style={{ height: '10px' }}>
                             <th rowSpan={2} colSpan={1} className="bg-white-100 border text-white border-gray-400 py-0" style={{ fontSize: '12px' }}>Semaine</th>
                             <th colSpan={4} className="bg-blue-100 border text-black border-gray-400 py-0" style={{ fontSize: '12px' }}>Tarif Horaire</th>
                             <th colSpan={4} className="bg-green-100 text-black border border-gray-400 py-0" style={{ fontSize: '12px' }}>Couts Social</th>
                             <th colSpan={4} className="bg-red-100 text-black border border-gray-400 py-0" style={{ fontSize: '12px' }}>Avantage Social</th>
                           </tr>
                           <tr className="bg-white">
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Salaire.Horaire</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>HS</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Ancienneté</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Jours.fériés</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Congé.payé</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Prime poste</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.productivité</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.nuit</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Sécurité.sociale</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Assurance.collective</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Coût.acc.travail</th>
                             <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Plan.retraite</th>
                           </tr>
                         </thead>
                         <tbody>
                           {zoneDetails[detail.zone_id]?.map((calcDetail, calcIndex) => (
                             <tr key={calcIndex} style={{ height: '10px' }}>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.semaine}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.salaire_horaire}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.heures_supplementaires}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.prime_anciennete}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.jours_feries}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.conge_paye}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.prime_poste}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.bonus_productivite}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.bonus_nuit}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.securite_sociale}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.assurance_collective}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.cout_accident_travail}</td>
                               <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>{calcDetail.plan_retraite}</td>
                             </tr>
                           )) || (
                             <tr>
                               <td colSpan={13} className="border border-gray-300 py-4 text-center text-gray-500">
                                 No calculation details available
                               </td>
                             </tr>
                           )}
                         </tbody>
                       </table>
                     )}
                   </div>
                 </td>
               </tr>
           
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/20 transition-colors",
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeftIcon className="h-4 w-4 text-muted-foreground" />
            </button>

            {totalPages && [...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-sm transition-colors",
                  currentPage === i + 1
                    ? "bg-primary/80 dark:bg-primary/20 text-primary-foreground"
                    : "hover:bg-muted/70 dark:hover:bg-muted/20 text-muted-foreground"
                )}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/20 transition-colors",
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
