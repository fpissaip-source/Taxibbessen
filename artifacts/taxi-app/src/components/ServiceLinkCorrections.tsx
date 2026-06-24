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
    if (!link) return;

    link.href = entry[1];
    link.dataset.correctedServiceHref = entry[1];
  });
}

document.addEventListener(
  "click",
  (event) => {
    const target = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[data-corrected-service-href]")
      : null;
    const destination = target?.dataset.correctedServiceHref;
    if (!destination) return;

    event.preventDefault();
    event.stopPropagation();
    window.location.href = destination;
  },
  true,
);

const observer = new MutationObserver(correctServiceLinks);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", correctServiceLinks, { once: true });

export {};
