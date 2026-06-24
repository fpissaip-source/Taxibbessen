const corrections = new Map([
  ["geschaeftsfahrten.webp", "/book"],
  ["kurierdokumente.webp", "/kurierdienst-essen"],
  ["hauszuhaus.webp", "/book"],
]);

function correctServiceLinks() {
  if (window.location.pathname !== "/") return;

  document.querySelectorAll<HTMLImageElement>("#leistungen img").forEach((image) => {
    const source = image.getAttribute("src") ?? "";
    const entry = [...corrections.entries()].find(([name]) => source.includes(name));
    if (!entry) return;

    const card = image.parentElement?.parentElement?.parentElement;
    const link = card?.querySelector<HTMLAnchorElement>("a");
    if (link) link.setAttribute("href", entry[1]);
  });
}

const observer = new MutationObserver(correctServiceLinks);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", correctServiceLinks, { once: true });

export {};
