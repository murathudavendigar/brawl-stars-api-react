import { createGlobalStyle } from "styled-components";
import { cssVariables } from "./theme";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Poppins:wght@300;400;500;600;700&display=swap');
  
  ${cssVariables}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    background-attachment: fixed;
    color: var(--color-white);
    overflow-x: hidden;
    position: relative;
    
    /* Animated background pattern */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 80%, rgba(240, 25, 25, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(33, 134, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(145, 225, 54, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }
    
    /* Animated particles effect */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.03'%3E%3Ccircle cx='400' cy='400' r='50'/%3E%3Ccircle cx='400' cy='400' r='100'/%3E%3Ccircle cx='400' cy='400' r='150'/%3E%3Ccircle cx='400' cy='400' r='200'/%3E%3Ccircle cx='400' cy='400' r='250'/%3E%3Ccircle cx='400' cy='400' r='300'/%3E%3Ccircle cx='400' cy='400' r='350'/%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: -1;
      animation: bgFloat 20s ease-in-out infinite;
    }
  }

  @keyframes bgFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, var(--color-primary-hover), var(--color-accent));
  }

  /* Selection styling */
  ::selection {
    background: var(--color-primary);
    color: white;
  }

  /* Link styling */
  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-normal);
    cursor: pointer;
  }

  /* Button reset */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  /* All interactive elements should have pointer cursor */
  button,
  [role="button"],
  input[type="submit"],
  input[type="button"],
  select,
  a,
  .clickable {
    cursor: pointer;
  }

  /* Image optimization */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Focus styling for accessibility */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Utility classes */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glow-on-hover:hover {
    box-shadow: 0 0 20px rgba(240, 25, 25, 0.5);
  }
`;

export default GlobalStyle;
