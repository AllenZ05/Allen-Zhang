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

test("the home page survives browser translation while its typed line and copy message come and go", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => {} } }),
  );
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).waitFor();
  // Like Google Translate and Safari: each text node is swapped for <font> elements, including text added later.
  await page.evaluate(() => {
    const translate = (node) => {
      if (!node.nodeValue.trim() || node.parentNode.closest("font, script, style")) return;
      const font = document.createElement("font");
      font.textContent = `[fr] ${node.nodeValue}`;
      node.replaceWith(font);
    };
    const translateAll = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(translate);
    };
    translateAll(document.body);
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) translate(node);
          else if (node.nodeType === Node.ELEMENT_NODE && node.localName !== "font") translateAll(node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  });
  // The copy message clears after 3 seconds, and typing out and deleting the first line takes about 7;
  // React removing either piece of translated text crashed the page.
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("[fr] Email copied!");
  await page.waitForTimeout(9000);
  expect(errors).toEqual([]);
  await expect(page.getByRole("status", { includeHidden: true })).toBeEmpty();
  await expect(page.getByRole("heading", { name: "[fr] Allen Zhang" })).toBeVisible();
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

test("the home page draws a new contour-line landscape on every visit", async ({ page }) => {
  const landscape = async () => {
    await page.goto("/");
    const terrain = page.locator('[class*="terrain"]');
    await expect(terrain).toHaveAttribute("data-ready");
    return terrain.locator("canvas").first().evaluate((canvas) => {
      const { data } = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
      let drawn = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i]) drawn++;
      return { drawn: drawn / (data.length / 4), image: canvas.toDataURL() };
    });
  };
  const first = await landscape();
  const second = await landscape();
  // A few lines, not a filled area.
  for (const { drawn } of [first, second]) expect(drawn).toBeGreaterThan(0.002);
  for (const { drawn } of [first, second]) expect(drawn).toBeLessThan(0.1);
  expect(second.image).not.toBe(first.image);
});

test("the home page's lines stay put when the page grows, as when a phone's address bar hides", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 664 });
  await page.goto("/");
  await expect(page.locator('[class*="terrain"]')).toHaveAttribute("data-ready");
  const lines = page.locator('canvas[class*="_lines"]');
  await lines.evaluate((canvas) => {
    window.firstDrawing = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
  });
  await page.setViewportSize({ width: 390, height: 1400 });
  await expect.poll(() => lines.evaluate((canvas) => canvas.height)).toBeGreaterThan(1000);
  // Compare the area both drawings cover; a few antialiased edge pixels may differ.
  const moved = await lines.evaluate((canvas) => {
    const before = window.firstDrawing;
    const after = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let differing = 0;
    for (let y = 0; y < Math.min(before.height, after.height); y++) {
      for (let x = 0; x < Math.min(before.width, after.width); x++) {
        const a = (y * before.width + x) * 4 + 3;
        const b = (y * after.width + x) * 4 + 3;
        if (Math.abs(before.data[a] - after.data[b]) > 8) differing++;
      }
    }
    return differing;
  });
  expect(moved).toBeLessThan(50);
});

test("the home page's light keeps up with a quick flick of the mouse", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const backdrop = page.locator('[class*="backdrop"]').first();
  await page.mouse.move(300, 450);
  await expect(backdrop).toHaveAttribute("data-glowing");
  await page.mouse.move(1100, 450, { steps: 4 });
  // A couple of frames later the light is under the pointer, not still on its way.
  await page.waitForTimeout(50);
  const { glow, lit, lines } = await backdrop.evaluate((el) => {
    const box = (selector) => el.querySelector(selector).getBoundingClientRect();
    return { glow: box('[class*="cursorGlow"]'), lit: box('[class*="litLines"]'), lines: box('[class*="_lines"]') };
  });
  expect(Math.abs(glow.left + glow.width / 2 - 1100)).toBeLessThan(5);
  expect(Math.abs(glow.top + glow.height / 2 - 450)).toBeLessThan(5);
  // The light slides around rather than being redrawn, and its accent lines stay exactly on the faint ones.
  expect([lit.left, lit.top, lit.width, lit.height]).toEqual([lines.left, lines.top, lines.width, lines.height]);
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

test("cards already on screen appear even if the browser's first visibility report is late", async ({ page }) => {
  // Linux WebKit in CI delivered IntersectionObserver's initial report late; drop it entirely here.
  await page.addInitScript(() => {
    const Native = window.IntersectionObserver;
    window.IntersectionObserver = class extends Native {
      constructor(callback, options) {
        let first = true;
        super((entries, observer) => {
          if (first) {
            first = false;
            return;
          }
          callback(entries, observer);
        }, options);
      }
    };
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experiences/");
  await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1", { timeout: 3000 });
});

test("the 404 page explains the problem and leads back home", async ({ page }) => {
  await page.goto("/this-page-does-not-exist/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page.getByRole("heading", { name: "Allen Zhang", exact: true })).toBeVisible();
});

test("page changes slide the way the nav highlight moves, with the navbar on its own layer", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  // A CSS Modules name would be renamed at build time and miss the transition rules in globals.css.
  await expect(nav).toHaveCSS("view-transition-name", "navbar");
  await nav.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-nav", "forward");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-nav", "back");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About Me");
});

test("the first painted frame already has the right theme, with no dark flash", async ({ page }) => {
  // next/script's beforeInteractive ran after the first paint; the inline <head> script must not.
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    requestAnimationFrame(() => {
      const root = document.documentElement;
      window.firstFrame = { theme: root.getAttribute("data-theme"), js: root.hasAttribute("data-js") };
    });
  });
  await page.goto("/projects/");
  await expect.poll(() => page.evaluate(() => window.firstFrame)).toEqual({ theme: "light", js: true });
});

