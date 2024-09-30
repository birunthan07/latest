const express = require('express');
const router = express.Router();
const MechanicRequest = require('../models/MechanicRequestSchema');  // Adjust the path as needed
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { location, serviceType, numPassengers } = req.body;

    // Check for authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newMechanicRequest = new MechanicRequest({
      location: {
        address: location,
        coordinates: req.body.locationCoords, // Assuming you are sending coordinates for the location
      },
      serviceType,
      numPassengers,  // You might want to adjust this field depending on your requirements
      userId: req.user._id,  // Assuming you have user authentication in place
    });

    await newMechanicRequest.save();
    res.status(201).json({ message: 'Mechanic request created successfully', mechanicRequest: newMechanicRequest });
  } catch (error) {
    console.error('Error creating mechanic request:', error);
    res.status(500).json({ message: 'Error creating mechanic request' });
  }
});

module.exports = router;
