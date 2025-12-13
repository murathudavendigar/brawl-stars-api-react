// Theme configuration with CSS custom properties approach
// This provides a centralized place for all design tokens

export const theme = {
  colors: {
    // Primary palette
    primary: "#f01919",
    primaryHover: "#d41515",
    primaryLight: "rgba(240, 25, 25, 0.2)",

    // Secondary palette
    secondary: "#91e136",
    secondaryHover: "rgba(145, 225, 54, 0.8)",

    // Accent colors
    accent: "#2186ff",
    accentLight: "rgba(33, 134, 255, 0.3)",

    // Neutral colors
    white: "#ffffff",
    black: "#000000",
    dark: "#1a1a2e",
    darker: "#0f0f1a",

    // Glass effect colors
    glass: "rgba(255, 255, 255, 0.1)",
    glassBorder: "rgba(255, 255, 255, 0.2)",
    glassHover: "rgba(255, 255, 255, 0.15)",

    // Text colors
    textPrimary: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    textMuted: "rgba(255, 255, 255, 0.5)",

    // Status colors
    success: "#4ade80",
    warning: "#fbbf24",
    error: "#f87171",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    xxl: "24px",
    full: "9999px",
  },

  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(0, 0, 0, 0.15)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.2)",
    xl: "0 12px 48px rgba(0, 0, 0, 0.3)",
    glow: "0 0 20px rgba(240, 25, 25, 0.5)",
    glowBlue: "0 0 20px rgba(33, 134, 255, 0.5)",
    glowGreen: "0 0 20px rgba(145, 225, 54, 0.5)",
  },

  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
    bounce: "0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  fonts: {
    primary: "'Lilita One', cursive",
    secondary: "'Poppins', sans-serif",
  },

  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },

  zIndex: {
    dropdown: 100,
    sticky: 200,
    modal: 300,
    tooltip: 400,
  },
};

// CSS custom properties string for injection into global styles
export const cssVariables = `
  :root {
    /* Colors */
    --color-primary: ${theme.colors.primary};
    --color-primary-hover: ${theme.colors.primaryHover};
    --color-primary-light: ${theme.colors.primaryLight};
    --color-secondary: ${theme.colors.secondary};
    --color-accent: ${theme.colors.accent};
    --color-white: ${theme.colors.white};
    --color-dark: ${theme.colors.dark};
    --color-darker: ${theme.colors.darker};
    --color-glass: ${theme.colors.glass};
    --color-glass-border: ${theme.colors.glassBorder};
    
    /* Spacing */
    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
    
    /* Border Radius */
    --radius-sm: ${theme.borderRadius.sm};
    --radius-md: ${theme.borderRadius.md};
    --radius-lg: ${theme.borderRadius.lg};
    --radius-xl: ${theme.borderRadius.xl};
    
    /* Shadows */
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-glow: ${theme.shadows.glow};
    
    /* Transitions */
    --transition-fast: ${theme.transitions.fast};
    --transition-normal: ${theme.transitions.normal};
    --transition-slow: ${theme.transitions.slow};
    
    /* Fonts */
    --font-primary: ${theme.fonts.primary};
    --font-secondary: ${theme.fonts.secondary};
  }
`;

export default theme;
