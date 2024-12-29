import React from 'react'
import { InventoryProvider } from './context/InventoryContext'
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import InventoryList from './components/InventoryList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import { Toaster } from 'sonner';

const App : React.FC = () => {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<InventoryList />} />
              <Route path="/add" element={<AddItem />} />
              <Route path="/edit/:id" element={<EditItem />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
          <Toaster position='top-center'/>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App
