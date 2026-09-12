import React from 'react';
import Data from './Data/Discover-Data';

const Discover = () => {
  const destinations = Data;

  return (
    <div name="discover" className="discover w-full min-h-screen py-20 bg-gray-50 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl px-6 mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-500 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-teal-50 rounded-full border border-teal-200">
            Destinations
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900 tracking-tight">
            Discover Dreamy Destinations
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-md mx-auto">
            Explore the most sought-after cities, beaches, and historic landmarks across the globe.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {destinations.map((city, i) => (
            <div 
              key={i} 
              className="group relative h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10 transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Image */}
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Text / Links Container */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-teal-300 font-bold mb-1">
                  Destination
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight mb-2">
                  {city.name}
                </h3>
                <p className="text-gray-200 text-xs md:text-sm font-light mb-4 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {city.description}
                </p>
                
                {/* Links Row */}
                <div className="flex gap-4 border-t border-white/20 pt-4 text-xs font-semibold text-teal-200">
                  <a href="#book" className="hover:text-white transition-colors flex items-center gap-1">
                    ✈️ Flights
                  </a>
                  <span>•</span>
                  <a href="#search" className="hover:text-white transition-colors flex items-center gap-1">
                    🏨 Hotels
                  </a>
                  <span>•</span>
                  <a href="#search" className="hover:text-white transition-colors flex items-center gap-1">
                    🚗 Cars
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
