import { test, expect } from "@playwright/test";

test.describe("Frontend Demo - Playwright Website", () => {
  test("@pw should load homepage and verify title", async ({ page }) => {
    await page.goto("https://playwright.dev");

    await expect(page).toHaveTitle(/Playwright/);

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("@pw should navigate to docs link", async ({ page }) => {
    await page.goto("https://playwright.dev");

    const docsLink = page.locator('a:has-text("Docs")').first();
    await expect(docsLink).toBeVisible();

    await docsLink.click();

    await expect(page).toHaveURL(/docs/);
  });

  test("@pw should perform search", async ({ page }) => {
    await page.goto("https://playwright.dev");

    const searchButton = page
      .locator("button[aria-label*='search'], button[title*='Search']")
      .first();
    if (await searchButton.isVisible()) {
      await searchButton.click();

      const searchInput = page
        .locator("input[placeholder*='Search'], input[type='search']")
        .first();
      await searchInput.fill("locator");
      await page.keyboard.press("Enter");

      const results = page.locator("text=locator");
      await expect(results.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe("Frontend Demo - Getting Started", () => {
  test("@pw should verify getting started section", async ({ page }) => {
    await page.goto("https://playwright.dev");

    const gettingStarted = page.locator("text=Getting started").first();
    await expect(gettingStarted).toBeVisible();
  });

  test("@pw page should have interactive elements", async ({ page }) => {
    await page.goto("https://playwright.dev");

    const buttons = page.locator("button, a[role='button']");
    const count = await buttons.count();

    expect(count).toBeGreaterThan(0);
  });
});
