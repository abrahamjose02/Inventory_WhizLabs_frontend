import React from "react";
import { useNavigate } from "react-router-dom";
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

const AddItem: React.FC = () => {
  const { addItem } = useInventory();
  const navigate = useNavigate();

  const initialValues = {
    itemName: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Attempt to add the new item
      await addItem(values);
      toast.success("Item added successfully!");
      navigate("/"); // Navigate to the inventory page or elsewhere
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Check if the error is specific to a duplicate item
      if (error.message && error.message.includes("already exists")) {
        toast.error(error.message); // Display the duplicate item error
      } else {
        toast.error("Failed to add item. Please try again.");
      }
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Add New Item
        </CardTitle>
        <CardDescription className="text-center">
          Enter the details of the new inventory item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
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
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddItem;
