// src/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const mechanicRoutes = require('./routes/mechanic'); // Updated to use mechanic routes
const adminRoutes = require('./routes/admin'); // Import admin routes
const mechanicRequestRouter = require('./routes/MechanicRequestSchema'); // Adjust path as needed

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization'
}));

// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded bodies

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Register user routes
app.use('/api/auth', authRoutes);

// Register mechanic routes
app.use('/api/mechanic', mechanicRoutes); // Updated to include mechanic routes

// Register admin routes
app.use('/api/admin', adminRoutes); // Add this line to include admin routes

// Use the mechanic request router
app.use('/api/mechanic-request', mechanicRequestRouter); // All routes defined in the router will now be prefixed with /api

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
