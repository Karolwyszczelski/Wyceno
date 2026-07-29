import "@wyceno/ui/styles.css";
import "./system-pages.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteOrigin } from "../lib/marketing/metadata";

export const metadata: Metadata = {
  description:
    "Lorum porządkuje zapytania klientów, kwalifikuje leady i wskazuje następny krok sprzedażowy.",
  icons: {
    icon: [{ type: "image/svg+xml", url: "/Logoicon.svg" }],
  },
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Lorum",
    template: "%s · Lorum",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
