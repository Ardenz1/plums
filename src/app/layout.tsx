import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Plums | Home",
  description: "Plums learning, taking educational notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"  rel="stylesheet"></link>
      </head>
      <body>
        <Header hasPlus />
        {children}
      </body>
    </html>
  );
}