test("following a link from the phone menu closes it at once, so only the page transition moves", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Projects" }).click();
  // An animated close here would be drawn under the outgoing page and blink.
  expect(await page.locator("#mobile-navigation").evaluate((el) => getComputedStyle(el).display)).toBe("none");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
});

test("quick repeated theme clicks queue their fades instead of cutting one short", async ({ page }) => {
  // Starting a view transition while one runs skips it, which left the page half-switched.
  await page.addInitScript(() => {
    window.overlaps = 0;
    const start = Document.prototype.startViewTransition;
    if (!start) return;
    let active = 0;
    Document.prototype.startViewTransition = function (...args) {
      if (active > 0) window.overlaps += 1;
      active += 1;
      const transition = start.apply(this, args);
      transition.finished.finally(() => {
        active -= 1;
      });
      return transition;
    };
  });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: /^Switch to/ }).waitFor();
  await page.evaluate(() => {
    for (let i = 0; i < 3; i++) setTimeout(() => document.querySelector('button[aria-label^="Switch to"]').click(), i * 90);
  });
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(html).not.toHaveAttribute("data-fade", "");
  expect(await page.evaluate(() => window.overlaps)).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
});

test("the Experiences timeline fills with scroll: empty at the top, fully lit at the bottom, even on a tall screen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 2000, height: 1343 });
  await page.goto("/experiences/");
  const line = page.locator('[class*="timelineLine"]');
  const fill = () => line.evaluate((el) => Number(getComputedStyle(el, "::after").scale.split(" ")[1] ?? 1));
  await expect.poll(fill).toBeLessThan(0.02);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(fill).toBe(1);
});

test("project demo videos are hosted here, start fast, and play from the Demo links", async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/");
  for (const name of ["Demo for Minesweeper", "Demo for Snake"]) {
    const link = page.getByRole("link", { name, exact: true });
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^\/projects\/.+\.mp4$/);
    // The index (moov) comes first, so a phone can start playing before the whole file arrives.
    const head = await page.request.get(href, { headers: { Range: "bytes=0-4095" } });
    expect(head.status()).toBe(206);
    expect((await head.body()).includes("moov")).toBe(true);
    const [tab] = await Promise.all([context.waitForEvent("page"), link.click()]);
    await tab.waitForLoadState();
    const played = await tab.evaluate(async () => {
      const video = document.querySelector("video");
      video.muted = true;
      await video.play();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return video.currentTime;
    });
    expect(played).toBeGreaterThan(0.5);
    await tab.close();
  }
});

test("on a phone the timeline's lit tip stays on screen until the line is full, and older Safari's fallback matches", async ({
  page,
}) => {
  // Report no scroll timelines, like Safari before 26, so the page also computes the fallback progress
  // (--scroll-progress) while this browser's own scroll timeline keeps driving the fill.
  await page.addInitScript(() => {
    const supports = CSS.supports.bind(CSS);
    CSS.supports = (...args) => !String(args[0]).includes("animation-timeline") && supports(...args);
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/experiences/");
  const line = page.locator('[class*="timelineLine"]');
  // Both the browser's fill and the fallback must reach the progress for the new scroll position
  // (scroll position over --fill-end) before the tip is measured.
  const read = () =>
    line.evaluate((el) => {
      const expected = Math.min(window.scrollY / Number.parseFloat(el.style.getPropertyValue("--fill-end")), 1);
      const native = Number(getComputedStyle(el, "::after").scale.split(" ")[1] ?? 1);
      const fallback = Number(el.style.getPropertyValue("--scroll-progress"));
      const rect = el.getBoundingClientRect();
      return {
        native,
        error: Math.max(Math.abs(native - expected), Math.abs(fallback - expected)),
        tip: (rect.top + native * rect.height) / window.innerHeight,
      };
    });
  const max = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  for (let step = 0; step <= 10; step++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((max * step) / 10));
    await expect.poll(async () => (await read()).error).toBeLessThan(0.02);
    const { native, tip } = await read();
    if (native < 1) {
      expect(tip).toBeGreaterThan(0.15);
      expect(tip).toBeLessThan(0.85);
    }
  }
});

test("Netlify keeps the build's hashed files cached for a year, and only those", async ({ page }) => {
  const rules = await (await page.request.get("/_headers")).text();
  const paths = rules.split("\n").filter((line) => line.startsWith("/"));
  expect(paths).toEqual(["/_next/static/*"]);
  expect(rules).toContain("/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n");
  // The rule is only safe because every file there has a content hash in its name.
  await page.goto("/");
  const assets = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map((entry) => new URL(entry.name).pathname)
      .filter((path) => path.startsWith("/_next/static/")),
  );
  expect(assets.length).toBeGreaterThan(5);
  for (const path of assets) expect(path).toMatch(/[a-z0-9_-]{10,}\.(js|css|woff2)$/);
});

