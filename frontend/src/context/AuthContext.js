import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getMe } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('kesca_token');
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem('kesca_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { token, user } = await apiLogin(email, password);
    localStorage.setItem('kesca_token', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('kesca_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
