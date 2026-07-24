import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("design foundation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/design-system");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Spójny interfejs do pracy z konkretnymi danymi",
      }),
    ).toBeVisible();
  });

  test("nie ma automatycznie wykrywalnych naruszeń WCAG A/AA", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("obsługuje skip link, tabs i powrót fokusu z dialogu", async ({ page }) => {
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Przejdź do treści" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.locator("#main")).toBeFocused();

    const openDialog = page.getByRole("button", { name: "Otwórz dialog" });
    await openDialog.focus();
    await openDialog.press("Enter");
    await expect(
      page.getByRole("dialog", {
        name: "Sprawdzenie zachowania dialogu",
      }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(openDialog).toBeFocused();

    const tableTab = page.getByRole("tab", { name: "Tabela" });
    await tableTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Zasady" })).toBeFocused();
    await expect(page.getByText("Liczby używają cyfr tabelarycznych")).toBeVisible();
  });

  test("respektuje prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const spinner = page.locator(".wy-spinner");
    await expect(spinner).toBeVisible();
    const duration = await spinner.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).animationDuration),
    );
    expect(duration).toBeLessThanOrEqual(0.00001);
    expect(
      await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
    ).toBe("auto");
  });

  test("mobilne menu otwiera się i zamyka z klawiatury", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.reload();
    const menuButton = page.getByRole("button", { name: "Otwórz menu" });
    await menuButton.focus();
    await menuButton.press("Enter");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
  });

  test("desktop jest zgodny z zaakceptowanym baseline", async ({ page }) => {
    await expect(page).toHaveScreenshot("design-system-desktop.png", {
      fullPage: true,
    });
  });

  test("mobile jest zgodny z zaakceptowanym baseline", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.reload();
    await expect(page).toHaveScreenshot("design-system-mobile.png", {
      fullPage: true,
    });
  });
});
