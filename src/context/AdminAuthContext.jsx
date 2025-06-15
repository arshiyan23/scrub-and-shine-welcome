import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await api.get('/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminUser(res.data.admin);
      } catch (err) {
        console.error('Error fetching admin profile:', err.message);
        logoutAdmin(); // clear invalid token
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAdminProfile();
    } else {
      setAdminUser(null);
      setLoading(false);
    }
  }, [token]);

  const loginAdmin = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{
      token,
      isAuthenticated,
      loginAdmin,
      logoutAdmin,
      adminUser,
      loading
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
