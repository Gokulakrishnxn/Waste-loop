import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WASTE//LOOP — Building Waste Calculator",
  description:
    "Professional environmental intelligence tool for building waste estimation. Calculate construction, operational, and maintenance waste streams with climate intelligence.",
  keywords: [
    "building waste calculator",
    "construction waste estimation",
    "circular economy",
    "embodied waste",
    "waste management plan",
    "sustainable architecture",
  ],
  authors: [{ name: "WASTE//LOOP Intelligence" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#1D1D1F]">
        {children}
      </body>
    </html>
  );
}
