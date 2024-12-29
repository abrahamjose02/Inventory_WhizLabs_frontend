import React from "react";
import { Link } from "react-router-dom";
import { Warehouse, Plus, Home } from "lucide-react";
import { Button } from "../components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
        >
          <Warehouse className="mr-4 h-6 w-6" />
          Inventory Management
        </Link>
        <nav className="flex space-x-4">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/add" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
