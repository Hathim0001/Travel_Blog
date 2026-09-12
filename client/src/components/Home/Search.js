import React, { useEffect, useState } from 'react';

import { getPlaceData } from '../../utils/API';
import SearchBar from './Search/SearchBar';
import List from './Search/List';
import Map from './Search/Map';

const Search = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [type, setType] = useState('attractions');
  const [rating, setRating] = useState(0);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [zoom, setZoom] = useState(14);

  const [loading, setLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);

  // 3-tier location strategy:
  //   1. Browser geolocation (most accurate)
  //   2. IP-based geolocation via ip-api.com (city-level, no permissions needed)
  //   3. Paris as absolute last resort
  useEffect(() => {
    const getIPLocation = async () => {
      try {
        const res  = await fetch('http://ip-api.com/json/?fields=lat,lon,status');
        const data = await res.json();
        if (data.status === 'success' && data.lat && data.lon) {
          console.info('Using IP-based location:', data.lat, data.lon);
          setCoords({ lat: data.lat, lng: data.lon });
          return;
        }
      } catch (e) {
        console.warn('IP geolocation also failed:', e.message);
      }
      // Absolute fallback
      setCoords({ lat: 48.8566, lng: 2.3522 });
    };

    if (!navigator.geolocation) {
      getIPLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn('Browser geolocation failed:', err.message);
        getIPLocation();
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  // Filter places by rating whenever rating selector changes
  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.rating > rating));
  }, [rating]);

  // Fetch nearby places whenever type or bounds change
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true);

      getPlaceData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          if (data && data.length) {
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('getPlaceData error:', err);
          setLoading(false);
        });
    }
  }, [type, bounds]);

  // Called when user selects a location from the Nominatim search dropdown
  const onPlaceChanged = ({ lat, lng }) => {
    setCoords({ lat, lng });
  };

  return (
    <div name="search" className="search w-full h-full md:h-screen relative p-4">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Let's Go</h1>
        <SearchBar onPlaceChanged={onPlaceChanged} />
        <div className="w-full flex flex-wrap flex-row-reverse md:flex-nowrap md:flex-row justify-center items-start">
          <div className="w-full max-w-md">
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              loading={loading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div className="w-full max-w-5xl">
            <Map
              coords={coords}
              setCoords={setCoords}
              setBounds={setBounds}
              setZoom={setZoom}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;