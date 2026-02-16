import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setUser(true);
    }
    setLoading(false);
  }, []);
  if (loading) return null;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />}/>
      <Route  path="/products"  element={user ? <Dashboard /> : <Navigate to="/" />}/>
      <Route  path="/product/:id"  element={user ? <ProductDetails /> : <Navigate to="/" />}/>
      <Route  path="/cart"  element={user ? <Cart /> : <Navigate to="/" />}/>
    </Routes>
  );
}
export default App;