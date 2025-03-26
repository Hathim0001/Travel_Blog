const { Schema, model } = require('mongoose');

const placeSchema = new Schema({
  placeId: {
    type: String,
    required: true,
  },
  placeName: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: String,
  },
  tags: {
    type: String,
  },
  thumbnail_url: {
    type: String,
  },
});

const Place = model('Place', placeSchema);
module.exports = Place;