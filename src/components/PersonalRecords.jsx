import React from "react";

const PersonalRecords = ({ data }) => {
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
            <th colSpan="2">Personal Records</th>
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
                src="https://cdn-old.brawlify.com/icon/Unlocked.png"
                alt="Unlocked Brawlers"
                style={{ width: "30px" }}
              />
              <span>Unlocked Brawlers</span>
            </th>
            <td>78 / 78</td>
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
                src="https://cdn-old.brawlify.com/icon/3v3.png"
                alt="3v3 Wins"
                style={{ width: "30px" }}
              />
              <span>3 vs 3 Victories</span>
            </th>
            <td>{data?.["3vs3Victories"]}</td>
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
                src="https://cdn-old.brawlify.com/gamemode/Showdown.png"
                alt="Solo Showdown"
                style={{ width: "30px" }}
              />
              <span>Solo Victories</span>
            </th>
            <td>{data?.soloVictories}</td>
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
                src="https://cdn-old.brawlify.com/gamemode/Duo-Showdown.png"
                alt="Duo Showdown"
                style={{ width: "30px" }}
              />
              <span>Duo Victories</span>
            </th>
            <td>{data?.duoVictories}</td>
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
                src="https://cdn-old.brawlify.com/gamemode/Robo-Rumble.png"
                alt="Robo Rumble"
                style={{ width: "30px" }}
              />
              <span>Robo Rumble</span>
            </th>
            <td>Insane II</td>
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
                src="https://cdn-old.brawlify.com/gamemode/Big-Game.png"
                alt="Big Brawler"
                style={{ width: "30px" }}
              />
              <span>Big Game</span>
            </th>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonalRecords;
