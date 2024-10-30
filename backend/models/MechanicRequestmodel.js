// // models/MechanicRequestSchema.js
// const mongoose = require('mongoose');

// const MechanicRequestSchema = new mongoose.Schema({
//   location: {
//     address: {
//       type: String,
//       required: true
//     },
//     coordinates: {
//       type: { type: String, default: "Point" },
//       coordinates: {
//         type: [Number],
//         required: true
//       }
//     }
//   },
//   serviceType: {
//     type: String,
//     required: true
//   },
//   numPassengers: {
//     type: Number,
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// MechanicRequestSchema.index({ "location.coordinates": "2dsphere" });

// module.exports = mongoose.model('MechanicRequest', MechanicRequestSchema);


const mongoose = require('mongoose');

const MechanicRequestSchema = new mongoose.Schema({
    location: {
        address: { type: String, required: true },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    serviceType: { type: String, required: true },
    numPassengers: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MechanicRequest', MechanicRequestSchema);

