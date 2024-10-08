const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require("socket.io");  // Corrected socket.io import
const http = require("http");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const mechanicRoutes = require('./routes/mechanic');
const adminRoutes = require('./routes/admin');
const mechanicRequestRouter = require('./routes/MechanicRequestSchema');
const paymentRoutes = require('./routes/payment');
const packageRoutes = require('./routes/packageRoutes');


dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000; // Set default PORT if not defined

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Register user routes
app.use('/api/auth', authRoutes);
app.use('/api/mechanic', mechanicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mechanic-request', mechanicRequestRouter);
app.use('/api/payment', paymentRoutes);
app.use('/api/packages', packageRoutes);

// Create HTTP server and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your frontend URL
        methods: ["GET", "POST"]
    }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
    },
});

// Socket.io connection
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("message", "Welcome to the mechanic finder app!");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Example route to send an email
app.post("/api/send-email", (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Email sent: " + info.response);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
