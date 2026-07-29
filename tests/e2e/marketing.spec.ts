import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { indexedRoutes } from "../../apps/web/lib/marketing/content";

const homeSectionOrder = [
  "hero",
  "guided-flow",
  "client-demo",
  "decision-document",
  "industry-and-publishing",
  "pilot",
] as const;

const homeHeroViewports = [
  { height: 1_000, name: "1440x1000", width: 1_440 },
  { height: 900, name: "1024x900", width: 1_024 },
  { height: 1_000, name: "768x1000", width: 768 },
  { height: 844, name: "390x844", width: 390 },
  { height: 844, name: "320x844", width: 320 },
] as const;

const homeBoardTwoViewports = [
  { height: 1_000, name: "1440", width: 1_440 },
  { height: 900, name: "1024", width: 1_024 },
  { height: 1_000, name: "768", width: 768 },
  { height: 844, name: "390", width: 390 },
  { height: 844, name: "320", width: 320 },
] as const;

const extractAttribute = (html: string, relation: string, attribute: string): string | null => {
  const tag = html.match(new RegExp(`<link[^>]+rel=["']${relation}["'][^>]*>`, "i"))?.[0];
  return tag?.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"))?.[1] ?? null;
};

const extractMeta = (html: string, name: string): string | null => {
  const tag = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, "i"))?.[0];
  return tag?.match(/content=["']([^"']+)["']/i)?.[1] ?? null;
};

