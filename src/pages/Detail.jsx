import { useEffect, useMemo } from "react";
import { FaExchangeAlt, FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CatalogBreadcrumb from "../components/common/CatalogBreadcrumb";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import useCompare from "../hooks/useCompare";
import useFavorites from "../hooks/useFavorites";
import useFetch from "../hooks/useFetch";
import useGameCatalog from "../hooks/useGameCatalog";
import useRecentlyViewed from "../hooks/useRecentlyViewed";
import { normalizeBrawler } from "../lib/api";
import { sortSkins } from "../lib/compareStats";
import { ENDPOINTS } from "../lib/config";
import {
  enrichBrawler,
  formatReload,
  STAT_MAX,
  statPercent,
} from "../lib/gameData";
import { IconActionButton } from "../styles/Card.styled";
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
  SectionTitle,
  SkinGrid,
  SkinTile,
  StatBar,
  StatCard,
  StatMeterList,
  StatMeterRow,
  StatsContainer,
  StatValue,
} from "../styles/Detail.styled";
import {
  HeroActionRow,
  SectionJumpBar,
  SectionJumpLink,
} from "../styles/Shared.styled";

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
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, maxCompare, selectedCompareIds } =
    useCompare();
  const { pushRecent } = useRecentlyViewed();

  const brawler = useMemo(() => {
    const source = state || brawlerData;
    return enrichBrawler(normalizeBrawler(source), catalog);
  }, [brawlerData, catalog, state]);

  useEffect(() => {
    if (!brawler?.id) return;
    pushRecent({
      id: brawler.id,
      type: "brawlers",
      name: brawler.name,
      imageUrl: brawler.imageUrl || brawler.iconUrl,
      path: `/brawlers/${brawler.id}`,
    });
  }, [brawler, pushRecent]);

  const sortedSkins = useMemo(
    () => sortSkins(brawler?.skins || []),
    [brawler]
  );

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
  const favorited = isFavorite("brawlers", brawler.id);
  const comparing = isComparing(brawler.id);
  const sectionLinks = [
    { href: "#stats", label: "Stats", show: true },
    {
      href: "#gadgets",
      label: "Gadgets",
      show: Boolean(brawler?.gadgets?.length),
    },
    {
      href: "#star-powers",
      label: "Star Powers",
      show: Boolean(brawler?.starPowers?.length),
    },
    { href: "#skins", label: "Skins", show: sortedSkins.length > 0 },
    { href: "#gears", label: "Gears", show: Boolean(brawler?.gears?.length) },
  ].filter((link) => link.show);

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
        <CatalogBreadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Brawlers", path: "/?type=brawlers" },
            { label: brawler.name },
          ]}
        />

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
            <span>{rarityName}</span>
            {!brawler.released && (
              <>
                <BadgeSeparator>|</BadgeSeparator>
                <span>Unreleased</span>
              </>
            )}
          </RarityBadge>

          <HeroActionRow>
            <IconActionButton
              type="button"
              aria-label={
                favorited
                  ? `Remove ${brawler.name} from favorites`
                  : `Add ${brawler.name} to favorites`
              }
              $active={favorited}
              onClick={() => toggleFavorite("brawlers", brawler.id)}>
              <FaStar aria-hidden="true" />
            </IconActionButton>
            <IconActionButton
              type="button"
              aria-label={
                comparing
                  ? `Remove ${brawler.name} from compare`
                  : `Add ${brawler.name} to compare (${selectedCompareIds.length}/${maxCompare})`
              }
              $active={comparing}
              onClick={() => toggleCompare(brawler)}>
              <FaExchangeAlt aria-hidden="true" />
            </IconActionButton>
          </HeroActionRow>

          <BrawlerImageContainer $color={rarityColor}>
            <DetailImage
              src={brawler.imageUrl}
              alt={brawler.name}
              onError={(event) => applyImageFallbacks(event, brawler)}
            />
          </BrawlerImageContainer>
        </HeroSection>

        {sectionLinks.length > 1 && (
          <SectionJumpBar aria-label="On this page">
            {sectionLinks.map((link) => (
              <SectionJumpLink key={link.href} href={link.href}>
                {link.label}
              </SectionJumpLink>
            ))}
          </SectionJumpBar>
        )}

        <HeroSection id="stats">
          <StatsContainer>
            {stats.hitpoints != null && (
              <StatCard>
                <span className="stat-icon">HP</span>
                <span className="stat-value">{stats.hitpoints}</span>
                <span className="stat-label">Health</span>
              </StatCard>
            )}
            {stats.speed != null && (
              <StatCard>
                <span className="stat-icon">SPD</span>
                <span className="stat-value">{stats.speed}</span>
                <span className="stat-label">Speed</span>
              </StatCard>
            )}
            {stats.attackDamage != null && (
              <StatCard>
                <span className="stat-icon">ATK</span>
                <span className="stat-value">{stats.attackDamage}</span>
                <span className="stat-label">Attack</span>
              </StatCard>
            )}
            {stats.attackRange != null && (
              <StatCard>
                <span className="stat-icon">RNG</span>
                <span className="stat-value">{stats.attackRange}</span>
                <span className="stat-label">Range</span>
              </StatCard>
            )}
            {stats.ammo != null && (
              <StatCard>
                <span className="stat-icon">AMMO</span>
                <span className="stat-value">{stats.ammo}</span>
                <span className="stat-label">Ammo</span>
              </StatCard>
            )}
            {stats.reloadMs != null && (
              <StatCard>
                <span className="stat-icon">RLD</span>
                <span className="stat-value">{formatReload(stats.reloadMs)}</span>
                <span className="stat-label">Reload</span>
              </StatCard>
            )}
            {stats.superDamage != null && stats.superDamage > 0 && (
              <StatCard>
                <span className="stat-icon">SPR</span>
                <span className="stat-value">{stats.superDamage}</span>
                <span className="stat-label">Super</span>
              </StatCard>
            )}
            {brawler?.gadgets && (
              <StatCard>
                <span className="stat-icon">GAD</span>
                <span className="stat-value">{brawler.gadgets.length}</span>
                <span className="stat-label">Gadgets</span>
              </StatCard>
            )}
            {brawler?.starPowers && (
              <StatCard>
                <span className="stat-icon">SP</span>
                <span className="stat-value">{brawler.starPowers.length}</span>
                <span className="stat-label">Star Powers</span>
              </StatCard>
            )}
            <StatCard>
              <span className="stat-icon">RAR</span>
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
          <div id="gadgets">
            <SectionTitle>Gadgets</SectionTitle>
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
          </div>
        )}

        {brawler?.starPowers?.length > 0 && (
          <div id="star-powers">
            <SectionTitle>Star Powers</SectionTitle>
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
          </div>
        )}

        {sortedSkins.length > 0 && (
          <div id="skins">
            <SectionTitle>Skins</SectionTitle>
            <SkinGrid>
              {sortedSkins.map((skin) => {
                const price = formatSkinPrice(skin);
                return (
                  <SkinTile
                    key={skin.id || skin.rawName}
                    $color={rarityColor}
                    $hasImage={Boolean(skin.imageUrl)}>
                    {skin.imageUrl && (
                      <img
                        src={skin.imageUrl}
                        alt={skin.name}
                        onError={hideBrokenImage}
                      />
                    )}
                    <span>{skin.name}</span>
                    {price ? <small>{price}</small> : <small>Default</small>}
                  </SkinTile>
                );
              })}
            </SkinGrid>
          </div>
        )}

        {brawler?.gears?.length > 0 && (
          <div id="gears">
            <SectionTitle>Gears</SectionTitle>
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
          </div>
        )}

        <BackButton type="button" onClick={() => navigate("/")}>
          Back to Lobby
        </BackButton>
      </DetailMain>
    </>
  );
};

export default Detail;
