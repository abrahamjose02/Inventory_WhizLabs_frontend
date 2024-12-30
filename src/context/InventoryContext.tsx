import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

// Defining the structure of an item
interface Item {
    _id:string;
    itemName:string;
    quantity:number;
    price:number;
    description:string;
    category:string;
}

// Defining the structure of API Response including the data field
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
// Defining the structure of the InventoryContextType
interface InventoryContextType {
    items: Item[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  fetchItem: (id: string) => Promise<Item>;
  addItem: (item: Omit<Item, "_id">) => Promise<void>;
  updateItem: (id: string, item: Omit<Item, "_id">) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
// Creating the InventoryContext
const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

// Creating a custom hook to use the InventoryContext
export const useInventory = () => {
    const context = useContext(InventoryContext)
    if (!context) {
        throw new Error("useInventory must be used within a InventoryProvider")
    }
    return context;
}
// Creating the InventoryProvider component
export const InventoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
        const [items, setItems] = useState<Item[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const fetchItems = async () => {
          try {
            setLoading(true);
            const response = await axiosInstance.get<ApiResponse<Item[]>>( // Fetching the items from the API
              "/items"
            );
            setItems(response.data.data); // Here, we access response.data.data (which contains the items array)
            setError(null);
          } catch (err) {
            console.error("Error fetching items:", err);
            setError("Failed to fetch items");
          } finally {
            setLoading(false);
          }
        };

        const fetchItem = async (id: string): Promise<Item> => {
          try {
            const response = await axiosInstance.get<ApiResponse<Item>>( // Fetching a single item by ID
              `/items/${id}`
            );
            return response.data.data; // Accessing the item data from the response
          } catch (err) {
            console.error(`Error fetching item with id ${id}:`, err);
            throw new Error("Failed to fetch item");
          }
        };

        const addItem = async (item: Omit<Item, "_id">) => {
          try {
            const response = await axiosInstance.post<ApiResponse<Item>>( // Adding a new item
              "/items",
              item
            );
            setItems([...items, response.data.data]); // Add new item to the list
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err:any) {
            console.error("Error adding item:", err);

            // Check if the error is related to a duplicate item
            if (err.response && err.response.data) {
              const errorMessage = err.response.data.error;
              if (errorMessage && errorMessage.includes("already exists")) {
                // Return the error message for the duplicate item
                throw new Error(errorMessage);
              }
            }

            // Default error if not related to item duplication
            throw new Error("Failed to add item. Please try again.");
          }
        };


       const updateItem = async (id: string, item: Omit<Item, "_id">) => {
         try {
           const response = await axiosInstance.put<ApiResponse<Item>>( // Updating an existing item
             `/items/${id}`,
             item
           );
           setItems(items.map((i) => (i._id === id ? response.data.data : i))); // Update the item in the list
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         } catch (err:any) {
           console.error(`Error updating item with id ${id}:`, err);

           // Handle the case where the item name already exists
           if (err.response && err.response.data) {
             const errorMessage = err.response.data.error;
             if (errorMessage && errorMessage.includes("already exists")) {
               // Throw the error if the item name already exists
               throw new Error(errorMessage);
             }
           }

           // Default error message
           throw new Error("Failed to update item. Please try again.");
         }
       };


        const deleteItem = async (id: string) => {
          try {
            await axiosInstance.delete(`/items/${id}`); // Deleting an item by ID
            setItems(items.filter((i) => i._id !== id));
          } catch (err) {
            console.error(`Error deleting item with id ${id}:`, err);
            setError("Failed to delete item");
          }
        };

        useEffect(() => {
          fetchItems(); // Fetch the items on component mount
        }, []);

        return (
            // Providing the InventoryContext value to the children
          <InventoryContext.Provider
            value={{
              items,
              loading,
              error,
              fetchItems,
              fetchItem,
              addItem,
              updateItem,
              deleteItem,
            }}
          >
            {children}
          </InventoryContext.Provider>
        );
}