import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const cookiesKey = "Xperiento-cookies";

export const UserContext = React.createContext();

export function decodingToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("JWT decoding error:", error.message);
    return undefined;
  }
}

export const UserProvider = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get(cookiesKey);
  const [auth, updateAuth] = useState(null);

  useEffect(() => {
    const userData = decodingToken(token);
    if (userData) {
      updateAuth(userData.user);
    }
  }, []);

  const signInHandler = (data, token) => {
    updateAuth(data);
    cookies.set(cookiesKey, token, { path: "/" });
  };

  const sign_out_handler = () => {
    // toast.success("Logged Out");
    updateAuth(null);
    cookies.remove(cookiesKey, { path: "/" });
  };

  return (
    <UserContext.Provider value={{ auth, signInHandler, sign_out_handler }}>
      {children}
    </UserContext.Provider>
  );
};
