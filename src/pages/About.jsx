import React, { useEffect } from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // ScrollTrigger fade up reveals
    const reveals = document.querySelectorAll('.about-reveal');
    reveals.forEach((element) => {
      gsap.fromTo(element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <div className="flex-1 bg-luxury-ivory pt-20 text-luxury-black font-sans font-light">
      
      {/* 1. HERO COVER */}
      <section 
        className="relative py-32 sm:py-48 bg-cover bg-center flex items-center justify-center border-b border-luxury-black/5"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.55)), url('/assets/collection_summer.png')`,
          backgroundPosition: '50% 40%'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-luxury-ivory space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold">THE HERITAGE</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light tracking-wider uppercase">Our Brand Story</h1>
          <p className="text-xs sm:text-sm font-sans tracking-widest max-w-xl mx-auto font-light text-luxury-ivory/80 leading-relaxed pl-1">
            Inspired by European summers, quiet luxury, and the art of dressing slowly.
          </p>
        </div>
      </section>

      {/* 2. CHRONICLE SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 space-y-16">
        
        {/* Row 1: The Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center about-reveal">
          <div className="space-y-6 text-left">
            <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold">THE CONCEPTION</span>
            <h2 className="font-editorial text-3xl font-light text-luxury-black tracking-wide leading-tight uppercase">
              Quiet Luxury, <br /> Made Personal
            </h2>
            <p className="text-xs text-luxury-grey leading-relaxed">
              Founded in Paris, Bellemont emerged from a simple desire: to create wardrobe staples that represent silent confidence. We were tired of the hyper-rapid fashion cycles that prioritize volume over craftsmanship. 
            </p>
            <p className="text-xs text-luxury-grey leading-relaxed">
              Instead, our designers drew inspiration from the classic European Riviera lifestyle: high-waisted linen trousers swaying in the sea breeze, textured silk scarves keeping hair in place during coastal drives, and structured double-breasted blazers worn over the shoulders at candlelit dinners.
            </p>
          </div>
          <div className="aspect-[4/5] bg-luxury-beige rounded overflow-hidden shadow-xs border border-luxury-black/5">
            <img 
              src="/assets/hero_editorial.png" 
              alt="Linen suit details" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Big Quote Divider */}
        <div className="text-center py-16 border-t border-b border-luxury-black/5 about-reveal space-y-6">
          <blockquote className="font-editorial text-2xl sm:text-3.5xl font-light text-luxury-black italic max-w-3xl mx-auto leading-normal">
            "We do not design collections for a single season. We create silent heirlooms designed to be worn, loved, and passed down."
          </blockquote>
          <p className="text-[10px] tracking-widest text-luxury-gold uppercase font-semibold">
            — THE BELLEMONT DESIGN STUDIO
          </p>
        </div>

        {/* Row 2: Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center about-reveal md:flex-row-reverse">
          <div className="aspect-[4/5] bg-luxury-beige rounded overflow-hidden shadow-xs border border-luxury-black/5 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80" 
              alt="Tailoring linen fabric" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 text-left md:order-1">
            <span className="text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-semibold">OUR FABRICS</span>
            <h2 className="font-editorial text-3xl font-light text-luxury-black tracking-wide leading-tight uppercase">
              The Artisan <br /> Craftsmanship
            </h2>
            <p className="text-xs text-luxury-grey leading-relaxed">
              Craftsmanship is not a checkbox; it is our foundation. Every Bellemont piece is made using responsibly sourced materials of the highest order. 
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start space-x-3 text-xs">
                <ShieldCheck size={16} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Organic Linen:</strong> Sourced from Belgian flax cooperatives, woven to a heavy, breathable weight that creases with beautiful character.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <Heart size={16} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Mulberry Silk:</strong> Sourced from Italian mills in Lake Como, twilled and printed with archival borders, finished with hand-rolled hems.
                </span>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <Sparkles size={16} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Italian Cotton Poplin:</strong> Crisp, structured, and double-washed to ensure maximum softness and structure on our shirts and midi dresses.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* 3. HERO CALL TO ACTION COLLECTION */}
      <section className="bg-luxury-black text-luxury-ivory py-24 text-center about-reveal">
        <div className="max-w-3xl mx-auto px-6 space-y-6 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-semibold">THE DIARY</span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-wide uppercase">
            Step Into Our Boutique
          </h2>
          <p className="text-xs text-luxury-grey max-w-md leading-relaxed font-light pl-1">
            Discover a curated collection of dresses, tailored trousers, premium leather shoes, and georgette chiffon hijabs.
          </p>
          <div className="pt-4">
            <Link 
              to="/collection/shoes" 
              className="luxury-btn-alt border-luxury-ivory bg-luxury-ivory text-luxury-black hover:bg-transparent hover:text-luxury-ivory text-xs flex items-center space-x-1.5"
            >
              <span>Explore Shoes</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
