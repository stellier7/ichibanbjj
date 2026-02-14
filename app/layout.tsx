import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ichiban Jiu Jitsu - Tegucigalpa, Honduras",
  description: "Professional Jiu Jitsu and Muay Thai training in Tegucigalpa, Honduras. Join Ichiban Academy for world-class martial arts instruction.",
  keywords: "Jiu Jitsu, Muay Thai, Tegucigalpa, Honduras, Martial Arts, Training",
  openGraph: {
    title: "Ichiban Jiu Jitsu - Tegucigalpa, Honduras",
    description: "Professional Jiu Jitsu and Muay Thai training in Tegucigalpa, Honduras.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
