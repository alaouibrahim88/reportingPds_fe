"use client";
import React, { useEffect } from "react";
import { workflowData } from "../../_components/data/workflowData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeft,
  Building2,
  Users,
  ArrowLeftRight,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  fetchCellDetails,
  fetchOperatorDetailsByCell,
} from "@/actions/cost/details";
import { fetchZoneCalculationDetails } from "@/actions/cost/dashboard";
import {
  CellDetailApiResponse,
  CellCalculRefDetail,
  OperatorDetailsApiResponse,
  Zone,
  Cell,
} from "@/types";
import { monthOptions, yearOptions } from "@/constants/filters";
import { useRouter } from "next/navigation";
import { fetchAllZones, fetchCellByZone } from "@/actions/scrap";

export default function WorkflowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [currentCellsPage, setCurrentCellsPage] = useState(1);
  const [openRows, setOpenRows] = useState<string[]>([]);
  const [allZones, setAllZones] = useState<Zone[]>([]);
  const [allCells, setAllCells] = useState<Cell[]>([]);
  const [currentOperatorsPage, setCurrentOperatorsPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedZone, setSelectedZone] = useState(params.id);
  const [cellSearchQuery, setCellSearchQuery] = useState("");
  // Separate state for cells performance filters
  const [cellsSelectedMonth, setCellsSelectedMonth] = useState<string>("01"); // Default to January
  const [cellsSelectedYear, setCellsSelectedYear] = useState<string>("2025");
  // Separate state for operators performance filters
  const [operatorsSelectedMonth, setOperatorsSelectedMonth] =
    useState<string>("01"); // Default to January
  const [operatorsSelectedYear, setOperatorsSelectedYear] =
    useState<string>("2025");
  const [cellDetails, setCellDetails] = useState<
    CellDetailApiResponse | undefined
  >(undefined);
  const [operatorDetails, setOperatorDetails] = useState<
    OperatorDetailsApiResponse | undefined
  >(undefined);
  const [zoneDetails, setZoneDetails] = useState<
    Record<number, CellCalculRefDetail[]>
  >({});
  const [loadingZones, setLoadingZones] = useState<Set<number>>(new Set());

  const CellHeader = () => (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="h-9 text-xs">Détail</TableHead>
        <TableHead className="h-9 text-xs">Cell ID</TableHead>
        <TableHead className="h-9 text-xs">Performance</TableHead>
        <TableHead className="h-9 text-xs">Taux STD</TableHead>
        <TableHead className="h-9 text-xs">Taux Réel</TableHead>
        <TableHead className="h-9 text-xs">Heurs STD</TableHead>
        <TableHead className="h-9 text-xs">Heure Réel</TableHead>
        <TableHead className="h-9 text-xs">Couts STD</TableHead>
        <TableHead className="h-9 text-xs">Couts Réel</TableHead>
        <TableHead className="h-9 text-xs">Efficience</TableHead>
        <TableHead className="h-9 text-xs">Ecart Global</TableHead>
      </TableRow>
    </TableHeader>
  );
  const DetailZoneHeader = () => (
    <thead>
      <tr style={{ height: "10px" }}>
        <th
          rowSpan={2}
          colSpan={1}
          className="bg-white-100 border text-white border-gray-400 py-0"
          style={{ fontSize: "12px" }}
        >
          Semaine
        </th>
        <th
          colSpan={4}
          className="bg-blue-100 border text-black border-gray-400 py-0"
          style={{ fontSize: "12px" }}
        >
          Tarif Horaire
        </th>
        <th
          colSpan={4}
          className="bg-green-100 text-black border border-gray-400 py-0"
          style={{ fontSize: "12px" }}
        >
          Couts Social
        </th>
        <th
          colSpan={4}
          className="bg-red-100 text-black border border-gray-400 py-0"
          style={{ fontSize: "12px" }}
        >
          Avantage Social
        </th>
      </tr>
      <tr className="bg-white">
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Salaire.Horaire
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          HS
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Ancienneté
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Jours.fériés
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Congé.payé
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Prime poste
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Bonus.productivité
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Bonus.nuit
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Sécurité.sociale
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Assurance.collective
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Coût.acc.travail
        </th>
        <th
          className="border border-gray-400 px-2 py-1 text-gray-600"
          style={{ fontSize: "12px" }}
        >
          Plan.retraite
        </th>
      </tr>
    </thead>
  );

  const switchZone = (zone: string) => {
    setSelectedZone(zone);
    router.push(`/workflows/details/${zone}`);
  };

  useEffect(() => {
    console.log("Fetching all zones...");
    fetchAllZones().then(setAllZones);
  }, []);

  useEffect(() => {
    fetchCellByZone(selectedZone).then(setAllCells);
  }, [selectedZone]);

  useEffect(() => {
    const fetchData = async () => {
      if (cellsSelectedMonth !== "all" && cellsSelectedYear) {
        const details = await fetchCellDetails(
          Number(params.id),
          parseInt(cellsSelectedMonth),
          parseInt(cellsSelectedYear)
        );
        setCellDetails(details);
      } else {
        setCellDetails(undefined);
      }
    };

    fetchData();
  }, [params.id, cellsSelectedMonth, cellsSelectedYear]);

  useEffect(() => {
    const fetchOperators = async () => {
      if (
        selectedCell !== "" &&
        operatorsSelectedMonth &&
        operatorsSelectedYear
      ) {
        // Extract numeric cell ID from selectedCell (e.g., "cell-1" -> 1)
        const cellIdMatch = selectedCell.match(/\d+/);
        if (cellIdMatch) {
          const cellId = parseInt(cellIdMatch[0]);
          const operators = await fetchOperatorDetailsByCell(
            Number(params.id),
            cellId,
            parseInt(operatorsSelectedMonth),
            parseInt(operatorsSelectedYear)
          );
          setOperatorDetails(operators);
        }
      } else {
        setOperatorDetails(undefined);
      }
    };

    fetchOperators();
  }, [params.id, selectedCell, operatorsSelectedMonth, operatorsSelectedYear]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setCurrentCellsPage(1);
  }, [cellSearchQuery]);

  // Reset operators page to 1 when search changes
  useEffect(() => {
    setCurrentOperatorsPage(1);
  }, [searchQuery]);

  const toggleRow = async (rowKey: string, cellId?: string) => {
    const isOpening = !openRows.includes(rowKey);

    setOpenRows((prev) =>
      prev.includes(rowKey)
        ? prev.filter((key) => key !== rowKey)
        : [...prev, rowKey]
    );

    // If opening row and we have a cellId, fetch zone calculation details
    if (isOpening && cellId) {
      const cellIdNum = parseInt(cellId.replace("C", ""), 10);
      if (!zoneDetails[cellIdNum]) {
        setLoadingZones((prev) => new Set(prev).add(cellIdNum));

        try {
          const response = await fetchZoneCalculationDetails(cellIdNum);
          if (response?.details) {
            setZoneDetails((prev) => ({
              ...prev,
              [cellIdNum]: response.details,
            }));
          }
        } catch (error) {
          console.error("Error fetching zone calculation details:", error);
        } finally {
          setLoadingZones((prev) => {
            const newSet = new Set(prev);
            newSet.delete(cellIdNum);
            return newSet;
          });
        }
      }
    }
  };

  const detail = allZones
    .find((detail) => detail.libelle === params.id);

  if (!detail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Detail not found</h1>
        <p className="text-muted-foreground mb-4">ID: {params.id}</p>
        <Link href="/workflows">
          <Button>Return to Workflows</Button>
        </Link>
      </div>
    );
  }

  // Filter cells based on search query
  const filteredCells = Array.isArray(cellDetails?.details)
    ? cellDetails.details?.filter((cell) => {
        const matchesSearch = cell.id
          .toLowerCase()
          .includes(cellSearchQuery.toLowerCase());
        return matchesSearch;
      })
    : [];

  // Pagination calculations
  const totalCellsPages = Math.ceil(
    (filteredCells?.length || 0) / itemsPerPage
  );
  const totalOperatorsPages = Math.ceil(
    (operatorDetails?.details?.length || 0) / itemsPerPage
  );

  const paginatedCells = filteredCells.slice(
    (currentCellsPage - 1) * itemsPerPage,
    currentCellsPage * itemsPerPage
  );

  // Update the filter logic
  const filteredOperators = Array.isArray(operatorDetails?.details)
    ? operatorDetails.details.filter((operator) => {
        const matchesSearch = [
          operator.operator_name,
          operator.matricule,
          operator.cell_name,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesSearch;
      })
    : [];

  // Update paginated operators to use filtered data
  const paginatedOperators = filteredOperators.slice(
    (currentOperatorsPage - 1) * itemsPerPage,
    currentOperatorsPage * itemsPerPage
  );

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
  ) => (
    <div className="mt-4 flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        {`Page ${currentPage} of ${totalPages}`}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              size="icon"
              onClick={() => setPage(i + 1)}
              className="h-8 w-8 p-0"
            >
              <span className="text-xs">{i + 1}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="py-2 px-4">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/workflows">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/50 -ml-2 h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderIcon className="w-4 h-4 text-primary" />
              <h2 className="font-medium text-sm">Zone Details</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Details for {detail.libelle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-2 py-1 rounded-md border">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ArrowLeftRight className="h-3 w-3" />
            Switch zone:
          </span>
          <Select value={selectedZone} onValueChange={switchZone}>
            <SelectTrigger className="h-6 w-[100px] text-xs border-none bg-transparent hover:bg-muted/80 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent className="min-w-[120px]">
              {allZones && allZones?.map((zone) => (
                <SelectItem
                  key={zone.libelle}
                  value={zone.libelle}
                  className="text-xs"
                  aria-selected={selectedZone === zone.libelle}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {zone.libelle}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cells Performance Table */}
      <div className="rounded-md border mb-4">
        <div className="flex items-center justify-between h-12 px-3 border-b bg-muted/40">
          <div className="flex items-center gap-2">
            <Building2 className="w-3 h-3 text-primary" />
            <h3 className="font-medium text-xs">Cells Performance</h3>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search cells..."
              value={cellSearchQuery}
              onChange={(e) => setCellSearchQuery(e.target.value)}
              className="h-6 w-[180px] text-xs bg-white/50"
            />
            <Select
              value={cellsSelectedMonth}
              onValueChange={setCellsSelectedMonth}
            >
              <SelectTrigger className="h-6 w-[120px] text-xs bg-white/50">
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Tous les mois
                </SelectItem>
                {monthOptions.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className="text-xs"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={cellsSelectedYear}
              onValueChange={setCellsSelectedYear}
            >
              <SelectTrigger className="h-6 w-[100px] text-xs bg-white/50">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={year.value}
                    className="text-xs"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <CellHeader />
          <TableBody>
            {paginatedCells?.map((cell, index) => {
              const rowKey = `table-operators-${index}`;

              return (
                <React.Fragment key={rowKey}>
                  <TableRow
                    key={rowKey}
                    className="h-10 hover:bg-muted/50"
                    style={{ height: "10px" }}
                  >
                    <TableCell className="py-1 text-sm">
                      <button
                        onClick={() => toggleRow(rowKey, cell.id)}
                        className="p-0.5 hover:bg-muted rounded-lg"
                      >
                        {openRows.includes(rowKey) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-xs font-medium py-2">
                      {cell.id}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-1 py-1 rounded-full",
                          {
                            "bg-green-100": cell.performance_status === "green",
                            "bg-yellow-100":
                              cell.performance_status === "yellow",
                            "bg-red-100": cell.performance_status === "red",
                          }
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", {
                            "bg-green-500": cell.performance_status === "green",
                            "bg-yellow-500":
                              cell.performance_status === "yellow",
                            "bg-red-500": cell.performance_status === "red",
                          })}
                        />
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.taux_std}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.taux_reel}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.heurs_std}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.heure_reel}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.couts_std}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100">
                        {cell.couts_reel}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {cell.efficience}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {(() => {
                        const value = Number(cell.ecart_global);
                        const badgeClass =
                          value > 100
                            ? "bg-green-100 text-green-700"
                            : "bg-red-400 text-red-700";
                        return (
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${badgeClass}`}
                          >
                            {cell.ecart_global}
                          </span>
                        );
                      })()}
                    </TableCell>
                  </TableRow>

                  {openRows.includes(rowKey) && (
                    <tr>
                      <td colSpan={12}>
                        <div className="overflow-x-auto p-4">
                          {(() => {
                            const cellIdNum = parseInt(
                              cell.id.replace("C", ""),
                              10
                            );
                            return loadingZones.has(cellIdNum) ? (
                              <div className="flex justify-center items-center p-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                <span className="ml-2 text-sm text-muted-foreground">
                                  Loading zone calculation details...
                                </span>
                              </div>
                            ) : (
                              <table className="table-auto w-full border-collapse border border-gray-400 text-sm text-center">
                                <DetailZoneHeader />
                                <tbody>
                                  {zoneDetails[cellIdNum]?.map(
                                    (calcDetail, calcIndex) => (
                                      <tr
                                        key={calcIndex}
                                        style={{ height: "10px" }}
                                      >
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.semaine}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.salaire_horaire}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.heures_supplementaires}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.prime_anciennete}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.jours_feries}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.conge_paye}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.prime_poste}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.bonus_productivite}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.bonus_nuit}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.securite_sociale}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.assurance_collective}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.cout_accident_travail}
                                        </td>
                                        <td
                                          className="border border-gray-300 py-1"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {calcDetail.plan_retraite}
                                        </td>
                                      </tr>
                                    )
                                  ) || (
                                    <tr>
                                      <td
                                        colSpan={13}
                                        className="border border-gray-300 py-4 text-center text-gray-500"
                                      >
                                        No calculation details available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            );
                          })()}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
        <div className="border-t">
          {renderPagination(
            currentCellsPage,
            totalCellsPages,
            setCurrentCellsPage
          )}
        </div>
      </div>

      {/* Operators Performance Section */}
      <div className="rounded-md border">
        {selectedCell === "" ? (
          // Initial state - just the cell selector
          <div className="flex items-center justify-between h-12 px-3 border-b bg-muted/40">
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-primary" />
              <h3 className="font-medium text-xs">Operators Performance</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Select a cell to view operators performance
            </p>
            <div className="flex items-center gap-2">
              <Select value={selectedCell} onValueChange={setSelectedCell}>
                <SelectTrigger className="h-8 w-[160px] text-xs">
                  <SelectValue placeholder="Select a cell" />
                </SelectTrigger>
                <SelectContent>
                  {allCells?.map((cell) => (
                      <SelectItem
                        key={cell.libelle}
                        value={cell.libelle}
                        className="text-xs"
                      >
                        {cell.libelle}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select
                value={operatorsSelectedMonth}
                onValueChange={setOperatorsSelectedMonth}
              >
                <SelectTrigger className="h-8 w-[120px] text-xs bg-white/50">
                  <SelectValue placeholder="Mois" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    Tous les mois
                  </SelectItem>
                  {monthOptions.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value}
                      className="text-xs"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={operatorsSelectedYear}
                onValueChange={setOperatorsSelectedYear}
              >
                <SelectTrigger className="h-8 w-[100px] text-xs bg-white/50">
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem
                      key={year.value}
                      value={year.value}
                      className="text-xs"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          // Cell details and table view
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">
                      {
                        allCells.find((cell) => cell.libelle === selectedCell)
                          ?.libelle
                      }
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Cell Overview
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedCell} onValueChange={setSelectedCell}>
                    <SelectTrigger className="h-7 w-[120px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allCells
                        .map((cell) => (
                          <SelectItem
                            key={cell.id}
                            value={cell.libelle}
                            className="text-xs"
                          >
                            {cell.libelle}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={operatorsSelectedMonth}
                    onValueChange={setOperatorsSelectedMonth}
                  >
                    <SelectTrigger className="h-7 w-[120px] text-xs bg-white/50">
                      <SelectValue placeholder="Mois" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">
                        Tous les mois
                      </SelectItem>
                      {monthOptions.map((month) => (
                        <SelectItem
                          key={month.value}
                          value={month.value}
                          className="text-xs"
                        >
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={operatorsSelectedYear}
                    onValueChange={setOperatorsSelectedYear}
                  >
                    <SelectTrigger className="h-7 w-[100px] text-xs bg-white/50">
                      <SelectValue placeholder="Année" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem
                          key={year.value}
                          value={year.value}
                          className="text-xs"
                        >
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div
                  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center"
                  style={{ height: "20px" }}
                >
                  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
                    Total Couts STD : {operatorDetails?.total_couts_standard}
                  </p>
                </div>
                <div
                  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center"
                  style={{ height: "20px" }}
                >
                  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
                    Total Couts Reel : {operatorDetails?.total_couts_reel}
                  </p>
                </div>
                <div
                  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center "
                  style={{ height: "20px" }}
                >
                  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
                    Total Couts Social : {operatorDetails?.totalcouts_social}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between h-8 px-3 border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-primary" />
                <h3 className="font-medium text-xs">Operators List</h3>
              </div>

              <div className="relative flex items-center gap-1.5 bg-white/50 rounded-md px-2 h-6 group focus-within:ring-1 focus-within:ring-primary/20">
                <Search className="h-3 w-3 text-muted-foreground/50 group-focus-within:text-primary/50" />
                <Input
                  placeholder="Search operators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-6 w-[160px] text-xs border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 hover:text-primary"
                  >
                    <X className="h-3 w-3 text-muted-foreground/50 hover:text-primary/50" />
                  </button>
                )}
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-9 text-xs">Operator</TableHead>
                  <TableHead className="h-9 text-xs">Matricule</TableHead>
                  <TableHead className="h-9 text-xs">Hours Réel</TableHead>
                  <TableHead className="h-9 text-xs">Heures STD</TableHead>
                  <TableHead className="h-9 text-xs">Coûts STD</TableHead>
                  <TableHead className="h-9 text-xs">Coûts Réel</TableHead>
                  <TableHead className="h-9 text-xs">
                    Avantages Sociaux
                  </TableHead>
                  <TableHead className="h-9 text-xs">Efficience Moy</TableHead>
                  <TableHead className="h-9 text-xs">Couts Réel</TableHead>
                  <TableHead className="h-9 text-xs">Couts Standard</TableHead>
                  <TableHead className="h-9 text-xs">Écart</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOperators.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={12}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {operatorDetails === undefined
                        ? "Select a cell to view operators"
                        : operatorDetails?.details?.length === 0
                        ? "No operators found for this cell"
                        : "Loading..."}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOperators.map((operator, index) => {
                    const rowKey = `table-cell-${index}`;
                    return (
                      <React.Fragment key={rowKey}>
                        <TableRow
                          key={operator.matricule}
                          className="h-10 hover:bg-muted/50"
                          style={{ height: "10px" }}
                        >
                          <TableCell className="text-xs font-medium py-2">
                            {operator.operator_name}
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.matricule}
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.details
                              .reduce(
                                (sum, detail) =>
                                  sum + parseFloat(detail.heures_reel || "0"),
                                0
                              )
                              .toFixed(1)}
                            h
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.details
                              .reduce(
                                (sum, detail) =>
                                  sum + parseFloat(detail.total_heures || "0"),
                                0
                              )
                              .toFixed(1)}
                            h
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.details
                              .reduce(
                                (sum, detail) =>
                                  sum +
                                  parseFloat(detail.couts_standard || "0"),
                                0
                              )
                              .toFixed(2)}
                            €
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.details
                              .reduce(
                                (sum, detail) =>
                                  sum + parseFloat(detail.couts_reel || "0"),
                                0
                              )
                              .toFixed(2)}
                            €
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${"bg-gray-100"}`}
                            >
                              {operator.details
                                .reduce(
                                  (sum, detail) =>
                                    sum +
                                    parseFloat(detail.avantages_sociaux || "0"),
                                  0
                                )
                                .toFixed(2)}
                              €
                            </span>
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {(
                              operator.details.reduce(
                                (sum, detail) =>
                                  sum +
                                  parseFloat(detail.tarif_horaire_pct || "0"),
                                0
                              ) / operator.details.length
                            ).toFixed(1)}
                            %
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${"bg-gray-100"}`}
                            >
                              {operator.details
                                .reduce(
                                  (sum, detail) =>
                                    sum + parseFloat(detail.couts_reel || "0"),
                                  0
                                )
                                .toFixed(2)}
                              €
                            </span>
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {operator.details
                              .reduce(
                                (sum, detail) =>
                                  sum +
                                  parseFloat(detail.couts_standard || "0"),
                                0
                              )
                              .toFixed(2)}
                            €
                          </TableCell>
                          <TableCell className="text-xs py-2">
                            {(() => {
                              const realCost = operator.details.reduce(
                                (sum, detail) =>
                                  sum + parseFloat(detail.couts_reel || "0"),
                                0
                              );
                              const stdCost = operator.details.reduce(
                                (sum, detail) =>
                                  sum +
                                  parseFloat(detail.couts_standard || "0"),
                                0
                              );
                              const variance = realCost - stdCost;
                              const badgeClass =
                                variance > 0
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700";
                              return (
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${badgeClass}`}
                                >
                                  {variance.toFixed(2)}€
                                </span>
                              );
                            })()}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })
                )}
              </TableBody>
            </Table>
            <div className="border-t">
              {renderPagination(
                currentOperatorsPage,
                Math.ceil(filteredOperators.length / itemsPerPage),
                setCurrentOperatorsPage
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
