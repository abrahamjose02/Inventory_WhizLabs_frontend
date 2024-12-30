import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface PaginationProps { // Define the PaginationProps interface
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination component
const Pagination: React.FC<PaginationProps> = ({
  currentPage, // Current page number
  totalPages, // Total number of pages
  onPageChange, // Function to change the page
}) => {
  return (
    // Display the pagination buttons
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
