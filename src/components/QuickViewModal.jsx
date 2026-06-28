import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import gsap from 'gsap';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors ? product.colors[0]?.name : '');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setActiveImage(product.images[0]);
      setQuantity(1);

      // Animate modal open
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleClose = () => {
    // Animate close
    gsap.to(modalRef.current, { y: 30, opacity: 0, duration: 0.3, ease: 'power3.in' });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    handleClose();
    // Dispatch openCartDrawer event to slide out cart drawer
    const event = new CustomEvent('openCartDrawer');
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs cursor-pointer"
      ></div>

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative bg-luxury-ivory w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-luxury-black/5"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-luxury-black hover:text-luxury-gold transition-colors duration-300 z-20 cursor-pointer focus:outline-none"
          aria-label="Close modal"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* LEFT: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8 bg-luxury-beige/40">
          <div className="aspect-[3/4] rounded overflow-hidden bg-luxury-beige shadow-xs">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-18 rounded overflow-hidden bg-luxury-beige shrink-0 border transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-luxury-black scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product details details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-luxury-black">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold">
                {product.category.replace('-', ' & ')}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-light tracking-wide mt-1">
                {product.name}
              </h2>
              <p className="text-lg font-semibold tracking-wider mt-2">${product.price}</p>
            </div>

            <p className="text-xs text-luxury-grey leading-relaxed font-light">
              {product.description}
            </p>

            <div className="border-t border-luxury-black/5 pt-4 space-y-4">
              {/* Color dots */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase block mb-2 font-medium">
                    Color: {selectedColor}
                  </span>
                  {product.colors.length > 1 && (
                    <div className="flex items-center space-x-2">
                      {product.colors.map((colorObj) => (
                        <button
                          key={colorObj.name}
                          onClick={() => setSelectedColor(colorObj.name)}
                          className={`w-5 h-5 rounded-full border relative transition-all duration-300 cursor-pointer ${
                            selectedColor === colorObj.name
                              ? 'border-luxury-black scale-110 shadow-sm'
                              : 'border-luxury-black/10'
                          }`}
                          style={{ backgroundColor: colorObj.hex }}
                          title={colorObj.name}
                        >
                          {selectedColor === colorObj.name && (
                            <span className="absolute inset-0.5 rounded-full border border-luxury-ivory"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sizes selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase block mb-2 font-medium">
                    Size: {selectedSize}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs px-3.5 py-1.5 border transition-all duration-300 font-light rounded-sm cursor-pointer ${
                          selectedSize === size
                            ? 'border-luxury-black bg-luxury-black text-luxury-ivory font-medium'
                            : 'border-luxury-black/10 hover:border-luxury-black/40 text-luxury-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Adjuster */}
              <div>
                <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase block mb-2 font-medium">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-luxury-black/10 rounded-sm bg-luxury-beige/10">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-light select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 text-sm hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Fabric Specs */}
              <p className="text-[10px] text-luxury-grey tracking-wide font-light italic">
                {product.fabricInfo}
              </p>
            </div>
          </div>

          {/* Checkout Triggers */}
          <div className="border-t border-luxury-black/5 pt-6 mt-6 flex space-x-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.15em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-300 rounded-sm cursor-pointer border border-luxury-black"
            >
              <ShoppingBag size={14} />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(product.id);
              }}
              className={`p-3 border rounded-sm transition-all duration-300 cursor-pointer ${
                wishlisted
                  ? 'border-luxury-black bg-luxury-black text-luxury-gold'
                  : 'border-luxury-black/10 hover:border-luxury-black/30 text-luxury-black'
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart size={15} fill={wishlisted ? '#c5a880' : 'none'} />
            </button>
          </div>

          <Link
            to={`/product/${product.id}`}
            onClick={handleClose}
            className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold hover:text-luxury-black transition-colors duration-300 mt-4 flex items-center justify-center font-medium"
          >
            <span>View Full Details</span>
            <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
