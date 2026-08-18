/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser);
    if (nextUser) localStorage.setItem('user', JSON.stringify(nextUser));
    else localStorage.removeItem('user');
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get('/user/getme');
    updateUser(data);
    return data;
  }, [updateUser]);

  useEffect(() => {
    if (!localStorage.getItem('token')) { setLoading(false); return; }
    refreshUser()
      .catch((err) => { 
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token'); 
          updateUser(null); 
        }
      })
      .finally(() => setLoading(false));
  }, [refreshUser, updateUser]);

  const login = (data) => { localStorage.setItem('token', data.token); updateUser(data.user); };
  const logout = () => { localStorage.removeItem('token'); updateUser(null); };
  return <AuthContext.Provider value={{ user, setUser: updateUser, refreshUser, login, logout, loading }}>{children}</AuthContext.Provider>;
}
