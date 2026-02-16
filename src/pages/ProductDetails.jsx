import "../styles/ProductDetails.css"; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import Navbar from "../src/components/Navbar";
import Loading from "../src/components/Loading";
import toast from "react-hot-toast";
import productData from "../utils/productsData";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = productData.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found");
    }
    setLoading(false);
  }, [id]);
  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };
  if (loading) {
    return (
      <div className="product-details-container">
        <Navbar />
        <Loading />
      </div>
    );
  }
  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }
  return (
    <div className="product-details-container">
      <Navbar />
      <div className="product-details-grid">
        <div className="product-image-card">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-price-rating">
            <span className="product-price">₹{product.price}</span>
            <span className="product-rating">⭐ {product.rating?.rate}</span>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
