import React from 'react';
import Data from './Data/Book-Data';

const Book = () => {
  const destinations = Data;

  // display return date if `round trip` is selected
  const roundTripHandleChange = event => {
    document.getElementById('return-date').style.visibility =
      event.checked && event.id === 'round-trip' ? 'hidden' : 'visible';
  };

  // hide return date if `one way` is selected
  const oneWayHandleChange = event => {
    document.getElementById('return-date').style.visibility =
      event.checked && event.id === 'one-way' ? 'visible' : 'hidden';
  };

  return (
    <div name="book" className="book w-full min-h-screen py-20 bg-white flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-6 mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-teal-500 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-teal-50 rounded-full border border-teal-200">
            Book Flights & Packages
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900 tracking-tight">
            Spend Less. Travel More.
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-md mx-auto">
            Book your flights and complete vacation packages with our trusted premium partners.
          </p>
        </div>

        {/* Flight Search Card */}
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 mb-16">
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            
            {/* Trip Type Selector */}
            <div className="flex gap-6 mb-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="round-trip"
                  name="trip-type"
                  value="round-trip"
                  onChange={roundTripHandleChange}
                  defaultChecked
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">Round-Trip</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="one-way"
                  name="trip-type"
                  value="one-way"
                  onChange={oneWayHandleChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">One-Way</span>
              </label>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">From</label>
                <input 
                  type="text" 
                  placeholder="Origin city or airport" 
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">To</label>
                <input
                  type="text"
                  placeholder="Destination city or airport"
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Passengers</label>
                <select className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                </select>
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div id="departure-date" className="w-full">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Departure Date</label>
                <input 
                  type="date" 
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              <div id="return-date" className="w-full">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Return Date</label>
                <input 
                  type="date" 
                  className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <button className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.3)] active:scale-95 cursor-pointer">
                  Find Your Trip
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Deals Section */}
        <div className="w-full">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Don't Miss These Exclusive Deals
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Hand-picked complete vacation packages for your next dream escape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {destinations.map((city, i) => (
              <div 
                key={city.name || i} 
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  <img 
                    src={city.image} 
                    alt={city.imgAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-teal-600">
                    Deal
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
                        {city.name}
                      </h4>
                      <span className="text-teal-600 font-extrabold text-xl shrink-0">
                        {city.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                      {city.deal}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 text-xs border-t border-gray-100 pt-4 mt-auto">
                    <span>Per person</span>
                    <button className="py-2 px-5 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer">
                      View Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
