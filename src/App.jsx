import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import Preloader from './components/common/Preloader';
import Home from './pages/Home';
import Brands from './pages/Brands';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import { useScrollToTop } from './hooks/useScrollToTop';

// Helper component to enable useScrollToTop inside Router
const ScrollReset = () => {
  useScrollToTop();
  return null;
};

// Animated routes wrapper for page-to-page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/products" 
          element={<Navigate to="/" replace />} 
        />
        <Route 
          path="/brands" 
          element={
            <MainLayout>
              <Brands />
            </MainLayout>
          } 
        />
        <Route 
          path="/offers" 
          element={<Navigate to="/" replace />} 
        />
        <Route 
          path="/about" 
          element={
            <MainLayout>
              <About />
            </MainLayout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } 
        />
        <Route 
          path="/faqs" 
          element={
            <MainLayout>
              <FAQs />
            </MainLayout>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Scroll Reset Trigger on route path change */}
      <ScrollReset />

      {/* Intro Preloader Reveal Screen */}
      <Preloader onLoadComplete={() => setIsPreloaderActive(false)} />

      {/* Render Main App once preloader completes */}
      {!isPreloaderActive && <AnimatedRoutes />}
    </Router>
  );
};

export default App;
