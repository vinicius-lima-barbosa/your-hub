const config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/store/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#121212",
          900: "#171717",
          850: "#1f1f1f",
          800: "#262626",
        },
        canvas: {
          light: "#fcfcfc",
          dark: "#121212",
        },
        muted: {
          line: "#d6d3d1",
          surface: "#f5f5f4",
          ink: "#292524",
        },
      },
      boxShadow: {
        soft: "0 24px 80px -48px rgb(18 18 18 / 0.35)",
      },
    },
  },
};

export default config;
