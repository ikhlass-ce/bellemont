import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { products, setQuickViewProduct } = useContext(ShopContext);
  const heroRef = useRef(null);
  const bgTextRef = useRef(null);
  const imageFrameRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const videoRef = useRef(null);

  // Curated products
  const shoes = products.filter(p => p.category === 'shoes').slice(0, 4);
  const bestSellers = [
    products.find(p => p.id === 'venice-dress'),
    products.find(p => p.id === 'monaco-dress'),
    products.find(p => p.id === 'premium-chiffon-hijab'),
    products.find(p => p.id === 'signature-tote')
  ].filter(Boolean);

  useEffect(() => {
    // 1. Play Campaign Video programmatically to bypass browser strict autoplay blocks
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.warn("Autoplay was prevented by browser:", err);
      });
    }

    // 2. Hero Entrance Animations
    const tl = gsap.timeline();
    
    tl.fromTo(bgTextRef.current,
      { letterSpacing: '0.02em', opacity: 0, scale: 0.95 },
      { letterSpacing: '0.15em', opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' }
    )
    .fromTo(imageFrameRef.current,
      { y: 60, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out' },
      '-=1.2'
    )
    .fromTo(leftTextRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(rightTextRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=1'
    );

    // 3. ScrollTrigger reveals for sections
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, []);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const instagramImages = [
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    `${import.meta.env.BASE_URL}assets/hero_editorial.png`,
    `${import.meta.env.BASE_URL}assets/collection_summer.png`
  ];

  return (
    <div className="flex-1 bg-white text-luxury-black font-sans font-light">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-screen h-screen flex items-center justify-center overflow-hidden border-b border-luxury-border"
      >
        {/* Full-screen Background Video */}
        <video 
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}assets/campaign_video.mp4`} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-80"
        />

        {/* Dark luxury transparent gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/60 z-10 pointer-events-none"></div>

        {/* Center Content Column */}
        <div 
          ref={leftTextRef}
          className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-3xl space-y-6"
        >
          <div className="space-y-3">
            <span className="text-[8px] tracking-[0.35em] text-white/70 uppercase block">Campaign No. 06</span>
            <h1 className="font-editorial text-4.5xl sm:text-6xl font-bold tracking-[0.2em] text-white uppercase leading-none">
              BELLEMONT
            </h1>
            <p className="font-editorial text-xs sm:text-sm tracking-[0.25em] text-white/90 italic font-light pl-0.5">
              "Timeless Elegance. Effortlessly Yours."
            </p>
          </div>

          {/* Centered Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center w-full">
            <Link 
              to="/collection/summer-collection" 
              className="luxury-btn-alt py-3 px-8 text-[10px] font-semibold text-center w-full sm:w-auto min-w-[180px] bg-white text-luxury-black border-white hover:bg-transparent hover:text-white"
            >
              SHOP COLLECTION
            </Link>
            <Link 
              to="/collection/new-arrivals" 
              className="luxury-btn py-3 px-8 text-[10px] text-center w-full sm:w-auto min-w-[180px] border-white text-white hover:bg-white hover:text-luxury-black"
            >
              EXPLORE NEW IN
            </Link>
          </div>
        </div>

        {/* Scroll hint line */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center select-none pointer-events-none z-30">
          <div className="w-[1px] h-8 bg-white/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-[line-scroll_1.8s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* 2. DARK LUXURY CATEGORY STRIP (Reference style) */}
      <section className="bg-[#0a0a0a] text-white py-12 border-b border-luxury-black">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Women */}
            <div className="flex items-center space-x-4 text-left border-r border-white/5 last:border-0 pr-4">
              <div className="w-14 h-18 bg-luxury-grey-dark rounded overflow-hidden flex-shrink-0 border border-white/10">
                <img src={`${import.meta.env.BASE_URL}assets/collection_summer.png`} alt="Women collection" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white">Women</h4>
                <p className="text-[9px] text-luxury-grey leading-tight font-light max-w-[130px]">
                  Quiet luxury styles for everyday comfort.
                </p>
                <Link to="/collection/summer-collection" className="text-[9px] tracking-widest uppercase font-semibold text-luxury-gold hover:text-white transition-colors duration-300 block pt-1.5">
                  SHOP WOMEN →
                </Link>
              </div>
            </div>

            {/* Dresses */}
            <div className="flex items-center space-x-4 text-left border-r border-white/5 last:border-0 pr-4">
              <div className="w-14 h-18 bg-luxury-grey-dark rounded overflow-hidden flex-shrink-0 border border-white/10">
                <img src={`${import.meta.env.BASE_URL}assets/dress_white_surf.jpg`} alt="Dresses collection" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white">Dresses</h4>
                <p className="text-[9px] text-luxury-grey leading-tight font-light max-w-[130px]">
                  Silk slip cuts and structured linens.
                </p>
                <Link to="/collection/dresses" className="text-[9px] tracking-widest uppercase font-semibold text-luxury-gold hover:text-white transition-colors duration-300 block pt-1.5">
                  SHOP DRESSES →
                </Link>
              </div>
            </div>

            {/* Hijabs */}
            <div className="flex items-center space-x-4 text-left border-r border-white/5 last:border-0 pr-4">
              <div className="w-14 h-18 bg-luxury-grey-dark rounded overflow-hidden flex-shrink-0 border border-white/10">
                <img src={`${import.meta.env.BASE_URL}assets/silk_scarf.png`} alt="Hijabs collection" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white">Hijabs</h4>
                <p className="text-[9px] text-luxury-grey leading-tight font-light max-w-[130px]">
                  Premium georgette and fine silk drapes.
                </p>
                <Link to="/collection/hijabs" className="text-[9px] tracking-widest uppercase font-semibold text-luxury-gold hover:text-white transition-colors duration-300 block pt-1.5">
                  SHOP HIJABS →
                </Link>
              </div>
            </div>

            {/* Bags */}
            <div className="flex items-center space-x-4 text-left pr-4">
              <div className="w-14 h-18 bg-luxury-grey-dark rounded overflow-hidden flex-shrink-0 border border-white/10">
                <img src={`${import.meta.env.BASE_URL}assets/luxury_accessory.png`} alt="Bags collection" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white">Bags</h4>
                <p className="text-[9px] text-luxury-grey leading-tight font-light max-w-[130px]">
                  Italian-crafted pebbled leather signature totes.
                </p>
                <Link to="/collection/bags" className="text-[9px] tracking-widest uppercase font-semibold text-luxury-gold hover:text-white transition-colors duration-300 block pt-1.5">
                  SHOP BAGS →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW COLLECTION SECTION (Editorial layout) */}
      <section className="bg-white py-24 scroll-reveal border-b border-luxury-border">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          
          {/* Left: Content panel */}
          <div className="w-full md:w-1/2 text-left space-y-6 md:max-w-md">
            <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold block">NEW SEASON</span>
            <h2 className="font-editorial text-4xl sm:text-5.5xl text-luxury-black font-light tracking-wide uppercase leading-tight">
              SENSE OF <br /> ELEGANCE
            </h2>
            <p className="text-xs text-luxury-grey leading-relaxed font-light">
              Crafted in Italy and France, our new seasonal capsule represents Mediterranean quiet luxury at its finest. Made for women who seek timeless silhouettes, double-washed organic textures, and absolute simplicity.
            </p>
            <div className="pt-4">
              <Link to="/collection/new-arrivals" className="luxury-btn text-xs inline-flex items-center space-x-1.5">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Large portrait image */}
          <div className="w-full md:w-1/2 aspect-[4/5] bg-luxury-grey-light rounded overflow-hidden shadow-xl border border-luxury-border">
            <img 
              src={`${import.meta.env.BASE_URL}assets/dress_white_yacht.jpg`} 
              alt="Model posing in White Yacht Dress" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>



      {/* 4. SHOES GRID */}
      <section className="bg-white py-24 scroll-reveal">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 border-b border-luxury-border pb-5 text-left">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold block mb-2">FINE FOOTWEAR</span>
              <h2 className="font-editorial text-3xl font-light text-luxury-black tracking-wide uppercase">Shoes</h2>
            </div>
            <Link 
              to="/collection/shoes" 
              className="text-xs tracking-[0.15em] uppercase text-luxury-black hover:text-luxury-gold transition-colors duration-300 flex items-center font-medium mt-4 sm:mt-0 font-sans"
            >
              <span>View All Footwear</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {shoes.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={handleQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS GRID */}
      <section className="bg-white py-24 scroll-reveal border-t border-luxury-border">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 border-b border-luxury-border pb-5 text-left">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold block mb-2">MOST COVETED STAPLES</span>
              <h2 className="font-editorial text-3xl font-light text-luxury-black tracking-wide uppercase">Best Sellers</h2>
            </div>
            <Link 
              to="/collection/best-sellers" 
              className="text-xs tracking-[0.15em] uppercase text-luxury-black hover:text-luxury-gold transition-colors duration-300 flex items-center font-medium mt-4 sm:mt-0 font-sans"
            >
              <span>Explore Classics</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={handleQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENT REVIEWS */}
      <section className="bg-[#fafaf7] py-24 border-t border-b border-luxury-border scroll-reveal">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold block">Client Testimonials</span>
          
          <div className="space-y-6">
            <blockquote className="font-editorial text-xl sm:text-2.5xl font-light text-luxury-black tracking-wide leading-relaxed italic">
              "Bellemont's white poplin dresses and linen sets are pure quiet luxury. The fabrics drape gracefully, and the feeling is exactly like stepping into a boutique in Paris."
            </blockquote>
            <div>
              <p className="text-xs tracking-widest uppercase font-semibold text-luxury-black">Lady Victoria S.</p>
              <p className="text-[9px] tracking-widest uppercase text-luxury-grey mt-1">London, UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM GALLERY */}
      <section className="bg-white py-24 scroll-reveal">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold">LIVING BELLEMONT</span>
            <h2 className="font-editorial text-3xl font-light tracking-wide uppercase text-luxury-black">The Instagram Gallery</h2>
            <div className="w-8 h-[1px] bg-luxury-black mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramImages.map((imgUrl, i) => (
              <div 
                key={i} 
                className="relative aspect-square overflow-hidden rounded group bg-luxury-grey-light border border-luxury-border cursor-pointer"
              >
                <img
                  src={imgUrl}
                  alt={`Instagram feature ${i}`}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-light text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Post
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MINIMAL FEATURE BENEFITS (Icon Row) */}
      <section className="bg-[#fafaf7] py-12 border-t border-b border-luxury-border">
        <div className="max-w-7.5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            {/* Delivery */}
            <div className="flex items-center space-x-3.5">
              <Truck size={24} strokeWidth={1.2} className="text-luxury-black" />
              <div>
                <h5 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Fast Delivery</h5>
                <p className="text-[9px] text-luxury-grey font-light mt-0.5">Complimentary signature shipping.</p>
              </div>
            </div>

            {/* Returns */}
            <div className="flex items-center space-x-3.5">
              <RefreshCw size={24} strokeWidth={1.2} className="text-luxury-black" />
              <div>
                <h5 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Easy Returns</h5>
                <p className="text-[9px] text-luxury-grey font-light mt-0.5">30-day private collection returns.</p>
              </div>
            </div>

            {/* Quality */}
            <div className="flex items-center space-x-3.5">
              <ShieldCheck size={24} strokeWidth={1.2} className="text-luxury-black" />
              <div>
                <h5 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Premium Quality</h5>
                <p className="text-[9px] text-luxury-grey font-light mt-0.5">100% certified organic fabrics.</p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-center space-x-3.5">
              <CreditCard size={24} strokeWidth={1.2} className="text-luxury-black" />
              <div>
                <h5 className="text-[10px] tracking-widest uppercase font-semibold text-luxury-black">Secure Payment</h5>
                <p className="text-[9px] text-luxury-grey font-light mt-0.5">SSL encrypted card transaction.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes line-scroll {
          0% { transform: scaleY(0); transform-origin: top; }
          45% { transform: scaleY(1); transform-origin: top; }
          55% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
};

export default Home;
