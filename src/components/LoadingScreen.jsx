import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const letters = logoRef.current.children;
    
    // GSAP Timeline for opening animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the panel to reveal the application content
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.4,
          ease: 'power4.inOut',
          onComplete: onComplete
        });
      }
    });

    // Set initial states
    gsap.set(containerRef.current, { yPercent: 0 });
    gsap.set(letters, { opacity: 0, y: 30 });
    gsap.set(taglineRef.current, { opacity: 0, y: 15 });

    // Animate
    tl.to(letters, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out'
    })
    .to(taglineRef.current, {
      opacity: 0.6,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4')
    .to({}, { duration: 0.6 }); // Pause before sliding up

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#fafaf7] z-[9999] flex flex-col items-center justify-center select-none"
    >
      <div className="text-center">
        {/* Logo with spaced out letters */}
        <h1
          ref={logoRef}
          className="text-4xl sm:text-6xl md:text-7.5xl font-editorial tracking-[0.3em] text-luxury-black font-light uppercase flex justify-center pl-[0.3em]"
        >
          {Array.from("BELLEMONT").map((char, index) => (
            <span key={index} className="inline-block">
              {char}
            </span>
          ))}
        </h1>
        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-6 text-[9px] sm:text-xs font-sans tracking-[0.45em] uppercase text-luxury-black pl-[0.45em] font-light"
        >
          Timeless Elegance. Effortlessly Yours.
        </p>
      </div>

      {/* Decorative vertical slider indicator */}
      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="w-[1px] h-12 bg-luxury-black/10 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-luxury-gold origin-top"
            style={{
              animation: 'draw-line 2s cubic-bezier(0.16, 1, 0.3, 1) infinite'
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes draw-line {
          0% { transform: scaleY(0); transform-origin: top; }
          40% { transform: scaleY(1); transform-origin: top; }
          60% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
