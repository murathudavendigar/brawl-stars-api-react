import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import DetailMain, {
  AbilitiesGrid,
  AbilityCard,
  AbilityDescription,
  AbilityHeader,
  AbilityType,
  BackButton,
  BrawlerImageContainer,
  BrawlerName,
  DescriptionCard,
  DetailImage,
  HeroSection,
  RarityBadge,
  SectionTitle,
  StatCard,
  StatsContainer,
} from "../styles/Detail.styled";

const RARITY_COLORS = {
  Common: "#b9eaff",
  Rare: "#68fd58",
  "Super Rare": "#5ab3ff",
  Epic: "#d850ff",
  Mythic: "#fe5e72",
  Legendary: "#fff11e",
  Chromatic: "#f88f25",
};

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <>
        <SEO title="Not Found" />
        <DetailMain>
          <HeroSection>
            <BrawlerName>Content Not Found</BrawlerName>
            <DescriptionCard>
              <p>Please navigate from the home page to view details.</p>
            </DescriptionCard>
          </HeroSection>
          <BackButton onClick={() => navigate("/")}>🏠 GO HOME</BackButton>
        </DetailMain>
      </>
    );
  }

  const rarityName = state?.rarity?.name || "Common";
  const rarityColor = RARITY_COLORS[rarityName] || "#ff4757";

  return (
    <>
      <SEO
        title={state.name}
        description={state.description}
        image={state.imageUrl}
        keywords={`Brawl Stars, ${state.name}, ${
          state?.class?.name || ""
        }, ${rarityName}`}
      />
      <DetailMain>
        <HeroSection>
          <BrawlerName>
            <img src={state.imageUrl3} alt="" width="45" />
            {state.name}
            <img src={state.imageUrl3} alt="" width="45" />
          </BrawlerName>

          <RarityBadge $color={rarityColor}>
            {state?.class?.name && <span>⚔️ {state.class.name}</span>}
            <span style={{ opacity: 0.5 }}>|</span>
            <span>💎 {rarityName}</span>
          </RarityBadge>

          <BrawlerImageContainer $color={rarityColor}>
            <DetailImage src={state.imageUrl} alt={state.name} />
          </BrawlerImageContainer>

          <StatsContainer>
            {state?.gadgets && (
              <StatCard>
                <span className="stat-icon">⚡</span>
                <span className="stat-value">{state.gadgets.length}</span>
                <span className="stat-label">Gadgets</span>
              </StatCard>
            )}
            {state?.starPowers && (
              <StatCard>
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{state.starPowers.length}</span>
                <span className="stat-label">Star Powers</span>
              </StatCard>
            )}
            <StatCard>
              <span className="stat-icon">💎</span>
              <span className="stat-value" style={{ color: rarityColor }}>
                {rarityName}
              </span>
              <span className="stat-label">Rarity</span>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        <DescriptionCard>
          <p>{state.description}</p>
        </DescriptionCard>

        {state?.gadgets?.length > 0 && (
          <>
            <SectionTitle>⚡ Gadgets</SectionTitle>
            <AbilitiesGrid>
              {state.gadgets.map((item, index) => (
                <AbilityCard key={item.id || index} $type="gadget">
                  <AbilityType $type="gadget">Gadget</AbilityType>
                  <AbilityHeader>
                    <img src={item?.imageUrl} alt={item?.name} />
                    <h4>{item?.name}</h4>
                  </AbilityHeader>
                  <AbilityDescription>{item?.description}</AbilityDescription>
                </AbilityCard>
              ))}
            </AbilitiesGrid>
          </>
        )}

        {state?.starPowers?.length > 0 && (
          <>
            <SectionTitle>⭐ Star Powers</SectionTitle>
            <AbilitiesGrid>
              {state.starPowers.map((item, index) => (
                <AbilityCard key={item.id || index} $type="starpower">
                  <AbilityType $type="starpower">Star Power</AbilityType>
                  <AbilityHeader>
                    <img src={item?.imageUrl} alt={item?.name} />
                    <h4>{item?.name}</h4>
                  </AbilityHeader>
                  <AbilityDescription>{item?.description}</AbilityDescription>
                </AbilityCard>
              ))}
            </AbilitiesGrid>
          </>
        )}

        <BackButton onClick={() => navigate(-1)}>← GO BACK</BackButton>
      </DetailMain>
    </>
  );
};

export default Detail;
