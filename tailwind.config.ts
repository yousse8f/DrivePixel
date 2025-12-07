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
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    900: "#1e3a5f",
                    700: "#2d5a8c",
                    500: "#4a7ba7",
                    300: "#7fa3c4",
                    100: "#e8f1f8",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                lightBlue: {
                    900: "#1e3a5f",
                    700: "#2d5a8c",
                    500: "#4a7ba7",
                    300: "#7fa3c4",
                    100: "#e8f1f8",
                },
                gray: {
                    900: "#1a1a1a",
                    800: "#2d2d2d",
                    700: "#404040",
                    600: "#525252",
                    500: "#737373",
                    400: "#a3a3a3",
                    300: "#d4d4d4",
                    200: "#e5e5e5",
                    100: "#f5f5f5",
                    0: "#ffffff",
                },
                neutral: {
                    900: "#1a1a1a",
                    800: "#2d2d2d",
                    700: "#404040",
                    600: "#525252",
                    500: "#737373",
                    300: "#d4d4d4",
                    200: "#e5e5e5",
                    100: "#f5f5f5",
                    0: "#ffffff",
                },
                destructive: {
                    DEFAULT: "#dc2626",
                    foreground: "hsl(var(--destructive-foreground))",
                    light: "#fee2e2",
                },
                success: {
                    DEFAULT: "#16a34a",
                    light: "#dcfce7",
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
