import {
  buildCatalog,
  enrichBrawler,
  formatReload,
  getClassLabel,
  statPercent,
} from "./gameData";

const fixtureCatalog = () =>
  buildCatalog({
    characters: {
      ShotgunGirl: {
        id: 16000000,
        Name: "ShotgunGirl",
        Type: "Hero",
        Hitpoints: 3900,
        Speed: 800,
        WeaponSkill: "ShotgunGirlWeapon",
        UltimateSkill: "ShotgunGirlUlti",
        ClassArchetype: "damage_dealer",
        DefaultSkin: "BanditGirlDefault",
        Disabled: false,
      },
      BossBot: {
        id: 99,
        Name: "BossBot",
        Type: "Npc_Boss",
        Hitpoints: 99999,
        Speed: 100,
        WeaponSkill: "BossWeapon",
        ClassArchetype: "tank",
      },
    },
    skills: {
      ShotgunGirlWeapon: {
        Name: "ShotgunGirlWeapon",
        Damage: 300,
        CastingRange: 23,
        RechargeTime: 1500,
        MaxCharge: 3,
        Spread: 60,
        Cooldown: 250,
      },
      ShotgunGirlUlti: {
        Name: "ShotgunGirlUlti",
        Damage: 320,
        CastingRange: 23,
      },
    },
    classArchetypes: {
      damage_dealer: { Name: "damage_dealer" },
    },
    skins: {
      BanditGirlDefault: {
        id: 29000000,
        Name: "BanditGirlDefault",
        Conf: "BanditGirlDefault",
        Rarity: null,
        PriceGems: 0,
      },
      ShotgunGirlWitch: {
        id: 29000122,
        Name: "ShotgunGirlWitch",
        Conf: "ShotgunGirlWitch",
        Rarity: "EPIC",
        PriceGems: 149,
      },
      ShotgunGirlBuddyDefault: {
        id: 29000999,
        Name: "ShotgunGirlBuddyDefault",
        Conf: "ShotgunGirlBuddyDefault",
        Rarity: null,
        PriceGems: 0,
      },
      ShotgunGirlGadget: {
        id: 29000998,
        Name: "ShotgunGirlGadget",
        Conf: "ShotgunGirlGadget",
        Rarity: null,
        PriceGems: 0,
      },
    },
    gears: {
      ForestSpeed: {
        id: 62000000,
        Name: "ForestSpeed",
        ExtraHerosAvailableTo: null,
      },
      SuperHealth: {
        id: 62000007,
        Name: "SuperHealth",
        ExtraHerosAvailableTo: "ClusterBombDude",
      },
      SlowIncrease: {
        id: 62000010,
        Name: "SlowIncrease",
        ExtraHerosAvailableTo: "ShotgunGirl",
      },
    },
    icons: {
      player: {
        28000003: {
          id: 28000003,
          brawler: 16000000,
          imageUrl:
            "https://cdn.brawlify.com/profile-icons/regular/28000003.png",
          sortOrder: 101,
        },
      },
    },
  });

describe("class labels", () => {
  it("maps archetype keys to human labels", () => {
    expect(getClassLabel("tank")).toBe("Tank");
    expect(getClassLabel("assassin")).toBe("Assassin");
    expect(getClassLabel("support")).toBe("Support");
    expect(getClassLabel("controller")).toBe("Controller");
    expect(getClassLabel("damage_dealer")).toBe("Damage Dealer");
    expect(getClassLabel("marksman")).toBe("Marksman");
    expect(getClassLabel("artillery")).toBe("Artillery");
  });

  it("returns null for a missing archetype", () => {
    expect(getClassLabel(null)).toBeNull();
    expect(getClassLabel("")).toBeNull();
  });
});

describe("statPercent", () => {
  it("clamps a stat against its max", () => {
    expect(statPercent(6000, 12000)).toBe(50);
    expect(statPercent(0, 12000)).toBe(4);
    expect(statPercent(null, 12000)).toBe(0);
  });
});

describe("formatReload", () => {
  it("formats milliseconds as seconds", () => {
    expect(formatReload(1500)).toBe("1.5s");
    expect(formatReload(1000)).toBe("1s");
    expect(formatReload(null)).toBe("-");
  });
});

describe("enrichBrawler", () => {
  const catalog = fixtureCatalog();

  it("joins a v1 brawler to character stats by numeric id", () => {
    const enriched = enrichBrawler(
      {
        id: 16000000,
        name: "Shelly",
        imageUrl: "https://cdn.brawlify.com/brawlers/borders/16000000.png",
        class: { id: 1, name: "Counter Tanks And Assassins With Burst Damage." },
      },
      catalog
    );

    expect(enriched.className).toBe("Damage Dealer");
    expect(enriched.playstyle).toBe(
      "Counter Tanks And Assassins With Burst Damage."
    );
    expect(enriched.stats).toEqual({
      hitpoints: 3900,
      speed: 800,
      attackDamage: 300,
      attackRange: 23,
      ammo: 3,
      reloadMs: 1500,
      superDamage: 320,
    });
    expect(enriched.iconUrl).toBe(
      "https://cdn.brawlify.com/profile-icons/regular/28000003.png"
    );
    expect(enriched.imageUrlFallback).toBe(enriched.iconUrl);
  });

  it("indexes skins by character Name and DefaultSkin prefix", () => {
    const portrait = "https://cdn.brawlify.com/brawlers/borders/16000000.png";
    const enriched = enrichBrawler(
      { id: 16000000, name: "Shelly", imageUrl: portrait },
      catalog
    );
    const names = enriched.skins.map((skin) => skin.name);

    expect(names).toEqual(expect.arrayContaining(["Default", "Witch"]));
    expect(names).not.toContain("Buddy Default");
    expect(names).not.toContain("Gadget");
    expect(enriched.skins.find((skin) => skin.name === "Witch").rarity).toBe(
      "Epic"
    );
    expect(enriched.skins.find((skin) => skin.name === "Default").imageUrl).toBe(
      portrait
    );
    expect(enriched.skins.find((skin) => skin.name === "Witch").imageUrl).toBeNull();
  });

  it("includes generic gears plus hero-specific ones", () => {
    const enriched = enrichBrawler({ id: 16000000, name: "Shelly" }, catalog);
    const gearNames = enriched.gears.map((gear) => gear.name);

    expect(gearNames).toContain("Forest Speed");
    expect(gearNames).toContain("Slow Increase");
    expect(gearNames).not.toContain("Super Health");
  });

  it("skips non-hero character rows for class stats", () => {
    const enriched = enrichBrawler({ id: 99, name: "Boss" }, catalog);

    expect(enriched.className).toBeNull();
    expect(enriched.stats.hitpoints).toBeNull();
    expect(enriched.skins).toEqual([]);
  });

  it("keeps playstyle when the catalog is missing", () => {
    const enriched = enrichBrawler({
      id: 16000000,
      name: "Shelly",
      class: { name: "Burst damage." },
    });

    expect(enriched.playstyle).toBe("Burst damage.");
    expect(enriched.className).toBeNull();
  });
});
