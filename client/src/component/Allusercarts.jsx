import React, { useEffect, useState } from 'react'
import { getallCarts } from '../api/bookapi';

export default function Allusercarts() {
 
 const [carts,setCarts]=useState([]);
   const user=JSON.parse( localStorage.getItem("user"));
  
    const fetchCarts=async()=>{
        try{
            const cartsData=await getallCarts(user.id || user._id);
            if(!cartsData.data.data){
                console.log("No carts found for this user !");
                return;
            }
            setCarts(cartsData.data.data);
            console.log("carts ",cartsData.data.data);
        
        }
        catch(err){
            console.error("Error fetching carts:",err);
        }
    }
    useEffect(()=>{
        fetchCarts();
    },[])
  
    return (
    <div className="p-6">
    <div>{carts && carts.length > 0 ? carts.map((cart,index) => 
     <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Cart {index + 1}</h2>
        <p className="text-gray-600 mb-4">User: {cart.user.name} ({cart.user.email})</p>
        {cart.items && cart.items.length > 0 ? (
            cart.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border-t pt-4">
                    <h3 className="text-lg font-semibold">{item.book.bookTitle}</h3>
                    <p className="text-gray-600">Author: {item.book.bookAuthor}</p>
                    <p className="text-gray-600">Price: ${item.book.bookPrice}</p>
                </div>
            ))
        ) : (
            <p className="text-gray-600">No items in this cart.</p>
        )}
    </div>



    ) : "No carts found"} </div>
    </div>
  )
}
