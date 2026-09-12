import React, { useState, useRef, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

/**
 * SearchBar using OpenStreetMap Nominatim geocoding API.
 * Free — no API key required.
 * Calls onPlaceChanged({ lat, lng }) when user selects a result.
 */
const SearchBar = ({ onPlaceChanged }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimer = useRef(null);

  const fetchSuggestions = useCallback(async (value) => {
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=6`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      setSuggestions(data);
      setShowDropdown(data.length > 0);
    } catch (err) {
      console.error('Nominatim search error:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(value), 400);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    setShowDropdown(false);
    onPlaceChanged({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar w-full mb-4 flex justify-center items-center">
      <form
        className="w-full max-w-[500px] relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative">
          <div className="icons">
            {loading
              ? <svg className="animate-spin w-5 h-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              : <MagnifyingGlassIcon width={24} className="text-teal-400" />
            }
          </div>
          <input
            type="text"
            name="search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="Search destinations"
            className="pl-10 text-gray-800 focus:outline-none"
            autoComplete="off"
          />
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-72 overflow-y-auto"
            onMouseDown={(e) => e.preventDefault()} // keep focus on input
          >
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSelect(place)}
                className="px-4 py-3 cursor-pointer hover:bg-teal-50 text-sm text-gray-700 border-b border-gray-100 last:border-0 flex items-start gap-2"
              >
                <span className="mt-0.5 text-teal-400 shrink-0">📍</span>
                <span className="leading-snug">{place.display_name}</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;