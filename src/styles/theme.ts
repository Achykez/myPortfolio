import { Theme } from '../types/theme';

export const lightTheme: Theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    accent: '#3333ff',
    bg: '#ffffff',
    bgSecondary: '#f8f9fa',
    text: '#1a1a1a',
    textSecondary: '#666666',
    card: '#ffffff',
    border: '#e0e0e0',
    button: '#3333ff',
    buttonHover: '#2525cc',
  },
  fonts: {
    family: "'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#0a0a0a',
    secondary: '#161515',
    accent: '#7eadfc',
    bg: '#0a0a0a',
    bgSecondary: '#161515',
    text: '#e7e7e7',
    textSecondary: '#a0a0a0',
    card: '#161515',
    border: '#2a2a2a',
    button: '#7eadfc',
    buttonHover: '#5d8dd9',
  },
  fonts: {
    family: "'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

