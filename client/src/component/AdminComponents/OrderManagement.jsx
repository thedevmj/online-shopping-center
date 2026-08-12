import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { orderstatus } from "../../api/bookapi";
import { buildApiUrl } from "../../config";

//  FIXED STATUS BADGE
const StatusBadge = ({ status }) => {
  const statusConfig = {
    processing: { color: "text-yellow-400", icon: ClockIcon },
    shipped: { color: "text-blue-400", icon: ClockIcon },
    delivered: { color: "text-green-400", icon: CheckCircleIcon },
    cancelled: { color: "text-red-400", icon: XCircleIcon },
  };

  const config = statusConfig[status] || statusConfig.processing;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1 ${config.color}`}>
      <Icon className="h-4 w-4" />
      {status}
    </div>
  );
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [Orderstatus, setOrderstatus] = useState("");
  // FETCH
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(buildApiUrl("/auth/user/getuserorder"), {
        credentials: "include",
      });

      const data = await res.json();
      const normalized = Array.isArray(data.data) ? data.data : [data.data];
      setOrders(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // for changing status
  const statuschange = async (orderId) => {
    try {
    } catch (err) {
      console.log("Error changing status ", err);
    }
  };
  //  FILTER + SEARCH
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        String(order._id).toLowerCase().includes(query) ||
        String(order.user?.email || "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        filterStatus === "all" || order.orderStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, filterStatus]);
  //  STATUS CHANGE (frontend only)
  const handleStatusChange = useCallback(async (id, status) => {
    try {
      const res = await fetch(buildApiUrl(`/auth/user/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok){ 
        console.log("Could not change status ", err);
        return;
      };
       setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, orderStatus: status } : order
      )
    );
      showToast("Status changed!", "success");
      
    } catch (err) {
      console.log("Error occured while changing status ", err);
      showToast("Could not change order status.", "error");
    }
  });

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 text-white">
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute top-2 left-2 text-gray-400" />
          <input
            className="pl-8 pr-4 py-2 bg-gray-800 rounded"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {["all", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1 rounded ${
              filterStatus === s ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No orders found
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-700 text-center"
              >
                <td>{order.user.email.slice(0, 4)}</td>

                <td>{order.user?.email || "N/A"}</td>

                <td>{order.items.book || 0}</td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <StatusBadge status={order.orderStatus} />
                </td>

                <td className="flex gap-2 justify-center py-2">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-gray-800"
                  >
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex gap-10 mt-6">
        <p>Total: {orders.length}</p>
        <p>
          Processing:{" "}
          {orders.filter((o) => o.orderStatus === "processing").length}
        </p>
        <p>Revenue: ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0)}</p>
      </div>
    </div>
  );
}
