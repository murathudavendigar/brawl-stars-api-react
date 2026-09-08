import styled from "styled-components";
import { fadeInUp } from "./animations";

export const MissingShell = styled.main`
  display: grid;
  place-items: center;
  min-height: calc(100vh - 140px);
  padding: 2rem 1.25rem 3rem;
`;

export const MissingPanel = styled.section`
  width: min(100%, 560px);
  display: grid;
  justify-items: center;
  gap: 0.85rem;
  padding: 2rem 1.5rem 1.75rem;
  text-align: center;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-3d);
  position: relative;
  animation: ${fadeInUp} 0.4s ease-out;

  &::before {
    content: "";
    position: absolute;
    inset: 8px;
    border: 2px solid var(--color-gold);
    border-radius: 12px;
    pointer-events: none;
    opacity: 0.55;
  }
`;

export const MissingStamp = styled.span`
  position: relative;
  z-index: 1;
  display: inline-block;
  margin-bottom: 0.15rem;
  padding: 0.28rem 0.85rem;
  background: var(--color-gold);
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  border: 3px solid var(--color-ink);
  border-radius: 10px;
  box-shadow: 0 3px 0 #1a1020;
  transform: rotate(-2deg);
`;

export const MissingCode = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-primary);
  font-size: clamp(5.5rem, 18vw, 8.5rem);
  line-height: 0.9;
  color: var(--color-primary);
  text-shadow:
    4px 4px 0 var(--color-ink),
    -2px -2px 0 var(--color-ink),
    2px -2px 0 var(--color-ink),
    -2px 2px 0 var(--color-ink),
    0 6px 0 #1a1020;
`;

export const MissingTitle = styled.h1`
  position: relative;
  z-index: 1;
  margin: 0.2rem 0 0;
  font-family: var(--font-primary);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink);
`;

export const MissingCopy = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 38ch;
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 1.02rem;
  line-height: 1.55;
  color: var(--color-text-body);
`;

export const MissingActions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.65rem;
`;

export const MissingButton = styled.button`
  padding: 0.75rem 1.4rem;
  font-family: var(--font-primary);
  font-size: 1rem;
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  position: relative;
  overflow: hidden;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  background: ${({ $primary }) =>
    $primary ? "var(--color-primary)" : "var(--color-gold)"};
  color: ${({ $primary }) =>
    $primary ? "var(--color-white)" : "var(--color-ink)"};

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 10px;
    right: 10px;
    height: 38%;
    background: rgba(255, 255, 255, 0.28);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
    background: ${({ $primary }) =>
      $primary ? "var(--color-button-hover)" : "var(--color-gold-light)"};
    color: var(--color-ink);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;
