import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductList, ProductDetails, AddProduct, NotFound } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        {/* Main routes */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        
        {/* 404 page for unknown routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;