// Renders the link preview image: fills assets/social-preview.html from src/data/profile.js and
// screenshots it to public/social-preview.png. Rerun after changing your role or education.

import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { profile, roleLabel } from "../src/data/profile.js";

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const values = { name: profile.name, role: roleLabel, education: profile.education };

const template = await readFile("assets/social-preview.html", "utf8");
const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
  if (!(key in values)) throw new Error(`assets/social-preview.html uses an unknown placeholder: ${key}`);
  return escape(values[key]);
});

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/social-preview.png" });
await browser.close();
console.log("Wrote public/social-preview.png");
