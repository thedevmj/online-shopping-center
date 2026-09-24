import React, { useEffect, useState } from "react";
import { buildApiUrl } from "../config";
import { showToast } from "./Toast";

const CANCEL_WINDOW_MS = 24 * 60 * 60 * 1000;

export default function ViewOrder() {
  const [order, setOrder] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        buildApiUrl("/auth/user/orderbyid"),
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

  const handleCancelOrder = async (orderId) => {
    const target = order.find((o) => o._id === orderId);
    if (target?.orderStatus !== "processing") {
      showToast("This order can no longer be cancelled.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }
    setCancellingId(orderId);
    try {
      const response = await fetch(
        buildApiUrl(`/auth/user/cancelorder/${orderId}`),
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok || data.success !== true) {
        throw new Error(data?.message || "Failed to cancel the order");
      }
      showToast(data.message || "Order cancelled successfully!", "success");
      fetchOrder();
    } catch (err) {
      console.error("Error cancelling order:", err);
      showToast(err?.message || "Failed to cancel the order.", "error");
    } finally {
      setCancellingId(null);
    }
  };

  const canCancel = (o) =>
    o.orderStatus === "processing" &&
    Date.now() - new Date(o.createdAt).getTime() <= CANCEL_WINDOW_MS;

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
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
                    <p className="text-xl font-semibold text-lime-400">
                      ${order.totalAmount}
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          order.orderStatus === "cancelled"
                            ? "bg-red-500/20 text-red-300"
                            : order.orderStatus === "processing"
                            ? "bg-lime-700/30 text-lime-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                      {canCancel(order) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingId === order._id}
                          className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/40 hover:bg-red-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {cancellingId === order._id
                            ? "Cancelling..."
                            : "Cancel Order"}
                        </button>
                      )}
                      {order.orderStatus === "processing" &&
                        !canCancel(order) && (
                          <span
                            className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-400"
                            title="Cancellation window of 24 hours has expired"
                          >
                            Cancel window expired
                          </span>
                        )}
                    </div>
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
                        <p className="text-base font-medium text-lime-300">
                          {item.title}
                        </p>

                        <div className="flex justify-between text-sm text-slate-300 mt-2">
                          <span>Qty: {item.quantity}</span>
                          <span>${item.priceAtPurchase}</span>
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