import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University Games Project",
  description:
    "Um projeto universitário que simula a listagem e avaliação de jogos, com dados obtidos por meio de uma API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen w-full bg-white flex justify-center">
          <div className="flex flex-col items-center w-full max-w-6xl">
            <div className="p-24 w-full">
              <Navbar />

              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
