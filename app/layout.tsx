import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import { Inter, Gochi_Hand, Itim } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const gochi = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gochi",
});

const itim = Itim({
  weight: "400",
  subsets: ["thai"],
  display: "swap",
  variable: "--font-itim",
});

export const metadata: Metadata = {
  title: "Lipda Chantayasakorn",
  description: "Lipda's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gochi.variable} ${itim.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <NavBar />
      </body>
    </html>
  );
}
