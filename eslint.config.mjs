import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-use-before-define": "error",
      "no-useless-assignment": "error",
      camelcase: "error",
      "default-param-last": ["error"],
      eqeqeq: "error",
      "no-alert": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-lonely-if": "error",
      // "no-magic-numbers": "error",
      "no-nested-ternary": "error",
      "no-var": "error",
    },
  },
];
