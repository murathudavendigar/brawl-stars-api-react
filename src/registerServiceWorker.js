const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== "production") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {
      // Service workers are progressive enhancement; the app still works without one.
    });
  });
};

export default registerServiceWorker;
