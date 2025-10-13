import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait for page to render fully
    const scrollToTop = () => {
      // Try the main app containers first
      const scrollTargets = [
        document.documentElement, // For most browsers
        document.body,            // Safari fallback
        document.querySelector(".main-content"), // Custom scroll wrapper if used
        document.querySelector("#root")          // React root element
      ];

      for (const target of scrollTargets) {
        if (target && typeof target.scrollTo === "function") {
          target.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    };

    // Delay ensures the new page has rendered
    const timeout = setTimeout(scrollToTop, 200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