test("on touch screens a tap leaves no hover highlight behind, while a mouse still gets one", async ({
  browser,
  page,
}) => {
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await touch.route(/https:\/\/(www\.googletagmanager\.com|.*google-analytics\.com)\//, (route) =>
    route.fulfill({ body: "" }),
  );
  const phone = await touch.newPage();
  await phone.goto("http://127.0.0.1:4175/projects/");
  const tapped = phone.locator('main a[class*="projectButton"]').first();
  const resting = await tapped.evaluate((el) => getComputedStyle(el).backgroundColor);
  // Coming back from the project's site, the button looks as it did before the tap.
  const [tab] = await Promise.all([touch.waitForEvent("page"), tapped.tap()]);
  await tab.close();
  await phone.waitForTimeout(400);
  await expect(tapped).toHaveCSS("background-color", resting);
  await expect(tapped).toHaveCSS("transform", "none");
  await touch.close();

  await page.goto("/projects/");
  const hovered = page.locator('main a[class*="projectButton"]').first();
  await hovered.hover();
  await expect(hovered).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
});

test("in high-contrast mode the current page still stands out in the navbar and the phone menu", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/about/");
  // The contrast theme's own highlight colour, as the browser resolves it.
  const highlight = await page.evaluate(() => {
    const probe = document.body.appendChild(document.createElement("div"));
    probe.style.cssText = "forced-color-adjust: none; background: Highlight";
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  });
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link", { name: "About" })).toHaveCSS("background-color", highlight);
  await expect(nav.getByRole("link", { name: "Home" })).not.toHaveCSS("background-color", highlight);

  // The phone menu's own accent tint used to win here, leaving dark text on a dark tint.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu.getByRole("link", { name: "About" })).toHaveCSS("background-color", highlight);
  await expect(menu.getByRole("link", { name: "Home" })).not.toHaveCSS("background-color", highlight);
});

test("the Incoming badge shows in full on an iPad held upright", async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/experiences/");
  const badge = page.locator('[class*="statusBadge"]').first();
  await expect(badge).toBeVisible();
  const { content, box } = await badge.evaluate((el) => ({ content: el.scrollWidth, box: el.clientWidth }));
  expect(content).toBeLessThanOrEqual(box);
});

test("text follows the browser's font size setting without breaking the Experiences layout", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "Only Chromium can emulate the font size setting");
  // Chrome's Settings > Appearance > Font size > Very large.
  const devtools = await page.context().newCDPSession(page);
  await devtools.send("Page.enable");
  await devtools.send("Page.setFontSizes", { fontSizes: { standard: 24, fixed: 13 } });
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto("/experiences/");
  await expect(page.locator("html")).toHaveCSS("font-size", "24px");
  // Larger text switches to the single-column timeline sooner instead of overflowing two columns.
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  const badge = page.locator('[class*="statusBadge"]').first();
  const { content, box } = await badge.evaluate((el) => ({ content: el.scrollWidth, box: el.clientWidth }));
  expect(content).toBeLessThanOrEqual(box);
});

test("on touch screens the small company link icons still catch a slightly-off tap", async ({ browser, page }) => {
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await touch.route(/^https:\/\//, (route) => route.fulfill({ body: "" }));
  const phone = await touch.newPage();
  await phone.goto("http://127.0.0.1:4175/experiences/");
  const card = phone.locator("[data-reveal]").filter({ has: phone.locator('a[class*="externalLink"]') }).first();
  await expect(card).toHaveAttribute("data-revealed", "");
  await expect(card).toHaveCSS("opacity", "1");
  const icon = await card.locator('a[class*="externalLink"]').boundingBox();
  // 10px past the 16px icon's right edge, where a fingertip easily lands.
  const [tab] = await Promise.all([
    touch.waitForEvent("page"),
    phone.touchscreen.tap(icon.x + icon.width + 10, icon.y + icon.height / 2),
  ]);
  await expect(tab).toHaveURL(/rippling\.com/);
  await touch.close();

  // A mouse is precise, so the link stays exactly the icon.
  await page.goto("/experiences/");
  const link = page.locator('a[class*="externalLink"]').first();
  const box = await link.boundingBox();
  const hit = await page.evaluate(
    ([x, y]) => Boolean(document.elementFromPoint(x, y)?.closest('a[class*="externalLink"]')),
    [box.x + box.width + 10, box.y + box.height / 2],
  );
  expect(hit).toBe(false);
});
