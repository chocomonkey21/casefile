import type { Metadata, Viewport } from "next";
import { DM_Sans, Special_Elite } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "@/components/Providers";
import { copy } from "@/lib/copy";
import "./globals.css";

// Special Elite: labels, headings, case numbers, stamps, folder tabs only
const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

// DM Sans: lesson content, body text, buttons, forms, all UI text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: copy.meta.siteTitle,
    template: "%s | CaseFile",
  },
  description: copy.meta.siteDescription,
};

export const viewport: Viewport = {
  themeColor: "#22324a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${specialElite.variable} ${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
