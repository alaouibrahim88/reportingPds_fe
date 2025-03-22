"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Import the server action
import { deleteCookieValue } from "@/lib/storage";

/**
 * Clears authentication cookies and redirects to login page
 */
export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log("Logging out...");

      const cookiesToClear = ["access_token", "refresh_token", "auth"];

      await Promise.all(
        cookiesToClear.map(async (cookieName) => {
          const result = await deleteCookieValue(cookieName);
          console.log(`Deleted ${cookieName}: ${result.success}`);
          return result;
        })
      );

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      router.refresh();
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-label="Logout"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
