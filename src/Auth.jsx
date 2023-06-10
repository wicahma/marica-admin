import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "./store/slices/main";

const AuthContext = createContext();

const useStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value).auth.adminData;
      } else {
        // window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      // window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useStorage("state", {});
  const userData = useSelector((state) => state.auth.adminData),
    // dispatch = useDispatch(),
    [user, setUser] = useState(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  // if (Object.keys(userData).length === 0) {
  //   dispatch(setAlert({ show: true, type: "warning", message: "Silahkan login terlebih dahulu!" }));
  // }
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
