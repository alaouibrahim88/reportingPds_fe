import React, { useState } from "react";
import { ChevronDown, Plus, Users2 } from "lucide-react";

// Add this type at the top
type ZoneState = {
  [key in "Wrapping" | "Nets" | "Knitting"]: boolean;
};

interface CollapsibleZoneTableProps {
  viewMode: "price" | "qty";
}

const CollapsibleZoneTable = ({ viewMode }: CollapsibleZoneTableProps) => {
  const [expandedZones, setExpandedZones] = useState<ZoneState>({
    Wrapping: false,
    Nets: false,
    Knitting: false,
  });

  const toggleZone = (zone: keyof ZoneState) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  // Helper function to format values
  const formatValue = (value: number) => {
    return viewMode === "price" ? `${value} €` : value;
  };

  return (
    <div className="rounded-md border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-1 py-3 px-4 bg-muted/30 rounded-t-md">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">Zone Details</h3>
        </div>
      </div>

      <div className="p-3 transition-all hover:border-primary/20">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="border p-1 text-xs font-medium text-muted-foreground"
                  colSpan={2}
                >
                  NATURE
                </th>
                <th
                  className="border p-1 text-center text-xs font-medium text-muted-foreground bg-muted/30"
                  colSpan={5}
                >
                  Octobre
                </th>
                <th
                  className="border p-1 text-center text-xs font-medium text-muted-foreground bg-muted/30"
                  colSpan={5}
                >
                  Novembre
                </th>
                <th
                  className="border p-1 text-center text-xs font-medium text-muted-foreground bg-muted/30"
                  colSpan={5}
                >
                  Sept
                </th>
              </tr>
              <tr>
                <th
                  className="border p-1 text-xs font-medium text-muted-foreground"
                  colSpan={2}
                ></th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK1
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK2
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK3
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK4
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  Total M1
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK5
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK6
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK7
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK8
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  Total M2
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK9
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK10
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK11
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  WK12
                </th>
                <th className="border p-1 text-center text-xs font-medium text-muted-foreground">
                  Total M3
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expandedZones).map(([zone, isExpanded]) => (
                <React.Fragment key={zone}>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td
                      className="border p-1 cursor-pointer text-xs text-muted-foreground"
                      onClick={() => toggleZone(zone as keyof ZoneState)}
                    >
                      {isExpanded ? "▼" : "+"} {zone}
                    </td>
                    <td className="border p-1 text-xs text-muted-foreground">
                      Projet
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(20)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(11)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                      {formatValue(51)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(20)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(11)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                      {formatValue(51)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(10)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(20)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground">
                      {formatValue(11)}
                    </td>
                    <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                      {formatValue(51)}
                    </td>
                  </tr>
                  {isExpanded && (
                    <>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="border p-1 text-xs text-muted-foreground">
                          Cell1
                        </td>
                        <td className="border p-1 text-xs text-muted-foreground">
                          Serie
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="border p-1 text-xs text-muted-foreground">
                          Cell2
                        </td>
                        <td className="border p-1 text-xs text-muted-foreground">
                          Projet
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(70)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(70)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(70)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="border p-1 text-xs text-muted-foreground">
                          Cell3
                        </td>
                        <td className="border p-1 text-xs text-muted-foreground">
                          Serie
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(90)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(90)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(25)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(15)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(90)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors bg-blue-50">
                        <td className="border p-1 text-xs text-muted-foreground"></td>
                        <td className="border p-1 text-xs text-muted-foreground font-medium">
                          TOTAL
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(60)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(75)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(46)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(221)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(60)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(75)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(46)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(221)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(60)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(75)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(46)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(221)}
                        </td>
                      </tr>
                    </>
                  )}
                  {!isExpanded && (
                    <>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="border p-1 text-xs text-muted-foreground"></td>
                        <td className="border p-1 text-xs text-muted-foreground">
                          Serie
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(10)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground">
                          {formatValue(11)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
                          {formatValue(61)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors bg-blue-50">
                        <td className="border p-1 text-xs text-muted-foreground"></td>
                        <td className="border p-1 text-xs text-muted-foreground font-medium">
                          TOTAL
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(22)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(112)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(22)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(112)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(30)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(20)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(40)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium">
                          {formatValue(22)}
                        </td>
                        <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
                          {formatValue(112)}
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleZoneTable;
