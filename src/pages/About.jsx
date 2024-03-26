import Flex from "../styles/Flex.styled";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SocialDiv from "../styles/About.styled";

const styledSocialLogo = {
  marginRight: "1.2rem",
  transition: "all 0.5s",
  cursor: "pointer",
};

const About = () => {
  return (
    <>
      <Flex style={{ flexDirection: "column" }}>
        <h1 style={{ color: "white" }}>Designed By: Captain Price</h1>

        <SocialDiv>
          <FaTwitter
            style={styledSocialLogo}
            onMouseOver={({ target }) => (target.style.color = "white")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() =>
              (window.location.href = "https://twitter.com/murathoncu")
            }
          />

          <FaInstagram
            style={styledSocialLogo}
            onMouseOver={({ target }) => (target.style.color = "white")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() =>
              (window.location.href = "https://www.instagram.com/mhdvoncu/")
            }
          />
          <FaLinkedinIn
            style={styledSocialLogo}
            onMouseOver={({ target }) => (target.style.color = "white")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/murathudavendigaroncu/")
            }
          />

          <FaGithub
            style={styledSocialLogo}
            onMouseOver={({ target }) => (target.style.color = "white")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() =>
              (window.location.href = "https://github.com/murathudavendigar")
            }
          />
        </SocialDiv>
      </Flex>
    </>
  );
};

export default About;
