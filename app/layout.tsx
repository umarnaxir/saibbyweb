import type { Metadata } from "next";
import GlobalStylesClient from "@/lib/styles/GlobalStylesClient";
import StyledComponentsRegistry from "@/lib/styles/StyledComponentsRegistry";
import "./globals.css";
import "@/lib/styles/app.scss";
import "@/lib/styles/global.scss";
import "@/lib/helpers/stringValidator";

export const metadata: Metadata = {
  title: "Saibbyweb - A digital first creative studio",
  description: "Global Software Architects: Building Future-Ready Solutions for a Diverse International Clientele in 8+ Countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStylesClient />
          <div id="portal"></div>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
