import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";

const Cards = ({ info, searchName, searchType }) => {
  const [first, setFirst] = useState();
  const [mapInfo, setMapInfo] = useState(info?.slice(0, 50));
  const navigate = useNavigate();

  useEffect(() => {
    setFirst(0);
  }, []);

  useEffect(() => {
    setMapInfo(mapInfo?.concat(info?.slice(first, first + 10)));
    setTimeout(() => {
      setFirst(first + 10);
    }, 5000);
  }, [first]);

  return (
    <>
      {searchType === "brawlers" && (
        <CardMain wrap="wrap" style={{ overflowY: "hidden" }}>
          {info
            ?.filter((x) =>
              x?.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((item, index) => {
              return (
                <CardsInfo
                  key={index}
                  justify="baseline"
                  style={{ backgroundColor: `${item?.bgColor}` }}>
                  <h2>{item.name}</h2>
                  <img
                    src={item.imageUrl}
                    alt=""
                    width="150px"
                    style={{ marginBottom: "1rem" }}
                  />
                  <p>{item.description}</p>
                  {searchType === "brawlers" && (
                    <ButtonCard
                      onClick={() => navigate("detail", { state: item })}>
                      View Details
                    </ButtonCard>
                  )}
                </CardsInfo>
              );
            })}
        </CardMain>
      )}

      {searchType === "gamemodes" && (
        <CardMain wrap="wrap" style={{ overflowY: "scroll" }}>
          {info
            ?.filter((x) =>
              x?.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((item, index) => {
              return (
                <CardsInfo
                  key={index}
                  justify="baseline"
                  style={{ backgroundColor: `${item?.bgColor}` }}>
                  <h2 style={{textAlign:'center' , marginBottom: '0.5rem'}}>{item.name}</h2>
                  <img
                    src={item.imageUrl}
                    alt=""
                    style={{ marginBottom: "1rem", width:'90px' }}
                  />
                  <p>{item.description}</p>
                  {searchType === "brawlers" && (
                    <ButtonCard
                      onClick={() => navigate("detail", { state: item })}>
                      View Details
                    </ButtonCard>
                  )}
                </CardsInfo>
              );
            })}
        </CardMain>
      )}

      {searchType === "maps" && (
        <CardMain wrap="wrap">
          {mapInfo
            ?.filter((x) =>
              x?.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((item, index) => {
              return (
                <CardsInfo
                  key={index}
                  justify="baseline"
                  style={{
                    backgroundColor: `${item?.gameMode?.color}`,
                    gap: "0.75rem",
                  }}>
                  <h2 style={{ textAlign: "center" }}>{item?.name}</h2>
                  <img src={item?.gameMode?.imageUrl} alt="" width="50px" />
                  <p style={{ textAlign: "center" }}>
                    -{item?.gameMode?.name}-
                  </p>
                  <img src={item?.imageUrl} alt="" width="150px" />
                  <p>{item?.description}</p>

                  <ButtonCard
                    onClick={() => (window.location.href = `${item?.link}`)}>
                    View Details
                  </ButtonCard>
                </CardsInfo>
              );
            })}
        </CardMain>
      )}
    </>
  );
};

export default Cards;
