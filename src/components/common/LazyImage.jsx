import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
`;

const Placeholder = styled.div`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "auto"};
  min-height: ${({ $minHeight }) => $minHeight || "100px"};
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transition: opacity 0.4s ease-in-out;
  display: block;
`;

const LazyImage = ({ src, alt, width, height, style, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageWrapper ref={imgRef} className={className}>
      {!isLoaded && (
        <Placeholder
          $width={width}
          $height={height}
          $minHeight={height || "100px"}
        />
      )}
      {isInView && (
        <StyledImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            ...style,
            position: isLoaded ? "relative" : "absolute",
            top: 0,
            left: 0,
          }}
          onLoad={handleLoad}
          $isLoaded={isLoaded}
          {...props}
        />
      )}
    </ImageWrapper>
  );
};

export default LazyImage;
