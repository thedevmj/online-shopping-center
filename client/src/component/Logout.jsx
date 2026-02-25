import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  
    const navigate=useNavigate();

  const handlelogout=()=>{
    localStorage.removeItem("token");
  console.log("token removed successfully ");
  navigate("/Login")
   
}
    return (

    <div><button onClick={handlelogout}>Logout</button></div>
    
  )
}
