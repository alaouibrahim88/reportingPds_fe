"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome page when app loads
    router.replace("/welcome");
  }, [router]);

  // Return null or a loading state while redirecting
  return null;
}
