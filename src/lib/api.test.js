import {
  cleanGameText,
  compareMapsByRecency,
  getCatalogList,
  hasLiveEvents,
  mapsForGameMode,
  normalizeBrawler,
  normalizeMap,
  parseMapTimestamp,
  sanitizeColor,
} from "./api";

describe("api helpers", () => {
  it("strips in-game description tokens", () => {
    expect(
      cleanGameText(
        "Increases range by <!arcade.largerAreaUlti.rangePercent>%."
      )
    ).toBe("Increases range by extra%.");
  });

  it("repairs invalid hex colors from the API", () => {
    expect(sanitizeColor("#fff11ev")).toBe("#fff11e");
    expect(sanitizeColor("#fe5e72")).toBe("#fe5e72");
    expect(sanitizeColor(null, "#2186ff")).toBe("#2186ff");
  });

  it("reads catalog lists and live event envelopes", () => {
    expect(getCatalogList({ list: [{ id: 1 }] })).toHaveLength(1);
    expect(hasLiveEvents({ active: [], upcoming: [] })).toBe(false);
    expect(hasLiveEvents({ active: [{ id: 1 }], upcoming: [] })).toBe(true);
  });

  it("normalizes brawlers onto rarity-colored cards", () => {
    const brawler = normalizeBrawler({
      id: 1,
      name: "Shelly",
      description: "A ranger.",
      rarity: { id: 1, name: "Common", color: "#b9eaff" },
      gadgets: [],
      starPowers: [],
    });

    expect(brawler.bgColor).toBe("#b9eaff");
  });

  it("builds a map description from mode, theme, and status", () => {
    const map = normalizeMap({
      id: 15000000,
      name: "Temple Ruins",
      disabled: true,
      credit: null,
      environment: { name: "Default" },
      gameMode: { name: "Bounty", color: "#24d6ff", bgColor: "#00cfff" },
    });

    expect(map.description).toContain("Bounty map");
    expect(map.description).toContain("Currently retired from rotation");
  });

  it("treats empty lastActive as unknown and sorts newest ids next", () => {
    expect(parseMapTimestamp(0)).toBe(0);
    expect(parseMapTimestamp(1710000000)).toBe(1710000000 * 1000);

    const sorted = [
      { id: 10, lastActive: 0, name: "Old" },
      { id: 30, lastActive: 0, name: "New" },
      { id: 20, lastActive: 1710000000, name: "Seen" },
    ].sort(compareMapsByRecency);

    expect(sorted.map((map) => map.name)).toEqual(["Seen", "New", "Old"]);
  });

  it("filters maps for a game mode by id", () => {
    const maps = [
      { id: 1, gameMode: { id: 48000000, name: "Gem Grab" } },
      { id: 2, gameMode: { id: 48000003, name: "Bounty" } },
    ];

    expect(mapsForGameMode(maps, { id: 48000000, name: "Gem Grab" })).toHaveLength(
      1
    );
  });
});
