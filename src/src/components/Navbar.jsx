import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { getItemCount } = useCartContext();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        My Jutta Center
      </div>

      <div className="navbar-right">
        <div
          className="navbar-cart"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
          {getItemCount() > 0 && (
            <span className="cart-badge">
              {getItemCount()}
            </span>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
