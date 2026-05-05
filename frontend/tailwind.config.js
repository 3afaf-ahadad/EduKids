/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00639C",
        primaryLight: "#4DABF7",
        secondary: "#6844C8",
        accent: "#DB980F",
        pageBg: "#F7F9FF",
        cardWhite: "#FFFFFF",
        textDark: "#181C21",
        textGrey: "#404751",
        alphabetBg: "#CEE5FF",
        numbersBg: "#E8DDFF",
        colorsBg: "#FFDDAF",
        redBubble: "#FFDAD6",
        redDark: "#BA1A1A",
      },
      fontFamily: {
        kids: ["Nunito", "sans-serif"],
        display: ["Fredoka", "sans-serif"],
      },
      borderRadius: {
        "4xl": "32px",
        "5xl": "40px",
        "6xl": "48px",
        full: "9999px",
      },
      boxShadow: {
        squishy: "0 6px 0 0 rgba(0, 0, 0, 0.1)",
        squishySm: "0 4px 0 0 rgba(0, 0, 0, 0.05)",
        card: "0 20px 40px -15px rgba(0, 99, 156, 0.06)",
        modal: "0 20px 40px -15px rgba(0, 99, 156, 0.3)",
      },
      backgroundImage: {
        gradientPrimary: "linear-gradient(90deg, #4DABF7 0%, #9C7AFF 50%, #DB980F 100%)",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          backgroundColor: "#00639C",
          color: "white",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          boxShadow: "0 6px 0 0 #004A77",
          transition: "all 0.1s ease",
          "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 0 0 #004A77" },
          "&:active": { transform: "translateY(4px)", boxShadow: "0 2px 0 0 #004A77" },
        },
        ".btn-secondary": {
          backgroundColor: "#6844C8",
          color: "white",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          boxShadow: "0 6px 0 0 #3E1A9E",
          transition: "all 0.1s ease",
          "&:hover": { transform: "translateY(-2px)" },
          "&:active": { transform: "translateY(4px)" },
        },
        ".btn-outline": {
          backgroundColor: "#F1F4FA",
          color: "#404751",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          borderBottom: "4px solid #E0E2E9",
          transition: "all 0.1s ease",
          "&:hover": { backgroundColor: "#E5E8EF" },
          "&:active": { transform: "translateY(2px)" },
        },
        ".btn-gradient": {
          background: "linear-gradient(90deg, #4DABF7 0%, #9C7AFF 50%, #DB980F 100%)",
          color: "white",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          boxShadow: "0 6px 0 0 rgba(0, 99, 156, 0.5)",
          transition: "all 0.1s ease",
          "&:hover": { transform: "translateY(-2px)" },
          "&:active": { transform: "translateY(4px)" },
        },
      });
    },
  ],
};