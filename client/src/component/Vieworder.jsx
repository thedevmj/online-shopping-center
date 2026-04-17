import React, { useEffect } from "react";
import { useState } from "react";

export default function ViewOrder() {
  const [order,setOrder]=useState([]);
 
 
  
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/auth/user/orderbyid",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            
          },
        );

        const data=await response.json();
        setOrder(data.data);
        
        
      } catch (err) {
        console.log("Error fetching order for this user ", err);
      }
    };
    useEffect(() => {
    fetchOrder();
  }, []);
  console.log(order);
  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <h1 className="text-2xl mb-4">My Orders</h1>

      {order.length === 0 ? (
        <p>No orders found</p>
      ) : (
        order.map((order) => (
          <div key={order._id} className="bg-slate-800 p-4 mb-4 rounded">
            <h2>Order ID: {order._id}</h2>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.orderStatus}</p>

            <h3 className="mt-2">Items:</h3>
            {order.items.map((item, index) => (
              <div key={index}>
                <p>{item.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.priceAtPurchase}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
