import { createContext, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAlert } from "./store/slices/main";

const AuthContext = createContext();

const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useLocalStorage("admin", null);
  const [user, setUser] = useState(
    useSelector((state) => state.auth.adminData)
  );
  const navigate = useNavigate(),
    login = async (data) => {
      setUser(data);
      navigate("/dashboard/home");
    },
    logout = () => {
      setUser(null);
      navigate("/", { replace: true });
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

const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth(),
    dispatch = useDispatch();
  if (Object.keys(auth.user).length === 0) {
    dispatch(
      setAlert({
        show: true,
        type: "warning",
        message: "Anda belum login!",
      })
    );
    return <Navigate to="/auth/sign-in" />;
  }
  return children;
};
