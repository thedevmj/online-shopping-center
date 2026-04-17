import axios from "axios";

const Api_url = "http://localhost:3000/api/book/";
const AUTH_URL = "http://localhost:3000/auth/user/";

axios.defaults.withCredentials = true;

// ==================== AUTHENTICATION ====================
export const createUser = (data) => {
  return axios.post(`${AUTH_URL}register`, data);
};

export const LoginUser = (data) => {
  return axios.post(`${AUTH_URL}login`, data);
};

export const LogoutUser = () => {
  return axios.post(`${AUTH_URL}/logout`);
};
// ==================== BOOKS ====================
export const createbook = (data) => {
  return axios.post(`${Api_url}addbook`, data);
};

export const getallbooks = () => {
  return axios.get(`${Api_url}getall`);
};

export const getcartById = (id) => {
  return axios.get(`${Api_url}findbook/${id}`);
};
export const getusers = async () => {
  return axios.get(`${AUTH_URL}getuserdetails`);
};

export const Updatebooks = (id, updatedData) => {
  return axios.put(`${Api_url}update/${id}`, updatedData);
};

export const Deletebook = (id) => {
  return axios.delete(`${Api_url}delete/${id}`);
};

export const getallCategories = () => {
  return axios.get(`${Api_url}getcategories`);
};

// ==================== CART ====================
export const cartadd = (data) => {
  return axios.post(`${Api_url}addtocart`, data);
};

export const getallCarts = () => {
  return axios.get(`${Api_url}getallcarts`);
};

export const deleteCart = (id) => {
  return axios.delete(`${Api_url}deletecart/${id}`);
};

// ==================== FAVORITES ====================
export const addtoFavorite = (bookId) => {
  return axios.put(`${Api_url}favorite/${bookId}`, { bookId });
};
export const getallfavorite = () => {
  return axios.get(`${Api_url}favoritebooks`);
};

export const removeFromfav = (id) => {
  return axios.delete(`${Api_url}removefromfavorite/${id}`);
};

/*=========================== Orders =============================*/

export const createOrder = async (orderData) => {
  try {
    const response = await fetch("http://localhost:3000/auth/user/userorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderData }),
    });
    return response.json();
  } catch (err) {
    console.log("Sorry failed to order ", err);
  }
};

export const getallOrders = async () => {
  return axios.get(`${AUTH_URL}getuserorder`);
};

export const getorderById=async()=>{
  return axios.get(`${AUTH_URL}orderbyid`);
}
export const orderstatus = async (orderId) => {
  return axios.put(`${AUTH_URL}/${orderId}`);
};
