import React from "react";
import { ButtonCard } from "../styles/Card.styled";
import Flex from "../styles/Flex.styled";

const About = () => {
  return (
    <>
      <Flex style={{ flexDirection: "column", gap: "1.2rem" }}>
        <h1 className="text-2xl md:text-4xl">Designed By: Captain Price</h1>
        <h1 className="text-xl md:text-3xl mt-3">Murat Hüdavendigâr Öncü</h1>
        <h1 className="text-2xl mt-6 hover:text-white transition-all">
          Follow My Accounts
        </h1>
        <div className="flex justify-center mt-5 text-7xl gap-7 flex-wrap">
          <button
            onClick={(e) =>
              (window.location.href = "https://twitter.com/murathoncu")
            }>
            {" "}
            Twitter
          </button>
          <button
            onClick={(e) =>
              (window.location.href = "https://www.instagram.com/m_hdavendigr/")
            }>
            {" "}
            Instagram
          </button>
          <button
            onClick={(e) =>
              (window.location.href =
                "https://www.linkedin.com/in/murathudavendigaroncu/")
            }>
            Linkedin
          </button>

          <button
            onClick={(e) =>
              (window.location.href = "https://github.com/murathudavendigar")
            }>
            Github{" "}
          </button>
        </div>
      </Flex>
    </>
  );
};

export default About;
