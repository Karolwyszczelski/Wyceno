import { describe, expect, it } from "vitest";

import { contrastRatio, relativeLuminance } from "./contrast";
import { colorTokens } from "./tokens";

describe("tokeny kolorystyczne", () => {
  it.each([
    ["tekst główny / powierzchnia", colorTokens.textPrimary, colorTokens.surface],
    ["tekst główny / tło", colorTokens.textPrimary, colorTokens.background],
    ["tekst drugorzędny / powierzchnia", colorTokens.textSecondary, colorTokens.surface],
    ["tekst wyciszony / powierzchnia", colorTokens.textMuted, colorTokens.surface],
    ["tekst wyciszony / powierzchnia drugorzędna", colorTokens.textMuted, colorTokens.surfaceMuted],
    ["biały / marka", colorTokens.surface, colorTokens.brand],
    ["tekst marki / miękka marka", colorTokens.brand, colorTokens.brandSoft],
    ["sukces / powierzchnia", colorTokens.success, colorTokens.surface],
    ["sukces / miękki sukces", colorTokens.success, colorTokens.successSoft],
    ["błąd / powierzchnia", colorTokens.danger, colorTokens.surface],
    ["ostrzeżenie / powierzchnia", colorTokens.warning, colorTokens.surface],
    ["informacja / powierzchnia", colorTokens.info, colorTokens.surface],
  ])("%s spełnia WCAG AA dla zwykłego tekstu", (_name, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });

  it("mocna linia spełnia kontrast 3:1 dla granic kontrolek", () => {
    expect(contrastRatio(colorTokens.borderStrong, colorTokens.surface)).toBeGreaterThanOrEqual(3);
  });

  it("utrzymuje aliasy zgodności bez tworzenia drugiej palety", () => {
    expect(colorTokens.text).toBe(colorTokens.textPrimary);
    expect(colorTokens.accent).toBe(colorTokens.brandSoft);
    expect(colorTokens.accentStrong).toBe(colorTokens.brand);
    expect(colorTokens.error).toBe(colorTokens.danger);
  });

  it("odrzuca nieprawidłowy zapis koloru", () => {
    expect(() => relativeLuminance("#fff")).toThrow("Nieprawidłowy kolor szesnastkowy");
  });
});
