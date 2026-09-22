/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "avoid",
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  importOrder: [
    "^react$",
    "^next/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/content/(.*)$",
    "^@/lib/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  importOrderSeparation: false,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
};
