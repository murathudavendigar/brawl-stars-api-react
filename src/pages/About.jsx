import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import SEO from "../components/common/SEO";
import { APP_INFO, DATA_SOURCES, DEVELOPER } from "../lib/config";
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
        description={`About ${NAME} — ${TITLE}. ${APP_INFO.DESCRIPTION}`}
        keywords="developer, frontend, React, portfolio, Brawl Stars, BrawlAPI"
        pageType="ProfilePage"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutContainer>
        {/* Hero Section */}
        <HeroSection>
          <ProfileImageWrapper>
            <ProfileImage>👨‍💻</ProfileImage>
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
              Visit My Portfolio
            </PortfolioButton>
          </ProfileInfo>
        </HeroSection>

        <ProjectCard>
          <SectionTitle as="h2">
            <FaCode style={{ marginRight: "0.5rem" }} />
            What is this Brawl Stars catalog?
          </SectionTitle>
          <p>{APP_INFO.SUMMARY}</p>
          <FeatureList>
            <li>
              Home catalog for brawlers, maps, and modes — newest brawlers
              first, with rarity and class filters.
            </li>
            <li>
              Favorites, random pick, and HP / speed / attack compare on the
              same page.
            </li>
            <li>
              Map and game-mode detail pages, including retired maps for each
              mode.
            </li>
            <li>
              Events splits maps into Available and Retired. BrawlAPI does not
              publish a live rotation clock.
            </li>
            <li>Arena, Classic, and Neon theme skins in the navbar.</li>
          </FeatureList>
          <TechStack>
            {projectTech.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </TechStack>
          <VersionBadge>Version {APP_INFO.VERSION}</VersionBadge>
        </ProjectCard>

        <ProjectCard>
          <SectionTitle as="h2">Where does the data come from?</SectionTitle>
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
            Not affiliated with Supercell. This app does not look up player
            tags or battle logs.
          </p>
        </ProjectCard>

        <SkillsSection>
          <SectionTitle>What skills does Murat use?</SectionTitle>
          <SkillsGrid>
            {SKILLS.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </SkillsGrid>
        </SkillsSection>

        <SocialSection>
          <SectionTitle>Where can you follow the developer?</SectionTitle>
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
          Made with ❤️ by{" "}
          <a href={PORTFOLIO} target="_blank" rel="noopener noreferrer">
            {NAME}
          </a>
        </Footer>
      </AboutContainer>
    </>
  );
};

export default About;
