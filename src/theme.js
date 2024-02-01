// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#e6e6f2",
    100: "#d7d7ed",
    200: "#d5d5e3",
    300: "#aaaac1",
    400: "#9696a8",
    500: "#7a7a86",
    600: "#5e5e67",
    700: "#484850",
    800: "#212125",
    900: "#18181b",
    1000: "#000000",
  },
  primary: {
    50: "#eafffd",
    100: "#cbfffa",
    200: "#a6fff6",
    300: "#82fff2",
    400: "#03f1c7",
    500: "#00dac3",
    600: "#00a694",
    700: "#027266",
    800: "#004039",
    900: "#002925",
  },
  secondary: {
    50: "#ffecf4",
    100: "#ffbfda",
    200: "#fe93c0",
    300: "#ff589e",
    400: "#f54260",
    500: "#d3045c",
    600: "#95003f",
    700: "#600129",
    800: "#3f001b",
    900: "#270011",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[400],
            light: colorTokens.primary[800],
          },
          secondary: {
            dark: colorTokens.secondary[200],
            main: colorTokens.secondary[400],
            light: colorTokens.secondary[800],
          },
          neutral: {
            darker: colorTokens.grey[50],
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mid: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
            lighter: colorTokens.grey[800],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[400],
            light: colorTokens.primary[100],
          },
          secondary: {
            dark: colorTokens.secondary[700],
            main: colorTokens.secondary[400],
            light: colorTokens.secondary[100],
          },
          neutral: {
            darker: colorTokens.grey[800],
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mid: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[100],
            lighter: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        }),
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};