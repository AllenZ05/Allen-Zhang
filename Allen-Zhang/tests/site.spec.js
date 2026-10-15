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
  // Keyboard activation: Safari does not focus buttons on mouse click, so only keyboard users have focus to restore.
  await trigger.focus();
  await page.keyboard.press("Enter");
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
    // Keyboard activation: Safari does not focus links on mouse click, so only keyboard users have focus to restore.
    await link.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveCSS("object-fit", "contain");
    await expect.poll(() => dialog.locator("img").evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(link).toBeFocused();
  }
});

test("email address appears as a fallback when clipboard access is denied", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("Denied")) } }),
  );
  await page.goto("/");
  await expect(page.getByRole("link", { name: "allen.zhang.y05@gmail.com" })).toHaveCount(0);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copy manually:");
  await expect(page.getByRole("link", { name: "allen.zhang.y05@gmail.com" })).toBeVisible();
  await expect(page.getByRole("link", { name: "allen.zhang.y05@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:allen.zhang.y05@gmail.com",
  );
});

test("home footer fits the viewport, centers its four icons, and copies email", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: async (text) => { window.copiedEmail = text; } },
    }),
  );
  for (const [width, height] of [[1440, 900], [1366, 768], [390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Copy email address" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact", exact: true })).toHaveCount(0);
    const footer = page.getByRole("contentinfo");
    const bounds = await footer.boundingBox();
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(height + 1);
    const icons = footer.locator("svg");
    await expect(icons).toHaveCount(4);
    for (const icon of await icons.all()) {
      const offset = await icon.evaluate((svg) => {
        const iconRect = svg.getBoundingClientRect();
        const buttonRect = svg.closest("button, a").getBoundingClientRect();
        return {
          x: Math.abs(iconRect.x + iconRect.width / 2 - buttonRect.x - buttonRect.width / 2),
          y: Math.abs(iconRect.y + iconRect.height / 2 - buttonRect.y - buttonRect.height / 2),
        };
      });
      expect(offset.x).toBeLessThan(1);
      expect(offset.y).toBeLessThan(1);
    }
  }
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied!");
  expect(await page.evaluate(() => window.copiedEmail)).toBe("allen.zhang.y05@gmail.com");
});

test("reduced motion preserves a stable introduction and disables page entrance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const typewriter = page.locator("[data-typewriter]");
  await expect(typewriter).toHaveText("Computer Engineering student at the University of Waterloo");
  await expect(page.locator(".page-content")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toHaveCSS("animation-name", "none");
  await page.clock.install();
  await page.clock.fastForward(10000);
  await expect(typewriter).toHaveText("Computer Engineering student at the University of Waterloo");
});

test("normal motion includes typing and deleting all hero messages and stable controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  // The second animation is the scroll reveal, where scroll-driven animations are supported.
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toHaveCSS(
    "animation-name",
    /^content-entrance(, content-entrance)?$/,
  );
  await page.getByRole("button", { name: "Copy email address" }).waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(document.getAnimations()
      .filter((animation) => animation.effect.getComputedTiming().iterations !== Infinity)
      .map((animation) => animation.finished.catch(() => {})));
  });
  await page.clock.install();
  await page.clock.runFor(1000);
  const typewriter = page.locator("[data-typewriter]");
  const aboutLink = page.getByRole("link", { name: "About Me", exact: true });
  const initialY = (await aboutLink.boundingBox()).y;
  const samples = [];
  for (let i = 0; i < 35; i++) {
    await page.clock.runFor(800);
    samples.push(await typewriter.textContent());
    expect(Math.abs((await aboutLink.boundingBox()).y - initialY)).toBeLessThan(1);
  }
  const expectedMessages = [
    "Computer Engineering student at the University of Waterloo",
    "Incoming Software Engineer Intern at Rippling",
    "Open to Summer or Fall 2027 internships",
    "Would love to talk and connect with you :D",
  ];
  const completedMessages = [...new Set(samples.filter((text) => expectedMessages.includes(text)))];
  expect(completedMessages).toEqual(expectedMessages);
  expect(samples.some((text, i) => i > 0 && text.length > 0 && text.length < samples[i - 1].length && samples[i - 1].startsWith(text))).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(typewriter).toHaveText("Computer Engineering student at the University of Waterloo");
  await page.clock.runFor(10000);
  await expect(typewriter).toHaveText("Computer Engineering student at the University of Waterloo");
});

