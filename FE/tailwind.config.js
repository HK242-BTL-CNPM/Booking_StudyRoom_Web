/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        dark_blue: "#2563EB",
        light_blue: "#EEF4FE",
        dark_pink: "#ED4F9D",
        light_pink: "#FDEDF5",
        dark_green: "#24D164",
        light_green: "#E9FAEF",
        light_red: "rgba(237, 79, 82, 0.851)",
        black_admin:"#23272C",
        white_admin: "#F4F5F7",
        bg_admin: "#F8FAFC"
  
      },
    },
    screens: {
      sm: '640px',
      md: '900px',   
      lg: '1080px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
