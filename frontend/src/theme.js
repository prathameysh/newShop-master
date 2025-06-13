export let black = {
  100: "#cccccc",
  200: "#999999",
  300: "#616161",
  400: "#424242",
  500: "#2b2b2b",
  600: "#212121",
  700: "#111211",
  800: "#080908",
  900: "#000000",
};
export let blue = {
  100: "#d0c2ee",
  200: "#b099e3",
  300: "#906fd9",
  400: "#774fd0",
  500: "#5c2fc8",
  600: "#512ac2",
  700: "#4122b9",
  800: "#301cb2",
  900: "#000ea7",
};
export let lightBlue = {
  100: "#bee3ff",
  200: "#96d2ff",
  300: "#6bc0ff",
  400: "#4bb2ff",
  500: "#2fa5ff",
  600: "#2c96f7",
  700: "#2783e3",
  800: "#2372d1",
  900: "#1c53b2",
};
export let green = {
  100: "#c1e6c9",
  200: "#99d5a7",
  300: "#6ec684",
  400: "#1ead4f",
  500: "#007b30",
  600: "#005c1c",
  700: "#103813",
  800: "#0b260d",
  900: "#061607",
};
export let lime = {
  100: "#e8ff99",
  200: "#ddff66",
  300: "#d1ff33",
  400: "#c6ff00",
  500: "#aeea00",
  600: "#9ecc00",
  700: "#79a300",
  800: "#4f6600",
  900: "#283300",
};
export let orange = {
  100: "#fadbd1",
  200: "#f5b7a3",
  300: "#f09275",
  400: "#eb6e47",
  500: "#e64a19",
  600: "#b83b14",
  700: "#8a2c0f",
  800: "#5c1e0a",
  900: "#2e0f05",
};
export let pink = {
  100: "#ffc2d7",
  200: "#ffa3c2",
  300: "#ff85ae",
  400: "#ff669a",
  500: "#ff4081",
  600: "#d81b61",
  700: "#c2185b",
  800: "#9b1349",
  900: "#740e37",
};
export let purple = {
  100: "#dd99ff",
  200: "#cc66ff",
  300: "#bb33ff",
  400: "#aa00ff",
  500: "#8800cc",
  600: "#660099",
  700: "#440066",
  800: "#29003d",
  900: "#14001f",
};
export let red = {
  100: "#f7cccc",
  200: "#ee9999",
  300: "#e66666",
  400: "#dd3333",
  500: "#d50000",
  600: "#aa0000",
  700: "#800000",
  800: "#550000",
  900: "#2b0000",
};
export let yellow = {
  100: "#ffff99",
  200: "#ffff66",
  300: "#ffff33",
  400: "#ffff00",
  500: "#ffea00",
  600: "#ffd600",
  700: "#ccab00",
  800: "#998000",
  900: "#665600",
};

export let one = {
  100: "#c1e6c9",
  200: "#99d5a7",
  300: "#6ec684",
  400: "#1ead4f",
  500: "#007b30",
  600: "#005c1c",
  700: "#103813",
  800: "#0b260d",
  900: "#061607",
};
export let two = {
  100: "#ffff99",
  200: "#ffff66",
  300: "#ffff33",
  400: "#ffff00",
  500: "#ffea00",
  600: "#ffd600",
  700: "#ccab00",
  800: "#998000",
  900: "#665600",
};

// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#cfcfcf",
    300: "#c2c2c2",
    400: "#a3a3a3",
    500: "#858585",
    600: "#666666",
    700: "#525252",
    800: "#3d3d3d",
    900: "#292929",
    1000: "#141414",
  },
  primary: {
    ...black,
  },
  secondary: {
    // yellow
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

// reverses the color palette
export const tokensLight = {
  grey: {
    0: "#000000",
    10: "#141414",
    50: "#292929",
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0",
    900: "#f6f6f6",
    1000: "#ffffff",
  },
  primary: {
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#191F45",
    500: "#21295c",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    50: "#332a14",
    100: "#665429",
    200: "#997d3d",
    300: "#cca752",
    400: "#ffd166",
    500: "#ffda85",
    600: "#ffe3a3",
    700: "#ffedc2",
    800: "#fff6e0",
    900: "#f0f0f0",
  },
};

// mui theme settings
export const themeSettings = ({ mode, font }) => {
  return {
    palette: {
      mode:
        mode === "dark"
          ? "dark"
          : mode === "purple"
          ? "dark"
          : mode === "light"
          ? "light"
          : mode === "pink"
          ? "light"
          : "light",
      font: font,
      theme: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[900],
              alt: tokensDark.primary[800],
              alt1: tokensDark.primary[500],
            },
          }
        : mode === "pink"
        ? {
            primary: {
              ...pink,
              main: pink[400],
              light: pink[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: pink[100],
              alt: pink[600],
              alt1: pink[500],
            },
          }
        : mode === "purple"
        ? {
            primary: {
              ...purple,
              main: purple[400],
              light: purple[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: purple[900],
              alt: purple[800],
              alt1: purple[700],
            },
          }
        : mode === "light"
        ? {
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[200],
              alt1: tokensDark.grey[100],
            },
          }
        : {
            primary: {
              ...orange,
              main: orange[400],
              light: orange[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: orange[200],
              alt: orange[600],
              alt1: orange[500],
            },
          }), //orange
      bg1:
        //next or small area 2
        mode === "orange"
          ? lightBlue[700]
          : mode === "pink"
          ? orange[500]
          : mode === "dark"
          ? yellow[600]
          : mode === "purple"
          ? lime[400]
          : purple[500],
      bg2:
        //background+text or bigg area 2
        mode === "orange"
          ? lime[600]
          : mode === "pink"
          ? lightBlue[400]
          : mode === "light"
          ? lime[500]
          : mode === "purple"
          ? lightBlue[800]
          : pink[600],
      bg3:
        //next or small area 1
        mode === "purple"
          ? pink[500]
          : mode === "light"
          ? orange[600]
          : mode === "pink"
          ? blue[900]
          : mode === "dark"
          ? purple[400]
          : purple[600],
      bg4:
        //background or bigg area 1
        mode === "orange"
          ? pink[700]
          : mode === "light"
          ? yellow[600]
          : mode === "pink"
          ? lime[700]
          : green[600],
      bg5: mode === "dark" || mode === "purple" ? black[200] : black[300],
    },
    colors: {
      orange,
      purple,
      black,
      pink,
      green,
      blue,
      white: tokensDark.grey,
    },
    typography: {
      fontFamily: font,
      fontSize: 12,
      h1: {
        fontFamily: font,
        fontSize: 40,
      },
      h2: {
        fontFamily: font,
        fontSize: 32,
      },
      h3: {
        fontFamily: font,
        fontSize: 24,
      },
      h4: {
        fontFamily: font,
        fontSize: 20,
      },
      h5: {
        fontFamily: font,
        fontSize: 16,
      },
      h6: {
        fontFamily: font,
        fontSize: 14,
      },
    },
  };
};
