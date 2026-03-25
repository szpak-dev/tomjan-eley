import { expect, test } from "@playwright/test";

test.describe("smoke routes", () => {
  test("root redirects to the English landing page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/en\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Official Eley Distributor in Poland" })
    ).toBeVisible();
  });

  test("active Eley products are listed and their detail page renders", async ({ page }) => {
    await page.goto("/en/eley/");

    await expect(page.getByRole("heading", { level: 2, name: "Oferta" })).toBeVisible();

    const tenexLink = page.getByRole("link", { name: /tenex/i }).first();
    await expect(tenexLink).toBeVisible();
    await tenexLink.click();

    await expect(page).toHaveURL(/\/en\/eley\/eley-tenex\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Tenex" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Specification" })).toBeVisible();
  });

  test("inactive Eley Hawk product routes are not generated", async ({ page }) => {
    const response = await page.goto("/en/eley-hawk/vip-game/");

    expect(response).not.toBeNull();
    expect(response?.status()).toBe(404);
  });

  test("inactive Eley Hawk listing renders without product cards", async ({ page }) => {
    await page.goto("/en/eley-hawk/");

    await expect(page.getByRole("heading", { level: 2, name: "Oferta" })).toBeVisible();
    await expect(page.getByRole("link", { name: /vip game/i })).toHaveCount(0);
    await expect(page.locator("#productPage")).toHaveCount(0);
  });
});