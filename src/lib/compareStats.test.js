import { pickWinners, sortSkins } from "./compareStats";

describe("compareStats", () => {
  it("marks higher HP as winner", () => {
    const winners = pickWinners([
      { id: 1, stats: { hitpoints: 5000, speed: 700 } },
      { id: 2, stats: { hitpoints: 8000, speed: 700 } },
    ]);
    expect(winners.hitpoints.has(2)).toBe(true);
    expect(winners.speed).toBeUndefined();
  });

  it("marks faster reload as winner", () => {
    const winners = pickWinners([
      { id: 1, stats: { reloadMs: 2000 } },
      { id: 2, stats: { reloadMs: 900 } },
    ]);
    expect(winners.reloadMs.has(2)).toBe(true);
  });

  it("sorts skins free first then by cost", () => {
    const sorted = sortSkins([
      { name: "Gold", priceGems: 149 },
      { name: "Default" },
      { name: "Coin", priceCoins: 5000 },
    ]);
    expect(sorted.map((skin) => skin.name)).toEqual([
      "Default",
      "Coin",
      "Gold",
    ]);
  });
});
