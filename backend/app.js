const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const cors = require('cors'); // Import cors
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Perbaiki dengan menambahkan () dan opsi
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:3000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // If using cookies or other credentials
};
app.use(cors(corsOptions));

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/test', (req, res) => {
     const origin = req.get('origin');
    console.log(origin);
    res.send('Server is working');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});