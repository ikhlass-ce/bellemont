import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : '');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedSize, selectedColor);
    // Dispatch openCartDrawer event to slide out cart drawer
    const event = new CustomEvent('openCartDrawer');
    window.dispatchEvent(event);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-white rounded-lg overflow-hidden border border-luxury-border/40 hover:border-luxury-border transition-all duration-500 hover:shadow-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTROLLER */}
      <div className="relative aspect-[3/4] bg-luxury-grey-light overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </Link>

        {/* Heart Wishlist overlay button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
            wishlisted 
              ? 'bg-[#050505] text-luxury-gold' 
              : 'bg-white/80 text-luxury-black hover:bg-[#050505] hover:text-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={14} fill={wishlisted ? '#b39974' : 'none'} strokeWidth={1.2} />
        </button>

        {/* Hover Quick Actions slide overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-linear-to-t from-[#050505]/40 to-transparent flex flex-col space-y-2 z-20">
          <button
            onClick={handleQuickViewClick}
            className="w-full py-2 bg-white/95 hover:bg-[#050505] hover:text-white text-luxury-black text-[9px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 transition-all duration-300 rounded-sm cursor-pointer"
          >
            <Eye size={12} strokeWidth={1.5} />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-[#050505] hover:bg-luxury-gold text-white text-[9px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 transition-all duration-300 rounded-sm cursor-pointer"
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* DETAILS INFO */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-2 bg-white text-left">
        
        {/* Name and Price */}
        <div className="flex justify-between items-baseline space-x-2">
          <h3 className="font-editorial text-xs sm:text-sm text-luxury-black tracking-wide font-normal truncate max-w-[70%] group-hover:text-luxury-gold transition-colors duration-300">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="text-xs font-sans tracking-wider text-luxury-black font-semibold">
            ${product.price}
          </span>
        </div>

        {/* Short fabric description */}
        <p className="text-[10px] text-luxury-grey font-light tracking-wide truncate">
          {product.color} — {product.fabricInfo.split('.')[0]}
        </p>

        {/* Colors (Render selection dots only if > 1 color) */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center space-x-1.5 pt-1">
            <span className="text-[8px] text-luxury-grey tracking-wider uppercase mr-1">Colors:</span>
            {product.colors.map((colorObj) => (
              <button
                key={colorObj.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(colorObj.name);
                }}
                className={`w-3 h-3 rounded-full border relative transition-all duration-300 cursor-pointer ${
                  selectedColor === colorObj.name
                    ? 'border-luxury-black scale-110 shadow-xs'
                    : 'border-luxury-black/10'
                }`}
                style={{ backgroundColor: colorObj.hex }}
                title={colorObj.name}
              >
                {selectedColor === colorObj.name && (
                  <span className="absolute inset-0.5 rounded-full border border-white"></span>
                )}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
