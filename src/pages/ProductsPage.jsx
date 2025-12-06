import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/SearchContext";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchTerm } = useContext(SearchContext);

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

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Scentora Collection</h1>

      {/* Category Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border 
              ${selectedCategory === cat 
                ? "bg-black text-white" 
                : "bg-white text-black border-gray-400 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
