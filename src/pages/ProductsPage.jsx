import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/SearchContext";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { searchTerm } = useContext(SearchContext); // <-- Get search term

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products using global searchTerm
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Scentora Collection
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-gray-500 text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
