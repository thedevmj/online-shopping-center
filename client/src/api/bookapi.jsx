import axios from "axios";


const Api_url = "http://localhost:3000/api/book/";
const AUTH_URL = "http://localhost:3000/auth/user/";


const authHeader = () => {
  const t = localStorage.getItem("token");
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const createbook = (data) => {
  return axios.post(`${Api_url}addbook`, data, {
    headers: authHeader(),
  });
};

export const createUser = (data) => {
  // registration doesn't require auth
  return axios.post(`${AUTH_URL}register`, data);
};

export const LoginUser = (data) => {
  return axios.post(`${AUTH_URL}login`, data);
};

export const cartadd = (data) => {
  return axios.post(`${Api_url}addtocart`, data, {
    headers: authHeader(),
  });
};

export const getcartById = (id) => {
  return axios.get(`${Api_url}findbook/${id}`, {
    headers: authHeader(),
  });
};
export const getallCategories = () => {
  return axios.get(`${Api_url}getcategories`);
};
export const getallbooks = () => {
  return axios.get(`${Api_url}getall`);
};
export const Updatebooks = (id, updatedData) => {
  return axios.put(`${Api_url}update/${id}`, updatedData);
};
export const Deletebook = (id) => {
  return axios.delete(`${Api_url}delete/${id}`);
};
export const deleteCart=(id)=>{
  return axios.delete(`${Api_url}/deletecart/${id}`) 
}

