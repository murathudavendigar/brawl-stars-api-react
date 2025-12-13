import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorCard = styled.div`
  background: rgba(248, 113, 113, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 16px;
  padding: 2rem 3rem;
  text-align: center;
  max-width: 400px;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${shake} 0.5s ease-out;
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 1.1rem;
  font-family: "Poppins", sans-serif;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-family: var(--font-primary);
  background: linear-gradient(135deg, #f01919, #ff4757);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(240, 25, 25, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(240, 25, 25, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const ErrorMessage = ({ message = "Something went wrong", onRetry }) => {
  return (
    <ErrorContainer>
      <ErrorCard>
        <ErrorIcon>😵</ErrorIcon>
        <ErrorText>{message}</ErrorText>
        {onRetry && <RetryButton onClick={onRetry}>🔄 Try Again</RetryButton>}
      </ErrorCard>
    </ErrorContainer>
  );
};

export default ErrorMessage;
