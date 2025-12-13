import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  gap: 2rem;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const Spinner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #f01919;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border: 4px solid transparent;
    border-top: 4px solid #ff4757;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite reverse;
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 4px solid transparent;
    border-top: 4px solid #2186ff;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.2rem;
  font-family: var(--font-primary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingDots = styled.span`
  &::after {
    content: "";
    animation: dots 1.5s steps(4, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      content: "";
    }
    40% {
      content: ".";
    }
    60% {
      content: "..";
    }
    80%,
    100% {
      content: "...";
    }
  }
`;

const Loading = ({ message = "Loading" }) => {
  return (
    <LoadingContainer>
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
      <LoadingText>
        {message}
        <LoadingDots />
      </LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
