import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SEO from "../components/common/SEO";
import { fadeInUp, pulse } from "../styles/animations";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 150px);
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: clamp(8rem, 20vw, 15rem);
  font-weight: 900;
  background: linear-gradient(135deg, #f01919 0%, #ff4757 50%, #ff6b81 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
  text-shadow: none;
  animation: ${pulse} 2s ease-in-out infinite;
  position: relative;

  &::after {
    content: "404";
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: -1;
    background: rgba(240, 25, 25, 0.3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(10px);
  }
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: white;
  margin: 1rem 0;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeInUp} 0.6s ease-out 0.6s both;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: inherit;

  ${(props) =>
    props.$primary
      ? `
    background: linear-gradient(135deg, #f01919 0%, #ff4757 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(240, 25, 25, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(240, 25, 25, 0.5);
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const Emoji = styled.span`
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Page Not Found"
        description="Oops! The page you're looking for doesn't exist."
      />
      <NotFoundContainer>
        <Emoji>😵</Emoji>
        <ErrorCode>404</ErrorCode>
        <Title>Oops! Brawler Not Found</Title>
        <Description>
          Looks like this brawler got knocked out of the arena! The page you're
          looking for doesn't exist or has been moved.
        </Description>
        <ButtonGroup>
          <Button $primary onClick={() => navigate("/")}>
            🏠 Back to Home
          </Button>
          <Button onClick={() => navigate(-1)}>← Go Back</Button>
        </ButtonGroup>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
