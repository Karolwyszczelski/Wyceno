import type { Metadata } from "next";

import "./demo.css";

import { DesignSystemDemo } from "./showcase";

export const metadata: Metadata = {
  description: "Wewnętrzna strona weryfikacyjna komponentów Lorum.",
  robots: { follow: false, index: false },
  title: "Design foundation",
};

export default function DesignSystemPage() {
  return <DesignSystemDemo />;
}
