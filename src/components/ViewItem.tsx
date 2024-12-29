import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import LoadingSpinner from "./LoadingSpinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Edit } from "lucide-react";

interface Item {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  _id?: string;
}

const ViewItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchItem } = useInventory();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (id) {
        try {
          const fetchedItem = await fetchItem(id);
          setItem({
            ...fetchedItem,
            id: fetchedItem._id, // Map _id to id
          });
        } catch (err) {
          console.error("Error fetching item:", err);
          setError("Failed to fetch item");
        } finally {
          setLoading(false);
        }
      }
    };
    loadItem();
  }, [id, fetchItem]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!item) return <div className="text-center">Item not found</div>;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">{item.itemName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Quantity
            </p>
            <p className="text-lg font-semibold">{item.quantity}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Category
            </p>
            <p className="text-lg font-semibold">{item.category}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Description
          </p>
          <p className="text-gray-700">{item.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Link>
        </Button>
        <Button asChild>
          <Link to={`/edit/${item.id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Item
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewItem;
