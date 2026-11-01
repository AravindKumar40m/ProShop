# ProShop - MERN E-commerce

A full-stack online store with product browsing, a cart, PayPal checkout and an admin panel.

**Live:** https://proshop-xgsa.onrender.com/ (free hosting - the first load can take a minute while the server wakes up)

## Features
- Browse products, view product details, add to cart
- Register and log in (JWT stored in an HTTP-only cookie)
- Shipping address, payment method and order review steps
- **PayPal checkout** and order history in the user profile
- **Admin panel:** manage products (create, edit, delete, image upload), users and orders
- Redux Toolkit state, React-Bootstrap UI

## Tech stack
React, Redux Toolkit, React-Bootstrap · Node.js, Express · MongoDB, Mongoose · JWT · PayPal · Multer (image upload)

## Run it
Create `.env` in the project root:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```
```bash
npm install && npm install --prefix frontend
npm run data:import     # loads sample products and users
npm run dev             # API and React app together
```
