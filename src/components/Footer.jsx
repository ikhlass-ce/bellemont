import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Pin as Pinterest, Video } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#050505] text-[#fafaf7] pt-24 pb-12 border-t border-[#050505] font-sans font-light select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* TOP ROW: Large typography logo & subscription newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-10 pb-16 border-b border-white/10">
          <div className="space-y-4 text-left">
            {/* Giant clean branding logo */}
            <h2 className="font-editorial text-4xl sm:text-6xl font-light tracking-[0.25em] uppercase text-white leading-none">
              BELLEMONT
            </h2>
            <p className="text-[10px] tracking-[0.35em] text-luxury-grey uppercase font-light pl-0.5">
              "Timeless Elegance. Effortlessly Yours."
            </p>
          </div>

          {/* Minimalist Newsletter Form */}
          <div className="w-full lg:max-w-md space-y-4 text-left">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-luxury-gold">THE PRIVATE JOURNAL</h4>
            <p className="text-xs text-luxury-grey leading-relaxed">
              Subscribe to receive catalog previews, style guides, and private event bookings.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/20 pb-2 pt-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="bg-transparent text-xs w-full outline-none pr-8 placeholder:text-luxury-grey text-white font-light tracking-widest uppercase"
              />
              <button 
                type="submit" 
                className="absolute right-0 hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </form>
            {subscribed && (
              <p className="text-[9px] text-luxury-gold tracking-widest uppercase animate-fade-in">
                CONFIRMED. You have been added to our private list.
              </p>
            )}
          </div>
        </div>

        {/* MIDDLE ROW: Service column lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 py-16 border-b border-white/10 text-left">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-luxury-gold">La Maison</h4>
            <ul className="space-y-2.5 text-xs text-luxury-grey">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">Brand Heritage</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Design Studio</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Sustainability</a>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-luxury-gold">Client Services</h4>
            <ul className="space-y-2.5 text-xs text-luxury-grey">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Shipping & Logistics</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Returns & Exchanges</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-luxury-gold">Legal Profiles</h4>
            <ul className="space-y-2.5 text-xs text-luxury-grey">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms & Conditions</a>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors duration-300">My Account</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 text-[9px] text-luxury-grey tracking-[0.25em] uppercase gap-6">
          <p>© {new Date().getFullYear()} BELLEMONT. ALL RIGHTS RESERVED.</p>
          
          {/* Social icons */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Instagram">
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Pinterest">
              <Pinterest size={16} strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300" aria-label="TikTok">
              <Video size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
