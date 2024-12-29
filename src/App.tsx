import React from 'react'
import { InventoryProvider } from './context/InventoryContext'
import {  BrowserRouter as Router, Routes } from 'react-router-dom'

const App : React.FC = () => {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              
            </Routes>
          </main>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App
