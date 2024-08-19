const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Setup CORS middleware
app.use(cors());

// Setup JSON parsing middleware
app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orders'));
app.use('/api/sellers', require('./routes/sellers'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});