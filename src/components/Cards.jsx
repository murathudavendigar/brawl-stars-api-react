import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardsInfo, {
  ButtonCard,
  CardActionRow,
  CardText,
  CardTitle,
  CardMain,
  EmptyState,
  IconActionButton,
} from "../styles/Card.styled";
import { ClassBadge } from "../styles/Detail.styled";
import LazyImage from "./common/LazyImage";

const ITEMS_PER_PAGE = 20;

const SpacedLazyImage = styled(LazyImage)`
  margin-bottom: 1rem;
`;

const ClickableCard = styled(CardsInfo)`
  cursor: pointer;
`;

const Cards = ({
  info,
  searchName,
  searchType,
  viewMode = "grid",
  isFavorite = () => false,
  toggleFavorite = () => {},
  selectedCompareIds = [],
  onToggleCompare = () => {},
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();

  // Reset visible count when searchType changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchType, info]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!info) return [];
    return info.filter((x) =>
      x?.name?.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [info, searchName]);

  // Get visible items for maps (paginated)
  const visibleMaps = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Load more handler
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const hasMore = visibleCount < filteredItems.length;
  const isCompact = viewMode === "compact";

  if (!filteredItems.length) {
    return (
      <EmptyState role="status">
        <h3>No results found</h3>
        <p>Try another name or switch the content type.</p>
      </EmptyState>
    );
  }

  return (
    <>
      {searchType === "brawlers" && (
        <CardMain wrap="wrap" $overflowY="hidden">
          {filteredItems.map((item, index) => (
            <CardsInfo
              key={item.id || index}
              justify="baseline"
              $background={item?.bgColor || item?.rarity?.color}
              $compact={isCompact}>
              <CardActionRow>
                <IconActionButton
                  type="button"
                  aria-label={
                    isFavorite(searchType, item.id)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                  $active={isFavorite(searchType, item.id)}
                  onClick={() => toggleFavorite(searchType, item.id)}>
                  ★
                </IconActionButton>
                <IconActionButton
                  type="button"
                  aria-label={`Compare ${item.name}`}
                  $active={selectedCompareIds.includes(item.id)}
                  onClick={() => onToggleCompare(item)}>
                  ⇄
                </IconActionButton>
              </CardActionRow>
              <h2>{item.name}</h2>
              {item.className && (
                <ClassBadge $color={item?.rarity?.color}>
                  {item.className}
                </ClassBadge>
              )}
              <SpacedLazyImage
                src={item.imageUrl}
                fallbackSrc={[item.imageUrl2, item.iconUrl]}
                alt={`${item.name} brawler`}
                width="150px"
                height="150px"
                missingLabel="NEW"
              />
              <p>{item.description}</p>
              {!item.released && (
                <CardText $spaced>Unreleased</CardText>
              )}
              <ButtonCard
                onClick={() => navigate(`/brawlers/${item.id}`, { state: item })}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
        </CardMain>
      )}

      {searchType === "gamemodes" && (
        <CardMain wrap="wrap" $overflowY="auto">
          {filteredItems.map((item, index) => (
            <ClickableCard
              key={item.id || index}
              justify="baseline"
              $background={item?.bgColor}
              $compact={isCompact}
              onClick={() =>
                navigate(`/gamemodes/${item.id}`, { state: item })
              }>
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
                  ★
                </IconActionButton>
              </CardActionRow>
              <CardTitle $compact>{item.name}</CardTitle>
              <SpacedLazyImage
                src={item.imageUrl}
                fallbackSrc={item.imageUrl2}
                alt={`${item.name} game mode`}
                width="90px"
                height="90px"
              />
              <p>{item.description}</p>
              <ButtonCard
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/gamemodes/${item.id}`, { state: item });
                }}>
                View Details
              </ButtonCard>
            </ClickableCard>
          ))}
        </CardMain>
      )}

      {searchType === "maps" && (
        <CardMain wrap="wrap">
          {visibleMaps.map((item, index) => (
            <CardsInfo
              key={item.id || index}
              justify="baseline"
              $background={item?.gameMode?.color}
              $gap="0.75rem"
              $compact={isCompact}>
              <CardActionRow>
                <IconActionButton
                  type="button"
                  aria-label={
                    isFavorite(searchType, item.id)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                  $active={isFavorite(searchType, item.id)}
                  onClick={() => toggleFavorite(searchType, item.id)}>
                  ★
                </IconActionButton>
              </CardActionRow>
              <CardTitle>{item?.name}</CardTitle>
              <LazyImage
                src={item?.gameMode?.imageUrl}
                alt={`${item?.gameMode?.name} icon`}
                width="50px"
                height="50px"
              />
              <CardText>-{item?.gameMode?.name}-</CardText>
              <LazyImage
                src={item?.imageUrl}
                alt={`${item?.name} map`}
                width="150px"
                height="150px"
              />
              {item?.description && <p>{item.description}</p>}
              <ButtonCard
                onClick={() => navigate(`/maps/${item.id}`, { state: item })}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
          {hasMore && (
            <ButtonCard
              onClick={loadMore}
              $static>
              Load More Maps
            </ButtonCard>
          )}
        </CardMain>
      )}
    </>
  );
};

export default Cards;
