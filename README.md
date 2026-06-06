# Mini E-Commerce Backend API

## Overview

This project is a RESTful backend API for an e-commerce application built using Node.js and Express.js.

It provides authentication, product management, cart functionality, order management, payment handling, and email notifications.

The purpose of this project is to demonstrate backend development concepts such as REST APIs, authentication, middleware, file handling, and business logic implementation.

---

## Features

* User Authentication
* Product Management
* Shopping Cart Management
* Order Management
* Payment Processing Simulation
* Email Notifications
* Protected Routes using JWT Authentication
* JSON File Based Storage
* REST API Architecture

---

## Tech Stack

* JavaScript (ES6+)
* Node.js
* Express.js
* JWT Authentication
* Bcrypt
* Nodemailer
* JSON Storage

---

## Project Structure

```text
mini-ecommerce-backend/
│
├── controllers/
├── middleware/
├── routes/
├── utils/
├── data/
│   ├── users.json
│   ├── products.json
│   ├── cart.json
│   ├── orders.json
│   └── payments.json
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>

cd mini-ecommerce-backend
```

## Install Dependencies

```bash
npm install
```

## Create Environment Variables

Create a `.env` file:

```env
PORT=5000

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_app_password
```

## Start Development Server

```bash
npm run dev
```

OR

## Start Production Server

```bash
npm start
```

---

# API Modules

## Authentication

### Register User

```http
POST /auth/register
```

### Login User

```http
POST /auth/login
```

---

## Products

### Get Products

```http
GET /products
```

### Add Product

```http
POST /products
```

---

## Cart

### Add To Cart

```http
POST /cart
```

### Get Cart Items

```http
GET /cart
```

---

## Orders

### Create Order

```http
POST /orders
```

### Get Orders

```http
GET /orders
```

---

## Payments

### Create Payment

```http
POST /payments
```

### Get Payment Details

```http
GET /payments/:id
```

---



---

# Email Notifications

This project uses Nodemailer for sending:

* Order Confirmation Emails
* Payment Success Emails
* Notification Emails

---

# Example Response

```json
{
  "success": true,
  "message": "Order created successfully"
}
```

---

# .gitignore

Create a `.gitignore` file:

```text
node_modules/
.env
```

---

# Future Improvements

* Database Integration (MongoDB / SQL)
* Role Based Access Control
* Admin Dashboard
* Payment Gateway Integration
* Docker Support
* Deployment

---

# Learning Outcomes

This project demonstrates:

* REST API Development
* Authentication and Authorization
* Middleware Usage
* Backend Architecture
* File Handling
* Error Handling
* Business Logic Implementation

---



---

# License

MIT License
