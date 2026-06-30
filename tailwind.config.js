/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4fbf4",
          100: "#dff5df",
          200: "#bcebbf",
          300: "#8edc94",
          400: "#5fc467",
          500: "#36a843",
          600: "#258a31",
          700: "#1f6c2a",
          800: "#1c5526",
          900: "#184722",
          950: "#082710"
        },
        accent: {
          50: "#fff8ed",
          100: "#ffefd2",
          200: "#ffdaa1",
          300: "#ffbe65",
          400: "#ff9a37",
          500: "#F96D00",
          600: "#e85800",
          700: "#c04100",
          800: "#993500",
          900: "#7c2e08",
          950: "#431402"
        },
        ink: {
          50: "#f7f7f8",
          100: "#ededef",
          200: "#d8d8dc",
          300: "#b5b5be",
          400: "#8a8a96",
          500: "#6e6e7a",
          600: "#575763",
          700: "#464651",
          800: "#3a3a44",
          900: "#1f1f25",
          950: "#0a0a0d"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif']
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(.2,.7,.2,1) both"
      }
    }
  },
  plugins: []
};
