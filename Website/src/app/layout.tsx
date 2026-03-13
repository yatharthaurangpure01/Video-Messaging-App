import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Syne, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "sonner";

const manrope = Manrope({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Voom — Record. Share. Convert.",
  description: "The video messaging platform built for sales teams — record your screen and webcam, share instantly, and let AI do the heavy lifting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning style={{ scrollBehavior: "smooth" }}>
        <body className={`${manrope.className} ${syne.variable} ${dmSans.variable} bg-[#171717]`}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
