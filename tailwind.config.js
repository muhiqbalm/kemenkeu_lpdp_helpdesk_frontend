module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      colors: {
        merah: "#AF2D30",
        "abu-gelap": "#686868",
        "abu-muda": "#D2D1D1",
        hitam: "#333333",
        abu: "#A2A5AC",
        coklat: "#733535",
        maroon: "#AF2D30",
        darkred: "#733535",
        biru: "#0E4CBD",
        "biru-muda": "#1455CD",
        kuning: "#FAB414",
        "kuning-tua": "#FA9E14",
        "biru-tua": "#0C42A5",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      borderWidth: {
        0.5: "0.5px",
        1.5: "1.5px",
      },
      fontSize: {
        "4xl": [
          "2.5rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },
    },
  },
};
