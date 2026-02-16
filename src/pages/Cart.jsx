import "../styles/Cart.css";
import { useCartContext } from '../context/CartContext';
import Navbar from '../src/components/Navbar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } =
  useCartContext();
  const handleRemove = (productId, productSize, productTitle) => {
  removeFromCart(productId, productSize);
  toast.success(`${productTitle} removed from cart`);
};

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };


  return (
    
  <>
    <Navbar />

    <div className="cart-container">
      <div className="cart-content">

        <div className="cart-grid">

          {/* LEFT SIDE - CART ITEMS */}
          <div className="cart-left">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Looks like you haven’t added anything yet.</p>
                <Link to="/products" className="primary-btn">
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="cart-item"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>Size: {item.size}</p>
                    <p className="price">₹ {item.price}</p>
                  </div>

                  <div className="cart-actions">

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                            item.size
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                            item.size
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="subtotal">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() =>
                        handleRemove(
                          item.id,
                          item.size,
                          item.title
                        )
                      }
                      className="remove-btn"
                    >
                      ✕
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          {cart.length > 0 && (
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {getTotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹ {getTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={() =>
                  toast.success("Checkout coming soon!")
                }
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="continue-link"
              >
                Continue Shopping
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  </>
);

};

export default Cart;