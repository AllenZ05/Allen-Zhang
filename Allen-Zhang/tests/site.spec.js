import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.route(/https:\/\/(www\.googletagmanager\.com|.*google-analytics\.com)\//, (route) =>
    route.fulfill({ body: "" }),
  );
});

test("navigation, theme persistence, and page-specific metadata", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const [label, heading, path] of [
    ["About", "About Me", "/about/"],
    ["Experiences", "Experiences", "/experiences/"],
    ["Projects", "Projects", "/projects/"],
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://allenzhang05.com${path}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `https://allenzhang05.com${path}`);
  }
});

test("mobile menu contains focus, closes on Escape, and unlocks after resizing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    await expect.poll(() => menu.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(menu).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("About tabs support arrows, Home/End, and selection on desktop and mobile", async ({ page }) => {
  await page.goto("/about/");
  await page.getByRole("tab", { name: "Introduction" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Education" })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Education" })).toBeVisible();
  await expect(page.getByText("In progress", { exact: true })).toBeVisible();
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel", { name: "Skills" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: "Education" })).toHaveAttribute("aria-selected", "true");
});

test("project previews load, close with Escape, and return focus", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.getByText("View preview", { exact: true })).toHaveCount(0);
  const links = page.getByRole("link", { name: /^Enlarge .* preview$/ });
  await expect(links).toHaveCount(7);
  await expect(links.first().locator("img")).toHaveCSS("padding", "0px");
  await expect(links.first().locator("img")).toHaveCSS("object-fit", "cover");
  for (const link of await links.all()) {
    await link.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveCSS("object-fit", "contain");
    await expect.poll(() => dialog.locator("img").evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(link).toBeFocused();
  }
});

test("clipboard denial leaves a visible, usable email address", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("Denied")) } }),
  );
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute(
    "href",
    "mailto:allen.zhang.y05@gmail.com",
  );
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Select the email address");
  await expect(page.getByRole("link", { name: "allen.zhang.y05@gmail.com" })).toBeVisible();
});

test("reduced motion preserves a stable role and disables page entrance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByText("Incoming Software Engineer Intern at Rippling", { exact: true })).toBeVisible();
  await expect(page.locator(".page-content")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toHaveCSS("animation-name", "none");
  await page.clock.install();
  await page.clock.fastForward(10000);
  await expect(page.getByText("Incoming Software Engineer Intern at Rippling", { exact: true })).toBeVisible();
});

test("normal motion includes entrances, rotating copy, and About-card tilt", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toHaveCSS(
    "animation-name",
    "content-entrance",
  );
  await expect(page.getByText("Would love to talk and connect with you :D", { exact: true })).toBeVisible({ timeout: 6000 });
  await expect(page.getByText("Incoming Software Engineer Intern at Rippling", { exact: true })).toBeVisible();

  await page.goto("/about/");
  const panel = page.getByRole("tabpanel", { name: "Introduction" });
  const card = panel.locator(":scope > div");
  await expect(card).toHaveCSS("opacity", "1");
  const bounds = await panel.boundingBox();
  await page.mouse.move(bounds.x + bounds.width * 0.8, bounds.y + bounds.height * 0.2);
  await expect.poll(() => card.evaluate((el) => Math.abs(new DOMMatrix(getComputedStyle(el).transform).m13))).toBeGreaterThan(0.005);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => card.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m13)).toBe(0);
});

test("exported content and mobile navigation work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4175/");
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toHaveCSS("opacity", "1");
  await page.getByRole("navigation").getByRole("link", { name: "About", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Education", exact: true })).toBeVisible();
  await page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.locator("article").first()).toHaveCSS("opacity", "1");
  await expect(page.locator(".page-content")).toHaveCSS("opacity", "1");
  await context.close();
});

test("mobile layouts fit in both themes", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/about/", "/experiences/", "/projects/"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const theme of ["dark", "light"]) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
        }, theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      }
    }
  }
  expect(errors).toEqual([]);
});
