import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { cookiesKey } from "./temp_tokenKey";

export const authenticationClientMiddleware = (value = undefined) => {
  const cookie = new Cookies();
  const token = value || cookie.get(cookiesKey);
  let userData;

  if (!token) {
    userData = undefined;
  } else {
    const decodedToken = decodingToken(token);
    if (decodedToken) {
      userData = { ...decodedToken.user };
    } else {
      userData = undefined;
    }
  }

  return userData;
};
export const getToken = (value = undefined) => {
  const cookie = new Cookies();
  const token = value || cookie.get(cookiesKey);
  return token;
};

export function decodingToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("JWT decoding error:", error.message);
    return undefined;
  }
}
