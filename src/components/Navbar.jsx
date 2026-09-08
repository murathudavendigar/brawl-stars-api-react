import NavbarLogoImg from "../assets/Brawl_Stars_logo_2025.svg";
import { NAV_LINKS } from "../lib/config";
import Nav, {
  NavbarLink,
  NavbarLogo,
  NavbarLogoLink,
  NavbarMenuLink,
  ThemeToggle,
} from "../styles/Navbar.styled";

const Navbar = ({ themeMode, onThemeToggle }) => {
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
        <ThemeToggle type="button" onClick={onThemeToggle}>
          {themeMode}
        </ThemeToggle>
      </NavbarMenuLink>
    </Nav>
  );
};

export default Navbar;
