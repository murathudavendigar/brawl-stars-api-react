import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { fadeInDown } from "./animations";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  border-bottom: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  animation: ${fadeInDown} 0.4s ease-out;
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
    width: 132px;
  }
`;

export const NavbarBrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const MenuToggle = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background: var(--color-gold);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: 1.25rem;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  @media (max-width: 768px) {
    display: grid;
  }
`;

export const NavbarMenuLink = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 769px) {
    display: flex !important;
    position: static;
    flex-direction: row;
    padding: 0;
    border: 0;
    box-shadow: none;
    background: transparent;
  }

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    top: calc(100% + 3px);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    padding: 0.85rem;
    background: var(--nav-bg);
    border-bottom: 3px solid var(--color-ink);
    box-shadow: var(--shadow-3d);
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
  text-align: center;

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
    font-size: 1.05rem;
    padding: 0.65rem 1rem;
    border-radius: 14px;
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

  @media (max-width: 768px) {
    border-radius: 14px;
    width: 100%;
  }
`;

export const FavoritesChip = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  color: var(--color-gold-light);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;

  &:hover {
    background: var(--color-gold);
    color: var(--color-ink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  @media (max-width: 768px) {
    border-radius: 14px;
    width: 100%;
  }
`;
