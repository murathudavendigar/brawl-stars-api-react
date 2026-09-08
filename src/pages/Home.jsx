import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Header from "../components/Header";
import ErrorMessage from "../components/common/ErrorMessage";
import SEO from "../components/common/SEO";
import { SkeletonCardGrid } from "../components/common/Skeleton";
import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import useGameCatalog from "../hooks/useGameCatalog";
import { normalizeCatalog } from "../lib/api";
import { APP_INFO, SEARCH_TYPES, getCatalogUrl } from "../lib/config";
import { MissingPortrait } from "../components/common/LazyImage";
import { enrichBrawler, STAT_MAX, statPercent } from "../lib/gameData";
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
import { CatalogLead, HeaderText, HomeMainDiv } from "../styles/Home.styled";

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
      src={item.imageUrl}
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
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("brawlers");
  const [filters, setFilters] = useState({
    rarity: "all",
    class: "all",
    gameMode: "all",
    availability: "available",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFavorites, setShowFavorites] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedCompareIds, setSelectedCompareIds] = useState([]);
  const navigate = useNavigate();
  const { favoriteKeys, isFavorite, toggleFavorite } = useFavorites();

  const url = getCatalogUrl(searchType);
  const { data, loading: listLoading, error, refetch } = useFetch(url);
  const { catalog } = useGameCatalog();
  const info = useMemo(() => {
    const list = normalizeCatalog(searchType, data);
    if (searchType !== "brawlers") return list;
    return list.map((brawler) => enrichBrawler(brawler, catalog));
  }, [catalog, data, searchType]);
  const loading = listLoading;

  useEffect(() => {
    setSortBy(searchType === "brawlers" ? "newest" : "name-asc");
    if (searchType !== "brawlers") {
      setSelectedCompareIds([]);
    }
  }, [searchType]);

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
        if (normalizedSearch && !item?.name?.toLowerCase().includes(normalizedSearch)) {
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
          return (a?.gameMode?.name || "").localeCompare(b?.gameMode?.name || "");
        }
        return a.name.localeCompare(b.name);
      });
  }, [filters, info, isFavorite, searchName, searchType, showFavorites, sortBy]);

  const selectedCompareItems = useMemo(
    () => info.filter((item) => selectedCompareIds.includes(item.id)),
    [info, selectedCompareIds]
  );

  const getPageTitle = () => {
    const type = Object.values(SEARCH_TYPES).find(
      (t) => t.value === searchType
    );
    return type?.label || "Home";
  };

  const handleRandomPick = () => {
    if (!filteredInfo.length) return;
    const randomItem = filteredInfo[Math.floor(Math.random() * filteredInfo.length)];

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

  const handleToggleCompare = (item) => {
    setSelectedCompareIds((currentIds) => {
      if (currentIds.includes(item.id)) {
        return currentIds.filter((id) => id !== item.id);
      }
      return [...currentIds.slice(-1), item.id];
    });
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
        <HeaderText>Brawl Stars {getPageTitle()}</HeaderText>
        <CatalogLead>
          A BrawlAPI catalog for browsing {getPageTitle().toLowerCase()} with
          search, filters, favorites, and compare. Not a live event clock or
          player-tag lookup.
        </CatalogLead>
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
          setSearchName={setSearchName}
          setSearchType={setSearchType}
          setFilters={setFilters}
          setSortBy={setSortBy}
          setViewMode={setViewMode}
          setShowFavorites={setShowFavorites}
          setAdvancedOpen={setAdvancedOpen}
          onRandomPick={handleRandomPick}
        />

        {selectedCompareItems.length > 0 && (
          <ComparePanel aria-label="Brawler comparison">
            <h2>Compare Brawlers</h2>
            <CompareGrid>
              {selectedCompareItems.map((item) => (
                <CompareCard key={item.id}>
                  <ComparePortrait item={item} />
                  <h3>{item.name}</h3>
                  <p>{item.className || "Unknown class"}</p>
                  <StatMeterList>
                    <StatMeterRow>
                      <span>Health {item.stats?.hitpoints ?? "-"}</span>
                      <StatBar
                        $value={statPercent(
                          item.stats?.hitpoints,
                          STAT_MAX.hitpoints
                        )}
                        $color="#68FD58"
                      />
                    </StatMeterRow>
                    <StatMeterRow>
                      <span>Speed {item.stats?.speed ?? "-"}</span>
                      <StatBar
                        $value={statPercent(item.stats?.speed, STAT_MAX.speed)}
                        $color="#5EFFFF"
                      />
                    </StatMeterRow>
                    <StatMeterRow>
                      <span>Attack {item.stats?.attackDamage ?? "-"}</span>
                      <StatBar
                        $value={statPercent(
                          item.stats?.attackDamage,
                          STAT_MAX.attackDamage
                        )}
                        $color="#F01919"
                      />
                    </StatMeterRow>
                  </StatMeterList>
                </CompareCard>
              ))}
            </CompareGrid>
            <ButtonCard $static onClick={() => setSelectedCompareIds([])}>
              Clear Compare
            </ButtonCard>
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
            onToggleCompare={handleToggleCompare}
          />
        )}
      </HomeMainDiv>
    </>
  );
};

export default Home;
