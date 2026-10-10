import { createGlobalStyle } from "styled-components";
import { cssVariables } from "./theme";

const GlobalStyle = createGlobalStyle`
  ${cssVariables}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: var(--page-bg);
  }

  body {
    font-family: var(--font-secondary);
    font-weight: 700;
    min-height: 100vh;
    background: var(--page-bg);
    background-attachment: fixed;
    color: var(--color-text-body);
    overflow-x: hidden;
    position: relative;
    
    /* Warm gold dust — Starr Park night, not corporate blue orbs */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 18% 78%, var(--bg-orb-primary) 0%, transparent 46%),
        radial-gradient(circle at 82% 18%, var(--bg-orb-accent) 0%, transparent 42%),
        radial-gradient(circle at 50% 48%, var(--bg-orb-secondary) 0%, transparent 38%);
      pointer-events: none;
      z-index: -1;
    }
    
    /* Comic halftone + star sparkles (static; twinkle disabled when reduced-motion) */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpolygon points='24,10 26.2,16.2 33,16.2 27.6,20 29.6,26.4 24,22.4 18.4,26.4 20.4,20 15,16.2 21.8,16.2' fill='%23FFE35B' fill-opacity='0.38'/%3E%3Cpolygon points='118,92 119.4,96.2 124,96.2 120.4,98.8 121.8,103 118,100.2 114.2,103 115.6,98.8 112,96.2 116.6,96.2' fill='%23FFB921' fill-opacity='0.32'/%3E%3Ccircle cx='78' cy='36' r='1.3' fill='%23FFE35B' fill-opacity='0.55'/%3E%3Ccircle cx='142' cy='48' r='1.1' fill='%23FFFFFF' fill-opacity='0.4'/%3E%3Ccircle cx='40' cy='110' r='1' fill='%23FFB921' fill-opacity='0.45'/%3E%3Ccircle cx='96' cy='128' r='0.9' fill='%23FFFFFF' fill-opacity='0.28'/%3E%3C/svg%3E"),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='4' cy='4' r='1.15' fill='%23FFB921' fill-opacity='0.14'/%3E%3Ccircle cx='18' cy='16' r='0.85' fill='%23FFE35B' fill-opacity='0.1'/%3E%3C/svg%3E");
      background-size: 160px 160px, 28px 28px;
      pointer-events: none;
      z-index: -1;
      animation: starTwinkle 9s ease-in-out infinite;
    }
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.85; }
  }

  h1, h2, h3, h4, h5, h6,
  button,
  nav a {
    font-family: var(--font-primary);
  }

  p, label, input, textarea, select, li, dd, dt {
    font-family: var(--font-secondary);
  }

  select {
    font-family: var(--font-primary);
  }

  /* Custom scrollbar — chunky gold/red */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-ink);
    border-left: 3px solid var(--color-ink);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-gold);
    border: 3px solid var(--color-ink);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }

  ::selection {
    background: var(--color-primary);
    color: var(--color-white);
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-normal);
    cursor: pointer;
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    outline: none;
  }

  button,
  [role="button"],
  input[type="submit"],
  input[type="button"],
  select,
  a,
  .clickable {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  :focus-visible {
    outline: 3px solid var(--color-gold-light);
    outline-offset: 3px;
  }

  [role="link"]:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 3px solid var(--color-gold-light);
    outline-offset: 3px;
  }

  /* Comic panel — overlays only may keep a whisper of blur */
  .glass {
    background: var(--panel-bg);
    border: 3px solid var(--color-ink);
    box-shadow: var(--shadow-3d);
    border-radius: var(--radius-lg);
  }

  .glow-on-hover:hover {
    box-shadow: var(--shadow-3d-hover);
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    body::before,
    body::after {
      animation: none !important;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

export default GlobalStyle;
