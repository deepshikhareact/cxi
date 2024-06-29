import axios from "axios";
import { server_base_Url } from "./temp_tokenKey";
import Cookies from "universal-cookie";
import { cookiesKey } from "@/store/User_Context";

const instance = axios.create({
  baseURL: server_base_Url,
  timeout: 25000,
});

instance.interceptors.request.use(
  async function (config) {
    try {
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
      const cookies = new Cookies();
      const token = cookies.get(cookiesKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("error ==> ", error.message);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const handleRequest = async (request) => {
  try {
    return await request();
  } catch (error) {
    console.error("error ==> ", error.message);
    return { data: { data: error.message || "Server Error", success: false } };
  }
};

export const login = async (data) => {
  return handleRequest(() => instance.post("auth/login", data));
};

export const signUp = async (data) => {
  return handleRequest(() => instance.post("auth/createAccount", data));
};

export const getDashboardCounts = async () => {
  return handleRequest(() => instance.get("users/counts"));
};

export const getActionsList = async () => {
  return handleRequest(() => instance.get(`users/myTodos`));
};

export const getImplements = async () => {
  return handleRequest(() => instance.get(`users/myImpletements`));
};

export const getDashboard = async () => {
  return handleRequest(() => instance.get("insights/counts"));
};

export const getInsights = async () => {
  return handleRequest(() => instance.get("insights"));
};

export const createInsightsPost = async (formData) => {
  return handleRequest(() => instance.post("insights", formData));
};

export const getSingleInsights = async (id) => {
  return handleRequest(() => instance.post("insights/getInsight", { id }));
};

export const likeHandler = async (id) => {
  return handleRequest(() => instance.post(`insights/${id}/like`));
};

export const bookmarksHandler = async (id) => {
  return handleRequest(() => instance.post(`insights/${id}/bookmarks`));
};

export const save_Unsave_Implement_Handler = async (id) => {
  return handleRequest(() => instance.post(`insights/${id}/implement/add`));
};

export const giveStarsHandler = async ({ id, stars }) => {
  return handleRequest(() =>
    instance.post(`insights/${id}/implement/stars`, { stars })
  );
};

export const dislikeHandler = async (id) => {
  return handleRequest(() => instance.post(`insights/${id}/dislike`));
};

export const createComment = async ({ id, text }) => {
  return handleRequest(() =>
    instance.post(`insights/${id}/comments`, { text })
  );
};

export const forgotPasswordEmailSend = async ({ email }) => {
  return handleRequest(() => instance.post(`auth/forgotpassword`, { email }));
};

export const forgotPasswordEmailVerify = async (body) => {
  return handleRequest(() =>
    instance.post(`auth/forgotpassword/${body.token}`, body)
  );
};
