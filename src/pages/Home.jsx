import { HomeMainDiv } from "../styles/Home.styled";
import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [searchName, setSearchName] = useState("");

  const url = "https://api.brawlapi.com/v1/brawlers";

  const getData = async () => {
    const { data } = await axios(url);
    setInfo(data?.list);
  };

  console.log(searchName);

  useEffect(() => {
    getData();
  }, []);

  return (
    <HomeMainDiv>
      <Header setSearchName={setSearchName} />
      <Cards info={info} searchName={searchName} />
    </HomeMainDiv>
  );
};

export default Home;
