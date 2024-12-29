import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { Edit, Trash } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import DeleteModal from "./DeleteModal";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 6;

const InventoryList: React.FC = () => {
  const { items, loading, error, deleteItem } = useInventory();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete);
        toast.success("Item deleted successfully!");
        setDeleteModalOpen(false);
      } catch (error) {
        toast.error("Failed to delete item. Please try again.");
        console.error(error);
      }
    }
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <Link
            to={`/view/${item._id}`}
            key={item._id}
            className="block hover:no-underline"
          >
            <Card className="border p-4 relative h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{item.itemName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mt-2">
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Category: {item.category}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to={`/edit/${item._id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="z-10"
                    onClick={(e) => handleDeleteClick(e, item._id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        itemId={itemToDelete}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default InventoryList;
