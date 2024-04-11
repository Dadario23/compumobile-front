import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "@/state/StoreProvider";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compumobile",
  description: "Reparacion de celulares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
