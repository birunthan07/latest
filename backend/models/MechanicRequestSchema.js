const mongoose = require('mongoose');

const mechanicRequestSchema = new mongoose.Schema({
  location: {
    address: String,
    coordinates: {
      type: [Number],  // [longitude, latitude]
      index: '2dsphere'  // Allows for geospatial queries
    }
  },
  serviceType: {
    type: String,
    required: true  // Assuming a service type is required for mechanic requests
  },
  additionalNotes: {
    type: String,
    default: ''  // Optional field for any extra information
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user making the request
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'canceled'],  // Possible statuses for the request
    default: 'pending'
  }
});

module.exports = mongoose.model('MechanicRequest', mechanicRequestSchema);
