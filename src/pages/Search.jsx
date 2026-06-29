import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, setQuickViewProduct } = useContext(ShopContext);

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortOption, setSortOption] = useState('newest');

  // Trigger search on mount or URL change
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // 1. Text Search Query matching name, description, category, color, fabric
    const queryTerm = query.toLowerCase().trim();
    if (queryTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(queryTerm) ||
        p.description.toLowerCase().includes(queryTerm) ||
        p.category.toLowerCase().includes(queryTerm) ||
        p.color.toLowerCase().includes(queryTerm) ||
        p.fabricInfo.toLowerCase().includes(queryTerm)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // 3. Size Filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes && p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // 4. Color Filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        selectedColors.includes(p.color) || 
        (p.colors && p.colors.some(c => selectedColors.includes(c.name)))
      );
    }

    // 5. Price Filter
    filtered = filtered.filter(p => p.price <= maxPrice);

    // 6. Sorting
    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'best-selling') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setResults(filtered);
  }, [query, products, selectedCategory, selectedSizes, selectedColors, maxPrice, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query.trim() });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(300);
    setSortOption('newest');
    setQuery('');
    setSearchParams({});
  };

  // Static options lists
  const categoriesList = [
    { value: 'all', label: 'All Categories' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'skirts', label: 'Skirts' },
    { value: 'trousers', label: 'Trousers' },
    { value: 'shirts-blouses', label: 'Shirts & Blouses' },
    { value: 'linen-sets', label: 'Linen Sets' },
    { value: 'hijabs', label: 'Hijabs' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'bags', label: 'Bags' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const colorsList = ['White', 'Camel', 'Ivory', 'Classic Black', 'Sand', 'Oatmeal', 'Sage', 'Soft Beige', 'Gold'];

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PAGE HEADER & SEARCH BAR */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold">SEARCH THE COLLECTION</span>
          <h1 className="font-editorial text-3xl font-light tracking-wide uppercase text-luxury-black">Search Results</h1>
          
          <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-luxury-black/30 pb-3 pt-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Verona, Capri, Linen, Silk..."
              className="bg-transparent w-full text-base outline-none pr-10 pl-2 placeholder:text-luxury-grey text-luxury-black font-light tracking-wide"
            />
            <button 
              type="submit" 
              className="absolute right-2 hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
              aria-label="Search Submit"
            >
              <SearchIcon size={20} strokeWidth={1.5} />
            </button>
          </form>
        </div>

        {/* CONTROLS AREA */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT: FILTER SIDEBAR PANEL (Desktop only, responsive grid on mobile) */}
          <div className="w-full lg:w-64 shrink-0 space-y-8 bg-luxury-white border border-luxury-black/5 p-6 rounded-md shadow-xs h-fit text-luxury-black">
            
            {/* Title Header */}
            <div className="flex items-center justify-between pb-3 border-b border-luxury-black/5">
              <span className="text-xs tracking-wider uppercase font-semibold flex items-center space-x-2">
                <SlidersHorizontal size={13} />
                <span>Refine Search</span>
              </span>
              <button 
                onClick={handleClearAll}
                className="text-[10px] tracking-wider uppercase text-luxury-grey hover:text-luxury-black underline font-light cursor-pointer"
              >
                Clear
              </button>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-luxury-ivory border border-luxury-black/10 rounded px-2 py-2 text-xs font-light text-luxury-black outline-none cursor-pointer"
              >
                {categoriesList.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Size checklist */}
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Sizes</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sizesList.map(size => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`text-[10px] px-2.5 py-1 border transition-all rounded-xs cursor-pointer ${
                        active
                          ? 'border-luxury-black bg-luxury-black text-luxury-ivory font-medium'
                          : 'border-luxury-black/10 hover:border-luxury-black/30 text-luxury-black font-light'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color checklist */}
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Colors</h4>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                {colorsList.map(color => {
                  const active = selectedColors.includes(color);
                  return (
                    <label key={color} className="flex items-center space-x-2 font-light cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => handleColorToggle(color)}
                        className="rounded border-luxury-black/10 text-luxury-black focus:ring-luxury-gold"
                      />
                      <span className="text-[11px] truncate">{color}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Max Price</h4>
                <span className="text-xs font-semibold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-luxury-black/10 rounded-lg appearance-none cursor-pointer accent-luxury-black"
              />
              <div className="flex justify-between text-[9px] text-luxury-grey font-light">
                <span>$20</span>
                <span>$300</span>
              </div>
            </div>

            {/* Sort Filter option */}
            <div className="space-y-2">
              <h4 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-grey">Sort</h4>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-luxury-ivory border border-luxury-black/10 rounded px-2 py-2 text-xs font-light text-luxury-black outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* RIGHT: RESULTS GRID */}
          <div className="flex-grow space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-luxury-black/5">
              <span className="text-xs font-light text-luxury-grey">
                {results.length} Piece{results.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="py-24 text-center bg-luxury-white border border-luxury-black/5 rounded-md shadow-xs px-4">
                <p className="font-editorial text-lg italic text-luxury-grey">We couldn't find any pieces matching your search.</p>
                <button
                  onClick={handleClearAll}
                  className="luxury-btn text-xs mt-6"
                >
                  Clear Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Search;
