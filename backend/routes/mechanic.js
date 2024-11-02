// src/routes/mechanic.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Mechanic = require('../models/ mechanicmodel'); // Updated to use the Mechanic model
const authMiddleware = require('../middleware/authMiddleware');




// Define the upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Create the upload directory if it does not exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Customize the file name
    }
});

const upload = multer({ storage });

// POST /api/mechanic/register - Register Mechanic with document uploads
router.post('/register', 
    upload.single('verificationCertificate'), // Only require one file upload for verification certificate
    async (req, res) => {
        const { username, email, password, vehicleType } = req.body;

        try {
            let mechanic = await Mechanic.findOne({ email });
            if (mechanic) {
                return res.status(400).json({ msg: 'Mechanic already exists' });
            }

            if (!req.file) { // Check for the uploaded verification certificate
                return res.status(400).json({ msg: 'Verification certificate must be uploaded' });
            }

            mechanic = new Mechanic({
                username,
                email,
                password,
                vehicleType,
                verificationCertificate: req.file.path, // Save the path to the uploaded certificate
                isApproved: false
            });

            await mechanic.save();

            const payload = {
                mechanic: {
                    id: mechanic.id,
                    role: 'mechanic'
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, role: 'mechanic' });
                }
            );
        } catch (error) {
            console.error('Registration Error:', error);
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ errors });
            }
            res.status(500).json({ message: 'Registration failed. Please try again.' });
        }
    }
);

// POST /api/mechanic/login - Login Mechanic
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let mechanic = await Mechanic.findOne({ email });
        if (!mechanic) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, mechanic.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            mechanic: {
                id: mechanic.id,
                role: 'mechanic'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: 'mechanic' });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all users (mechanics)
router.get('/mechanics', async (req, res) => {
    try {
        const users = await Mechanic.find(); // Use the Mechanic model or User model as appropriate
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error retrieving users. Please try again.' });
    }
});

// Get a single user by ID
router.get('/mechanics/:id', async (req, res) => {
    try {
        const user = await Mechanic.findById(req.params.id); // Use Mechanic model to find by ID
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user); // Return the user data
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error retrieving user. Please try again.' });
    }
});

// Update a mechanic by ID
router.put('/mechanics/:id', async (req, res) => {
    const { username, email, password, vehicleType } = req.body;
    const updates = { username, email, password, vehicleType };

    try {
        const mechanic = await Mechanic.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }); // Update and return the new document
        if (!mechanic) {
            return res.status(404).json({ msg: 'Mechanic not found' });
        }
        res.status(200).json(mechanic); // Return the updated mechanic data
    } catch (error) {
        console.error('Error updating mechanic:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error updating mechanic. Please try again.' });
    }
});

// Block a mechanic by ID
router.put('/mechanics/:id/block', async (req, res) => {
    try {
        const mechanic = await Mechanic.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true }); // Update to block the mechanic
        if (!mechanic) {
            return res.status(404).json({ msg: 'Mechanic not found' });
        }
        res.status(200).json({ msg: 'Mechanic blocked successfully', mechanic });
    } catch (error) {
        console.error('Error blocking mechanic:', error);
        res.status(500).json({ message: 'Error blocking mechanic. Please try again.' });
    }
});



// GET /api/mechanics/search?lat={latitude}&lng={longitude}&vehicleType={type}
router.get('/search', async (req, res) => {
    try {
        const { lat, lng, vehicleType } = req.query;
        
        // Validate required parameters
        if (!lat || !lng || !vehicleType) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        // Fetch mechanics based on location and vehicle type
        const mechanics = await Mechanic.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 10000 // distance in meters (e.g., 10 km)
                }
            },
            vehicleTypesServiced: vehicleType // assuming the mechanic model has this field
        });

        res.json(mechanics);
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;  
