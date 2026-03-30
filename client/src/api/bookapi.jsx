import axios from "axios";

const Api_url = "http://localhost:3000/api/book/";
const AUTH_URL = "http://localhost:3000/auth/user/";

// Helper function to get auth headers
const authHeader = () => {
  const t = localStorage.getItem("token");
  return t ? { Authorization: `Bearer ${t}` } : {};
};

// ==================== AUTHENTICATION ====================
export const createUser = (data) => {
  return axios.post(`${AUTH_URL}register`, data);
};

export const LoginUser = (data) => {
  return axios.post(`${AUTH_URL}login`, data);
};

// ==================== BOOKS ====================
export const createbook = (data) => {
  return axios.post(`${Api_url}addbook`, data, {
    headers: authHeader(),
  });
};

export const getallbooks = () => {
  return axios.get(`${Api_url}getall`);
};

export const getcartById = (id) => {
  return axios.get(`${Api_url}findbook/${id}`, {
    headers: authHeader(),
  });
};

export const Updatebooks = (id, updatedData) => {
  return axios.put(`${Api_url}update/${id}`, updatedData, {
    headers: authHeader(),
  });
};

export const Deletebook = (id) => {
  return axios.delete(`${Api_url}delete/${id}`, {
    headers: authHeader(),
  });
};

export const getallCategories = () => {
  return axios.get(`${Api_url}getcategories`);
};

// ==================== CART ====================
export const cartadd = (data) => {
  return axios.post(`${Api_url}addtocart`, data, {
    headers: authHeader(),
  });
};

export const getallCarts = (id) => {
  return axios.get(`${Api_url}getallcarts/${id}`, {
    headers: authHeader(),
  });
};

export const deleteCart = (id) => {
  return axios.delete(`${Api_url}deletecart/${id}`, {
    headers: authHeader(),
  });
};

// ==================== FAVORITES ====================
export const addtoFavorite = (bookId) => {
  return axios.put(`${Api_url}favorite/${bookId}`, { bookId }, {
    headers: authHeader(),
  });
};

export const getallfavorite = () => {
  return axios.get(`${Api_url}favoritebooks`, {
    headers: authHeader(),
  });
};

export const removeFromfav = (id) => {
  return axios.delete(`${Api_url}removefromfavorite/${id}`, {
    headers: authHeader(),
  });
};
