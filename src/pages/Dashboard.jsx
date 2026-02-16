import { useCartContext } from "../context/CartContext";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productData from "../utils/productsData";
import Navbar from "../src/components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, addToCart } = useCartContext();
  const [priceFilter, setPriceFilter] = useState("");
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, [navigate]);

  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const filteredProducts = productData
    .filter((product) =>
      category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true
    )
    .filter((product) =>
      priceFilter ? product.price <= Number(priceFilter) : true
    );
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const size = sizes[product.id] || "M"; // default size
    addToCart({ ...product, quantity: Number(quantity), size });
  };
  return (
    <>
      <Navbar cartCount={cart.length} />
      <div className="category-bar">
        <button
          className={category === "men" ? "active" : ""}
          onClick={() => navigate("/dashboard?category=men")}
        >
          Men
        </button>
        <button
          className={category === "women" ? "active" : ""}
          onClick={() => navigate("/dashboard?category=women")}
        >
          Women
        </button>
        <button
          className={category === "kids" ? "active" : ""}
          onClick={() => navigate("/dashboard?category=kids")}
        >
          Kids
        </button>
      </div>

      <div className="dashboard-container">

        <div className="filter-section">
          <label>Filter by Price: </label>
          <select onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="">All</option>
            <option value="3000">Below ₹3000</option>
            <option value="5000">Below ₹5000</option>
            <option value="7000">Below ₹7000</option>
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-2">
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
                  className="w-16 border p-1 rounded text-center"
                />
              </div>

              {/* Size Selector */}
              <div className="flex items-center gap-2 mb-2">
                <label>Size:</label>
                <select
                  value={sizes[product.id] || "M"}
                  onChange={(e) =>
                    setSizes({ ...sizes, [product.id]: e.target.value })
                  }
                  className="border p-1 rounded"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
