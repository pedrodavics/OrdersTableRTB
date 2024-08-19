// Import modules
const fs = require('fs');
const path = require('path');

//Define the path to the orders data file
const ordersFilePath = path.join(__dirname, '../data/orders.json');
const sellersFilePath = path.join(__dirname, '../data/sellers.json;')

// Funcition to read and parse orders data from the JSON file
function getOrders() {
   try {
    return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
   } catch (error) {
      console.error('Error reading orders file:', error);
      throw new Error('Could not read orders data');
   }
}

// Set up Express router
const express = require('express');
const router = express.Router();

// Define GET route to retrieve orders
router.get('/', (req, res) => {
   try {
        const orders = getOrders();
        res.json(orders);
      } catch(error) {
         console.error('Error handling GET / request:', error);
         res.status(500).send('Error reading orders data.');
     }
});

// Export the router for use in other parts of the API
module.exports = router;