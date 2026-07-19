import React, { Suspense, lazy } from "react";
import Home from './pages/Home'
import Navbar from './components/Navbar'
// import HeroCarousel from './components/HeroCarousel'
// import ServicesGrid from './components/ServicesGrid'

import GridSkeleton from "./components/ui/GridSkeleton";
import Leadership from "./components/Leadership";
import Achievements from "./components/Achievements";
import TradeSupport from "./components/TradeSupport";
import Departments from "./components/Departments";
import GlobalNetworkCTA from "./components/JoinNetwork";
import Footer from "./components/Footer";

// Use lazy imports for your main sections or page views
const HeroCarousel = lazy(() => import("./components/HeroCarousel"));
const ServicesGrid = lazy(() => import("./components/ServicesGrid"));

const App = () => {
  // return (
  //   <div>
  //     <Navbar />
  //     <HeroCarousel />
  //     <ServicesGrid />
  //     {/* <ServicesCarousel /> */}
  //     {/* <Home /> */}
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbars stay visible instantly */}
      <Navbar />

      <main>
        {/* Suspense catches any component inside it that is still loading and displays the fallback skeleton immediately.
                */}
        <Suspense fallback={<GridSkeleton />}>
          <HeroCarousel />
          <ServicesGrid />
          <Leadership />
          <Achievements />
          <TradeSupport />
          <Departments />
          <GlobalNetworkCTA />
          <Footer />
        </Suspense>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App
