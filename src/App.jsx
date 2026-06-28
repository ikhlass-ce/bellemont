import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import LoadingScreen from './components/LoadingScreen';
import QuickViewModal from './components/QuickViewModal';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Account from './pages/Account';
import About from './pages/About';

import './App.css';
import gsap from 'gsap';

// Main Application shell containing context usage
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const transitionOverlayRef = useRef(null);
  const isFirstRender = useRef(true);

  const { quickViewProduct, setQuickViewProduct } = useContext(ShopContext);

  // Staggered letter preloader hook
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // GSAP Premium page transition mask animation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger sliding mask on route changes
    const tl = gsap.timeline();
    
    tl.fromTo(transitionOverlayRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: 'power4.inOut' }
    )
    .to(transitionOverlayRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
      delay: 0.05,
      onComplete: () => {
        // Reset overlay to bottom for future page changes
        gsap.set(transitionOverlayRef.current, { yPercent: 100 });
      }
    });

  }, [location.pathname]);

  // Listen to custom addToCart drawer drawer trigger event
  useEffect(() => {
    const handleOpenDrawer = () => {
      // Trigger cart drawer open from outside navbar scope
      const bagTrigger = document.querySelector('[aria-label="Open shopping bag"]');
      if (bagTrigger) {
        bagTrigger.click();
      }
    };
    window.addEventListener('openCartDrawer', handleOpenDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenDrawer);
  }, []);

  return (
    <>
      {/* 1. Preloader Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 2. Frosted Slide Page Transition Overlay Curtain */}
      <div 
        ref={transitionOverlayRef} 
        className="fixed inset-0 bg-[#fafaf7] z-[1050] pointer-events-none transform translate-y-full"
      >
        {/* Logo in the middle of transition curtain */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-editorial text-2xl tracking-[0.3em] text-luxury-black/45 uppercase font-light">
            BELLEMONT
          </span>
        </div>
      </div>

      {/* 3. Global Navbar */}
      <Navbar />

      {/* 4. Routes Container */}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:categorySlug" element={<Collection />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* 5. Global Footer */}
      <Footer />

      {/* 6. Global Quick View Modal Overlay */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </>
  );
};

// Root Router and State Providers wrapper
function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </Router>
    </ShopProvider>
  );
}

export default App;
