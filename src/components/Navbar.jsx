import { useEffect, useState } from "react";
import { FaBars, FaStar, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavbarLogoImg from "../assets/Brawl_Stars_logo_2025.svg";
import useFavorites from "../hooks/useFavorites";
import { NAV_LINKS } from "../lib/config";
import Nav, {
  FavoritesChip,
  MenuToggle,
  NavbarBrandRow,
  NavbarLink,
  NavbarLogo,
  NavbarLogoLink,
  NavbarMenuLink,
  ThemeToggle,
} from "../styles/Navbar.styled";

const THEME_LABELS = {
  arena: "Arena",
  classic: "Classic",
  neon: "Neon",
};

const Navbar = ({ themeMode, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { favoriteKeys } = useFavorites();
  const favoriteCount = favoriteKeys.length;
  const themeLabel = THEME_LABELS[themeMode] || "Arena";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <Nav>
      <NavbarBrandRow>
        <NavbarLogoLink to="/" aria-label="Brawl Stars API home">
          <NavbarLogo src={NavbarLogoImg} alt="Brawl Stars" />
        </NavbarLogoLink>
        <MenuToggle
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </MenuToggle>
      </NavbarBrandRow>

      <NavbarMenuLink id="primary-nav" $open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <NavbarLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setMenuOpen(false)}>
            {link.label}
          </NavbarLink>
        ))}
        {favoriteCount > 0 && (
          <FavoritesChip
            to="/?fav=1"
            aria-label={`${favoriteCount} favorites`}
            onClick={() => setMenuOpen(false)}>
            <FaStar aria-hidden="true" />
            {favoriteCount}
          </FavoritesChip>
        )}
        <ThemeToggle
          type="button"
          onClick={() => {
            onThemeToggle();
            setMenuOpen(false);
          }}
          aria-label={`Theme: ${themeLabel}. Click to cycle.`}>
          Theme · {themeLabel}
        </ThemeToggle>
      </NavbarMenuLink>
    </Nav>
  );
};

export default Navbar;
