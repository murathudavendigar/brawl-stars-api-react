import { useCallback, useEffect, useMemo, useState } from "react";
import { FaExchangeAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CLASS_COLORS } from "../lib/gameData";
import CardsInfo, {
  ButtonCard,
  CardActionRow,
  CardBadgeSlot,
  CardBody,
  CardHeaderBlock,
  CardMain,
  CardStatusRow,
  CardText,
  CardTitle,
  EmptyState,
  IconActionButton,
} from "../styles/Card.styled";
import { ClassBadge } from "../styles/Detail.styled";
import StatusBadge from "./common/StatusBadge";
import LazyImage from "./common/LazyImage";

const ITEMS_PER_PAGE = 20;

const detailPath = (searchType, id) => {
  if (searchType === "brawlers") return `/brawlers/${id}`;
  if (searchType === "maps") return `/maps/${id}`;
  return `/gamemodes/${id}`;
};

const Cards = ({
  info,
  searchName = "",
  searchType,
  viewMode = "grid",
  isFavorite = () => false,
  toggleFavorite = () => {},
  selectedCompareIds = [],
  onToggleCompare = () => {},
  onResetFilters,
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchType, info, searchName]);

  const filteredItems = useMemo(() => {
    if (!info) return [];
    const query = searchName.trim().toLowerCase();
    if (!query) return info;
    return info.filter((item) => item?.name?.toLowerCase().includes(query));
  }, [info, searchName]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const hasMore = visibleCount < filteredItems.length;
  const isCompact = viewMode === "compact";

  if (!filteredItems.length) {
    return (
      <EmptyState role="status">
        <h3>No results found</h3>
        <p>Try another name, clear filters, or switch the content type.</p>
        {onResetFilters && (
          <ButtonCard type="button" $static onClick={onResetFilters}>
            Reset Filters
          </ButtonCard>
        )}
      </EmptyState>
    );
  }

  const openDetail = (item) => {
    navigate(detailPath(searchType, item.id), { state: item });
  };

  const renderCard = (item, index) => {
    const background =
      item?.bgColor || item?.rarity?.color || item?.gameMode?.color;
    const classColor =
      CLASS_COLORS[item?.className] ||
      item?.rarity?.color ||
      "var(--color-primary)";
    const imageSize = isCompact ? "96px" : "112px";
    const modeImageSize = isCompact ? "64px" : "80px";

    return (
      <CardsInfo
        key={item.id || index}
        $background={background}
        $compact={isCompact}
        role="link"
        tabIndex={0}
        onClick={() => openDetail(item)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDetail(item);
          }
        }}>
        <CardActionRow>
          <IconActionButton
            type="button"
            aria-label={
              isFavorite(searchType, item.id)
                ? `Remove ${item.name} from favorites`
                : `Add ${item.name} to favorites`
            }
            $active={isFavorite(searchType, item.id)}
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(searchType, item.id);
            }}>
            <FaStar aria-hidden="true" />
          </IconActionButton>
          {searchType === "brawlers" && (
            <IconActionButton
              type="button"
              aria-label={`Compare ${item.name}`}
              $active={selectedCompareIds.includes(item.id)}
              onClick={(event) => {
                event.stopPropagation();
                onToggleCompare(item);
              }}>
              <FaExchangeAlt aria-hidden="true" />
            </IconActionButton>
          )}
        </CardActionRow>

        <CardHeaderBlock>
          <CardTitle $compact={isCompact}>{item.name}</CardTitle>
          <CardBadgeSlot>
            {searchType === "brawlers" && item.className ? (
              <ClassBadge $color={classColor}>{item.className}</ClassBadge>
            ) : searchType === "maps" && item?.gameMode?.name ? (
              <CardText>{item.gameMode.name}</CardText>
            ) : null}
          </CardBadgeSlot>
        </CardHeaderBlock>

        <CardBody>
          <LazyImage
            src={
              searchType === "maps"
                ? item.imageUrl
                : item.imageUrl || item.imageUrl2
            }
            fallbackSrc={item.imageUrl2}
            alt={`${item.name} ${
              searchType === "brawlers"
                ? "brawler"
                : searchType === "maps"
                  ? "map"
                  : "game mode"
            }`}
            width={searchType === "gamemodes" ? modeImageSize : imageSize}
            height={searchType === "gamemodes" ? modeImageSize : imageSize}
            missingLabel={searchType === "brawlers" ? "NEW" : undefined}
          />

          <p>{item.description || "\u00A0"}</p>

          <CardStatusRow>
            {searchType === "brawlers" && !item.released && (
              <StatusBadge kind="unreleased">Unreleased</StatusBadge>
            )}
            {searchType === "maps" && (
              <StatusBadge kind={item.disabled ? "retired" : "available"}>
                {item.disabled ? "Retired" : "Available"}
              </StatusBadge>
            )}
          </CardStatusRow>

          <ButtonCard
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openDetail(item);
            }}>
            View Details
          </ButtonCard>
        </CardBody>
      </CardsInfo>
    );
  };

  return (
    <>
      <CardMain $compact={isCompact} $overflowY="visible">
        {visibleItems.map(renderCard)}
      </CardMain>
      {hasMore && (
        <ButtonCard type="button" onClick={loadMore} $static>
          Load More
        </ButtonCard>
      )}
    </>
  );
};

export default Cards;
