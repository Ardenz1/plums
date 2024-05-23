import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap' 
})

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
    <html lang="en" className={quicksand.className}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"  rel="stylesheet"></link>
      </head>
      <body>
        <Header hasPlus="true" page="/"/>
        {children}
      </body>
    </html>
  );
}
