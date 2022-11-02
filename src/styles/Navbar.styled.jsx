import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
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
    display: none;
  }
`;

export const NavbarLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: white;
  font-weight: 900;
  &:hover {
    color: rgb(240, 25, 25);
  }
`;
