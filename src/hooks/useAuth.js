import { useState, useEffect } from 'react';
import { getUser, isSessionValid } from '../utils/localStorage';
import { logoutUser } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = getUser();

      if (savedUser && isSessionValid()) {
        setUser(savedUser);
      } else if (savedUser) {
        logoutUser();
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();

    
    const interval = setInterval(() => {
  if (!isSessionValid()) {
    logoutUser();
    setUser(null);
  }
}, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return { user, loading, updateUser };
};