import axios from 'axios'


const Api_url="http://localhost:3000/api/book/"


export const createbook=(data )=> {
return axios.post(`${Api_url}addbook`,data)
};
export const getallbooks=()=>{
   return axios.get(`${Api_url}getall`);
}
export const Updatebooks=(id,updatedData)=>{
   return axios.put(`${Api_url}update/${id}`,updatedData)
}
