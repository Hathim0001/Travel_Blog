import React, { useState, useEffect, createRef } from 'react';
import PlaceDetails from './PlaceDetails';

const typeConfig = {
  attractions: { emoji: '🏛️', label: 'Attractions', color: '#14b8a6' },
  restaurants:  { emoji: '🍽️', label: 'Restaurants', color: '#f97316' },
  hotels:       { emoji: '🏨', label: 'Hotels',      color: '#6366f1' },
};

const List = ({ places, type, setType, rating, setRating, childClicked, loading, setChildClicked }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  const activeColor = typeConfig[type]?.color || '#14b8a6';

  return (
    <div style={{
      width: '100%',
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      overflow: 'hidden',
      marginRight: '12px',
    }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#aaa', marginBottom: 10, textTransform: 'uppercase' }}>
          Explore Nearby
        </p>

        {/* Category Toggle Chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setType(key)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 10,
                border: type === key ? `2px solid ${cfg.color}` : '2px solid #eee',
                background: type === key ? `${cfg.color}18` : '#fafafa',
                color: type === key ? cfg.color : '#888',
                fontWeight: type === key ? 700 : 500,
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <span>{cfg.emoji}</span>
              <span>{cfg.label}</span>
            </button>
          ))}
        </div>

        {/* Rating Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#888', fontWeight: 600, flexShrink: 0 }}>Min Rating:</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ label: 'All', value: 0 }, { label: '3+', value: 3 }, { label: '4+', value: 4 }, { label: '4.5+', value: 4.5 }].map(opt => (
              <button
                key={opt.value}
                onClick={() => setRating(opt.value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  border: Number(rating) === opt.value ? `1.5px solid ${activeColor}` : '1.5px solid #e5e7eb',
                  background: Number(rating) === opt.value ? activeColor : '#f9fafb',
                  color: Number(rating) === opt.value ? '#fff' : '#555',
                  fontWeight: 600,
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS COUNT ── */}
      {!loading && (
        <div style={{ padding: '10px 20px 6px', flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: '#999' }}>
            {places?.length > 0
              ? <><strong style={{ color: '#333' }}>{places.length}</strong> places found</>
              : 'No results — try moving the map or changing filters'}
          </span>
        </div>
      )}

      {/* ── SCROLLABLE LIST ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 12px' }}>
        {loading ? (
          /* Loading Skeleton */
          Array(4).fill(0).map((_, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: '12px 8px',
              borderBottom: '1px solid #f5f5f5', animation: 'pulse 1.5s infinite',
            }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, background: '#e5e7eb', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, background: '#e5e7eb', borderRadius: 6, marginBottom: 8, width: '70%' }} />
                <div style={{ height: 11, background: '#f0f0f0', borderRadius: 6, marginBottom: 6, width: '50%' }} />
                <div style={{ height: 11, background: '#f0f0f0', borderRadius: 6, width: '80%' }} />
              </div>
            </div>
          ))
        ) : places?.length > 0 ? (
          places.map((place, i) => (
            <div key={i} ref={elRefs[i]} onClick={() => setChildClicked(i, place)}>
              <PlaceDetails
                place={place}
                selected={Number(childClicked) === i}
                refProp={elRefs[i]}
                accentColor={activeColor}
              />
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#bbb' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
            <p style={{ fontSize: 13, color: '#aaa', fontWeight: 500 }}>
              Zoom in on the map to discover nearby places
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;