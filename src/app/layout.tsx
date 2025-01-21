import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "Science Bee Gyara",
  description: "Science Bee Gyara, NUST",
};

type TRootLayout = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<TRootLayout>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  );
}
