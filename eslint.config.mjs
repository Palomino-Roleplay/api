import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

export default [
    {
        ignores: [".git", "node_modules"]
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            },
            globals: {
                ...globals.node,
                ...globals.es2020
            }
        },
        plugins: {
            "@typescript-eslint": tseslint
        },
        rules: {
            ...eslint.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "indent": ["error", 4, { "ignoredNodes": ["PropertyDefinition"] }],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
            "no-trailing-spaces": "error",
        }
    }
];