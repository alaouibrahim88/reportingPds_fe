import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Clear all auth-related cookies
  const cookieStore = cookies();
  cookieStore.delete("auth");
  // Clear any other auth cookies you might have
  // cookieStore.delete("refresh_token");
  // cookieStore.delete("session_id");

  // You can also perform other server-side logout actions here
  // Such as invalidating sessions in your database

  return NextResponse.json({ success: true });
}
