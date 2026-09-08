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

export const MissingPortrait = styled.div`
  width: ${({ $width }) => $width || "150px"};
  height: ${({ $height }) => $height || "150px"};
  display: grid;
  place-items: center;
  align-content: center;
  gap: 0.25rem;
  background: var(--color-primary);
  border: 3px solid var(--color-ink);
  border-radius: 12px;
  box-shadow: 0 3px 0 #1a1020;
  color: var(--color-white);
  font-family: var(--font-primary);
  text-align: center;
  text-shadow: 2px 2px 0 var(--color-ink);

  small {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
  }

  strong {
    font-size: 1.35rem;
    line-height: 1;
  }
`;

const LazyImage = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  style,
  className,
  onError,
  missingLabel = "NEW",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const fallbackIndex = useRef(0);
  const imgRef = useRef(null);
  const fallbacks = Array.isArray(fallbackSrc)
    ? fallbackSrc.filter(Boolean)
    : fallbackSrc
      ? [fallbackSrc]
      : [];

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

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasFailed(false);
    fallbackIndex.current = 0;
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasFailed(false);
  };

  const handleError = (event) => {
    while (fallbackIndex.current < fallbacks.length) {
      const next = fallbacks[fallbackIndex.current];
      fallbackIndex.current += 1;
      if (next && next !== currentSrc) {
        setIsLoaded(false);
        setCurrentSrc(next);
        return;
      }
    }
    setHasFailed(true);
    onError?.(event);
  };

  return (
    <ImageWrapper ref={imgRef} className={className}>
      {hasFailed ? (
        <MissingPortrait $width={width} $height={height} aria-hidden="true">
          <small>STARR PARK</small>
          <strong>{missingLabel}</strong>
        </MissingPortrait>
      ) : (
        <>
          {!isLoaded && (
            <Placeholder
              $width={width}
              $height={height}
              $minHeight={height || "100px"}
            />
          )}
          {isInView && currentSrc && (
            <StyledImage
              src={currentSrc}
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
              onError={handleError}
              $isLoaded={isLoaded}
              {...props}
            />
          )}
        </>
      )}
    </ImageWrapper>
  );
};

export default LazyImage;