test.describe("marketing and SEO", () => {
  test("home is accessible by keyboard and exposes the product story", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Zamiast pytania/,
      }),
    ).toBeVisible();

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Przejdź do treści" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    const homeSections = page.locator("[data-home-section]");
    await expect(homeSections).toHaveCount(homeSectionOrder.length);
    expect(
      await homeSections.evaluateAll((sections) =>
        sections.map((section) => section.getAttribute("data-home-section")),
      ),
    ).toEqual(homeSectionOrder);
    await expect(page.locator("[data-home-proof]")).toHaveCount(5);
    await expect(page.locator("[data-home-screen]")).toHaveCount(0);

    const productScene = page.locator('[data-home-proof="rendered-product-scene"]');
    const desktopAsset = productScene.locator('[data-home-asset="desktop"]');
    await expect(desktopAsset).toBeVisible();
    await expect(desktopAsset).toHaveAttribute("src", /phone-desktop-transparent-v4/);
    await expect(productScene.locator('[data-home-asset="mobile"]')).toBeHidden();

    const heroSignals = page.getByRole("list", {
      name: "Informacje porządkowane przez proces Lorum",
    });
    await expect(heroSignals).toBeVisible();
    await expect(heroSignals.getByRole("listitem")).toHaveCount(6);

    const guidedFlow = page.locator('[data-home-section="guided-flow"]');
    await expect(guidedFlow.getByRole("listitem")).toHaveCount(4);
    await expect(page.locator('[data-home-proof="decision-document"]')).toBeVisible();

    const composition = await page.evaluate(() => {
      const proofTextSizes = [...document.querySelectorAll<HTMLElement>("[data-home-proof] *")]
        .filter(
          (element) =>
            element.textContent?.trim() &&
            element.getClientRects().length > 0 &&
            !element.classList.contains("wy-sr-only") &&
            !element.closest('[aria-hidden="true"]'),
        )
        .map((element) => ({
          element: element.className || element.tagName.toLowerCase(),
          size: Number.parseFloat(getComputedStyle(element).fontSize),
          text: element.textContent?.trim().slice(0, 40),
        }))
        .sort((left, right) => left.size - right.size);

      return { smallestProofText: proofTextSizes[0] };
    });
    if ((composition.smallestProofText?.size ?? 0) < 12) {
      throw new Error(
        `Product proof text below 12px: ${JSON.stringify(composition.smallestProofText)}`,
      );
    }

    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
  });

  for (const viewport of homeHeroViewports) {
    test(`home header, rendered hero and guided flow match at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({ height: viewport.height, width: viewport.width });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      const hero = page.locator('[data-home-section="hero"]');
      const productScene = page.locator('[data-home-proof="rendered-product-scene"]');
      const guidedFlow = page.locator('[data-home-section="guided-flow"]');
      await expect(hero).toBeVisible();
      await expect(productScene).toBeVisible();
      await expect(guidedFlow).toBeVisible();

      if (viewport.width <= 640) {
        await expect(productScene.locator('[data-home-asset="desktop"]')).toBeHidden();
        await expect(productScene.locator('[data-home-asset="mobile"]')).toBeVisible();
      } else {
        await expect(productScene.locator('[data-home-asset="desktop"]')).toBeVisible();
        await expect(productScene.locator('[data-home-asset="mobile"]')).toBeHidden();
      }

      if (viewport.width > 960) {
        const navigationCenterOffset = await page
          .locator(".marketing-header--home .marketing-nav")
          .evaluate((navigation) => {
            const bounds = navigation.getBoundingClientRect();
            return Math.abs(
              bounds.left + bounds.width / 2 - document.documentElement.clientWidth / 2,
            );
          });
        expect(navigationCenterOffset).toBeLessThanOrEqual(1);
      }

      await expect(hero).toHaveScreenshot(`marketing-home-hero-${viewport.name}.png`, {
        animations: "disabled",
      });

      await page.addStyleTag({
        content:
          ".marketing-header { position: static !important; } .wy-skip-link { visibility: hidden !important; }",
      });
      await expect(guidedFlow).toHaveScreenshot(`marketing-home-guided-flow-${viewport.name}.png`, {
        animations: "disabled",
      });

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
    });
  }

  test("industry demo performs a real keyboard-accessible interaction", async ({ page }) => {
    await page.goto("/branze/meble-na-wymiar");

    const demo = page.locator(".marketing-demo");
    const firstOption = demo.getByRole("radio").first();
    await firstOption.check();
    await demo.getByRole("button", { name: "Zobacz przykładowy brief" }).click();
    await expect(demo.getByText("Gotowy do kontaktu")).toBeVisible();
    await demo.getByRole("button", { name: "Wypełnij demo ponownie" }).click();
    await expect(firstOption).not.toBeChecked();
  });

  test("home demo builds a live brief and the industry links remain available", async ({
    page,
  }) => {
    await page.goto("/");

    const demo = page.locator('[data-home-proof="interactive-client-process"]');
    await expect(
      demo.getByRole("group", { name: "Podaj przybliżone wymiary zabudowy." }),
    ).toBeVisible();
    await demo.getByRole("spinbutton", { name: "Dłuższy odcinek" }).fill("420");
    await demo.getByRole("button", { name: "Dalej: budżet" }).click();
    await demo.getByRole("radio", { name: "35 000–50 000 zł" }).check();
    await demo.getByRole("button", { name: "Dalej: termin" }).click();
    await demo.getByRole("radio", { name: "3–6 miesięcy" }).check();
    await demo.getByRole("button", { name: "Dalej: kontakt" }).click();
    await demo.getByRole("radio", { name: "Wiadomość e-mail", exact: true }).check();
    await demo.getByRole("button", { name: "Zobacz gotowy lead" }).click();
    await expect(
      demo.getByRole("heading", { name: "Firma otrzymuje uporządkowany brief." }),
    ).toBeFocused();
    await expect(demo.getByText("Dobre dopasowanie")).toBeVisible();

    await demo.getByRole("button", { name: "Przejdź ponownie" }).click();
    await expect(
      demo.getByRole("group", { name: "Podaj przybliżone wymiary zabudowy." }),
    ).toBeVisible();

    const deployment = page.locator('[data-home-section="industry-and-publishing"]');
    await expect(deployment.getByRole("navigation", { name: "Procesy branżowe" })).toBeVisible();
    await expect(deployment.getByRole("link", { name: /Klimatyzacja/ })).toBeVisible();
  });

  for (const viewport of homeBoardTwoViewports) {
    test(`home board 2 keeps the intended composition at ${viewport.name}px`, async ({ page }) => {
      await page.setViewportSize({ height: viewport.height, width: viewport.width });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      const demo = page.locator('[data-home-proof="interactive-client-process"]');
      const progressRail = demo.getByRole("progressbar").locator("..");
      const question = demo
        .getByRole("group", { name: "Podaj przybliżone wymiary zabudowy." })
        .locator("..");
      const preview = demo.getByRole("complementary", { name: "Lead tworzony na żywo" });
      const [progressBox, questionBox, previewBox] = await Promise.all([
        progressRail.boundingBox(),
        question.boundingBox(),
        preview.boundingBox(),
      ]);

      if (!progressBox || !questionBox || !previewBox) {
        throw new Error(`Cannot measure board 2 at ${viewport.name}px`);
      }

      if (viewport.width > 896) {
        expect(progressBox.x).toBeLessThan(questionBox.x);
        expect(questionBox.x).toBeLessThan(previewBox.x);
      } else {
        expect(progressBox.y).toBeLessThan(questionBox.y);
        expect(questionBox.y).toBeLessThan(previewBox.y);
      }

      const publishing = page.locator('[data-home-proof="publication-system"]');
      await expect(publishing.getByRole("listitem")).toHaveCount(4);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
    });
  }

  test("mobile menu manages focus, Escape and scroll locking", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Otwórz menu" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Zamknij menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    const homeDialog = page.getByRole("dialog", { name: "Menu mobilne" });
    await expect(homeDialog).toBeVisible();
    await expect(homeDialog.getByRole("link", { name: "Jak działa" })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Menu mobilne" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Otwórz menu" })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

    await page.goto("/produkt");
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    const productDialog = page.getByRole("dialog", { name: "Menu mobilne" });
    await expect(productDialog.getByRole("link", { name: "Produkt" })).toBeFocused();
    await expect(productDialog.getByRole("link", { name: "Zaloguj się" })).toBeVisible();
  });

  test("every allowlisted page has unique metadata, canonical and working internal links", async ({
    request,
  }) => {
    const documents = await Promise.all(
      indexedRoutes.map(async (route) => {
        const response = await request.get(route);
        expect(response.status(), route).toBe(200);
        return { html: await response.text(), route };
      }),
    );

    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const internalPaths = new Set<string>();

    for (const { html, route } of documents) {
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
      const description = extractMeta(html, "description") ?? "";
      const canonical = extractAttribute(html, "canonical", "href");
      const robots = extractMeta(html, "robots") ?? "";

      expect(title.length, `${route} title`).toBeGreaterThanOrEqual(20);
      expect(description.length, `${route} description`).toBeGreaterThanOrEqual(80);
      expect(titles.has(title), `${route} duplicate title`).toBe(false);
      expect(descriptions.has(description), `${route} duplicate description`).toBe(false);
      expect(new URL(canonical ?? "http://invalid.test").pathname).toBe(route);
      expect(robots).toContain("index");
      expect(robots).toContain("follow");
      expect(robots).not.toContain("noindex");
      expect(html).toMatch(/<h1[\s>]/i);

      titles.add(title);
      descriptions.add(description);

      for (const match of html.matchAll(/href=["'](\/[^"'?#]*)(?:[?#][^"']*)?["']/g)) {
        const path = match[1];
        if (path) internalPaths.add(path);
      }
    }

    const responses = await Promise.all(
      [...internalPaths]
        .filter((path) => path !== "/logowanie")
        .map(async (path) => ({
          path,
          response: await request.get(path),
        })),
    );
    for (const { path, response } of responses) {
      expect(response.status(), `broken link ${path}`).toBeLessThan(400);
    }
  });

  test("robots, sitemap, private noindex and error pages agree", async ({ page, request }) => {
    const robots = await request.get("/robots.txt");
    const robotsBody = await robots.text();
    expect(robots.status()).toBe(200);
    for (const path of ["/api/", "/design-system", "/f/", "/logowanie", "/panel"]) {
      expect(robotsBody).toContain(`Disallow: ${path}`);
    }
    expect(robotsBody).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    const sitemapBody = await sitemap.text();
    expect(sitemap.status()).toBe(200);
    for (const route of indexedRoutes) {
      const path = route === "/" ? "" : route;
      expect(sitemapBody).toContain(`${path}</loc>`);
    }
    expect(sitemapBody).not.toContain("/panel");
    expect(sitemapBody).not.toContain("/logowanie");

    await page.goto("/design-system");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    const hostedFlow = await request.get("/f/10000000-0000-4000-8000-000000000001");
    expect(hostedFlow.status()).toBe(200);
    expect(extractMeta(await hostedFlow.text(), "robots")).toContain("noindex");

    const notFound = await request.get("/strona-ktorej-nie-ma");
    expect(notFound.status()).toBe(404);
    expect(await notFound.text()).toContain("Nie znaleźliśmy tej strony");
  });

  test("pricing is honest and structured data contains no invented proof", async ({ page }) => {
    await page.goto("/cennik");
    await expect(page.getByText("Wycena indywidualna")).toBeVisible();
    await expect(page.getByText("Jeszcze nieustalony")).toBeVisible();
    expect(await page.locator("main").innerText()).not.toMatch(/\d[\d\s]*[,.]?\d*\s*zł/i);

    await page.goto("/");
    const structuredData = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(structuredData).toHaveLength(2);
    const serialized = structuredData.join(" ");
    expect(serialized).not.toContain("aggregateRating");
    expect(serialized).not.toContain('"review"');
    expect(serialized).not.toContain('"offers"');
  });

  test("mobile has no horizontal overflow and marketing JavaScript stays within budget", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
    const mobileComposition = await page.evaluate(() => ({
      smallestProofText: [...document.querySelectorAll<HTMLElement>("[data-home-proof] *")]
        .filter(
          (element) =>
            element.textContent?.trim() &&
            element.getClientRects().length > 0 &&
            !element.classList.contains("wy-sr-only") &&
            !element.closest('[aria-hidden="true"]'),
        )
        .map((element) => ({
          element: element.className || element.tagName.toLowerCase(),
          size: Number.parseFloat(getComputedStyle(element).fontSize),
          text: element.textContent?.trim().slice(0, 40),
        }))
        .sort((left, right) => left.size - right.size)[0],
    }));
    if ((mobileComposition.smallestProofText?.size ?? 0) < 12) {
      throw new Error(
        `Mobile product proof text below 12px: ${JSON.stringify(
          mobileComposition.smallestProofText,
        )}`,
      );
    }

    const scriptBytes = await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .filter((entry) => entry.name.includes("/_next/static/") && entry.name.endsWith(".js"))
        .reduce((sum, entry) => sum + entry.encodedBodySize, 0),
    );
    expect(scriptBytes).toBeLessThanOrEqual(250_000);
  });

  test("reflow, reduced motion and forced colors preserve the primary path", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 320 });
    await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Zamiast pytania/,
      }),
    ).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);

    const primaryAction = page.getByRole("link", { name: /Przejdź przykładowy proces/ });
    await primaryAction.focus();
    await expect(primaryAction).toBeFocused();
    await primaryAction.press("Enter");
    await expect(page.locator("#demo-procesu")).toBeVisible();
  });

  test("home content remains visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Zamiast pytania/,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("article", {
        name: "Dane demonstracyjne: kompletny lead z wynikiem i następnym krokiem",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Od krótkiego pytania do decyzji bez rundy doprecyzowań.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Zobacz produkt w działaniu, nie na dekoracyjnym mockupie.",
      }),
    ).toBeVisible();

    await context.close();
  });

  test("home reveal is progressive and reduced motion exposes every element", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#lorum-home")).toHaveAttribute("data-motion-ready", "true");
    const storyHeading = page.getByRole("heading", {
      name: "Od krótkiego pytania do decyzji bez rundy doprecyzowań.",
    });
    await storyHeading.scrollIntoViewIfNeeded();
    await expect(storyHeading).toHaveAttribute("data-revealed", "true");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const hiddenElements = await page
      .locator('[data-reveal]:not([data-revealed="true"])')
      .evaluateAll(
        (elements) =>
          elements.filter((element) => {
            const style = getComputedStyle(element);
            return style.opacity === "0" || style.visibility === "hidden";
          }).length,
      );
    expect(hiddenElements).toBe(0);
  });
});
