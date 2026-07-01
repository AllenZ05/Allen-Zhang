// Next.js-specific rules only. Formatting and general JS/React linting are
// handled by Biome (see biome.json); this covers the Next.js-only checks
// (next/image, sync scripts, fonts, etc.) that Biome has no equivalent for.
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: ["dist", "dist-ssr", ".next", "out", "node_modules"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
