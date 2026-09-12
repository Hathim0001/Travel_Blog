import React from 'react';
import Rating from '@mui/material/Rating';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=60';

const PlaceDetails = ({ place, selected, refProp, accentColor = '#14b8a6' }) => {
  React.useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selected, refProp]);

  const imgUrl = place?.photo?.images?.medium?.url || place?.photo?.images?.large?.url || FALLBACK_IMG;

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 8px',
        borderRadius: 12,
        marginBottom: 4,
        background: selected ? `${accentColor}10` : 'transparent',
        border: selected ? `1.5px solid ${accentColor}40` : '1.5px solid transparent',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div style={{ flexShrink: 0, width: 80, height: 80, borderRadius: 10, overflow: 'hidden', background: '#f0f0f0' }}>
        <img
          src={imgUrl}
          alt={place.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Name */}
        <p style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {place.name}
        </p>

        {/* Rating row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          {place.rating ? (
            <>
              <Rating value={Number(place.rating)} readOnly size="small" precision={0.5}
                sx={{ fontSize: 13 }} />
              <span style={{ fontSize: 11, color: '#888' }}>
                {place.rating} ({place.num_reviews} reviews)
              </span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: '#bbb' }}>No rating yet</span>
          )}
        </div>

        {/* Cuisine tags */}
        {place?.cuisine?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
            {place.cuisine.slice(0, 3).map(({ name }) => (
              <span key={name} style={{
                fontSize: 10, padding: '2px 8px',
                borderRadius: 20, background: `${accentColor}18`,
                color: accentColor, fontWeight: 600,
              }}>
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Address */}
        {place?.address && (
          <p style={{
            fontSize: 11, color: '#888', marginBottom: 2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            📍 {place.address}
          </p>
        )}

        {/* Price + Ranking */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
          {place?.price_level && (
            <span style={{ fontSize: 11, color: '#666' }}>💰 {place.price_level}</span>
          )}
          {place?.ranking && (
            <span style={{
              fontSize: 10, color: accentColor, fontWeight: 700,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              maxWidth: 180,
            }}>
              🏆 {place.ranking}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          {place?.web_url && (
            <button
              onClick={() => window.open(place.web_url, '_blank')}
              style={{
                padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: accentColor, color: '#fff', border: 'none', cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => e.target.style.opacity = 0.8}
              onMouseOut={e => e.target.style.opacity = 1}
            >
              TripAdvisor
            </button>
          )}
          {place?.website && (
            <button
              onClick={() => window.open(place.website, '_blank')}
              style={{
                padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: 'transparent', color: accentColor,
                border: `1.5px solid ${accentColor}`, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.target.style.background = accentColor; e.target.style.color = '#fff'; }}
              onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = accentColor; }}
            >
              Website
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
