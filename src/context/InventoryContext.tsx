import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";


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

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export const useInventory = () => {
    const context = useContext(InventoryContext)
    if (!context) {
        throw new Error("useInventory must be used within a InventoryProvider")
    }
    return context;
}

export const InventoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
        const [items, setItems] = useState<Item[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const fetchItems = async () => {
          try {
            setLoading(true);
            const response = await axiosInstance.get<ApiResponse<Item[]>>(
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
            const response = await axiosInstance.get<ApiResponse<Item>>(
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
            const response = await axiosInstance.post<ApiResponse<Item>>(
              "/items",
              item
            );
            setItems([...items, response.data.data]); // Accessing the added item data from the response
          } catch (err) {
            console.error("Error adding item:", err);
            setError("Failed to add item");
          }
        };

        const updateItem = async (id: string, item: Omit<Item, "_id">) => {
          try {
            const response = await axiosInstance.put<ApiResponse<Item>>(
              `/items/${id}`,
              item
            );
            setItems(items.map((i) => (i._id === id ? response.data.data : i))); // Accessing the updated item data
          } catch (err) {
            console.error(`Error updating item with id ${id}:`, err);
            setError("Failed to update item");
          }
        };

        const deleteItem = async (id: string) => {
          try {
            await axiosInstance.delete(`/items/${id}`);
            setItems(items.filter((i) => i._id !== id));
          } catch (err) {
            console.error(`Error deleting item with id ${id}:`, err);
            setError("Failed to delete item");
          }
        };

        useEffect(() => {
          fetchItems();
        }, []);

        return (
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