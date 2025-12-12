import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                
                /* Primary Colors - Deep Blue Palette */
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    900: "#1f2942", /* Deep Blue - primary background/header */
                    800: "#2a3650",
                    700: "#3a4b73", /* Slate Blue - secondary background/sections */
                    600: "#4a5d85",
                    500: "#5a6ea0", /* Waikawa Gray - cards, borders, secondary UI */
                    400: "#7a8ab3",
                    300: "#b3cde0", /* Modern Teal - light backgrounds */
                    200: "#d1e4f0",
                    100: "#e8f1f8",
                    50: "#f4f8fb",
                },
                
                /* Secondary Colors - Slate Blue */
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    900: "#1f2942",
                    800: "#2a3650",
                    700: "#3a4b73", /* Slate Blue */
                    600: "#4a5d85",
                    500: "#5a6ea0",
                    400: "#7a8ab3",
                    300: "#b3cde0",
                    200: "#d1e4f0",
                    100: "#e8f1f8",
                    50: "#f4f8fb",
                },
                
                /* CTA - Bright Coral */
                cta: {
                    DEFAULT: "hsl(var(--cta))",
                    foreground: "hsl(var(--cta-foreground))",
                    900: "#cc3d2f",
                    800: "#d9564a",
                    700: "#e66f63",
                    600: "#f3887c",
                    500: "#ff6e61", /* Bright Coral - main CTA button */
                    400: "#ff8a80",
                    300: "#ffa699",
                    200: "#ffc2b3",
                    100: "#ffdecc",
                    50: "#fff5f2",
                },
                
                /* Highlight - Gold */
                highlight: {
                    DEFAULT: "hsl(var(--highlight))",
                    foreground: "hsl(var(--highlight-foreground))",
                    900: "#b8860b",
                    800: "#daa520",
                    700: "#e6c200",
                    600: "#f0d000",
                    500: "#FFD700", /* Gold - accents and highlights */
                    400: "#ffdf33",
                    300: "#ffe766",
                    200: "#ffef99",
                    100: "#fff7cc",
                    50: "#fffcee",
                },
                
                /* Premium - Royal Purple */
                premium: {
                    DEFAULT: "hsl(var(--premium))",
                    foreground: "hsl(var(--premium-foreground))",
                    900: "#6b5d7a",
                    800: "#7a6a88",
                    700: "#8a7996",
                    600: "#917EA6", /* Royal Purple - special sections/premium */
                    500: "#a392b3",
                    400: "#b5a6c0",
                    300: "#c7bacd",
                    200: "#d9ceda",
                    100: "#ebe2e7",
                    50: "#f5f0f4",
                },
                
                /* Success - Green */
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                    900: "#1e7e34",
                    800: "#229954",
                    700: "#27ae60", /* Green Accent - success indicators */
                    600: "#2ecc71",
                    500: "#52c988",
                    400: "#76d69f",
                    300: "#9ae3b6",
                    200: "#bef0cd",
                    100: "#e2fde4",
                    50: "#f0fef2",
                    light: "#e2fde4",
                },
                
                /* Legacy support - keeping for compatibility */
                lightBlue: {
                    900: "#1f2942", /* Deep Blue */
                    800: "#2a3650",
                    700: "#3a4b73", /* Slate Blue */
                    600: "#4a5d85",
                    500: "#5a6ea0", /* Waikawa Gray */
                    400: "#7a8ab3",
                    300: "#b3cde0", /* Modern Teal */
                    200: "#d1e4f0",
                    100: "#e8f1f8",
                    50: "#f4f8fb",
                },
                
                /* Gray scale for text and neutral elements */
                gray: {
                    900: "#1f2942", /* Deep Blue - darkest gray */
                    800: "#2a3650",
                    700: "#404040",
                    600: "#525252",
                    500: "#737373",
                    400: "#a3a3a3",
                    300: "#d4d4d4",
                    200: "#e5e5e5",
                    100: "#f5f5f5",
                    50: "#fafafa",
                    0: "#ffffff", /* Cloud Dancer White */
                },
                
                neutral: {
                    900: "#1f2942", /* Deep Blue */
                    800: "#2a3650",
                    700: "#404040",
                    600: "#525252",
                    500: "#737373",
                    400: "#a3a3a3",
                    300: "#d4d4d4",
                    200: "#e5e5e5",
                    100: "#f5f5f5",
                    50: "#fafafa",
                    0: "#ffffff", /* Cloud Dancer White */
                },
                
                destructive: {
                    DEFAULT: "#dc2626",
                    foreground: "hsl(var(--destructive-foreground))",
                    light: "#fee2e2",
                },
                
                warning: {
                    DEFAULT: "#ea580c",
                    light: "#fed7aa",
                },
                
                error: {
                    DEFAULT: "#dc2626",
                    light: "#fee2e2",
                },
                
                info: {
                    DEFAULT: "#0284c7",
                    light: "#e0f2fe",
                },
                
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
