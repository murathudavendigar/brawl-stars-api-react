import { HomeMainDiv } from "../styles/Home.styled";
import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("brawlers");

  const url = `https://api.brawlapi.com/v1/${searchType}`;

  const getData = async () => {
    const { data } = await axios(url);
    setInfo(data?.list);
  };

  useEffect(() => {
    getData();
  }, [searchType]);

  return (
    <HomeMainDiv>
      <Header setSearchName={setSearchName} setSearchType={setSearchType} />
      <Cards info={info} searchName={searchName} searchType={searchType} />
    </HomeMainDiv>
  );
};

export default Home;
