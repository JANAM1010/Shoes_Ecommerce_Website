import productData from "../utils/productsData";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const Products = () => {
const [sizes, setSizes] = useState({}); 
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [priceFilter, setPriceFilter] = useState("");
const [quantities, setQuantities] = useState({}); 
const { addToCart } = useCartContext();
const navigate = useNavigate();
const location = useLocation();
const query = new URLSearchParams(location.search);
const selectedCategory = query.get("category");

useEffect(() => {
  setProducts(productData);
  setLoading(false);
}, []);
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
}, []);
const categoryFiltered = selectedCategory
    ? products.filter(
        (product) =>
          product.category.toLowerCase() ===
          selectedCategory.toLowerCase()
    )
    : products;
const filteredProducts =
    priceFilter === ""
      ? categoryFiltered
      : categoryFiltered.filter(
          (product) => product.price <= Number(priceFilter)
        );
  const handleAddToCart = (product) => {
  const quantity = quantities[product.id] || 1;
const size = sizes[product.id] || "M"; 
addToCart({ ...product, quantity: Number(quantity), size });
toast.success(`Added ${quantity} item(s) of size ${size} to cart!`);
};
if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Loading />
      </div>
    );
}
return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* CATEGORY BAR */}
      <div className="flex gap-4 p-4 justify-center bg-white shadow">
        <button onClick={() => navigate("/products?category=men")}>
          Men
        </button>
        <button onClick={() => navigate("/products?category=women")}>
          Women
        </button>
        <button onClick={() => navigate("/products?category=kids")}>
          Kids
        </button>
        <button onClick={() => navigate("/products")}>All</button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Price Filter */}
        <div className="mb-6">
          <label className="mr-4 font-semibold">Filter by Price:</label>
          <select
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border p-2 rounded">
            <option value="">All</option>
            <option value="50">Below $50</option>
            <option value="100">Below $100</option>
            <option value="200">Below $200</option>
          </select>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div
                className="h-64 bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"/>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 h-12">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${product.price}
                </p>
                <div className="product-controls">
  {/* Quantity Selector */}
  <div className="control-item">
    <label>Qty:</label>
    <input
      type="number"
      min="1"
      value={quantities[product.id] || 1}
      onChange={(e) =>
        setQuantities({
          ...quantities,
          [product.id]: e.target.value,
        })
      }
    />
  </div>

  {/* Size Selector */}
  <div className="control-item">
    <label>Size:</label>
    <select
      value={sizes[product.id] || "M"}
      onChange={(e) =>
        setSizes({ ...sizes, [product.id]: e.target.value })
      }
    >
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
  </div>
</div>
        <button onClick={() => handleAddToCart(product)}className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
