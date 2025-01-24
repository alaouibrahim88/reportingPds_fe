"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";

function Container() {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col w-full  gap-4 ">
      <div className=" p-4 ">
        <MixBarChart />
        {/* <MixBarChart /> */}
      </div>
      <TableZone />
    </div>
  );
}

export default Container;
