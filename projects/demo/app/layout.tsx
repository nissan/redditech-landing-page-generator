import type { Metadata } from "next";
import { ThemeProvider } from "@lpg/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing Page Template",
  description: "A reusable Next.js landing page template with YAML configuration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
  );
}
