import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${(props) => props.$radius || "8px"};
`;

// Card Skeleton
export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: 280px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 60px;
    left: 20px;
    width: 60%;
    height: 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

// Text Skeleton
export const SkeletonText = styled(SkeletonBase)`
  height: ${(props) => props.$height || "16px"};
  width: ${(props) => props.$width || "100%"};
  margin: ${(props) => props.$margin || "8px 0"};
`;

// Circle Skeleton (for avatars)
export const SkeletonCircle = styled(SkeletonBase)`
  width: ${(props) => props.$size || "50px"};
  height: ${(props) => props.$size || "50px"};
  border-radius: 50%;
`;

// Image Skeleton
export const SkeletonImage = styled(SkeletonBase)`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "200px"};
`;

// Button Skeleton
export const SkeletonButton = styled(SkeletonBase)`
  width: ${(props) => props.$width || "120px"};
  height: ${(props) => props.$height || "40px"};
  border-radius: 30px;
`;

// Grid of Card Skeletons
const SkeletonGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const SkeletonCardGrid = ({ count = 8 }) => {
  return (
    <SkeletonGridWrapper>
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </SkeletonGridWrapper>
  );
};

// Event Card Skeleton
export const SkeletonEventCard = styled(SkeletonBase)`
  width: 100%;
  max-width: 400px;
  height: 350px;
  border-radius: 20px;
  margin: 1rem;
`;

// Event Grid Skeleton
const SkeletonEventGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
`;

export const SkeletonEventGrid = ({ count = 6 }) => {
  return (
    <SkeletonEventGridWrapper>
      {[...Array(count)].map((_, index) => (
        <SkeletonEventCard key={index} />
      ))}
    </SkeletonEventGridWrapper>
  );
};

// Detail Page Skeleton
const DetailSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const SkeletonDetail = () => {
  return (
    <DetailSkeletonWrapper>
      <SkeletonImage $width="300px" $height="300px" $radius="20px" />
      <SkeletonText $width="200px" $height="32px" />
      <SkeletonText $width="300px" $height="24px" />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}>
        <SkeletonButton $width="150px" />
        <SkeletonButton $width="150px" />
      </div>
    </DetailSkeletonWrapper>
  );
};

export default SkeletonBase;
