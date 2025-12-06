import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HeaderCarousel from "./components/HeaderCarousel.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import Login from "./pages/Login.jsx"; 
import Signup from "./pages/Signup.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import AdminManageProducts from "./admin/AdminManageProducts.jsx";
import AdminManageUsers from "./admin/AdminManageUsers.jsx";
import AdminUpdateProduct from "./admin/AdminUpdateProduct.jsx";
import Footer from "./pages/Footer.jsx";

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
