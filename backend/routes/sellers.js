// Import modules
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define GET route to retrieve sellers data
router.get('/', (req, res) => {
    try {
        const sellers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sellers.json'), 'utf8'));
        res.json(sellers);
    } catch (error) {
        console.error('Error handling GET / request for sellers:', error);
        res.status(500).send('Error reading sellers data.');
    }
});

// Export the router for use in other parts of the API
module.exports = router;