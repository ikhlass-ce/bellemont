import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Heart, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import gsap from 'gsap';

const Navbar = () => {
  const { cart, wishlist } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const mobileMenuRef = useRef(null);
  const cartDrawerRef = useRef(null);
  const cartOverlayRef = useRef(null);
  const isHomePage = location.pathname === '/';

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartDrawerOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(mobileMenuRef.current, 
        { xPercent: -100 }, 
        { xPercent: 0, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-link', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, delay: 0.15, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(cartOverlayRef.current, { opacity: 0.4, duration: 0.3, display: 'block' });
      gsap.fromTo(cartDrawerRef.current, 
        { xPercent: 100 }, 
        { xPercent: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(cartOverlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      if (cartDrawerRef.current) {
        gsap.to(cartDrawerRef.current, { xPercent: 100, duration: 0.4, ease: 'power3.in' });
      }
    }
  }, [isCartDrawerOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const primaryCategories = [
    { name: 'Women', path: '/collection/summer-collection' },
    { name: 'New Arrivals', path: '/collection/new-arrivals' },
    { name: 'Dresses', path: '/collection/dresses' },
    { name: 'Skirts', path: '/collection/skirts' },
    { name: 'Trousers', path: '/collection/trousers' },
    { name: 'Bags', path: '/collection/bags' },
    { name: 'Accessories', path: '/collection/accessories' },
  ];

  const modestyCategories = [
    { name: 'Hijabs', path: '/collection/hijabs' },
    { name: 'Head Scarves', path: '/collection/head-scarves' },
  ];

  const otherCategories = [
    { name: 'Linen Sets', path: '/collection/linen-sets' },
    { name: 'Shirts & Blouses', path: '/collection/shirts-blouses' },
    { name: 'Shoes', path: '/collection/shoes' },
    { name: 'Bags', path: '/collection/bags' },
    { name: 'Best Sellers', path: '/collection/best-sellers' },
  ];

  return (
    <>
      {/* TWO-LEVEL NAVBAR CONTROLLER */}
      {/* 1. TOP UTILITY RIBBON */}
      <div 
        className={`w-full bg-[#050505] text-[#fafaf7] px-6 md:px-12 text-[9px] tracking-[0.25em] font-sans font-light uppercase flex justify-between items-center transition-all duration-500 z-50 h-8 ${
          isScrolled ? 'fixed -top-8 left-0 opacity-0 pointer-events-none' : 'absolute top-0 left-0'
        }`}
      >
        <div>Free Shipping on Orders Above $150</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Track Order</a>
          <span className="text-luxury-grey">|</span>
          <a href="#" className="hover:text-luxury-gold transition-colors duration-300">Help</a>
        </div>
      </div>

      {/* 2. MAIN LOGO & ACTION BAR */}
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'top-0 py-4.5 bg-white border-b border-luxury-border shadow-xs text-luxury-black' 
            : isHomePage 
              ? 'top-8 py-6.5 bg-transparent text-luxury-white' 
              : 'top-8 py-6.5 bg-white border-b border-luxury-border text-luxury-black'
        }`}
      >
        <div className="max-w-7.5xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LEFT: Mobile hamburger & BELLEMONT Logo */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden hover:opacity-60 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            
            <Link 
              to="/" 
              className="text-lg sm:text-xl font-editorial tracking-[0.3em] font-light uppercase"
            >
              BELLEMONT
            </Link>
          </div>

          {/* CENTER: Main Categories list */}
          <div className="hidden lg:flex items-center space-x-7 font-sans text-[11px] tracking-[0.2em] uppercase font-light">
            {primaryCategories.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="luxury-link hover:text-luxury-gold transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: User Icons panel */}
          <div className="flex items-center space-x-4.5 sm:space-x-5">
            {/* Live Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-luxury-gold transition-colors duration-300 cursor-pointer focus:outline-none"
              aria-label="Toggle search bar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* User Login */}
            <Link 
              to="/account" 
              className="hover:text-luxury-gold transition-colors duration-300"
              aria-label="User Account"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>

            {/* Wishlist */}
            <Link 
              to="/account" 
              className="relative hover:text-luxury-gold transition-colors duration-300 hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#050505] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold scale-90 border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart drawer trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative hover:text-luxury-gold transition-colors duration-300 cursor-pointer focus:outline-none"
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#050505] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Live Search overlay bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-luxury-border py-4 px-6 md:px-12 z-40 text-luxury-black transition-all">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center border-b border-[#050505]/20 pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Dresses, Accessories, Trousers..."
                className="w-full bg-transparent border-none text-xs outline-none pl-2 tracking-widest font-light placeholder:text-luxury-grey text-[#050505] uppercase"
                autoFocus
              />
              <button type="submit" className="hover:text-luxury-gold transition-colors duration-300 ml-4 cursor-pointer">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* FULL SCREEN MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-[#050505]/30 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer menu content */}
          <div 
            ref={mobileMenuRef}
            className="relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-6 justify-between text-luxury-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-luxury-border">
              <span className="font-editorial text-base tracking-[0.2em] font-light">BELLEMONT</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable list links */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 flex flex-col justify-start">
              <p className="text-[9px] tracking-[0.2em] text-luxury-grey uppercase font-semibold">Primary Categories</p>
              <div className="flex flex-col space-y-3.5">
                {primaryCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="mobile-nav-link text-base font-editorial tracking-wider hover:text-luxury-gold transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-luxury-border my-2"></div>
              
              <p className="text-[9px] tracking-[0.2em] text-luxury-grey uppercase font-semibold">Modesty & Hijabs</p>
              <div className="grid grid-cols-2 gap-3">
                {modestyCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="mobile-nav-link text-[11px] tracking-widest uppercase hover:text-luxury-gold transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-luxury-border my-2"></div>

              <p className="text-[9px] tracking-[0.2em] text-luxury-grey uppercase font-semibold">Other Sections</p>
              <div className="grid grid-cols-2 gap-3">
                {otherCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="mobile-nav-link text-[11px] tracking-widest uppercase hover:text-luxury-gold transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer banner */}
            <div className="pt-4 border-t border-luxury-border text-center">
              <p className="text-[8px] tracking-widest text-luxury-grey uppercase font-light">
                "Timeless Elegance. Effortlessly Yours."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING BAG DRAWER OVERLAYS */}
      <div 
        ref={cartOverlayRef}
        className="fixed inset-0 bg-[#050505]/40 z-[100] hidden backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      ></div>

      {/* Cart Drawer Panel */}
      <div
        ref={cartDrawerRef}
        className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-[101] flex flex-col p-6 sm:p-8 transform translate-x-full text-luxury-black"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-luxury-border">
          <span className="font-editorial text-base tracking-[0.2em] font-light uppercase">Shopping Bag ({cartCount})</span>
          <button 
            onClick={() => setIsCartDrawerOpen(false)}
            className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scroll items content */}
        <div className="flex-grow overflow-y-auto py-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-5">
              <p className="font-editorial text-luxury-grey italic text-xs">Your shopping bag is empty.</p>
              <button 
                onClick={() => setIsCartDrawerOpen(false)}
                className="luxury-btn text-[10px] w-full"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex space-x-3.5 border-b border-luxury-border pb-5 last:border-0 last:pb-0">
                <div className="w-16 h-22 bg-luxury-grey-light rounded overflow-hidden flex-shrink-0 border border-luxury-border">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="text-left">
                    <h4 className="font-editorial text-xs tracking-wide text-luxury-black font-semibold">{item.product.name}</h4>
                    <p className="text-[10px] text-luxury-grey font-light tracking-wide mt-0.5">
                      {item.color} / Size {item.size}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Adjusted Buttons */}
                    <div className="flex items-center border border-luxury-border rounded-xs">
                      <button 
                        className="px-2 py-0.5 text-xs hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                        style={{ pointerEvents: 'none' }}
                      >-</button>
                      <span className="px-2 text-[10px] font-light">{item.quantity}</span>
                      <button 
                        className="px-2 py-0.5 text-xs hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                        style={{ pointerEvents: 'none' }}
                      >+</button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold tracking-wider">${item.product.price * item.quantity}</p>
                      <button
                        className="text-[9px] text-luxury-grey hover:text-red-800 tracking-wider underline mt-1.5 block ml-auto focus:outline-none cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotals */}
        {cart.length > 0 && (
          <div className="border-t border-luxury-border pt-5 space-y-3.5">
            <div className="flex justify-between text-[11px] tracking-wider font-light text-luxury-grey">
              <span>Subtotal</span>
              <span>${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between text-xs tracking-widest font-semibold border-t border-luxury-border pt-3">
              <span>ESTIMATED TOTAL</span>
              <span>${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</span>
            </div>
            
            <div className="pt-3 space-y-2.5">
              <Link 
                to="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="luxury-btn text-[10px] w-full text-center block"
              >
                View Shopping Bag
              </Link>
              <Link 
                to="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="luxury-btn-alt text-[10px] w-full text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Binder for event delegate */}
      <CartActionsBinder cart={cart} setIsCartDrawerOpen={setIsCartDrawerOpen} />
    </>
  );
};

// Internal Helper component to bind cart events cleanly
const CartActionsBinder = ({ cart, setIsCartDrawerOpen }) => {
  const { updateQuantity, removeFromCart } = useContext(ShopContext);
  
  useEffect(() => {
    const handleCartDrawerClick = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.textContent === '-' && target.closest('.flex-grow')) {
        const itemContainer = target.closest('.flex');
        if (itemContainer) {
          const detailsText = itemContainer.querySelector('.text-luxury-grey')?.textContent || '';
          const titleText = itemContainer.querySelector('h4')?.textContent || '';
          
          const cartItem = cart.find(item => item.product.name === titleText && detailsText.includes(item.size) && detailsText.includes(item.color));
          if (cartItem) {
            updateQuantity(cartItem.product.id, cartItem.size, cartItem.color, cartItem.quantity - 1);
          }
        }
      }

      if (target.textContent === '+' && target.closest('.flex-grow')) {
        const itemContainer = target.closest('.flex');
        if (itemContainer) {
          const detailsText = itemContainer.querySelector('.text-luxury-grey')?.textContent || '';
          const titleText = itemContainer.querySelector('h4')?.textContent || '';
          
          const cartItem = cart.find(item => item.product.name === titleText && detailsText.includes(item.size) && detailsText.includes(item.color));
          if (cartItem) {
            updateQuantity(cartItem.product.id, cartItem.size, cartItem.color, cartItem.quantity + 1);
          }
        }
      }

      if (target.textContent === 'Remove' && target.closest('.flex-grow')) {
        const itemContainer = target.closest('.flex');
        if (itemContainer) {
          const detailsText = itemContainer.querySelector('.text-luxury-grey')?.textContent || '';
          const titleText = itemContainer.querySelector('h4')?.textContent || '';
          
          const cartItem = cart.find(item => item.product.name === titleText && detailsText.includes(item.size) && detailsText.includes(item.color));
          if (cartItem) {
            removeFromCart(cartItem.product.id, cartItem.size, cartItem.color);
          }
        }
      }
    };

    document.addEventListener('click', handleCartDrawerClick);
    return () => document.removeEventListener('click', handleCartDrawerClick);
  }, [cart, updateQuantity, removeFromCart]);

  return null;
};

export default Navbar;
