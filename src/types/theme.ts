export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  bgSecondary: string;
  text: string;
  textSecondary: string;
  card: string;
  border: string;
  button: string;
  buttonHover: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    family: string;
    weight: {
      regular: number;
      medium: number;
      bold: number;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export type ThemeMode = 'light' | 'dark';

