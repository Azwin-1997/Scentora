import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/SearchContext";

import image from "../../public/images/Mehak_Perfumery.webp"

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchTerm } = useContext(SearchContext);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://scentora-server.onrender.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Scentora Collection
      </h1>

      {/* ------------------------------------------------------------ */}
      {/* PROMO BANNERS SECTION (OPTION 2) */}
      {/* ------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="relative">
          <img
            src={image}
            className="w-full h-56 object-cover rounded-xl shadow"
            alt="Shop Now"
          />
          <button className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded">
            Shop Now
          </button>
        </div>

        <div className="relative">
          <img
            src="https://t4.ftcdn.net/jpg/02/76/29/05/360_F_276290514_RpKsJCv1a9CkmFGdnW0jliAE2oQTaDWs.jpg"
            className="w-full h-56 object-cover rounded-xl shadow"
            alt="Deal"
          />
          <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded">
            Flat 30% Off
          </button>
        </div>

        <div className="relative">
          <img
            src="https://www.frenchessence.com/cdn/shop/articles/6_9e399d45-da3e-4e9e-8cb6-4babc09bb272.webp?v=1723200542"
            className="w-full h-56 object-cover rounded-xl shadow"
            alt="New Arrivals"
          />
          <button className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded">
            New Arrivals
          </button>
        </div>
      </div> <br />
      {/* ------------------------------------------------------------ */}

      {/* Category Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border 
              ${
                selectedCategory === cat
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
