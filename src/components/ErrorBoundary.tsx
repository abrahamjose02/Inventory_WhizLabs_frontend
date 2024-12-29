import React, { Component, ReactNode } from "react";
import errorImage from "../assets/errorboundary.jpg"; 
import { Button } from "./ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
          <img src={errorImage} alt="Error occurred" className="w-64 h-auto" />
          <h1 className="text-4xl font-bold text-red-600">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <Button
            onClick={this.handleReload}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
