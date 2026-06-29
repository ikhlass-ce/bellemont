import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap';

const Collection = () => {
  const { categorySlug } = useParams();
  const { products, setQuickViewProduct } = useContext(ShopContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const filterDrawerRef = useRef(null);

  // Map category details
  const getCategoryDetails = (slug) => {
    const details = {
      'dresses': {
        title: 'LUXURY DRESSES',
        description: 'Understated elegance in structured poplin, heavy linen, and fluid satin.',
        banner: '/assets/dresses_banner.jpg'
      },
      'skirts': {
        title: 'EDITORIAL SKIRTS',
        description: 'Fluid cuts and high-waisted wrap detailing designed to catch the summer breeze.',
        banner: '/assets/skirts_banner.jpg'
      },
      'trousers': {
        title: 'TAILORED TROUSERS',
        description: 'Palazzo trousers, relaxed linen cuts, and pleated wool-blends for refined walking.',
        banner: '/assets/trousers_banner.jpg'
      },
      'blazers': {
        title: 'STRUCTURED BLAZERS',
        description: 'Sharp shoulders and classic double-breasted finishes. Timeless old money statements.',
        banner: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=1600&q=80'
      },
      'shirts-blouses': {
        title: 'SHIRTS & BLOUSES',
        description: 'Boyfriend-fit linens and high-neck mulberry silks for delicate layered luxury.',
        banner: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&q=80'
      },
      'linen-sets': {
        title: 'RIVIERA LINEN SETS',
        description: 'Two-piece tailored summer sets for effortless lounge coordination.',
        banner: '/assets/hero_editorial.png'
      },
      'hijabs': {
        title: 'PREMIUM HIJABS',
        description: 'Exquisite georgette chiffon and heavy silk-satin drapes in neutral mineral tones.',
        banner: '/assets/silk_scarf.png'
      },
      'head-scarves': {
        title: 'COMO SILK SCARVES',
        description: 'Chic square silk twills finished with delicate hand-rolled hems.',
        banner: '/assets/silk_scarf.png'
      },
      'shoes': {
        title: 'LEATHER SHOES',
        description: 'Fine flat vachetta sandals and custom Tuscan-crafted slides.',
        banner: '/assets/shoes_collection_banner.jpg'
      },
      'bags': {
        title: 'LUXURY BAGS',
        description: 'Moroccan-woven palm baskets and full-grain pebbled calfskin signature totes.',
        banner: '/assets/luxury_accessory.png'
      },
      'accessories': {
        title: 'FINE ACCESSORIES',
        description: 'Cat-eye tortoiseshell acetates and thick 18k ribbed gold jewelry highlights.',
        banner: '/assets/luxury_accessory.png'
      },
      'new-arrivals': {
        title: 'NEW ARRIVALS',
        description: 'The latest expressions of neutral tailoring, summer silhouettes, and silk accessories.',
        banner: '/assets/hero_editorial.png'
      },
      'summer-collection': {
        title: 'SUMMER COLLECTION',
        description: 'Inspired by Positano, St. Tropez, and warm evenings in Southern Europe.',
        banner: '/assets/collection_summer.png'
      },
      'best-sellers': {
        title: 'BEST SELLERS',
        description: 'Our most coveted, signature designs. Reordered and restocked by request.',
        banner: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1600&q=80'
      }
    };

    return details[slug] || {
      title: 'BELLEMONT COLLECTION',
      description: 'Quiet luxury pieces designed for effortless styling and superior comfort.',
      banner: '/assets/hero_editorial.png'
    };
  };

  const details = getCategoryDetails(categorySlug);

  useEffect(() => {
    let list = [];
    if (categorySlug === 'new-arrivals') {
      list = [...products].reverse().slice(0, 6);
    } else if (categorySlug === 'best-sellers') {
      list = products.filter(p => ['monaco-dress', 'st-tropez-blazer', 'premium-chiffon-hijab', 'signature-tote'].includes(p.id));
    } else if (categorySlug === 'summer-collection') {
      list = products.filter(p => 
        p.name.includes('Capri') || 
        p.name.includes('Sorrento') || 
        p.name.includes('St. Tropez') || 
        p.name.includes('Riviera') || 
        p.name.includes('Palermo') || 
        p.fabricInfo.includes('Linen') || 
        p.fabricInfo.includes('Silk') ||
        p.category === 'head-scarves'
      );
    } else {
      list = products.filter(p => p.category === categorySlug);
    }

    let results = [...list];

    if (selectedSizes.length > 0) {
      results = results.filter(product => 
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      results = results.filter(product => 
        selectedColors.includes(product.color) || 
        (product.colors && product.colors.some(c => selectedColors.includes(c.name)))
      );
    }

    results = results.filter(product => product.price <= maxPrice);

    if (sortOption === 'price-low-high') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'best-selling') {
      results.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(results);
  }, [categorySlug, products, sortOption, selectedSizes, selectedColors, maxPrice]);

  useEffect(() => {
    if (isFilterPanelOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(filterDrawerRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      if (filterDrawerRef.current) {
        gsap.to(filterDrawerRef.current, { xPercent: -100, duration: 0.4, ease: 'power3.in' });
      }
    }
  }, [isFilterPanelOpen]);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const availableColors = ['White', 'Camel', 'Ivory', 'Classic Black', 'Sand', 'Oatmeal', 'Sage', 'Soft Beige', 'Gold', 'Burgundy', 'Navy', 'Stone Beige', 'Olive Green'];

  const toggleSizeFilter = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColorFilter = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(300);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="flex-grow bg-white pt-24 text-luxury-black font-sans font-light">
      
      {/* 1. MAGAZINE HERO COVER BANNER */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden border-b border-luxury-border flex items-center justify-center bg-white">
        {/* Main Hero Image */}
        <img 
          src={details.banner.startsWith('/') ? `${import.meta.env.BASE_URL}${details.banner.slice(1)}` : details.banner} 
          alt={details.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'none',
            backdropFilter: 'none',
            opacity: 1,
            imageRendering: 'auto'
          }}
          className="absolute inset-0 z-0"
        />
        
        {/* Very Light Luxury Readability Overlay */}
        <div className="absolute inset-0 bg-[#050505]/10 z-10 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white space-y-4">
          <span className="text-[10px] tracking-[0.35em] text-white/90 uppercase font-semibold">LA MAISON BELLEMONT</span>
          <h1 className="font-editorial text-3xl sm:text-5.5xl font-bold tracking-widest uppercase text-white leading-none drop-shadow-sm">{details.title}</h1>
          <p className="text-xs sm:text-sm tracking-widest max-w-xl mx-auto font-light text-white leading-relaxed pl-0.5 drop-shadow-sm">
            {details.description}
          </p>
        </div>
      </section>

      {/* 2. MINIMALIST CONTROLS BAR */}
      <section className="bg-white border-b border-luxury-border py-4 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Filters toggle */}
          <button
            onClick={() => setIsFilterPanelOpen(true)}
            className="flex items-center space-x-2.5 text-xs tracking-widest uppercase hover:text-luxury-gold transition-colors duration-300 font-medium cursor-pointer focus:outline-none"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span>Filters</span>
            {(selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < 300) && (
              <span className="w-1.5 h-1.5 bg-[#050505] rounded-full inline-block"></span>
            )}
          </button>

          {/* Counts */}
          <span className="text-[11px] tracking-wider text-luxury-grey font-light">
            {filteredProducts.length} Piece{filteredProducts.length !== 1 ? 's' : ''} Listed
          </span>

          {/* Sorting controls */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] tracking-wider uppercase text-luxury-grey font-light hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-none text-[11px] tracking-widest font-light text-[#050505] pr-6 py-1 outline-none cursor-pointer appearance-none uppercase"
              >
                <option value="newest">Newest</option>
                <option value="best-selling">Bestsellers</option>
                <option value="price-low-high">Price: Low-High</option>
                <option value="price-high-low">Price: High-Low</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-luxury-black">
                <ChevronDown size={11} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT LISTINGS GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex-grow">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-editorial text-lg italic text-luxury-grey">No pieces found matching your refine criteria.</p>
            <button
              onClick={clearAllFilters}
              className="luxury-btn text-[10px]"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. FILTER DRAWER BAR */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 z-[200] flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#050505]/30 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsFilterPanelOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div
            ref={filterDrawerRef}
            className="relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-6 sm:p-8 justify-between text-luxury-black transform -translate-x-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-luxury-border">
              <span className="font-editorial text-base tracking-[0.2em] uppercase font-light">Refine Choice</span>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable checklists */}
            <div className="flex-1 overflow-y-auto py-6 space-y-7">
              
              {/* Sizes checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Filter Size</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSizeFilter(size)}
                        className={`text-[10px] px-3.5 py-1.5 border transition-all duration-300 font-light rounded-xs cursor-pointer ${
                          isSelected
                            ? 'border-[#050505] bg-[#050505] text-white font-medium'
                            : 'border-luxury-border hover:border-luxury-black text-[#050505]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Filter Color</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {availableColors.map((color) => {
                    const isSelected = selectedColors.includes(color);
                    return (
                      <button
                        key={color}
                        onClick={() => toggleColorFilter(color)}
                        className={`text-[10px] px-3 py-1.5 border transition-all duration-300 font-light rounded-xs cursor-pointer ${
                          isSelected
                            ? 'border-[#050505] bg-[#050505] text-white font-medium'
                            : 'border-luxury-border hover:border-luxury-black text-[#050505]'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pricing checklists */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Max Price</h4>
                  <span className="text-xs font-semibold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-0.5 bg-[#050505]/10 appearance-none cursor-pointer accent-[#050505]"
                />
                <div className="flex justify-between text-[9px] text-luxury-grey font-light">
                  <span>$20</span>
                  <span>$300</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-luxury-border flex space-x-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 border border-luxury-border hover:border-luxury-black text-luxury-black text-[10px] tracking-widest uppercase font-semibold rounded-xs transition-all duration-300 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="flex-1 py-3 bg-[#050505] hover:bg-luxury-gold text-white text-[10px] tracking-widest uppercase font-bold rounded-xs transition-all duration-300 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
