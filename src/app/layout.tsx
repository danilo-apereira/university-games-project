"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReduxProvider } from "@/lib/redux/provider";
import { routes } from "@/routes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const shouldShowNavbar =
    pathname !== routes.guest.auth.login &&
    pathname !== routes.guest.auth.register;

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className="min-h-screen w-full bg-white flex justify-center">
            <div className="flex flex-col items-center w-full max-w-6xl">
              <div className="p-24 w-full">
                {shouldShowNavbar && <Navbar />}

                {children}
              </div>
            </div>
          </div>

          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
