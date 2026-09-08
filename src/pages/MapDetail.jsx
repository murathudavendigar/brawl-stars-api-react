import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import useFetch from "../hooks/useFetch";
import { normalizeMap } from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import DetailMain, {
  BackButton,
  BadgeSeparator,
  DescriptionCard,
  HeroSection,
  MapDetailImage,
  RarityBadge,
  StatCard,
  StatsContainer,
} from "../styles/Detail.styled";

const ModeJump = styled.button`
  background: none;
  border: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const MapDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { mapId } = useParams();
  const shouldFetchMap = Boolean(mapId) && !state;
  const {
    data: mapData,
    loading,
    error,
    refetch,
  } = useFetch(shouldFetchMap ? ENDPOINTS.MAP(mapId) : null);

  const map = useMemo(() => {
    if (state) return normalizeMap(state);
    return normalizeMap(mapData);
  }, [mapData, state]);

  if (loading && shouldFetchMap) {
    return (
      <>
        <SEO title="Loading Map" noIndex />
        <DetailMain>
          <SkeletonDetail />
        </DetailMain>
      </>
    );
  }

  if (error && shouldFetchMap) {
    return (
      <>
        <SEO title="Map Error" noIndex />
        <DetailMain>
          <ErrorMessage
            message="Failed to load this map. Please try again."
            onRetry={refetch}
          />
        </DetailMain>
      </>
    );
  }

  if (!map) {
    return (
      <MissingState
        seoTitle="Map Not Found"
        stamp="NOT IN CATALOG"
        code="KO"
        title="Map not found"
        description="BrawlAPI has no map for this id. Open Events or the maps catalog and pick one."
        primaryLabel="GO HOME"
        onPrimary={() => navigate("/")}
        secondaryLabel="GO BACK"
        onSecondary={() => navigate(-1)}
      />
    );
  }

  const modeColor = map?.gameMode?.color || "#2186ff";

  return (
    <>
      <SEO
        title={map.name}
        description={map.description}
        image={map.imageUrl}
        keywords={`Brawl Stars, ${map.name}, ${
          map?.gameMode?.name || "map"
        }, map`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: map.name, path: `/maps/${map.id}` },
        ]}
      />
      <DetailMain>
        <HeroSection>
          <h1>{map.name}</h1>
          <RarityBadge $color={modeColor}>
            <span>
              {map?.gameMode?.id ? (
                <ModeJump
                  type="button"
                  onClick={() =>
                    navigate(`/gamemodes/${map.gameMode.id}`, {
                      state: map.gameMode,
                    })
                  }>
                  {map.gameMode.name}
                </ModeJump>
              ) : (
                map?.gameMode?.name || "Game Mode"
              )}
            </span>
            <BadgeSeparator>|</BadgeSeparator>
            <span>{map.disabled ? "Retired" : "Available"}</span>
          </RarityBadge>

          <MapDetailImage src={map.imageUrl} alt={`${map.name} map`} />

          <StatsContainer>
            <StatCard>
              <span className="stat-icon">🎯</span>
              <span className="stat-value">
                {map?.gameMode?.id ? (
                  <ModeJump
                    type="button"
                    onClick={() =>
                      navigate(`/gamemodes/${map.gameMode.id}`, {
                        state: map.gameMode,
                      })
                    }>
                    {map.gameMode.name}
                  </ModeJump>
                ) : (
                  map?.gameMode?.name || "-"
                )}
              </span>
              <span className="stat-label">Mode</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">🌍</span>
              <span className="stat-value">
                {map?.environment?.name || "-"}
              </span>
              <span className="stat-label">Theme</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">{map.disabled ? "⏸" : "✅"}</span>
              <span className="stat-value">
                {map.disabled ? "Retired" : "Available"}
              </span>
              <span className="stat-label">Rotation</span>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        <DescriptionCard>
          <p>{map.description}</p>
        </DescriptionCard>

        <BackButton onClick={() => navigate(-1)}>GO BACK</BackButton>
      </DetailMain>
    </>
  );
};

export default MapDetail;
