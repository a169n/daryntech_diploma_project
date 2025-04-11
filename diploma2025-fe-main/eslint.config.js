import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "eslint.config.js",
      "jest.config.js",
      "dist/**/*",
      "tailwind.config.js",
      "node_modules",
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        React: "writable",
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: [
          "./tsconfig.json",
          "./tsconfig.app.json",
          "./tsconfig.node.json",
          {
            tsconfigRootDir: ".",
            project: ["eslint.config.js"],
          },
        ],
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },
];
