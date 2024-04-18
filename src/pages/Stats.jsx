import axios from "axios";
import React, { useState } from "react";
import config from "../lib/config";
import PersonalRecords from "../components/PersonalRecords";
import GeneralStats from "../components/GeneralStats";
import BrawlerTable from "../components/BrawlerTable";

const Stats = () => {
  const [playerTag, setPlayerTag] = useState("Q0UVU80RR");
  const [playerInfo, setPlayerInfo] = useState([]);
  const baseURL = `https://api.brawlstars.com/v1`;
  const playerURL = `${baseURL}/players/%23${playerTag}`;
  const iconURL = "https://cdn-old.brawlify.com/profile";
  // const brawlerURL = `${baseURL}/brawlers`;
  const TOKEN = config.TOKEN;
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
    "Cache-Control": "max-age=600", // cache-control başlığını ekleyin
    "Content-Type": "application/json; charset=utf-8",
  };
  const getPlayerInfo = async () => {
    try {
      const { data } = await axios.get(playerURL, {
        headers,
      });
      setPlayerInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const convertColor = (nameColor) => {
    const hex = nameColor.replace(/^0x/, "");
    return `#${hex.slice(2)}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {playerInfo.length > 1 ? (
        <div
          style={{
            backgroundColor: "rgba(200,200,200,0.2)",
            padding: "2rem 0",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}>
            <img
              style={{ width: "50px" }}
              src={`${iconURL}/${playerInfo?.icon?.id}.png`}
              alt=""
            />
            <h1 style={{ color: `${convertColor(playerInfo?.nameColor)}` }}>
              {playerInfo?.name}
            </h1>
          </div>
          <h4 style={{ textAlign: "center" }}>{playerInfo?.club?.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              padding: "1rem",
            }}>
            <GeneralStats data={playerInfo} />
            <PersonalRecords data={playerInfo} />
          </div>
          <BrawlerTable brawlers={playerInfo?.brawlers} />
        </div>
      ) : (
        <div>
          <h1>Player Stats</h1>
          <label>
            Player ID: {"#"}
            <input type="text" onChange={(e) => setPlayerTag(e.target.value)} />
          </label>
          <button onClick={getPlayerInfo}>Stats</button>
        </div>
      )}
    </div>
  );
};

export default Stats;
