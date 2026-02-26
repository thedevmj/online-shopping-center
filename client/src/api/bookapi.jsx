import axios from "axios";

const Api_url = "http://localhost:3000/api/book/";
const AUTH_URL="http://localhost:3000/auth/user/"
export const createbook = (data) => {
  return axios.post(`${Api_url}addbook`, data);
};
export const createUser=(data)=>{
  return axios.post(`${AUTH_URL}register`,data);
}
export const LoginUser=(data)=>{
  return axios.post(`${AUTH_URL}login`,data);
}
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

