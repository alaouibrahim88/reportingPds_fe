import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json([
    { value: "1", label: "Wrapping" },
    { value: "2", label: "Nets" },
    { value: "3", label: "Boot" },
  ]);
}
