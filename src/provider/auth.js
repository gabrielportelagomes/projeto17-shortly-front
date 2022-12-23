import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [userLogin, setUserLogin] = useState(undefined);

  useEffect(() => {
    const userStorage = localStorage.getItem("userMyWallet");
    if (userStorage) {
      setUserLogin(JSON.parse(userStorage));
    } else {
      setUserLogin(undefined);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
