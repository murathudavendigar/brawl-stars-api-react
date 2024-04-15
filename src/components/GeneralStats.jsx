import React from "react";

const GeneralStats = ({ data }) => {
  return (
    <div>
      <table
        style={{
          textAlign: "center",
          border: "1px solid black",
          padding: "1rem 0.5rem",
        }}>
        <tbody>
          <tr>
            <th colSpan="2">General Stats</th>
          </tr>

          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/trophy.png"
                alt="Trophies"
              />
              <span>Trophies</span>
            </th>
            <td>{data?.trophies}</td>
          </tr>

          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/Ranking.png"
                alt="Rank"
              />
              <span>Highest Trophies</span>
            </th>
            <td>{data?.highestTrophies}</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/Info.png"
                alt="Info"
              />
              <span>Level</span>
            </th>
            <td>{data?.expLevel}</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/Club.png"
                alt="Club"
              />
              <span>Club</span>
            </th>
            <td>{data?.club?.name}</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/league/League10.png"
                alt="League 10"
              />
              <span>Season Reset</span>
            </th>
            <td>38,822</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/Star-Points.png"
                alt="Star Points"
              />
              <span>Brawlers Reward</span>
            </th>
            <td>860</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-fankit.brawlify.com/bs-account.png"
                alt="XP Points"
              />
              <span>Brawler Progress</span>
            </th>
            <td>51%</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/icon/PowerPoint.png"
                alt="Power Point"
              />
              <span>Points to MAX</span>
            </th>
            <td>143,650</td>
          </tr>
          <tr>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                padding: "0 1rem",
              }}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-old.brawlify.com/currency/Coins.png"
                alt="Coins"
              />
              <span>Coins to MAX</span>
            </th>
            <td>288,625</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralStats;
