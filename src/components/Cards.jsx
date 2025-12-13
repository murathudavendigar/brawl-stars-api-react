import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";
import LazyImage from "./common/LazyImage";

const ITEMS_PER_PAGE = 20;

const Cards = ({ info, searchName, searchType }) => {
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

  return (
    <>
      {searchType === "brawlers" && (
        <CardMain wrap="wrap" style={{ overflowY: "hidden" }}>
          {filteredItems.map((item, index) => (
            <CardsInfo
              key={item.id || index}
              justify="baseline"
              style={{ backgroundColor: `${item?.bgColor}` }}>
              <h2>{item.name}</h2>
              <LazyImage
                src={item.imageUrl}
                alt={`${item.name} brawler`}
                width="150px"
                height="150px"
                style={{ marginBottom: "1rem" }}
              />
              <p>{item.description}</p>
              <ButtonCard onClick={() => navigate("detail", { state: item })}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
        </CardMain>
      )}

      {searchType === "gamemodes" && (
        <CardMain wrap="wrap" style={{ overflowY: "scroll" }}>
          {filteredItems.map((item, index) => (
            <CardsInfo
              key={item.id || index}
              justify="baseline"
              style={{ backgroundColor: `${item?.bgColor}` }}>
              <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                {item.name}
              </h2>
              <LazyImage
                src={item.imageUrl}
                alt={`${item.name} game mode`}
                width="90px"
                height="90px"
                style={{ marginBottom: "1rem" }}
              />
              <p>{item.description}</p>
            </CardsInfo>
          ))}
        </CardMain>
      )}

      {searchType === "maps" && (
        <CardMain wrap="wrap">
          {visibleMaps.map((item, index) => (
            <CardsInfo
              key={item.id || index}
              justify="baseline"
              style={{
                backgroundColor: `${item?.gameMode?.color}`,
                gap: "0.75rem",
              }}>
              <h2 style={{ textAlign: "center" }}>{item?.name}</h2>
              <LazyImage
                src={item?.gameMode?.imageUrl}
                alt={`${item?.gameMode?.name} icon`}
                width="50px"
                height="50px"
              />
              <p style={{ textAlign: "center" }}>-{item?.gameMode?.name}-</p>
              <LazyImage
                src={item?.imageUrl}
                alt={`${item?.name} map`}
                width="150px"
                height="150px"
              />
              <p>{item?.description}</p>
              <ButtonCard
                onClick={() =>
                  window.open(item?.link, "_blank", "noopener,noreferrer")
                }>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
          {hasMore && (
            <ButtonCard
              onClick={loadMore}
              style={{ margin: "1rem auto", position: "static" }}>
              Load More Maps
            </ButtonCard>
          )}
        </CardMain>
      )}
    </>
  );
};

export default Cards;
