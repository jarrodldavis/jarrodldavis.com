import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { KeyValuePair } from "tailwindcss/types/config";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
  theme: {},
  corePlugins: {
    content: false,
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          content: (value) => ({
            // Can't use `var(--tw-content)` here because Firefox doesn't discard unsupported alt
            // text syntax for `content` when it uses `var`.
            content: [value, `${value} / ''`],
          }),
        },
        {
          values: theme<KeyValuePair<string, string>>("content"),
        },
      );
    }),
  ],
};

export default config;
