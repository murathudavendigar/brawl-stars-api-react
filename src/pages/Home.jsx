import { useMemo, useState } from "react";
import { FaLink } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Header from "../components/Header";
import RecentStrip from "../components/RecentStrip";
import ErrorMessage from "../components/common/ErrorMessage";
import { MissingPortrait } from "../components/common/LazyImage";
import SEO from "../components/common/SEO";
import { SkeletonCardGrid } from "../components/common/Skeleton";
import useCatalogQuery from "../hooks/useCatalogQuery";
import useCompare from "../hooks/useCompare";
import useFavorites from "../hooks/useFavorites";
import useFetch from "../hooks/useFetch";
import useGameCatalog from "../hooks/useGameCatalog";
import useRecentlyViewed from "../hooks/useRecentlyViewed";
import { normalizeCatalog } from "../lib/api";
import {
  COMPARE_METRICS,
  metricBarPercent,
  pickWinners,
} from "../lib/compareStats";
import { APP_INFO, SEARCH_TYPES, getCatalogUrl } from "../lib/config";
import { COMPARE_LIMIT_HINT } from "../lib/copy";
import { enrichBrawler } from "../lib/gameData";
import {
  ButtonCard,
  CompareCard,
  CompareGrid,
  ComparePanel,
} from "../styles/Card.styled";
import {
  StatBar,
  StatMeterList,
  StatMeterRow,
} from "../styles/Detail.styled";
import {
  CatalogHero,
  CatalogLead,
  HeaderText,
  HomeMainDiv,
} from "../styles/Home.styled";

const ComparePortrait = ({ item }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <MissingPortrait $width="88px" $height="88px">
        <small>STARR PARK</small>
        <strong>NEW</strong>
      </MissingPortrait>
    );
  }

  return (
    <img
      src={item.imageUrl || item.iconUrl}
      alt=""
      aria-hidden="true"
      onError={(event) => {
        const element = event.currentTarget;
        if (item.imageUrl2 && element.dataset.triedSecondary !== "1") {
          element.dataset.triedSecondary = "1";
          element.src = item.imageUrl2;
          return;
        }
        if (item.iconUrl && element.dataset.triedIcon !== "1") {
          element.dataset.triedIcon = "1";
          element.src = item.iconUrl;
          return;
        }
        setFailed(true);
      }}
    />
  );
};

