import React, { Suspense, lazy } from "react";
import BackToTop from "./components/BackToTop";
import GridSkeleton from "./components/ui/GridSkeleton";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import JoinUs from "./pages/JoinUs";

const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  const location = useLocation();

  // Define valid app paths
  const validPaths = ["/", "/about", "/contact", "/feedback", "/join-us"];

  // Check if current path matches standard routes. If not, treat as 404.
  const isExistingRoute = validPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Conditionally render Navbar only on valid routes */}
      {isExistingRoute && <Navbar />}

      <Suspense fallback={<GridSkeleton />}>
        <main>
          <BackToTop />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="about" element={<About />} />
            <Route path="join-us" element={<JoinUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Conditionally render Footer only on valid routes */}
        {isExistingRoute && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;