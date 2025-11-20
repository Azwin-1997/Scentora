import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeaderCarousel from "./components/HeaderCarousel";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/Login"; // 👈 Make sure you import this
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AdminManageProducts from "./admin/AdminManageProducts";


function App() {
  return (
    <Router>
      <Navbar /> <br />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderCarousel />
              <ProductsPage />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />}/>
        <Route path="/admin/manage-products" element={<AdminManageProducts />}/>

      </Routes>
    </Router>
  );
}

export default App;
