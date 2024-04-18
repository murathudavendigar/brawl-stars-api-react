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
      <NavbarLink to="/">
        <NavbarLogo src={NavbarLogoImg} />
      </NavbarLink>
      <NavbarMenuLink>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="events">Events</NavbarLink>
        <NavbarLink to="about">About</NavbarLink>
        <NavbarLink to="stats">Show My Stats</NavbarLink>
      </NavbarMenuLink>
    </Nav>
  );
};

export default Navbar;
