import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import SEO from "../components/common/SEO";
import { APP_INFO, DEVELOPER } from "../lib/config";
import {
  AboutContainer,
  Bio,
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
    "Brawlify API",
  ];

  return (
    <>
      <SEO
        title="About"
        description={`About ${NAME} - ${TITLE}. ${BIO}`}
        keywords="developer, frontend, React, portfolio, Brawl Stars"
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

        {/* Skills Section */}
        <SkillsSection>
          <SectionTitle>Skills & Technologies</SectionTitle>
          <SkillsGrid>
            {SKILLS.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </SkillsGrid>
        </SkillsSection>

        {/* Social Links */}
        <SocialSection>
          <SectionTitle>Connect With Me</SectionTitle>
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

        {/* Project Card */}
        <ProjectCard>
          <h4>
            <FaCode style={{ marginRight: "0.5rem" }} />
            About This Project
          </h4>
          <p>
            {APP_INFO.DESCRIPTION}. Built with modern React practices, featuring
            glassmorphism design, smooth animations, and responsive layouts.
          </p>
          <TechStack>
            {projectTech.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </TechStack>
          <VersionBadge>🚀 Version {APP_INFO.VERSION}</VersionBadge>
        </ProjectCard>

        {/* Footer */}
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
