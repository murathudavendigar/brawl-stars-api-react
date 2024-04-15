import React, { useState } from "react";

const BrawlerTable = ({ brawlers }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBrawlers = [...brawlers].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const renderArrow = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const tableHeaderStyle = {
    padding: "12px 25px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    position: "relative",
  };

  const arrowStyle = {
    position: "absolute",
    top: "20px",
    right: "5px",
    transform: "translateY(-50%)",
  };

  return (
    <table style={tableStyle}>
      <thead style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
        <tr>
          <th style={tableHeaderStyle} onClick={() => requestSort("name")}>
            BRAWLER
            <span
              style={{
                ...arrowStyle,
                color: sortConfig.key === "name" ? "black" : "gray",
              }}>
              {renderArrow("name")}
            </span>
          </th>
          <th style={tableHeaderStyle} onClick={() => requestSort("power")}>
            POWER
            <span
              style={{
                ...arrowStyle,
                color: sortConfig.key === "power" ? "black" : "gray",
              }}>
              {renderArrow("power")}
            </span>
          </th>
          <th style={tableHeaderStyle} onClick={() => requestSort("rank")}>
            TIER
            <span
              style={{
                ...arrowStyle,
                color: sortConfig.key === "rank" ? "black" : "gray",
              }}>
              {renderArrow("rank")}
            </span>
          </th>
          <th style={tableHeaderStyle} onClick={() => requestSort("trophies")}>
            TROPHIES
            <span
              style={{
                ...arrowStyle,
                color: sortConfig.key === "trophies" ? "black" : "gray",
              }}>
              {renderArrow("trophies")}
            </span>
          </th>
          <th
            style={tableHeaderStyle}
            onClick={() => requestSort("highestTrophies")}>
            HIGHEST TROPHIES
            <span
              style={{
                ...arrowStyle,
                color: sortConfig.key === "highestTrophies" ? "black" : "gray",
              }}>
              {renderArrow("highestTrophies")}
            </span>
          </th>
          <th style={tableHeaderStyle}>GEARS</th>
          <th style={tableHeaderStyle}>STAR POWERS</th>
          <th style={tableHeaderStyle}>GADGETS</th>
        </tr>
      </thead>
      <tbody>
        {sortedBrawlers.map((brawler, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
              textAlign: "center",
            }}>
            <td
              style={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                paddingLeft: "1rem",
                gap: "0.6rem",
              }}>
              <img
                width={"50px"}
                src={`https://cdn.brawlstats.com/character-arts/${brawler.id}.png`}
                alt=""
              />
              {brawler.name}
            </td>
            <td style={{ padding: "12px" }}>{brawler.power}</td>
            <td style={{ padding: "12px" }}>
              <img
                src={`https://cdn-old.brawlify.com/rank/${brawler.rank}.png`}
                width={"30px"}
                alt=""
              />
            </td>
            <td style={{ padding: "12px" }}>{brawler.trophies}</td>
            <td style={{ padding: "12px" }}>{brawler.highestTrophies}</td>
            <td style={{ padding: "12px" }}>Test</td>
            <td style={{ padding: "12px" }}>Test</td>
            <td style={{ padding: "12px" }}>Test</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BrawlerTable;
