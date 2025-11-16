import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeaderCarousel from "./components/HeaderCarousel";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/Login"; // 👈 Make sure you import this
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";

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
      </Routes>
    </Router>
  );
}

export default App;
