import type { Metadata } from "next";

import "./demo.css";

import { DesignSystemDemo } from "./showcase";

export const metadata: Metadata = {
  title: "Design foundation",
  description: "Wewnętrzna strona weryfikacyjna komponentów Wyceno.",
};

export default function DesignSystemPage() {
  return <DesignSystemDemo />;
}
