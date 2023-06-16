import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userData = useSelector((state) => state.auth.adminData),
    [user, setUser] = useState(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const navigate = useNavigate(),
    login = async (data) => {
      setUser(data);
      navigate("/dashboard/home");
    },
    logout = () => {
      setUser(null);
      navigate("/auth/sign-in", { replace: true });
    },
    value = useMemo(
      () => ({
        user,
        login,
        logout,
      }),
      [user]
    );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
