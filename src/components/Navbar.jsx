import NavbarLogoImg from "../assets/Brawl_Stars_logo_2025.svg";
import { NAV_LINKS } from "../lib/config";
import Nav, {
  NavbarLink,
  NavbarLogo,
  NavbarLogoLink,
  NavbarMenuLink,
} from "../styles/Navbar.styled";

const Navbar = () => {
  return (
    <Nav>
      <NavbarLogoLink to="/">
        <NavbarLogo src={NavbarLogoImg} />
      </NavbarLogoLink>
      <NavbarMenuLink>
        {NAV_LINKS.map((link) => (
          <NavbarLink key={link.path} to={link.path} end={link.path === "/"}>
            {link.label}
          </NavbarLink>
        ))}
      </NavbarMenuLink>
    </Nav>
  );
};

export default Navbar;
