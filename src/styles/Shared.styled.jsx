import { Link } from "react-router-dom";
import styled from "styled-components";

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.22rem 0.65rem;
  border-radius: 10px;
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
  font-family: var(--font-primary);
  font-size: 0.72rem;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: ${({ $tone }) =>
    $tone === "gold" || $tone === "muted" || $tone === "success"
      ? "var(--color-ink)"
      : "var(--color-white)"};
  background: ${({ $tone }) => {
    if ($tone === "gold") return "var(--color-gold)";
    if ($tone === "success") return "var(--color-success)";
    if ($tone === "muted") return "var(--color-gold-light)";
    return "var(--color-primary)";
  }};
`;

export const BreadcrumbNav = styled.nav`
  width: min(100%, 900px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin: 0 auto 1rem;
  padding: 0 0.25rem;
  font-family: var(--font-secondary);
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--color-text-muted);
`;

export const BreadcrumbLink = styled(Link)`
  color: var(--color-gold-light);
  text-shadow: 1px 1px 0 var(--color-ink);

  &:hover {
    color: var(--color-gold);
  }
`;

export const BreadcrumbCurrent = styled.span`
  color: var(--color-text-body);
`;

export const BreadcrumbSep = styled.span`
  opacity: 0.55;
`;

export const ControlButtonBase = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 14px;
  font-family: var(--font-primary);
  font-size: 1rem;
  background: ${({ $secondary }) =>
    $secondary ? "var(--panel-bg)" : "var(--color-primary)"};
  color: ${({ $secondary }) =>
    $secondary ? "var(--color-gold-light)" : "var(--color-white)"};
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 10px;
    right: 10px;
    height: 38%;
    background: rgba(255, 255, 255, 0.22);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    background: var(--color-button-hover);
    color: var(--color-ink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const SectionJumpBar = styled.nav`
  position: sticky;
  top: 76px;
  z-index: 40;
  width: min(100%, 900px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  margin: 0 auto 1.25rem;
  padding: 0.55rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
`;

export const SectionJumpLink = styled.a`
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 3px solid var(--color-ink);
  background: var(--nav-bg);
  color: var(--color-gold-light);
  font-family: var(--font-primary);
  font-size: 0.85rem;
  box-shadow: 0 3px 0 #1a1020;
  transition: transform 0.12s ease, background 0.12s ease, color 0.12s ease;

  &:hover {
    background: var(--color-gold);
    color: var(--color-ink);
    transform: translateY(-2px);
  }
`;

export const HeroActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
  margin: 0.75rem 0 1rem;
`;
