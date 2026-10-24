import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      "prisma/migrations/**",
    ],
  },
  ...nextCoreWebVitals,
  tseslint.configs.recommended,
  {
    // Type-aware rules need a program, so they are limited to typed files.
    files: ["**/*.ts", "**/*.tsx"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // These rules have to live alongside the plugin that defines them.
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/use-memo": "warn",
    },
  },
  {
    rules: {
      /**
       * Surfaced in bulk by eslint-config-next 16 and typescript-eslint 8, on code that
       * predates them: 27 setState-in-effect sites across 12 components, 17 uses of
       * `cond && fn()` as a statement, and three refs read during render. None of them
       * are breakage, and fixing them means reworking component state, so they are
       * warnings for now rather than silently off or refactored inside an upgrade.
       */
      "@typescript-eslint/no-unused-expressions": "warn",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  }
);
