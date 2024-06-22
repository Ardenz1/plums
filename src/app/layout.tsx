import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap' 
})

export const metadata: Metadata = {
  title: {
    template: '%s | PLUMS',
    default: 'Home'
  },
  description: "Plums learning, organizing your education",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
