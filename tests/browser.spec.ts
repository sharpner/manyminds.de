import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 1440]) {
  test(`legal notice is directly linked, readable and accessible at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Impressum", exact: true }).click();
    await expect(page).toHaveURL(/\/impressum\.html$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Impressum.",
    );
    await expect(page.locator("address")).toContainText("Nino Wagensonner");
    await expect(
      page.getByRole("link", { name: "n.wagensonner@manyminds.de" }),
    ).toHaveAttribute("href", "mailto:n.wagensonner@manyminds.de");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations.map((item) => item.id)).toEqual([]);
    await page.screenshot({
      path: `agent-files/redesign-v2/impressum-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("link", { name: "Zur Startseite", exact: true })
      .first()
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Technische Beratung",
    );
  });
}

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`layout, content and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.locator(".calendar-day.available").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Technische Beratung",
    );
    if (width < 761) {
      const brand = await page.locator(".site-header .brand").boundingBox();
      const actions = await page.locator(".header-actions").boundingBox();
      expect(brand).not.toBeNull();
      expect(actions).not.toBeNull();
      expect(
        Math.abs(
          brand!.y + brand!.height / 2 - actions!.y - actions!.height / 2,
        ),
      ).toBeLessThan(2);
    }
    await expect(page.locator(".portrait-frame img")).toBeVisible();
    expect(
      await page
        .locator(".portrait-frame img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    ).toBeGreaterThan(0);
    await expect(
      page.locator('a[href="https://isar-innovations.dev/research"]').first(),
    ).toHaveAttribute("rel", "noopener");
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      audit.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `agent-files/redesign-v2/verified-${width}.png`,
      fullPage: true,
    });
  });
}

test("mobile navigation closes on Escape and reaches target without hiding focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /Menü/ }).click();
  await expect(page.locator("#navLinks")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobileToggle")).toBeFocused();
  await expect(page.locator("#navLinks")).toBeHidden();
  await page.locator("#mobileToggle").click();
  await page.locator('#navLinks a[href="#research"]').click();
  await expect(page.locator("#navLinks")).toBeHidden();
  await expect(page.locator("#research")).toBeFocused();
  await expect(page).toHaveURL(/#research$/);
});

test("real calendar API, native dialog focus trap, validation and focus return", async ({
  page,
}) => {
  await page.goto("/");
  const day = page.locator(".calendar-day.available").first();
  await day.click();
  await expect(page.locator("#calendarStatus")).toBeHidden();
  await page.locator(".time-slot").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#bookingName")).toBeFocused();
  await page.locator("#bookingName").fill("Local test");
  await page.locator("#bookingEmail").fill("not-an-email");
  let posts = 0;
  page.on("request", (request) => {
    if (request.method() === "POST") posts++;
  });
  await page.locator(".form-submit").click();
  expect(posts).toBe(0);
  expect(
    await page
      .locator("#bookingEmail")
      .evaluate((input: HTMLInputElement) => input.validity.typeMismatch),
  ).toBe(true);
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBe(true);
  }
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations.map((item) => item.id)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".time-slot").first()).toBeFocused();
});

test("English including new sections and calendar, then exact German restoration", async ({
  page,
}) => {
  await page.goto("/?lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#services .section-kicker")).toContainText(
    "Services",
  );
  await expect(page.locator("#research .research-copy h3")).toHaveText(
    "Research",
  );
  await expect(page.locator("#calendarStatus")).toContainText(
    "Please choose a day.",
  );
  await page.locator("#langToggle").click();
  await expect(page.locator("h1")).toContainText("und Umsetzung.");
  await expect(page.locator("#services .section-kicker")).toContainText(
    "Leistungen",
  );
});

test("content and navigation remain accessible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:5173/");
  await expect(page.locator("#navLinks")).toBeVisible();
  await expect(
    page.locator('a[href="mailto:n.wagensonner@manyminds.de"]').first(),
  ).toBeVisible();
  await expect(page.locator("#bookingWidget")).toBeHidden();
  await expect(page.locator("noscript p")).toContainText("per E-Mail");
  const detail = page.locator(".case-notes details").first();
  await detail.locator("summary").click();
  await expect(detail.locator(".case-note-body")).toBeVisible();
  await expect(detail).toContainText("günstigen Android-Geräten");
  await context.close();
});

test("project insights work by keyboard and remain open when changing language", async ({ page }) => {
  await page.goto("/");
  const detail = page.locator(".case-notes details").first();
  await detail.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(detail.locator(".case-note-body")).toBeVisible();
  await page.locator("#langToggle").click();
  await expect(detail).toContainText("budget Android phones");
  await expect(detail.locator(".case-note-body")).toBeVisible();
  const productImage = page.locator(".product-view img");
  await expect(productImage).toHaveAttribute("alt", "projectfit.ai: dashboard with project suggestions and matching skills");
  await expect(page.locator(".working-principles")).toContainText("Start with the user journey.");
  await productImage.scrollIntoViewIfNeeded();
  await expect(productImage).toBeVisible();
  expect(await productImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await page.locator("#langToggle").click();
  await expect(detail).toContainText("günstigen Android-Geräten");
  await expect(productImage).toHaveAttribute("alt", "projectfit.ai: Dashboard mit Projektvorschlägen und zugeordneten Fähigkeiten");
  await expect(page.locator(".working-principles")).toContainText("Beim Nutzungsweg anfangen.");
});

test("200% text size and increased spacing reflow without clipping", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.addStyleTag({
    content:
      "html { font-size: 200%; } * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("product depth responds on desktop and stays still with reduced motion", async ({ page }) => {
  await page.goto("/");
  const link = page.locator(".product-view > a");
  const screen = page.locator(".product-screen");
  await link.hover();
  await expect.poll(() => screen.evaluate(node => getComputedStyle(node).transform)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => screen.evaluate(node => getComputedStyle(node).transform)).toBe("none");
  const response = await page.request.get(await link.getAttribute("href") as string);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
});