test("exported content and mobile navigation work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4175/");
  await expect(page.locator("[data-typewriter]")).toHaveText("Computer Engineering student at the University of Waterloo");
  await expect(page.getByRole("link", { name: "Email Allen Zhang", exact: true })).toHaveAttribute(
    "href", "mailto:allen.zhang.y05@gmail.com",
  );
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
  page.on("pageerror", (error) => {
    // This test navigates faster than Next.js can finish prefetching link data; WebKit reports those
    // cancelled prefetches as "... due to access control checks". They are not page errors.
    if (/__next\..*due to access control checks/.test(error.message)) return;
    errors.push(error.message);
  });
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

test("new pages start at the top and Back restores the previous scroll position", async ({ page }) => {
  await page.goto("/experiences/");
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Experiences");
  // Within 50px: WebKit can restore a few pixels off while late layout (web fonts) settles.
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(900, -2);
});

test("pages hydrate without errors after the build year ends", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.clock.install({ time: new Date(new Date().getFullYear() + 1, 0, 2) });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /^Switch to/ })).toBeVisible();
  await page.clock.runFor(2000);
  expect(errors).toEqual([]);
});

test("theme follows the system until the visitor chooses one", async ({ page }) => {
  const html = page.locator("html");
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  // An explicit choice outlasts later system changes and reloads.
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});

test("navbar highlight stays in the navbar when navigating from a scrolled page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experiences/");
  await page.evaluate(() => window.scrollTo(0, 1500));
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: "Projects", exact: true }).click();
  const navBox = await nav.boundingBox();
  for (let i = 0; i < 10; i++) {
    const highlight = await nav.locator('li[aria-hidden="true"]').boundingBox();
    expect(highlight.y).toBeGreaterThanOrEqual(navBox.y);
    expect(highlight.y + highlight.height).toBeLessThanOrEqual(navBox.y + navBox.height);
    await page.waitForTimeout(40);
  }
});

test("navbar highlight sits under the current page's link", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const path of ["/", "/about/", "/experiences/", "/projects/"]) {
    await page.goto(path);
    const offset = () =>
      nav.evaluate((el) => {
        const highlight = el.querySelector('li[aria-hidden="true"]').getBoundingClientRect();
        const active = el.querySelector('ul a[aria-current="page"]').getBoundingClientRect();
        return Math.abs(highlight.x - active.x) + Math.abs(highlight.width - active.width);
      });
    await expect.poll(offset).toBeLessThan(2);
  }
});

test("glass surfaces keep their blur after CSS minification", async ({ page }) => {
  // Writing -webkit-backdrop-filter after backdrop-filter made the minifier drop the standard property.
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  expect(await nav.evaluate((el) => getComputedStyle(el).backdropFilter)).toContain("blur");
});

test("cards below the fold appear as they scroll into view, or immediately with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experiences/");
  const lastCard = page.locator("[data-reveal]").last();
  await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1");
  await expect(lastCard).toHaveCSS("opacity", "0");
  await lastCard.scrollIntoViewIfNeeded();
  await expect(lastCard).toHaveAttribute("data-revealed", "");
  await expect(lastCard).toHaveCSS("opacity", "1");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/");
  await expect(page.locator("article").last()).toHaveCSS("opacity", "1");
});

test("About's small cards lift and glow under the cursor", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about/");
  await page.getByRole("tab", { name: "Skills" }).click();
  const category = page.getByRole("tabpanel", { name: "Skills" }).locator("[data-reveal]").first();
  await expect(category).toHaveCSS("opacity", "1");
  await category.hover();
  await expect.poll(() => category.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeLessThan(-3);
  await expect(category.locator('[aria-hidden="true"]').first()).toHaveCSS("opacity", "1");
});
