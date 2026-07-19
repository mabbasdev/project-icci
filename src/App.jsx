import React, { Suspense, lazy } from "react";
import HeroCarousel from './components/HeroCarousel'; // Imported statically for instant top-of-page rendering
import BackToTop from "./components/BackToTop";
import GridSkeleton from "./components/ui/GridSkeleton";
import Navbar from "./components/Navbar.jsx";

// Lazy load below-the-fold and asset-heavy components
const ServicesGrid = lazy(() => import("./components/ServicesGrid"));
const Leadership = lazy(() => import("./components/Leadership"));
const Achievements = lazy(() => import("./components/Achievements"));
const TradeSupport = lazy(() => import("./components/TradeSupport"));
const Departments = lazy(() => import("./components/Departments"));
const GlobalNetworkCTA = lazy(() => import("./components/JoinNetwork"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main>
        {/* Render critical top content immediately */}
        <BackToTop />
        <HeroCarousel />

        {/* Lazy load the remaining sections as the user interacts */}
        <Suspense fallback={<GridSkeleton />}>
          <ServicesGrid />
          <Leadership />
          <Achievements />
          <TradeSupport />
          <Departments />
          <GlobalNetworkCTA />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;