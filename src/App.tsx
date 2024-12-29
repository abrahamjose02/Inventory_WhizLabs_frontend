import React from 'react'
import { InventoryProvider } from './context/InventoryContext'
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import InventoryList from './components/InventoryList';

const App : React.FC = () => {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<InventoryList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App
