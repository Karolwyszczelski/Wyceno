import { describe, expect, it } from "vitest";

import { contrastRatio, relativeLuminance } from "./contrast";
import { colorTokens } from "./tokens";

describe("tokeny kolorystyczne", () => {
  it.each([
    ["tekst / powierzchnia", colorTokens.text, colorTokens.surface],
    ["tekst / tło", colorTokens.text, colorTokens.background],
    ["tekst drugorzędny / powierzchnia", colorTokens.textMuted, colorTokens.surface],
    ["biały / mocny akcent", colorTokens.surface, colorTokens.accentStrong],
    ["tekst akcentu / akcent", colorTokens.accentText, colorTokens.accent],
    ["błąd / powierzchnia", colorTokens.error, colorTokens.surface],
    ["ostrzeżenie / powierzchnia", colorTokens.warning, colorTokens.surface],
    ["informacja / powierzchnia", colorTokens.info, colorTokens.surface],
  ])("%s spełnia WCAG AA dla zwykłego tekstu", (_name, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });

  it("mocna linia spełnia kontrast 3:1 dla granic kontrolek", () => {
    expect(contrastRatio(colorTokens.borderStrong, colorTokens.surface)).toBeGreaterThanOrEqual(3);
  });

  it("odrzuca nieprawidłowy zapis koloru", () => {
    expect(() => relativeLuminance("#fff")).toThrow("Nieprawidłowy kolor szesnastkowy");
  });
});
