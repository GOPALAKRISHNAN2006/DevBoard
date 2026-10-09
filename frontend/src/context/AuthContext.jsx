/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored || stored === 'undefined' || stored === 'null') {
        localStorage.removeItem('user');
        return null;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Invalid user stored in localStorage, clearing...', e);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser || null);
    if (nextUser && typeof nextUser === 'object') {
      try {
        localStorage.setItem('user', JSON.stringify(nextUser));
      } catch {
        localStorage.removeItem('user');
      }
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/user/getme');
      updateUser(data);
      return data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        updateUser(null);
      }
      throw err;
    }
  }, [updateUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem('token');
      setLoading(false);
      return;
    }
    refreshUser()
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          updateUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, [refreshUser, updateUser]);

  const login = (data) => {
    if (data?.token) {
      localStorage.setItem('token', data.token);
    }
    updateUser(data?.user || null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, refreshUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
