import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useMediaQuery } from '@mui/material';
import Rating from '@mui/material/Rating';
import L from 'leaflet';

// Fix Leaflet default marker icon paths broken by webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ─── Custom pin icons ─────────────────────────────────────────────────────────
// Use jsDelivr CDN — raw GitHub URLs trigger OpaqueResponseBlocking / CORS errors
// in Chrome because GitHub sets "X-Content-Type-Options: nosniff" on raw files.
const ICON_BASE = 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img';

const makeIcon = (color) =>
  new L.Icon({
    iconUrl:      `${ICON_BASE}/marker-icon-2x-${color}.png`,
    shadowUrl:    markerShadow,
    iconSize:     [25, 41],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -34],
    shadowSize:   [41, 41],
  });

const tealIcon = makeIcon('green');
const redIcon  = makeIcon('red');
const blueIcon = makeIcon('blue');

const getMarkerIcon = (type) => {
  if (type === 'restaurants') return redIcon;
  if (type === 'hotels')      return blueIcon;
  return tealIcon;
};

// ─── MapUpdater ───────────────────────────────────────────────────────────────
const MapUpdater = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      map.flyTo([coords.lat, coords.lng], coords.zoom || 14, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
};

// ─── MapEventHandler ──────────────────────────────────────────────────────────
const MapEventHandler = ({ setBounds, setZoom }) => {
  useMapEvents({
    moveend: (e) => {
      const map    = e.target;
      const bounds = map.getBounds();
      setBounds({
        ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
        sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
      });
      setZoom(map.getZoom());
    },
    zoomend: (e) => {
      const map    = e.target;
      const bounds = map.getBounds();
      setBounds({
        ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
        sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
      });
      setZoom(map.getZoom());
    },
  });
  return null;
};

// ─── OnMapReady ───────────────────────────────────────────────────────────────
const OnMapReady = ({ setBounds, setZoom }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = map.getBounds();
    setBounds({
      ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    });
    setZoom(map.getZoom());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

// ─── LocateMeButton ───────────────────────────────────────────────────────────
// Floating "📍 My Location" button rendered inside MapContainer so it can call
// useMap().flyTo() directly.  Uses a two-attempt geolocation strategy:
//   1st – fast IP/WiFi (enableHighAccuracy:false, 8 s)
//   2nd – GPS        (enableHighAccuracy:true,  20 s)
const LocateMeButton = ({ setCoords }) => {
  const map                     = useMap();
  const [locating, setLocating] = useState(false);
  const [errMsg,   setErrMsg]   = useState('');

  const handleLocate = async () => {
    setLocating(true);
    setErrMsg('');

    const flyTo = (lat, lng) => {
      setCoords({ lat, lng });
      map.flyTo([lat, lng], 15, { duration: 1.5 });
      setLocating(false);
    };

    const fallbackToIP = async () => {
      try {
        const res  = await fetch('http://ip-api.com/json/?fields=lat,lon,status');
        const data = await res.json();
        if (data.status === 'success' && data.lat && data.lon) {
          flyTo(data.lat, data.lon);
          return;
        }
      } catch (e) {
        console.warn('IP geolocation failed:', e.message);
      }
      setLocating(false);
      setErrMsg('Location unavailable');
    };

    if (!navigator.geolocation) {
      await fallbackToIP();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => flyTo(latitude, longitude),
      async (err) => {
        console.warn('LocateMe browser geo failed:', err.message);
        await fallbackToIP();
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  return (
    <div
      style={{
        position:      'absolute',
        bottom:        28,
        right:         12,
        zIndex:        1000,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-end',
        gap:           6,
        pointerEvents: 'none',
      }}
    >
      {errMsg && (
        <span
          style={{
            background:    '#ef4444',
            color:         '#fff',
            fontSize:      11,
            padding:       '3px 10px',
            borderRadius:  20,
            pointerEvents: 'none',
            whiteSpace:    'nowrap',
            boxShadow:     '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          {errMsg}
        </span>
      )}
      <button
        onClick={handleLocate}
        disabled={locating}
        title="Jump to my location"
        style={{
          pointerEvents:   'all',
          width:           44,
          height:          44,
          borderRadius:    '50%',
          border:          'none',
          background:      locating
            ? 'linear-gradient(135deg,#6366f1,#818cf8)'
            : 'linear-gradient(135deg,#0ea5e9,#0284c7)',
          color:           '#fff',
          cursor:          locating ? 'not-allowed' : 'pointer',
          boxShadow:       '0 4px 14px rgba(0,0,0,0.28)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          fontSize:        20,
          transition:      'transform 0.15s, box-shadow 0.15s, background 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!locating) {
            e.currentTarget.style.transform = 'scale(1.12)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.38)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.28)';
        }}
      >
        {locating ? '⏳' : '📍'}
      </button>
    </div>
  );
};

// ─── Map (main export) ────────────────────────────────────────────────────────
const Map = ({ coords, setCoords, setBounds, setZoom, places, type, setChildClicked }) => {
  const isDesktop  = useMediaQuery('(min-width:600px)');
  const markerRefs = useRef([]);

  const center =
    coords?.lat && coords?.lng ? [coords.lat, coords.lng] : [20, 0];

  const categoryIcon = getMarkerIcon(type);

  return (
    <div
      style={{
        width:        '100%',
        height:       '75vh',
        borderRadius: 16,
        overflow:     'hidden',
        boxShadow:    '0 4px 24px rgba(0,0,0,0.13)',
        position:     'relative',
      }}
    >
      <MapContainer
        center={center}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        {/* OpenStreetMap standard tiles — completely free, no API key, no watermarks */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          subdomains="abc"
          maxZoom={19}
        />

        {/* Fly to new coords on parent update */}
        <MapUpdater coords={coords} />

        {/* Sync bounds & zoom on pan/zoom */}
        <MapEventHandler setBounds={setBounds} setZoom={setZoom} />

        {/* Capture initial bounds/zoom */}
        <OnMapReady setBounds={setBounds} setZoom={setZoom} />

        {/* My Location floating button */}
        <LocateMeButton setCoords={setCoords} />

        {/* Place markers */}
        {places?.map((place, i) => {
          const lat = Number(place.latitude || place.lat);
          const lng = Number(place.longitude || place.lng);
          if (!lat || !lng) return null;

          return (
            <Marker
              key={i}
              position={[lat, lng]}
              icon={isDesktop ? categoryIcon : L.Icon.Default}
              ref={(el) => { markerRefs.current[i] = el; }}
              eventHandlers={{ click: () => setChildClicked(i) }}
            >
              {isDesktop && (
                <Popup maxWidth={200} autoPan={false}>
                  <div style={{ minWidth: 160, textAlign: 'center' }}>
                    <img
                      src={
                        place?.photo?.images?.medium?.url ||
                        place?.photo?.images?.large?.url ||
                        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=60'
                      }
                      alt={place.name}
                      style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 6 }}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=60';
                      }}
                    />
                    <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px', color: '#1a1a1a' }}>
                      {place.name}
                    </p>
                    {place.rating && (
                      <Rating value={Number(place.rating)} readOnly size="small" precision={0.5} />
                    )}
                    {place.address && (
                      <p style={{ fontSize: 10, color: '#888', marginTop: 2 }}>📍 {place.address}</p>
                    )}
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;