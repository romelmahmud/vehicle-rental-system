# Vehicle Rental Management System

A complete backend API for managing vehicles, bookings, and customers.

## Technology stack

- Node.js
- Express js
- TypeScript
- PostgreSQL
- Bcrypt
- JWT (jsonwebtoken)

---

## Features

- User registration & login
- JWT-based authentication
- Protected routes using JWT (Bearer token)
- Role-based middleware for authorization
- Admin can manage users
- Admin can Add, update & delete vehicles
- Customers can book vehicles
- Encrypted passwords using bcrypt

---

## Setup & Instructions

### **Clone the Repository**

```bash
git clone https://github.com/romelmahmud/vehicle-rental-system.git
cd vehicle-rental-system
```

### **Install Dependencies**

```
npm install
```

### **Environment Variables**

set up environment variables on .env file

```
CONNECTION_STR=postgresql/noendb_connetion_string
PORT=your_port
JWT_SECRET=your_secret
```

### **Run the Server**

```
npm run dev
```

## GitHub Repository

https://github.com/romelmahmud/vehicle-rental-system

---

## Live URL

https://assingment-2-five.vercel.app/
