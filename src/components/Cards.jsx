import { Navigate, useNavigate } from "react-router-dom";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";

const Cards = ({ info, searchName, searchType }) => {
  const navigate = useNavigate();
  console.log(searchType);

  return (
    <>
      {(searchType === "brawlers" || searchType === "gamemodes") && (
        <CardMain wrap="wrap">
          {info
            ?.filter((x) =>
              x?.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((item, index) => {
              return (
                <CardsInfo key={index} justify="baseline">
                  <h2>{item.name}</h2>
                  <img src={item.imageUrl} alt="" width="150px" />
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
          {info?.map((item, index) => {
            return (
              <CardsInfo key={index} justify="baseline">
                <h2>{item?.name}</h2>
                <img src={item?.imageUrl} alt="" width="150px" />
                <p>{item?.description}</p>

                <ButtonCard onClick={(window.location.href = `item?.link`)}>
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
