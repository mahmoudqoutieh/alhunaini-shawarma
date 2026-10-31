import { lazy, Suspense, useEffect, useState } from "react";

// Phones and small tablets get a separate, lightweight layout (snap sections with
// autoplaying clips). The heavy scroll-scrub engine only loads on larger screens.
const MOBILE_QUERY = "(max-width: 900px), (pointer: coarse) and (max-width: 1280px)";

const DesktopSite = lazy(() => import("./DesktopSite"));
const MobileSite = lazy(() => import("./MobileSite"));

export function App() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setMobile(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return <Suspense fallback={null}>{mobile ? <MobileSite /> : <DesktopSite />}</Suspense>;
}
