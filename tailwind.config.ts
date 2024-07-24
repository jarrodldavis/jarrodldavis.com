import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { KeyValuePair } from "tailwindcss/types/config";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      screens: {
        "2xs": "475px",
        xs: "525px",
      },
    },
  },
  corePlugins: {
    content: false,
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
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
    plugin(({ addVariant }) => {
      addVariant("tall", "@media (min-height: 500px)");
    }),
  ],
};

export default config;
