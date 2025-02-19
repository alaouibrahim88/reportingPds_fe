import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

// Add this type at the top
type ZoneState = {
  [key in "Zone1" | "Zone2" | "Zone3"]: boolean;
};

const CollapsibleZoneTable = () => {
  const [expandedZones, setExpandedZones] = useState<ZoneState>({
    Zone1: false,
    Zone2: false,
    Zone3: false,
  });

  const toggleZone = (zone: keyof ZoneState) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border p-1" colSpan={2}>
              NATURE
            </th>
            <th
              className="border p-1 text-center font-medium bg-gray-50"
              colSpan={5}
            >
              Octobre
            </th>
            <th
              className="border p-1 text-center font-medium bg-gray-50"
              colSpan={5}
            >
              Novembre
            </th>
            <th
              className="border p-1 text-center font-medium bg-gray-50"
              colSpan={5}
            >
              Sept
            </th>
          </tr>
          <tr>
            <th className="border p-1" colSpan={2}></th>
            <th className="border p-1 text-center">WK1</th>
            <th className="border p-1 text-center">WK2</th>
            <th className="border p-1 text-center">WK3</th>
            <th className="border p-1 text-center">WK4</th>
            <th className="border p-1 text-center">Total M1</th>
            <th className="border p-1 text-center">WK5</th>
            <th className="border p-1 text-center">WK6</th>
            <th className="border p-1 text-center">WK7</th>
            <th className="border p-1 text-center">WK8</th>
            <th className="border p-1 text-center">Total M2</th>
            <th className="border p-1 text-center">WK9</th>
            <th className="border p-1 text-center">WK10</th>
            <th className="border p-1 text-center">WK11</th>
            <th className="border p-1 text-center">WK12</th>
            <th className="border p-1 text-center">Total M3</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(expandedZones).map(([zone, isExpanded]) => (
            <React.Fragment key={zone}>
              <tr className="hover:bg-gray-100 transition-colors">
                <td
                  className="border p-1 cursor-pointer"
                  onClick={() => toggleZone(zone as keyof ZoneState)}
                >
                  {isExpanded ? "▼" : "+"} {zone}
                </td>
                <td className="border p-1">Projet</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">20</td>
                <td className="border p-1 text-center">11</td>
                <td className="border p-1 text-center bg-yellow-50">51</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">20</td>
                <td className="border p-1 text-center">11</td>
                <td className="border p-1 text-center bg-yellow-50">51</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">10</td>
                <td className="border p-1 text-center">20</td>
                <td className="border p-1 text-center">11</td>
                <td className="border p-1 text-center bg-yellow-50">51</td>
              </tr>
              {isExpanded && (
                <>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border p-1">Cell1</td>
                    <td className="border p-1">Serie</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                  </tr>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border p-1">Cell2</td>
                    <td className="border p-1">Projet</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center bg-yellow-50">70</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center bg-yellow-50">70</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center bg-yellow-50">70</td>
                  </tr>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border p-1">Cell3</td>
                    <td className="border p-1">Serie</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">30</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center bg-yellow-50">90</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">30</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center bg-yellow-50">90</td>
                    <td className="border p-1 text-center">25</td>
                    <td className="border p-1 text-center">15</td>
                    <td className="border p-1 text-center">30</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center bg-yellow-50">90</td>
                  </tr>
                  <tr className="hover:bg-gray-100 transition-colors bg-blue-50">
                    <td className="border p-1"></td>
                    <td className="border p-1 font-medium">TOTAL</td>
                    <td className="border p-1 text-center font-medium">60</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">75</td>
                    <td className="border p-1 text-center font-medium">46</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      221
                    </td>
                    <td className="border p-1 text-center font-medium">60</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">75</td>
                    <td className="border p-1 text-center font-medium">46</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      221
                    </td>
                    <td className="border p-1 text-center font-medium">60</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">75</td>
                    <td className="border p-1 text-center font-medium">46</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      221
                    </td>
                  </tr>
                </>
              )}
              {!isExpanded && (
                <>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border p-1"></td>
                    <td className="border p-1">Serie</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">11</td>
                    <td className="border p-1 text-center bg-yellow-50">61</td>
                  </tr>
                  <tr className="hover:bg-gray-100 transition-colors bg-blue-50">
                    <td className="border p-1"></td>
                    <td className="border p-1 font-medium">TOTAL</td>
                    <td className="border p-1 text-center font-medium">30</td>
                    <td className="border p-1 text-center font-medium">20</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">22</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      112
                    </td>
                    <td className="border p-1 text-center font-medium">30</td>
                    <td className="border p-1 text-center font-medium">20</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">22</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      112
                    </td>
                    <td className="border p-1 text-center font-medium">30</td>
                    <td className="border p-1 text-center font-medium">20</td>
                    <td className="border p-1 text-center font-medium">40</td>
                    <td className="border p-1 text-center font-medium">22</td>
                    <td className="border p-1 text-center font-medium bg-blue-100">
                      112
                    </td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollapsibleZoneTable;
