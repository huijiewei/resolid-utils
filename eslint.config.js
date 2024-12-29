import eslintBrowser from "@resolid/config/eslint.browser";
import eslintNode from "@resolid/config/eslint.node";
import eslintTypescript from "@resolid/config/eslint.typescript";

export default [...eslintTypescript, ...eslintNode, ...eslintBrowser];
