import { useEffect } from "react";

const corrections = [
  {
    image: "geschaeftsfahrten.webp",
    target: "/book",
  },
  {
    image: "kurierdokumente.webp",
    target: "/kurierdienst-essen",
  },
  {
    image: "hauszuhaus.webp",
    target: "/book",
  },
] as const;

function correctedTarget(anchor: HTMLAnchorElement): string | null {
  const card = anchor.parentElement;
  const imageSrc = card?.querySelector<HTMLImageElement>("img")?.getAttribute("src") ?? "";
  const match = corrections.find(({ image }) => imageSrc.includes(image));
  return match?.target ?? null;
}

export function ServiceLinkCorrections() {
  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const updateLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((anchor) => {
        const target = correctedTarget(anchor);
        if (target) anchor.setAttribute("href", target);
      });
    };

    const handleClick = (event: MouseEvent) => {
      const clicked = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a")
        : null;
      if (!clicked) return;

      const target = correctedTarget(clicked);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(target);
    };

    updateLinks();
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
