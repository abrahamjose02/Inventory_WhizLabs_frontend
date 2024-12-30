# Inventory WhizLabs

## Introduction

**Inventory WhizLabs** is a powerful inventory management system designed for businesses to easily track and manage their product inventory. Users can add, edit, view, and delete items, while also managing the inventory with features such as pagination and efficient searching. The application ensures seamless interaction between the frontend and backend, offering an intuitive user interface and robust backend architecture.

## Features

- **Item Management:**
  - Add, edit, and delete inventory items.
  - Track product quantity, price, and category.

- **View Inventory:**
  - Display items in a paginated list for easy browsing.
  - View detailed information of each item including description, price, and quantity.

- **Error Handling:**
  - Use of an error boundary component to catch and display errors.

- **Responsive Design:**
  - A fully responsive design ensuring accessibility on various devices.

---

## Tech Stack

- **Frontend:** React (with TypeScript), Tailwind CSS (running on port 5173)
- **Backend:** Node.js, Express.js (with TypeScript) (running on port 5000)
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **State Management:** React Context API for managing inventory state across components
- **API Communication:** Axios for making HTTP requests
- **Pagination:** Pagination functionality for browsing large inventories

---
## Getting Started

### Set up your .env file

Create a .env file in the root of your backend project and add the following variables:


MONGO_URI=mongodb+srv://<your_mongo_connection_string>
PORT=5000


### Installation

1. **Clone the repository:**


git clone https://github.com/abrahamjose02/Inventory_WhizLabs_backend.git
cd Inventory_WhizLabs_backend


2. **Install backend dependencies:**


npm install


3. **Run the backend server:**


npm start


4. **Frontend Setup:**

Navigate to the client folder for frontend setup:


cd ../Inventory_WhizLabs_frontend
npm install
npm run dev



The backend will run on http://localhost:5000 and the frontend on http://localhost:5173.

### Running the Application

1.Ensure that MongoDB is properly configured and running.
2.Start the backend and frontend servers.
3.Access the frontend at http://localhost:5173 and manage your inventory.

### API Endpoints

- **POST /api/items** - Add a new inventory item.
- **GET  /api/items** - Retrieve a list of all inventory items.
- **GET  /api/items/:id** - Get detailed information about a specific item.
- **PUT  /api/items/:id** - Edit an existing item.
- **DELETE /api/items/:id** - Delete an item from inventory.

## Tech Features

- **MongoDB Database:** All inventory data is stored in a scalable MongoDB database, hosted on MongoDB Atlas.
- **React Context API:**  Provides centralized state management for inventory items across components.
- **Error Boundary:** Catches and displays errors gracefully within the UI.
- **Responsive Design:** Ensures that the application is mobile-friendly and optimized for all screen sizes.
- **Pagination:** Efficiently handles large datasets by implementing pagination on the frontend.

## Conclusion

**Inventory WhizLabs** is a comprehensive inventory management solution that is easy to set up and use. With features like item addition, deletion, and pagination, along with error handling and a responsive design, it provides a user-friendly and robust application for managing inventory.

---
