import React from 'react';

const stats = [
  { value: '50+', label: 'Dream Destinations' },
  { value: '10K+', label: 'Happy Explorers' },
  { value: '4.9★', label: 'Average Review' },
];

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1542082873-c1d89ae3a6ad?auto=format&fit=crop&w=600&q=80',
    title: 'Hawaii Beaches',
  },
  {
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    title: 'Kyoto Temples',
  },
  {
    src: 'https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?auto=format&fit=crop&w=600&q=80',
    title: 'Paris Streets',
  },
  {
    src: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=600&q=80',
    title: 'Maldives Overwater',
  },
];

const About = () => {
  return (
    <div name="about" className="about w-full min-h-screen py-20 bg-white flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-6 mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-500 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-teal-50 rounded-full border border-teal-200">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900 tracking-tight">
            Bringing The World To You
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-md mx-auto">
            We are dedicated to helping travelers discover unforgettable journeys and plan their next great getaway.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">
              Your Trusted Companion for Every Journey
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Our core belief is that travel should be accessible, exciting, and seamless for everyone. Whether you are looking for local restaurant highlights, booking flight options, or tracking historic destinations, our interactive platform has you covered.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              We aggregate coordinates, reviews, and categories from leading global data sources to bring you reliable information and help cure your wanderlust.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-2">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-teal-500">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className="relative h-40 md:h-48 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
