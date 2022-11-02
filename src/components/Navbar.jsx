import React from "react";
import Nav, {
  NavbarLink,
  NavbarLogo,
  NavbarMenuLink,
} from "../styles/Navbar.styled";
import NavbarLogoImg from "../assets/Brawl_Stars_logo.png";

const Navbar = () => {
  return (
    <Nav>
      <NavbarLogo src={NavbarLogoImg} />
      <NavbarMenuLink>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="about">About</NavbarLink>
        <NavbarLink to="videos">Videos</NavbarLink>
      </NavbarMenuLink>
    </Nav>
  );
};

export default Navbar;