const Home = () => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const {
    searchType,
    searchName,
    filters,
    sortBy,
    viewMode,
    showFavorites,
    patchQuery,
    resetFilters,
  } = useCatalogQuery();
  const { favoriteKeys, isFavorite, toggleFavorite } = useFavorites();
  const {
    selectedCompareIds,
    toggleCompare,
    clearCompare,
    maxCompare,
    sharePath,
  } = useCompare();
  const { recentItems, clearRecent } = useRecentlyViewed();

  const url = getCatalogUrl(searchType);
  const { data, loading: listLoading, error, refetch } = useFetch(url);
  const { catalog } = useGameCatalog();
  const info = useMemo(() => {
    const list = normalizeCatalog(searchType, data);
    if (searchType !== "brawlers") return list;
    return list.map((brawler) => enrichBrawler(brawler, catalog));
  }, [catalog, data, searchType]);
  const loading = listLoading;

  const filterOptions = useMemo(() => {
    const getUniqueSorted = (values) =>
      [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

    return {
      rarities: getUniqueSorted(info.map((item) => item?.rarity?.name)),
      classes: getUniqueSorted(info.map((item) => item?.className)),
      gameModes: getUniqueSorted(info.map((item) => item?.gameMode?.name)),
    };
  }, [info]);

  const filteredInfo = useMemo(() => {
    const normalizedSearch = searchName.trim().toLowerCase();

    return info
      .filter((item) => {
        if (
          normalizedSearch &&
          !item?.name?.toLowerCase().includes(normalizedSearch)
        ) {
          return false;
        }
        if (showFavorites && !isFavorite(searchType, item.id)) return false;
        if (
          searchType === "brawlers" &&
          filters.rarity !== "all" &&
          item?.rarity?.name !== filters.rarity
        ) {
          return false;
        }
        if (
          searchType === "brawlers" &&
          filters.class !== "all" &&
          item?.className !== filters.class
        ) {
          return false;
        }
        if (
          searchType === "maps" &&
          filters.gameMode !== "all" &&
          item?.gameMode?.name !== filters.gameMode
        ) {
          return false;
        }
        if (searchType === "maps" && filters.availability === "available") {
          return !item?.disabled;
        }
        if (searchType === "maps" && filters.availability === "retired") {
          return Boolean(item?.disabled);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        }
        if (sortBy === "oldest") {
          return (Number(a.id) || 0) - (Number(b.id) || 0);
        }
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "rarity") {
          return (a?.rarity?.name || "").localeCompare(b?.rarity?.name || "");
        }
        if (sortBy === "class") {
          return (a?.className || "").localeCompare(b?.className || "");
        }
        if (sortBy === "mode") {
          return (a?.gameMode?.name || "").localeCompare(
            b?.gameMode?.name || ""
          );
        }
        return a.name.localeCompare(b.name);
      });
  }, [
    filters,
    info,
    isFavorite,
    searchName,
    searchType,
    showFavorites,
    sortBy,
  ]);

  const selectedCompareItems = useMemo(
    () =>
      searchType === "brawlers"
        ? selectedCompareIds
            .map((id) =>
              info.find(
                (item) => item.id === id || String(item.id) === String(id)
              )
            )
            .filter(Boolean)
        : [],
    [info, searchType, selectedCompareIds]
  );

  const winners = useMemo(
    () => pickWinners(selectedCompareItems),
    [selectedCompareItems]
  );

  const getPageTitle = () => {
    const type = Object.values(SEARCH_TYPES).find(
      (entry) => entry.value === searchType
    );
    return type?.label || "Home";
  };

  const handleRandomPick = () => {
    if (!filteredInfo.length) return;
    const randomItem =
      filteredInfo[Math.floor(Math.random() * filteredInfo.length)];

    if (searchType === "brawlers") {
      navigate(`/brawlers/${randomItem.id}`, { state: randomItem });
      return;
    }

    if (searchType === "maps") {
      navigate(`/maps/${randomItem.id}`, { state: randomItem });
      return;
    }

    navigate(`/gamemodes/${randomItem.id}`, { state: randomItem });
  };

  const handleCopyCompare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${sharePath}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  if (error)
    return (
      <>
        <SEO title={getPageTitle()} noIndex />
        <HomeMainDiv>
          <ErrorMessage
            message="Failed to load data. Please try again."
            onRetry={refetch}
          />
        </HomeMainDiv>
      </>
    );

  return (
    <>
      <SEO
        title={getPageTitle()}
        description={`${APP_INFO.DESCRIPTION} Currently showing Brawl Stars ${getPageTitle().toLowerCase()} from BrawlAPI.`}
        keywords={`Brawl Stars, ${searchType}, BrawlAPI, maps, game modes`}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <HomeMainDiv>
        <CatalogHero>
          <HeaderText>{getPageTitle()}</HeaderText>
          <CatalogLead>
            Search, filter, favorite, and compare {getPageTitle().toLowerCase()}{" "}
            from BrawlAPI.
          </CatalogLead>
        </CatalogHero>

        <RecentStrip items={recentItems} onClear={clearRecent} />

        <Header
          searchName={searchName}
          searchType={searchType}
          filterOptions={filterOptions}
          filters={filters}
          sortBy={sortBy}
          viewMode={viewMode}
          showFavorites={showFavorites}
          resultCount={filteredInfo.length}
          totalCount={info.length}
          favoriteCount={favoriteKeys.length}
          advancedOpen={advancedOpen}
          setSearchName={(value) => patchQuery({ searchName: value })}
          setSearchType={(value) =>
            patchQuery({
              searchType: value,
              sortBy: value === "brawlers" ? "newest" : "name-asc",
              searchName: "",
              filters: {
                rarity: "all",
                class: "all",
                gameMode: "all",
                availability: "available",
              },
            })
          }
          setFilters={(nextFilters) => patchQuery({ filters: nextFilters })}
          setSortBy={(value) => patchQuery({ sortBy: value })}
          setViewMode={(value) => patchQuery({ viewMode: value })}
          setShowFavorites={(value) => patchQuery({ showFavorites: value })}
          setAdvancedOpen={setAdvancedOpen}
          onRandomPick={handleRandomPick}
          onResetFilters={resetFilters}
        />

        {selectedCompareItems.length > 0 && (
          <ComparePanel id="compare-panel" aria-label="Brawler comparison">
            <h2>Compare Brawlers</h2>
            <p style={{ textAlign: "center", margin: 0 }}>
              {COMPARE_LIMIT_HINT(selectedCompareItems.length, maxCompare)} Gold
              rows mark the stronger side.
            </p>
            <CompareGrid>
              {selectedCompareItems.map((item) => (
                <CompareCard key={item.id}>
                  <ComparePortrait item={item} />
                  <h3>
                    <Link to={`/brawlers/${item.id}`} state={item}>
                      {item.name}
                    </Link>
                  </h3>
                  <p>{item.className || "Unknown class"}</p>
                  <StatMeterList>
                    {COMPARE_METRICS.map((metric) => {
                      const value = metric.getValue(item);
                      if (
                        metric.hideIfEmpty &&
                        (value == null || Number(value) <= 0)
                      ) {
                        return null;
                      }
                      const isWinner = winners[metric.key]?.has(item.id);
                      return (
                        <StatMeterRow key={metric.key} $winner={isWinner}>
                          <span>
                            {metric.label} {metric.format(value)}
                            {isWinner ? " ★" : ""}
                          </span>
                          <StatBar
                            $value={metricBarPercent(metric, value)}
                            $color={metric.color}
                          />
                        </StatMeterRow>
                      );
                    })}
                  </StatMeterList>
                </CompareCard>
              ))}
            </CompareGrid>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.65rem",
                justifyContent: "center",
              }}>
              <ButtonCard $static type="button" onClick={handleCopyCompare}>
                <FaLink aria-hidden="true" style={{ marginRight: "0.35rem" }} />
                {copied ? "Link Copied" : "Copy Compare Link"}
              </ButtonCard>
              <ButtonCard $static type="button" onClick={clearCompare}>
                Clear Compare
              </ButtonCard>
            </div>
          </ComparePanel>
        )}

        {loading ? (
          <SkeletonCardGrid count={12} />
        ) : (
          <Cards
            info={filteredInfo}
            searchName=""
            searchType={searchType}
            viewMode={viewMode}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={toggleCompare}
            onResetFilters={resetFilters}
          />
        )}
      </HomeMainDiv>
    </>
  );
};

export default Home;
