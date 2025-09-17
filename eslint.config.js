import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    // 1. JS recommended
    js.configs.recommended,

    // 2. TypeScript recommended
    ...tseslint.configs.recommended,

    // 3. React recommended + jsx-runtime
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat["jsx-runtime"], // React 17+ JSX transform
        languageOptions: {
            parser: tseslint.parser, // ensures TS parsing
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {version: "detect"},
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/no-unescaped-entities": "off",
        },
    },
    {
        overrideConfig: {
            linterOptions: {
                reportUnusedDisableDirectives: 'error',
            },
        }
    },

    // 4. React hooks rules
    {
        plugins: {"react-hooks": reactHooks},
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },

    // 5. Accessibility + import order
    {
        plugins: {import: importPlugin, "jsx-a11y": jsxA11y},
        rules: {
            "import/order": ["warn", {"newlines-between": "always"}],
            "jsx-a11y/alt-text": "warn",
        },
    },

    // 6. Ignore unnecessary files/folders
    {
        ignores: [
            "vendor/**",
            "node_modules/**",
            "public/**",
            "bootstrap/ssr/**",
            "tailwind.config.js",
        ],
    },

    // 7. Prettier to disable conflicting stylistic rules
    prettier,
];
