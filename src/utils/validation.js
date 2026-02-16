export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const validatePassword = (password) => {
  return password.length >= 6;
};
export const validateName = (name) => {
  return name.trim().length >= 2;
};
export const validateRegistration = (name, email, password) => {
  const errors = {};
  if (!validateName(name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
};
export const validateLogin = (email, password) => {
  const errors = {};
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  return errors;
};