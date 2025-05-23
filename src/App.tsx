import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from '@/pages/products/ProductList';
import ProductDetails from '@/pages/products/ProductDetails';
import AddProduct from '@/pages/products/AddProduct';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to products */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        {/* Main routes */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        
        {/* 404 page for unknown routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;