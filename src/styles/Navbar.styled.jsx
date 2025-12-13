import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { fadeInDown, float } from "./animations";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInDown} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(240, 25, 25, 0.5),
      rgba(33, 134, 255, 0.5),
      transparent
    );
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export default Nav;

export const NavbarLogo = styled.img`
  width: 200px;
  height: auto;
  padding: 0.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
  transition: all 0.4s ease;
  animation: ${float} 4s ease-in-out infinite;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(240, 25, 25, 0.5));
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const NavbarMenuLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 1rem 0;
  }
`;

export const NavbarLogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const NavbarLink = styled(NavLink)`
  font-size: 1.3rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Gradient underline effect */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #f01919, #ff4757);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Background hover effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(240, 25, 25, 0.1),
      rgba(255, 71, 87, 0.1)
    );
    border-radius: 30px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);

    &::before {
      width: 60%;
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  /* Active link state */
  &.active {
    color: white;

    &::before {
      width: 60%;
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.6rem 1rem;
  }
`;
