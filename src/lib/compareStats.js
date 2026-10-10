import { formatReload, STAT_MAX, statPercent } from "./gameData";

export const COMPARE_METRICS = [
  {
    key: "hitpoints",
    label: "Health",
    color: "#68FD58",
    max: STAT_MAX.hitpoints,
    getValue: (item) => item.stats?.hitpoints,
    format: (value) => value ?? "-",
    higherWins: true,
  },
  {
    key: "speed",
    label: "Speed",
    color: "#5EFFFF",
    max: STAT_MAX.speed,
    getValue: (item) => item.stats?.speed,
    format: (value) => value ?? "-",
    higherWins: true,
  },
  {
    key: "attackDamage",
    label: "Attack",
    color: "#F01919",
    max: STAT_MAX.attackDamage,
    getValue: (item) => item.stats?.attackDamage,
    format: (value) => value ?? "-",
    higherWins: true,
  },
  {
    key: "attackRange",
    label: "Range",
    color: "#FFB921",
    max: STAT_MAX.attackRange,
    getValue: (item) => item.stats?.attackRange,
    format: (value) => value ?? "-",
    higherWins: true,
  },
  {
    key: "reloadMs",
    label: "Reload",
    color: "#d850ff",
    max: STAT_MAX.reloadMs,
    getValue: (item) => item.stats?.reloadMs,
    format: (value) => formatReload(value),
    higherWins: false,
    barValue: (value) =>
      value == null
        ? 0
        : statPercent(
            STAT_MAX.reloadMs - Math.min(value, STAT_MAX.reloadMs),
            STAT_MAX.reloadMs
          ),
  },
  {
    key: "superDamage",
    label: "Super",
    color: "#FFE35B",
    max: STAT_MAX.superDamage,
    getValue: (item) => item.stats?.superDamage,
    format: (value) => (value != null && value > 0 ? value : "-"),
    higherWins: true,
    hideIfEmpty: true,
  },
];

export const metricBarPercent = (metric, value) => {
  if (metric.barValue) return metric.barValue(value);
  return statPercent(value, metric.max);
};

export const pickWinners = (items, metrics = COMPARE_METRICS) => {
  const winners = {};
  if (!items?.length) return winners;

  metrics.forEach((metric) => {
    const values = items.map((item) => ({
      id: item.id,
      value: metric.getValue(item),
    }));
    const numeric = values.filter(
      (entry) => entry.value != null && !Number.isNaN(Number(entry.value))
    );
    if (numeric.length < 2) return;

    const ranked = [...numeric].sort((a, b) =>
      metric.higherWins
        ? Number(b.value) - Number(a.value)
        : Number(a.value) - Number(b.value)
    );
    const best = ranked[0].value;
    const tied = ranked.filter(
      (entry) => Number(entry.value) === Number(best)
    );
    if (tied.length === numeric.length) return;
    winners[metric.key] = new Set(tied.map((entry) => entry.id));
  });

  return winners;
};

export const sortSkins = (skins = []) =>
  [...skins].sort((a, b) => {
    const costA =
      (a.priceGems || 0) * 1000 +
      (a.priceCoins || 0) +
      (a.priceBling || 0);
    const costB =
      (b.priceGems || 0) * 1000 +
      (b.priceCoins || 0) +
      (b.priceBling || 0);
    if (costA !== costB) return costA - costB;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
