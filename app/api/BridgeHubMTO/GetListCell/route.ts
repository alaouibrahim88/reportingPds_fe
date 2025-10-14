import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json([
    { value: "all", label: "All Cells" },
    { value: "cell-1", label: "Cell 1" },
    { value: "cell-2", label: "Cell 2" },
    { value: "cell-3", label: "Cell 3" },
    { value: "cell-4", label: "Cell 4" },
  ]);
}
