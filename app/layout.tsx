import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "@/components/context/AppProviders";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modern dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
        <Toaster richColors />
      </body>
    </html>
  );
}
