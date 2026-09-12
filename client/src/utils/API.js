import axios from 'axios';

export const getPlaceData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.warn("RapidAPI failed (likely 429 limit). Falling back to mock data.");
    console.error(error.message);
    
    // Fallback mock data so the app remains "working" for the user
    const centerLat = (sw.lat + ne.lat) / 2;
    const centerLng = (sw.lng + ne.lng) / 2;
    
    return [
      {
        location_id: "mock-1",
        name: "Mock Location (API Limit Reached)",
        latitude: centerLat + 0.005,
        longitude: centerLng + 0.005,
        num_reviews: 150,
        rating: 4.5,
        address: "API rate limit exceeded. Showing mock data.",
        photo: { images: { large: { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=60" } } }
      },
      {
        location_id: "mock-2",
        name: "Test Restaurant",
        latitude: centerLat - 0.005,
        longitude: centerLng - 0.005,
        num_reviews: 80,
        rating: 4.0,
        address: "Nearby location fallback",
        photo: { images: { large: { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=60" } } }
      }
    ];
  }
};