import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default Nav;

export const NavbarLogo = styled.img`
  width: 240px;
  height: 180px;
  padding: 1rem;
`;

export const NavbarMenuLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 768px) {
    transition: transform 0.3s ease-in-out;
  }
`;

export const NavbarLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s;
  &:hover {
    color: rgb(240, 25, 25);
  }
  @media (max-width: 768px) {
    margin: auto;
    font-size: 1.3rem;
  }
`;
