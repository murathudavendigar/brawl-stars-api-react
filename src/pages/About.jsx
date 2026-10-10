import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import NavbarLogoImg from "../assets/Brawl_Stars_logo_2025.svg";
import SEO from "../components/common/SEO";
import { APP_INFO, DATA_SOURCES, DEVELOPER } from "../lib/config";
import { PRODUCT_TIP } from "../lib/copy";
import {
  AboutContainer,
  Bio,
  FeatureList,
  Footer,
  HeroSection,
  Name,
  PortfolioButton,
  ProfileImage,
  ProfileImageWrapper,
  ProfileInfo,
  ProjectCard,
  SectionTitle,
  SkillsGrid,
  SkillsSection,
  SkillTag,
  SocialGrid,
  SocialLink,
  SocialSection,
  TechBadge,
  TechStack,
  Title,
  VersionBadge,
} from "../styles/About.styled";
import { BrandMark, CatalogLead, HeaderText } from "../styles/Home.styled";

const About = () => {
  const { SOCIAL_LINKS, NAME, TITLE, BIO, PORTFOLIO, SKILLS } = DEVELOPER;

  const socialLinks = [
    {
      icon: <FaTwitter />,
      url: SOCIAL_LINKS.TWITTER,
      label: "Twitter",
      color: "#1DA1F2",
      shadow: "rgba(29, 161, 242, 0.4)",
    },
    {
      icon: <FaInstagram />,
      url: SOCIAL_LINKS.INSTAGRAM,
      label: "Instagram",
      color:
        "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      shadow: "rgba(225, 48, 108, 0.4)",
    },
    {
      icon: <FaLinkedinIn />,
      url: SOCIAL_LINKS.LINKEDIN,
      label: "LinkedIn",
      color: "#0A66C2",
      shadow: "rgba(10, 102, 194, 0.4)",
    },
    {
      icon: <FaGithub />,
      url: SOCIAL_LINKS.GITHUB,
      label: "GitHub",
      color: "#333",
      shadow: "rgba(51, 51, 51, 0.4)",
    },
  ];

  const projectTech = [
    "React 18",
    "styled-components",
    "React Router v6",
    "Axios",
    "BrawlAPI",
  ];

  return (
    <>
      <SEO
        title="About"
        description={`${APP_INFO.NAME} — ${APP_INFO.DESCRIPTION}`}
        keywords="Brawl Stars, BrawlAPI, catalog, React, Starr Park"
        pageType="AboutPage"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutContainer>
        <div style={{ textAlign: "center", width: "100%" }}>
          <BrandMark src={NavbarLogoImg} alt="" />
          <HeaderText>{APP_INFO.NAME}</HeaderText>
          <CatalogLead>{PRODUCT_TIP}</CatalogLead>
          <VersionBadge>Version {APP_INFO.VERSION}</VersionBadge>
        </div>

        <ProjectCard>
          <SectionTitle as="h2">
            <FaCode style={{ marginRight: "0.5rem" }} />
            What you can do here
          </SectionTitle>
          <FeatureList>
            <li>
              Home catalog for brawlers, maps, and modes with shareable URL
              filters, favorites, random pick, and side-by-side compare.
            </li>
            <li>
              Detail pages with enriched stats, gadgets, star powers, skins,
              gears, and mode ↔ map cross-links.
            </li>
            <li>
              Events shows live slots when BrawlAPI publishes them; otherwise
              Available / Retired maps with search and mode filters.
            </li>
            <li>Arena, Classic, and Neon theme skins in the navbar.</li>
          </FeatureList>
          <TechStack>
            {projectTech.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </TechStack>
        </ProjectCard>

        <ProjectCard>
          <SectionTitle as="h2">Where the data comes from</SectionTitle>
          <p>
            Catalogs come from{" "}
            <a
              href={DATA_SOURCES.BRAWLAPI.url}
              target="_blank"
              rel="noopener noreferrer">
              {DATA_SOURCES.BRAWLAPI.name}
            </a>
            . Portraits and profile icons come from the{" "}
            <a
              href={DATA_SOURCES.BRAWLIFY.url}
              target="_blank"
              rel="noopener noreferrer">
              {DATA_SOURCES.BRAWLIFY.name}
            </a>{" "}
            CDN.
          </p>
          <p>
            Not affiliated with Supercell. This app does not look up player tags
            or battle logs.
          </p>
        </ProjectCard>

        <HeroSection>
          <ProfileImageWrapper>
            <ProfileImage aria-hidden="true">MH</ProfileImage>
          </ProfileImageWrapper>
          <ProfileInfo>
            <Name>{NAME}</Name>
            <Title>{TITLE}</Title>
            <Bio>{BIO}</Bio>
            <PortfolioButton
              href={PORTFOLIO}
              target="_blank"
              rel="noopener noreferrer">
              <FaExternalLinkAlt />
              Visit portfolio
            </PortfolioButton>
          </ProfileInfo>
        </HeroSection>

        <SkillsSection>
          <SectionTitle>Stack used on this project</SectionTitle>
          <SkillsGrid>
            {SKILLS.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </SkillsGrid>
        </SkillsSection>

        <SocialSection>
          <SectionTitle>Follow the developer</SectionTitle>
          <SocialGrid>
            {socialLinks.map((social) => (
              <SocialLink
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                $color={social.color}
                $shadow={social.shadow}>
                {social.icon}
              </SocialLink>
            ))}
          </SocialGrid>
        </SocialSection>

        <Footer>
          Built by{" "}
          <a href={PORTFOLIO} target="_blank" rel="noopener noreferrer">
            {NAME}
          </a>
        </Footer>
      </AboutContainer>
    </>
  );
};

export default About;
