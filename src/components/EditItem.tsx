import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

// Define Yup validation schema
const validationSchema = Yup.object({
  itemName: Yup.string().required("Item name is required"),
  quantity: Yup.number()
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
  price: Yup.number()
    .positive("Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});

const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchItem, updateItem } = useInventory();
  const [initialValues, setInitialValues] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
    description: "",
    category: "",
  });

  // Fetch the item details on component mount
  useEffect(() => {
    const loadItem = async () => {
      if (id) {
        try {
          const fetchedItem = await fetchItem(id);
          setInitialValues(fetchedItem); // Update the form initial values
        } catch (error) {
          console.error("Failed to fetch item:", error);
          toast.error("Failed to fetch item details.");
          navigate("/"); // Navigate to home if there's an error fetching the item
        }
      }
    };
    loadItem();
  }, [id, fetchItem, navigate]);

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (id) {
        await updateItem(id, values);
        toast.success("Item updated successfully!");
        navigate("/"); // Redirect to home after success
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      if (error.message && error.message.includes("already exists")) {
        toast.error(error.message); // Display duplicate item error message
      } else {
        toast.error("Failed to update item. Please try again."); // Display a general error message
      }
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Edit Item</CardTitle>
        <CardDescription className="text-center">
          Update the details of the inventory item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          enableReinitialize={true} // Allow form to reinitialize when initialValues change
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Field
                  as={Input}
                  type="text"
                  id="itemName"
                  name="itemName"
                  placeholder="Enter item name"
                />
                <ErrorMessage
                  name="itemName"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Field
                  as={Input}
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                />
                <ErrorMessage
                  name="quantity"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Field
                  as={Input}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  step="0.01"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Field
                  as={Input}
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter category"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Enter item description"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Item"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditItem;
