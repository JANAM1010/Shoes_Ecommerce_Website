export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const removeUser = () => {
  localStorage.removeItem('user');
};
export const saveRegisteredUsers = (users) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};
export const getRegisteredUsers = () => {
  const users = localStorage.getItem('registeredUsers');
  return users ? JSON.parse(users) : [];
};
const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user")); 
  if (!user) return null;
  return `cart_${user.email}`;
};
export const getCart = () => {
  const key = getCartKey();
  if (!key) return [];
  const cart = localStorage.getItem(key);
  return cart ? JSON.parse(cart) : [];
};
export const saveCart = (cart) => {
  const key = getCartKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
};
export const saveSessionTime = () => {
  const loginTime = new Date().getTime();
  localStorage.setItem('sessionTime', loginTime);
};
export const getSessionTime = () => {
  return localStorage.getItem('sessionTime');
};
export const removeSessionTime = () => {
  localStorage.removeItem('sessionTime');
};
export const isSessionValid = () => {
  const sessionTime = getSessionTime();
  if (!sessionTime) return false;
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - parseInt(sessionTime);
  const fiveMinutes = 5 * 60 * 1000; 
  return timeDifference < fiveMinutes;
};