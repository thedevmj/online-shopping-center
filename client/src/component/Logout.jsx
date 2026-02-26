import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  
    const navigate=useNavigate();

  const handlelogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");

  navigate("/Login")
   
}
    return (

    <div><button onClick={handlelogout}>Logout</button></div>
    
  )
}
