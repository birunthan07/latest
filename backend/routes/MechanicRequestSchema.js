

const express = require('express');
const router = express.Router();
const MechanicRequest = require('/home/uki-jaffna/Documents/mechanic/backend/models/MechanicRequestSchema.js');
const authMiddleware = require('/home/uki-jaffna/Documents/mechanic/backend/middleware/authMiddleware.js');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { location, serviceType, locationCoords, numPassengers } = req.body;

    // Check for authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newMechanicRequest = new MechanicRequest({
      location: {
        address: location,
        coordinates: locationCoords,
      },
      serviceType,
      numPassengers,
      userId: req.user._id,
    });

    await newMechanicRequest.save();
    res.status(201).json({ message: 'Mechanic request created successfully', mechanicRequest: newMechanicRequest });
  } catch (error) {
    console.error('Error creating mechanic request:', error);
    res.status(500).json({ message: 'Error creating mechanic request' });
  }
});

module.exports = router;
