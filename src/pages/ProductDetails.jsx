import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Zoom state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const zoomImageRef = useRef(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
      setSelectedColor(foundProduct.colors ? foundProduct.colors[0]?.name : '');
      setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : '');
      setQuantity(1);

      // Retrieve related products in same category (exclude current product, limit to 4)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      // Redirect to home if not found
      navigate('/');
    }
  }, [productId, products, navigate]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  // Zoom on Hover Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%' // double scale zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Dispatch openCartDrawer event to slide out cart drawer
    const event = new CustomEvent('openCartDrawer');
    window.dispatchEvent(event);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="flex-1 bg-luxury-ivory pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* BREADCRUMB */}
        <nav className="text-[10px] tracking-widest uppercase text-luxury-grey py-4 mb-6">
          <Link to="/" className="hover:text-luxury-black transition-colors duration-300">Home</Link>
          <span className="mx-2.5">/</span>
          <Link to={`/collection/${product.category}`} className="hover:text-luxury-black transition-colors duration-300">
            {product.category.replace('-', ' & ')}
          </Link>
          <span className="mx-2.5">/</span>
          <span className="text-luxury-black font-medium">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT ROW */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT: GALLERY SECTION */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-4">
            
            {/* Active image display with Zoom area */}
            <div 
              className="relative aspect-[3/4] flex-1 bg-luxury-beige rounded overflow-hidden cursor-crosshair border border-luxury-black/5"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Zoom lens box overlay */}
              <div 
                ref={zoomImageRef}
                className="absolute inset-0 pointer-events-none hidden"
                style={zoomStyle}
              ></div>
            </div>

            {/* Thumbnail Column (Vertical on tablet/desktop, horizontal on mobile) */}
            <div className="flex md:flex-col flex-row space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-y-auto no-scrollbar pb-1 md:pb-0 md:w-20 shrink-0">
              {product.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-18 md:w-20 md:h-26 rounded overflow-hidden bg-luxury-beige shrink-0 border transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-luxury-black scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: DETAILS PANEL */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between text-luxury-black space-y-6">
            
            {/* Title, rating & pricing */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold">
                {product.category.replace('-', ' & ')}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-light tracking-wide leading-tight uppercase">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-xl font-semibold tracking-wider">${product.price}</span>
                <span className="text-luxury-grey text-sm">|</span>
                
                {/* Rating display */}
                <div className="flex items-center space-x-1">
                  <div className="flex text-luxury-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={13} 
                        fill={i < Math.floor(product.rating) ? '#c5a880' : 'none'} 
                        stroke={i < Math.floor(product.rating) ? '#c5a880' : '#c5a880'} 
                        strokeWidth={i < Math.floor(product.rating) ? 0 : 1}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-luxury-grey font-light">
                    ({product.rating})
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Description</h3>
              <p className="text-xs text-luxury-grey leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Selection options form */}
            <div className="border-t border-b border-luxury-black/5 py-6 space-y-6">
              
              {/* Color options */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase block mb-3 font-semibold">
                    Color: <span className="text-luxury-black font-light font-sans ml-1">{selectedColor}</span>
                  </span>
                  {product.colors.length > 1 && (
                    <div className="flex items-center space-x-3">
                      {product.colors.map((colorObj) => (
                        <button
                          key={colorObj.name}
                          onClick={() => setSelectedColor(colorObj.name)}
                          className={`w-6 h-6 rounded-full border relative transition-all duration-300 cursor-pointer ${
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

              {/* Size options */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase font-semibold">
                      Size: <span className="text-luxury-black font-light font-sans ml-1">{selectedSize}</span>
                    </span>
                    <a href="#" className="text-[10px] tracking-widest uppercase underline text-luxury-grey hover:text-luxury-black transition-colors font-light">
                      Size Guide
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs px-4 py-2 border transition-all duration-300 font-light rounded-sm cursor-pointer ${
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

              {/* Quantity selector */}
              <div>
                <span className="text-[10px] tracking-[0.15em] text-luxury-grey uppercase block mb-3 font-semibold">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-luxury-black/10 rounded-sm bg-luxury-beige/10">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-sm hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-5 text-xs font-light select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3.5 py-1.5 text-sm hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Checkout buttons triggers */}
            <div className="space-y-4 pt-2">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-luxury-black hover:bg-luxury-gold text-luxury-ivory text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-500 rounded-sm cursor-pointer border border-luxury-black shadow-sm"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border rounded-sm transition-all duration-300 cursor-pointer ${
                    wishlisted
                      ? 'border-luxury-black bg-luxury-black text-luxury-gold'
                      : 'border-luxury-black/10 hover:border-luxury-black/30 text-luxury-black'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart size={16} fill={wishlisted ? '#c5a880' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-transparent hover:bg-luxury-black/5 text-luxury-black text-xs tracking-[0.2em] uppercase font-medium border border-luxury-black transition-all duration-500 rounded-sm cursor-pointer"
              >
                Instant Purchase
              </button>
            </div>

            {/* Luxury Shipping Seals info */}
            <div className="grid grid-cols-3 gap-4 pt-6 text-center text-luxury-black/75 border-t border-luxury-black/5">
              <div className="flex flex-col items-center space-y-1">
                <Truck size={16} strokeWidth={1.5} className="text-luxury-gold" />
                <span className="text-[9px] tracking-widest uppercase font-semibold">Complimentary Shipping</span>
                <span className="text-[8px] text-luxury-grey font-light">On orders over $150</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw size={16} strokeWidth={1.5} className="text-luxury-gold" />
                <span className="text-[9px] tracking-widest uppercase font-semibold">Easy Returns</span>
                <span className="text-[8px] text-luxury-grey font-light">30-day private collection returns</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck size={16} strokeWidth={1.5} className="text-luxury-gold" />
                <span className="text-[9px] tracking-widest uppercase font-semibold">Genuine Craftsmanship</span>
                <span className="text-[8px] text-luxury-grey font-light">100% certified organic textiles</span>
              </div>
            </div>

          </div>

        </div>

        {/* FABRIC AND SPECIFICATIONS */}
        <section className="mt-20 pt-12 border-t border-luxury-black/5 text-luxury-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-editorial text-lg tracking-wider uppercase font-light">Fabric & Care</h3>
              <p className="text-xs text-luxury-grey leading-relaxed font-light">
                {product.fabricInfo} Each piece from Bellemont is crafted with longevity and eco-responsibility in mind. We recommend gentle laundering or dry cleaning to maintain the natural fiber texture and hand-rolled finishes.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-editorial text-lg tracking-wider uppercase font-light">Heritage Spotlight</h3>
              <p className="text-xs text-luxury-grey leading-relaxed font-light">
                Inspired by high-fashion house collections in Paris and Milan. Structured details, heavy linen weaves, and delicate buttons have been carefully selected to capture old money simplicity.
              </p>
            </div>
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="mt-20 pt-12 border-t border-luxury-black/5 text-luxury-black">
          <h3 className="font-editorial text-2xl font-light tracking-wide uppercase mb-8">Customer Reviews</h3>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-8">
              {product.reviews.map((rev, idx) => (
                <div key={idx} className="border-b border-luxury-black/5 pb-6 last:border-0 last:pb-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-semibold tracking-wider">{rev.author}</h5>
                      <div className="flex text-luxury-gold space-x-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            fill={i < rev.rating ? '#c5a880' : 'none'} 
                            stroke="#c5a880"
                            strokeWidth={i < rev.rating ? 0 : 1}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-luxury-grey font-light">Verified Buyer</span>
                  </div>
                  <p className="text-xs text-luxury-grey font-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-luxury-grey font-light italic">
              No reviews have been written for this product yet. Share your experience post-purchase.
            </p>
          )}
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-luxury-black/5">
            <h3 className="font-editorial text-2xl font-light tracking-wide uppercase text-center mb-12 text-luxury-black">
              Related Pieces
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onQuickView={(prod) => setQuickViewProduct(prod)} 
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
