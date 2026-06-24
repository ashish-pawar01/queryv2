import { createContext, useContext, useEffect, useState } from "react";

import { getProfile, loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const response = await loginUser(data);

    await fetchProfile();

    return response;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setUser(response.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
