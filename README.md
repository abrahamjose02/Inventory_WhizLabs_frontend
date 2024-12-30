# Inventory WhizLabs
## Introduction
**Inventory WhizLabs** is a powerful inventory management system designed for businesses to easily track and manage their product inventory. Users can add, edit, view, and delete items, while also managing the inventory with features such as pagination and efficient searching. The application ensures seamless interaction between the frontend and backend, offering an intuitive user interface and robust backend architecture.

## Features
- **Item Management:**
  - Add, edit, and delete inventory items
  - Track product quantity, price, and category
- **View Inventory:**
  - Display items in a paginated list for easy browsing
  - View detailed information of each item including description, price, and quantity
- **Error Handling:**
  - Use of an error boundary component to catch and display errors
- **Responsive Design:**
  - A fully responsive design ensuring accessibility on various devices

---

## Tech Stack
### Backend
- **Runtime:** Node.js with Express.js (TypeScript)
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Port:** 5000

### Frontend
- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** React Context API
- **API Communication:** Axios
- **Port:** 5173

---

## Getting Started

### Backend Setup
#### Set up your .env file
Create a .env file in the root of your backend project and add the following variables:
```
MONGO_URI=mongodb+srv://<your_mongo_connection_string>
PORT=5000
```

#### Installation
1. **Clone the repository:**
```bash
git clone https://github.com/abrahamjose02/Inventory_WhizLabs_backend.git
cd Inventory_WhizLabs_backend
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Run the backend server:**
```bash
npm start
```

### Frontend Setup
1. **Clone the repository:**
```bash
git clone https://github.com/abrahamjose02/Inventory_WhizLabs_frontend.git
cd Inventory_WhizLabs_frontend
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Run the frontend development server:**
```bash
npm run dev
```

The backend will run on http://localhost:5000 and the frontend on http://localhost:5173.

### Running the Application
1. Ensure that MongoDB is properly configured and running
2. Start the backend and frontend servers
3. Access the frontend at http://localhost:5173 and manage your inventory

### API Endpoints
- **POST /api/items** - Add a new inventory item
- **GET  /api/items** - Retrieve a list of all inventory items
- **GET  /api/items/:id** - Get detailed information about a specific item
- **PUT  /api/items/:id** - Edit an existing item
- **DELETE /api/items/:id** - Delete an item from inventory

## Tech Features

### Backend Features
- **MongoDB Database:** All inventory data is stored in a scalable MongoDB database, hosted on MongoDB Atlas
- **Express.js Server:** Robust REST API implementation with TypeScript
- **Error Handling:** Comprehensive error handling middleware
- **TypeScript:** Type-safe development environment

### Frontend Features
- **React Context API:** Provides centralized state management for inventory items across components
- **Error Boundary:** Catches and displays errors gracefully within the UI
- **Responsive Design:** Ensures that the application is mobile-friendly and optimized for all screen sizes
- **Pagination:** Efficiently handles large datasets by implementing pagination
- **TypeScript Integration:** Type-safe component development
- **Tailwind CSS:** Utility-first CSS framework for responsive design

## Repository Links
- **Backend:** https://github.com/abrahamjose02/Inventory_WhizLabs_backend.git
- **Frontend:** https://github.com/abrahamjose02/Inventory_WhizLabs_frontend.git

## Conclusion
**Inventory WhizLabs** is a comprehensive inventory management solution that is easy to set up and use. With features like item addition, deletion, and pagination, along with error handling and a responsive design, it provides a user-friendly and robust application for managing inventory. The combination of a powerful backend built with Node.js and MongoDB, and a modern frontend using React and Tailwind CSS, creates a scalable and efficient system for businesses of all sizes.

---
