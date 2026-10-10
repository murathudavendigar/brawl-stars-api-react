// Theme configuration with CSS custom properties approach
// This provides a centralized place for all design tokens

export const theme = {
  colors: {
    // Brand palette (Brawl Stars)
    primary: "#F01919",
    primaryHover: "#D41515",
    primaryLight: "rgba(240, 25, 25, 0.22)",

    gold: "#FFB921",
    goldLight: "#FFE35B",
    brown: "#C95E40",

    // Secondary / accent
    secondary: "#FFB921",
    secondaryHover: "rgba(255, 185, 33, 0.85)",
    accent: "#FFE35B",
    accentLight: "rgba(255, 227, 91, 0.35)",

    // Neutrals — ink, not pure #000 on large surfaces
    white: "#FFFFFF",
    black: "#0B0A12",
    dark: "#14122B",
    darker: "#0B0A12",

    // Panels (opaque comic, not glass)
    glass: "#1B1540",
    glassBorder: "#0B0A12",
    glassHover: "#241C52",

    // Text
    textPrimary: "#FFFFFF",
    textSecondary: "#FFF6D6",
    textMuted: "#E8D9A8",

    // Status
    success: "#68FD58",
    warning: "#FFB921",
    error: "#F01919",
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
    sm: "8px",
    md: "12px",
    lg: "14px",
    xl: "16px",
    xxl: "20px",
    full: "9999px",
  },

  shadows: {
    sm: "0 2px 0 #1a1020",
    md: "0 4px 0 #1a1020",
    lg: "0 6px 0 #1a1020",
    xl: "0 8px 0 #1a1020",
    glow: "0 4px 0 #1a1020",
    glowBlue: "0 4px 0 #1a1020",
    glowGreen: "0 4px 0 #1a1020",
  },

  transitions: {
    fast: "0.12s ease",
    normal: "0.2s ease",
    slow: "0.35s ease",
    bounce: "0.35s cubic-bezier(0.34, 1.45, 0.64, 1)",
  },

  fonts: {
    primary: "'Lilita One', cursive",
    secondary: "'Nunito', sans-serif",
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
  :root,
  :root[data-theme="arena"] {
    /* Brand */
    --color-primary: ${theme.colors.primary};
    --color-primary-hover: ${theme.colors.primaryHover};
    --color-primary-light: ${theme.colors.primaryLight};
    --color-secondary: ${theme.colors.gold};
    --color-accent: ${theme.colors.accent};
    --color-gold: ${theme.colors.gold};
    --color-gold-light: ${theme.colors.goldLight};
    --color-brown: ${theme.colors.brown};
    --color-ink: ${theme.colors.black};
    --color-white: ${theme.colors.white};
    --color-dark: ${theme.colors.dark};
    --color-darker: ${theme.colors.darker};
    --color-button-hover: ${theme.colors.gold};

    --color-glass: ${theme.colors.glass};
    --color-glass-border: ${theme.colors.glassBorder};

    --color-text: ${theme.colors.textPrimary};
    --color-text-body: ${theme.colors.textSecondary};
    --color-text-muted: ${theme.colors.textMuted};
    --color-success: ${theme.colors.success};

    /* Spacing */
    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};

    /* Radius — chunky 12–16px */
    --radius-sm: ${theme.borderRadius.sm};
    --radius-md: ${theme.borderRadius.md};
    --radius-lg: ${theme.borderRadius.lg};
    --radius-xl: ${theme.borderRadius.xl};

    /* Hard comic outlines + 3D offset */
    --outline: 3px solid ${theme.colors.black};
    --shadow-3d: 0 4px 0 #1a1020;
    --shadow-3d-hover: 0 6px 0 #1a1020;
    --shadow-3d-pressed: 0 2px 0 #1a1020;
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

    /* Starr Park night */
    --page-bg: linear-gradient(180deg, #14122B 0%, #1B1540 58%, #161230 100%);
    --panel-bg: #1B1540;
    --nav-bg: #14122B;
    --bg-orb-primary: rgba(255, 185, 33, 0.16);
    --bg-orb-accent: rgba(240, 25, 25, 0.12);
    --bg-orb-secondary: rgba(255, 227, 91, 0.08);
  }

  :root[data-theme="classic"] {
    --page-bg: linear-gradient(180deg, #2d2018 0%, #3c281c 48%, #4a3022 100%);
    --panel-bg: #3f2c1f;
    --nav-bg: #241810;
    --color-primary: #F01919;
    --color-primary-hover: #D41515;
    --color-gold: #FFC84A;
    --color-gold-light: #FFE9A0;
    --color-accent: #FFE35B;
    --color-button-hover: #FFC84A;
    --color-text-body: #FFF4DD;
    --color-text-muted: #E8D4A8;
    --color-glass: #3f2c1f;
    --color-dark: #2d2018;
    --color-darker: #1a120e;
    --shadow-3d: 0 4px 0 #140e08;
    --shadow-3d-hover: 0 6px 0 #140e08;
    --shadow-3d-pressed: 0 2px 0 #140e08;
    --shadow-md: 0 4px 0 #140e08;
    --shadow-lg: 0 6px 0 #140e08;
    --shadow-glow: 0 4px 0 #140e08;
    --bg-orb-primary: rgba(255, 185, 33, 0.2);
    --bg-orb-accent: rgba(240, 25, 25, 0.14);
    --bg-orb-secondary: rgba(201, 94, 64, 0.16);
  }

  :root[data-theme="neon"] {
    --page-bg: linear-gradient(180deg, #07060e 0%, #0B0A12 52%, #120818 100%);
    --panel-bg: #151322;
    --nav-bg: #05040c;
    --color-primary: #00BCD9;
    --color-primary-hover: #00a5c0;
    --color-gold: #5EFFFF;
    --color-gold-light: #B8FFFF;
    --color-accent: #FF2D9B;
    --color-button-hover: #FF2D9B;
    --color-text-body: #E8FBFF;
    --color-text-muted: #A8D4DE;
    --color-glass: #151322;
    --color-dark: #0B0A12;
    --color-darker: #05040a;
    --shadow-3d: 0 4px 0 #030208;
    --shadow-3d-hover: 0 6px 0 #030208;
    --shadow-3d-pressed: 0 2px 0 #030208;
    --shadow-md: 0 4px 0 #030208;
    --shadow-lg: 0 6px 0 #030208;
    --shadow-glow: 0 4px 0 #030208;
    --bg-orb-primary: rgba(0, 188, 217, 0.18);
    --bg-orb-accent: rgba(255, 45, 155, 0.16);
    --bg-orb-secondary: rgba(94, 255, 255, 0.1);
  }
`;

export default theme;
