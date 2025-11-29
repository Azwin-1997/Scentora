import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeaderCarousel from "./components/HeaderCarousel";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AdminManageProducts from "./admin/AdminManageProducts";
import AdminManageUsers from "./admin/AdminManageUsers";
import AdminUpdateProduct from "./admin/AdminUpdateProduct";
import Footer from "./pages/Footer";

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
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/admin/manage-products"
          element={<AdminManageProducts />}
        />
        <Route path="/admin/users" element={<AdminManageUsers />} />
        <Route
          path="/admin/update-product/:id"
          element={<AdminUpdateProduct />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
