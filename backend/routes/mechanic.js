// src/routes/mechanic.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const sendEmail = require('../utils/email');
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

module.exports = router;  
