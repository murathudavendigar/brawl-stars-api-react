import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { fadeInDown } from "./animations";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  border-bottom: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  animation: ${fadeInDown} 0.4s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.65rem;
  }
`;

export default Nav;

export const NavbarLogo = styled.img`
  width: 168px;
  height: auto;
  padding: 0.15rem 0.2rem;
  filter: drop-shadow(2px 3px 0 var(--color-ink));
  transition: transform 0.12s ease;

  &:hover {
    transform: rotate(-2deg) scale(1.04);
  }

  @media (max-width: 768px) {
    width: 140px;
  }
`;

export const NavbarMenuLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 0.25rem 0;
  }
`;

export const NavbarLogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  background: var(--color-gold);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  padding: 0.2rem 0.55rem 0.15rem;
  box-shadow: var(--shadow-3d);
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export const NavbarLink = styled(NavLink)`
  font-size: 1.15rem;
  text-decoration: none;
  color: var(--color-white);
  font-weight: 400;
  font-family: var(--font-primary);
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  position: relative;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;

  &:hover:not(.active) {
    color: var(--color-ink);
    background: var(--color-gold);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  &.active {
    color: var(--color-white);
    background: var(--color-primary);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3d-hover);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.4rem 0.85rem;
  }
`;

export const ThemeToggle = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--color-gold);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  text-transform: capitalize;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
    background: var(--color-gold-light);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;
