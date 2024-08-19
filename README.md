# Orders Management Table

### A full-stack application built with Node.js, Express, and Vue.js for managing orders. This application displays a table, where users can filter orders by products, countries and users can navigate between pages using pagination buttons.

![OrdersTable](https://github.com/user-attachments/assets/c88379d4-36f3-4d05-88b7-79071d0047b5)

## Requirements
Before running this project, make sure you have the following installed:
- Node.js v20.16.0 or higher
- npm version 10.8.2 or higher

## Additional Dependencies:
- Express - Backend framework.
- Vue.js - Frontend framework.
- Vue Router - For managing routes in the frontend.
- Axios - For making HTTP requests.
- CORS - For enabling Cross-Origin Resource Sharing.

## Installation
### Follow these steps to set up and run the project:

> 1. Navigate to the project directory:
```bash
cd OrdersTableRTB
 ```   
> 2. Instal backend dependencies:
```bash
cd backend
npm install express cors
```   
> 2. Instal frontend dependencies:
```bash
cd ../frontend
npm install vue@next vue-router@4 axios
```   

## Run the application
> To start the backend server:
```bash
cd ../backend
node server.js
```
> To start the frontend development server:
```bash
cd ../frontend
npm run serve
```
## Usage
Once the application is running:
- Visit http://localhost:8080 to access the frontend.
- Navigate to the "Orders" page to view and manage the orders.
- Use the filters at the top of the table to sort and filter the orders based on product type and country.
- Use the pagination buttons to move between pages of orders.

