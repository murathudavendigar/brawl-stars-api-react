import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import useFetch from "../hooks/useFetch";
import useGameCatalog from "../hooks/useGameCatalog";
import { normalizeBrawler } from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import { enrichBrawler, formatReload, STAT_MAX, statPercent } from "../lib/gameData";
import DetailMain, {
  AbilitiesGrid,
  AbilityCard,
  AbilityDescription,
  AbilityHeader,
  AbilityType,
  BackButton,
  BadgeSeparator,
  BrawlerImageContainer,
  BrawlerName,
  DescriptionCard,
  DetailImage,
  HeroSection,
  RarityBadge,
  SkinGrid,
  SkinTile,
  SectionTitle,
  StatBar,
  StatCard,
  StatMeterList,
  StatMeterRow,
  StatValue,
  StatsContainer,
} from "../styles/Detail.styled";

const RARITY_COLORS = {
  Common: "#b9eaff",
  Rare: "#68fd58",
  "Super Rare": "#5ab3ff",
  Epic: "#d850ff",
  Mythic: "#fe5e72",
  Legendary: "#fff11e",
  "Ultra Legendary": "#e1fb2a",
  Chromatic: "#f88f25",
};

const ExtraImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: 12px;
`;

const hideBrokenImage = (event) => {
  event.currentTarget.style.display = "none";
};

const applyImageFallbacks = (event, brawler) => {
  const element = event.currentTarget;
  if (brawler.imageUrl2 && element.dataset.triedSecondary !== "1") {
    element.dataset.triedSecondary = "1";
    element.src = brawler.imageUrl2;
    return;
  }
  if (brawler.iconUrl && element.dataset.triedIcon !== "1") {
    element.dataset.triedIcon = "1";
    element.src = brawler.iconUrl;
    return;
  }
  element.style.display = "none";
};

const formatSkinPrice = (skin) => {
  const parts = [];
  if (skin.priceGems) parts.push(`${skin.priceGems} gems`);
  if (skin.priceCoins) parts.push(`${skin.priceCoins} coins`);
  if (skin.priceBling) parts.push(`${skin.priceBling} bling`);
  return parts.join(" · ");
};

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { brawlerId } = useParams();
  const shouldFetchBrawler = Boolean(brawlerId) && !state;
  const {
    data: brawlerData,
    loading,
    error,
    refetch,
  } = useFetch(shouldFetchBrawler ? ENDPOINTS.BRAWLER(brawlerId) : null);
  const { catalog } = useGameCatalog();

  const brawler = useMemo(() => {
    const source = state || brawlerData;
    return enrichBrawler(normalizeBrawler(source), catalog);
  }, [brawlerData, catalog, state]);

  if (loading && shouldFetchBrawler) {
    return (
      <>
        <SEO title="Loading Brawler" noIndex />
        <DetailMain>
          <SkeletonDetail />
        </DetailMain>
      </>
    );
  }

  if (error && shouldFetchBrawler) {
    return (
      <>
        <SEO title="Brawler Error" noIndex />
        <DetailMain>
          <ErrorMessage
            message="Failed to load this brawler. Please try again."
            onRetry={refetch}
          />
        </DetailMain>
      </>
    );
  }

  if (!brawler) {
    return (
      <MissingState
        seoTitle="Brawler Not Found"
        stamp="NOT IN CATALOG"
        code="KO"
        title="Brawler not found"
        description="BrawlAPI has no brawler for this id. Pick one from the lobby or go back."
        primaryLabel="GO HOME"
        onPrimary={() => navigate("/")}
        secondaryLabel="GO BACK"
        onSecondary={() => navigate(-1)}
      />
    );
  }

  const rarityName = brawler?.rarity?.name || "Common";
  const rarityColor =
    brawler?.rarity?.color || RARITY_COLORS[rarityName] || "#ff4757";
  const playstyle = brawler?.playstyle;
  const stats = brawler.stats || {};

  return (
    <>
      <SEO
        title={brawler.name}
        description={brawler.description}
        image={brawler.imageUrl}
        keywords={`Brawl Stars, ${brawler.name}, ${
          brawler.className || playstyle || ""
        }, ${rarityName}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: brawler.name, path: `/brawlers/${brawler.id}` },
        ]}
      />
      <DetailMain>
        <HeroSection>
          <BrawlerName>
            {brawler.imageUrl3 && (
              <img
                src={brawler.imageUrl3}
                alt=""
                width="45"
                onError={hideBrokenImage}
              />
            )}
            {brawler.name}
            {brawler.imageUrl3 && (
              <img
                src={brawler.imageUrl3}
                alt=""
                width="45"
                onError={hideBrokenImage}
              />
            )}
          </BrawlerName>

          <RarityBadge $color={rarityColor}>
            {brawler.className && (
              <>
                <span>{brawler.className}</span>
                <BadgeSeparator>|</BadgeSeparator>
              </>
            )}
            <span>💎 {rarityName}</span>
            {!brawler.released && (
              <>
                <BadgeSeparator>|</BadgeSeparator>
                <span>Unreleased</span>
              </>
            )}
          </RarityBadge>

          <BrawlerImageContainer $color={rarityColor}>
            <DetailImage
              src={brawler.imageUrl}
              alt={brawler.name}
              onError={(event) => applyImageFallbacks(event, brawler)}
            />
          </BrawlerImageContainer>

          <StatsContainer>
            {stats.hitpoints != null && (
              <StatCard>
                <span className="stat-icon">❤️</span>
                <span className="stat-value">{stats.hitpoints}</span>
                <span className="stat-label">HP</span>
              </StatCard>
            )}
            {stats.speed != null && (
              <StatCard>
                <span className="stat-icon">💨</span>
                <span className="stat-value">{stats.speed}</span>
                <span className="stat-label">Speed</span>
              </StatCard>
            )}
            {stats.attackDamage != null && (
              <StatCard>
                <span className="stat-icon">⚔️</span>
                <span className="stat-value">{stats.attackDamage}</span>
                <span className="stat-label">Attack dmg</span>
              </StatCard>
            )}
            {stats.attackRange != null && (
              <StatCard>
                <span className="stat-icon">🎯</span>
                <span className="stat-value">{stats.attackRange}</span>
                <span className="stat-label">Range</span>
              </StatCard>
            )}
            {stats.ammo != null && (
              <StatCard>
                <span className="stat-icon">🔫</span>
                <span className="stat-value">{stats.ammo}</span>
                <span className="stat-label">Ammo</span>
              </StatCard>
            )}
            {stats.reloadMs != null && (
              <StatCard>
                <span className="stat-icon">⏱️</span>
                <span className="stat-value">{formatReload(stats.reloadMs)}</span>
                <span className="stat-label">Reload</span>
              </StatCard>
            )}
            {stats.superDamage != null && stats.superDamage > 0 && (
              <StatCard>
                <span className="stat-icon">💥</span>
                <span className="stat-value">{stats.superDamage}</span>
                <span className="stat-label">Super dmg</span>
              </StatCard>
            )}
            {brawler?.gadgets && (
              <StatCard>
                <span className="stat-icon">⚡</span>
                <span className="stat-value">{brawler.gadgets.length}</span>
                <span className="stat-label">Gadgets</span>
              </StatCard>
            )}
            {brawler?.starPowers && (
              <StatCard>
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{brawler.starPowers.length}</span>
                <span className="stat-label">Star Powers</span>
              </StatCard>
            )}
            <StatCard>
              <span className="stat-icon">💎</span>
              <StatValue className="stat-value" $color={rarityColor}>
                {rarityName}
              </StatValue>
              <span className="stat-label">Rarity</span>
            </StatCard>
          </StatsContainer>

          {(stats.hitpoints != null ||
            stats.speed != null ||
            stats.attackDamage != null ||
            stats.attackRange != null) && (
            <StatMeterList>
              {stats.hitpoints != null && (
                <StatMeterRow>
                  <span>Health</span>
                  <StatBar
                    $value={statPercent(stats.hitpoints, STAT_MAX.hitpoints)}
                    $color="#68FD58"
                  />
                </StatMeterRow>
              )}
              {stats.speed != null && (
                <StatMeterRow>
                  <span>Speed</span>
                  <StatBar
                    $value={statPercent(stats.speed, STAT_MAX.speed)}
                    $color="#5EFFFF"
                  />
                </StatMeterRow>
              )}
              {stats.attackDamage != null && (
                <StatMeterRow>
                  <span>Attack</span>
                  <StatBar
                    $value={statPercent(
                      stats.attackDamage,
                      STAT_MAX.attackDamage
                    )}
                    $color="#F01919"
                  />
                </StatMeterRow>
              )}
              {stats.attackRange != null && (
                <StatMeterRow>
                  <span>Range</span>
                  <StatBar
                    $value={statPercent(stats.attackRange, STAT_MAX.attackRange)}
                    $color="#FFB921"
                  />
                </StatMeterRow>
              )}
            </StatMeterList>
          )}
        </HeroSection>

        {playstyle && playstyle !== "Unknown" && (
          <DescriptionCard>
            <p>{playstyle}</p>
          </DescriptionCard>
        )}

        <DescriptionCard>
          <p>{brawler.description}</p>
        </DescriptionCard>

        {brawler?.gadgets?.length > 0 && (
          <>
            <SectionTitle>⚡ Gadgets</SectionTitle>
            <AbilitiesGrid>
              {brawler.gadgets.map((item, index) => (
                <AbilityCard key={item.id || index} $type="gadget">
                  <AbilityType $type="gadget">Gadget</AbilityType>
                  <AbilityHeader>
                    <img
                      src={item?.imageUrl}
                      alt={item?.name}
                      onError={hideBrokenImage}
                    />
                    <h4>{item?.name}</h4>
                  </AbilityHeader>
                  <AbilityDescription>{item?.description}</AbilityDescription>
                </AbilityCard>
              ))}
            </AbilitiesGrid>
          </>
        )}

        {brawler?.starPowers?.length > 0 && (
          <>
            <SectionTitle>⭐ Star Powers</SectionTitle>
            <AbilitiesGrid>
              {brawler.starPowers.map((item, index) => (
                <AbilityCard key={item.id || index} $type="starpower">
                  <AbilityType $type="starpower">Star Power</AbilityType>
                  <AbilityHeader>
                    <img
                      src={item?.imageUrl}
                      alt={item?.name}
                      onError={hideBrokenImage}
                    />
                    <h4>{item?.name}</h4>
                  </AbilityHeader>
                  <AbilityDescription>{item?.description}</AbilityDescription>
                </AbilityCard>
              ))}
            </AbilitiesGrid>
          </>
        )}

        {brawler?.skins?.length > 0 && (
          <>
            <SectionTitle>🎨 Skins</SectionTitle>
            <SkinGrid>
              {brawler.skins.map((skin) => (
                <SkinTile
                  key={skin.id || skin.rawName}
                  $color={rarityColor}
                  $hasImage={Boolean(skin.imageUrl)}
                  title={formatSkinPrice(skin) || skin.name}>
                  {skin.imageUrl && (
                    <img
                      src={skin.imageUrl}
                      alt={skin.name}
                      onError={hideBrokenImage}
                    />
                  )}
                  <span>{skin.name}</span>
                </SkinTile>
              ))}
            </SkinGrid>
          </>
        )}

        {brawler?.gears?.length > 0 && (
          <>
            <SectionTitle>⚙️ Gears</SectionTitle>
            <AbilitiesGrid>
              {brawler.gears.map((gear) => (
                <AbilityCard key={gear.id || gear.rawName}>
                  <AbilityType>Gear</AbilityType>
                  <AbilityHeader>
                    {gear.imageUrl && (
                      <ExtraImage
                        src={gear.imageUrl}
                        alt={gear.name}
                        onError={hideBrokenImage}
                      />
                    )}
                    <h4>{gear.name}</h4>
                  </AbilityHeader>
                  {gear.rarity && (
                    <AbilityDescription>{gear.rarity}</AbilityDescription>
                  )}
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
