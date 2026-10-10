const DEFAULT_TTL_MS = 5 * 60 * 1000;

const memoryCache = new Map();
const inflight = new Map();

export const getCached = (key) => {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
};

export const setCached = (key, data, ttlMs = DEFAULT_TTL_MS) => {
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
    storedAt: Date.now(),
  });
};

export const getStale = (key) => {
  const entry = memoryCache.get(key);
  return entry ? entry.data : null;
};

export const clearCache = (key) => {
  if (key) {
    memoryCache.delete(key);
    inflight.delete(key);
    return;
  }
  memoryCache.clear();
  inflight.clear();
};

export const fetchWithCache = async (url, axiosFn, options = {}) => {
  const { ttlMs = DEFAULT_TTL_MS, force = false, signal } = options;
  const cacheKey = url;

  if (!force) {
    const cached = getCached(cacheKey);
    if (cached != null) return { data: cached, fromCache: true };
  }

  if (inflight.has(cacheKey)) {
    return inflight.get(cacheKey);
  }

  const request = axiosFn(url, { signal })
    .then((response) => {
      setCached(cacheKey, response.data, ttlMs);
      return { data: response.data, fromCache: false };
    })
    .finally(() => {
      inflight.delete(cacheKey);
    });

  inflight.set(cacheKey, request);
  return request;
};

const fetchCache = {
  getCached,
  setCached,
  getStale,
  clearCache,
  fetchWithCache,
};

export default fetchCache;
