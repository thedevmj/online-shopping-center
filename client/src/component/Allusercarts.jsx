import React, { useContext, useEffect, useState } from "react";

export default function Allusercarts() {
  const [carts, setCarts] = useState([]);

  const fetchCarts = async () => {
    try {
      const cartsData = await fetch(`http://localhost:3000/api/book/getallcarts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await cartsData.json();
      if (!data?.data) {
        return;
      }
      setCarts(data.data);
    } catch (err) {
      console.error("Error fetching carts:", err);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const removeCartItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/book/deletecart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (response.status === 200) {
        fetchCarts();
      } else {
        console.error("Failed to remove item from cart !");
      }
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-white/70">Manage your selected books</p>
        </div>

        {carts && carts.length > 0 ? (
          carts.map((cart, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
            >
              <div className="grid gap-6">
                {cart.items && cart.items.length > 0 ? (
                  cart.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <img
                              src={item.book?.image}
                              alt={item.book?.bookTitle}
                              className="w-20 h-20 object-cover rounded-xl border border-white/20"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-xl"></div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">
                              {item.book?.bookTitle}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {item.book?.bookAuthor}
                            </p>
                            <p className="text-emerald-300 font-medium mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="text-right space-y-3">
                          <p className="text-2xl font-bold text-emerald-300">
                            ${item.book?.bookPrice * item.quantity}
                          </p>
                          <button
                            className="bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20"
                            onClick={() => {
                              removeCartItem(item._id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60 text-lg">
                      No items in this cart
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-white/70">
              Start shopping to add items to your cart
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
