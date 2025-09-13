import { useEffect } from "react";

export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const observeAll = (root = document) => {
      const nodes = root.querySelectorAll("[data-reveal]:not(.is-revealed)");
      nodes.forEach((el) => io.observe(el));
    };

    observeAll();

    // Watch DOM for dynamically added nodes (e.g., tab switches)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches?.("[data-reveal]:not(.is-revealed)")) io.observe(n);
          if (n.querySelectorAll) observeAll(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [enabled]);
}

export default useScrollReveal;
