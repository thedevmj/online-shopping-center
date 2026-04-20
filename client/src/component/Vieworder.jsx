import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewOrder() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/user/orderbyid",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setOrder(data.data);
    } catch (err) {
      console.log("Error fetching order for this user ", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-8 tracking-tight">
          My Orders
        </h1>

        {/* Empty State */}
        {order.length === 0 ? (
          <div className="bg-slate-800 p-10 rounded-2xl text-center shadow-lg">
            <p className="text-lg text-slate-300">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {order.map((order) => (
              <div
                key={order._id}
                className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <div>
                    <h2 className="text-lg font-medium">
                      Order ID
                    </h2>
                    <p className="text-sm text-slate-400 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold text-emerald-400">
                      ₹{order.totalAmount}
                    </p>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-700/30 text-purple-300">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="border-t border-slate-700 pt-4">
                  <h3 className="text-sm uppercase text-slate-400 mb-3 tracking-wide">
                    Items
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:bg-slate-900 transition"
                      >
                        <p className="text-base font-medium text-fuchsia-400">
                          {item.title}
                        </p>

                        <div className="flex justify-between text-sm text-slate-300 mt-2">
                          <span>Qty: {item.quantity}</span>
                          <span>₹{item.priceAtPurchase}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}