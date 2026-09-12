import React from 'react';
import { Link } from 'react-scroll';

// ✅ Importing the local video file
import Video from '../../assets/screenshots/trip-tide.mp4';

const Hero = () => {
  return (
    <div className="hero w-full h-screen relative text-white overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        id="video"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={Video} type="video/mp4" />
      </video>

      {/* Modern Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center flex flex-col items-center justify-center">
        <h1 
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-2xl"
          style={{
            background: 'linear-gradient(to right, #ffffff, #d1fae5, #e0f2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          An Ocean of Possibilities
        </h1>
        
        <p 
          className="text-lg md:text-2xl font-light tracking-wide text-blue-100 max-w-2xl mb-8 uppercase"
          style={{
            letterSpacing: '4px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          The Whole World Awaits
        </p>

        <Link to="search" smooth={true} duration={500} offset={-70}>
          <button 
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-400 to-sky-500 rounded-full font-bold text-white uppercase tracking-wider overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.75)] cursor-pointer"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </Link>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <span className="text-xs uppercase tracking-widest text-teal-200/80 font-medium">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-teal-200/50 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-teal-300 rounded-full" style={{ animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
