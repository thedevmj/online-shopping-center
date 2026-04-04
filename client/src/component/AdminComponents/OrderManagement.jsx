import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const StatusBadge = React.memo(({ status }) => {
  const statusConfig = {
    completed: { bg: 'bg-green-500/20', text: 'text-green-300', icon: CheckCircleIcon },
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', icon: ClockIcon },
    cancelled: { bg: 'bg-red-500/20', text: 'text-red-300', icon: XCircleIcon },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.text} text-xs font-medium`}>
      <Icon className="h-4 w-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
});

StatusBadge.displayName = 'StatusBadge';

const OrderRow = React.memo(({ order, onView, onStatusChange }) => (
  <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
    <td className="px-6 py-4">
      <p className="font-medium text-emerald-300">
        #{order.orderId}
      </p>
      <p className="text-xs text-slate-400">{order.date}</p>
    </td>
    <td className="px-6 py-4 text-slate-300">{order.customer}</td>
    <td className="px-6 py-4 text-slate-300">{order.items} items</td>
    <td className="px-6 py-4 text-emerald-400 font-semibold">${order.total}</td>
    <td className="px-6 py-4">
      <StatusBadge status={order.status} />
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(order)}
          className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-colors"
        >
          <EyeIcon className="h-5 w-5" />
        </button>
        {order.status !== 'completed' && (
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.orderId, e.target.value)}
            className="px-2 py-1 bg-slate-700/50 border border-emerald-500/30 rounded text-sm text-slate-300 focus:outline-none focus:border-emerald-400/60"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        )}
      </div>
    </td>
  </tr>
));

OrderRow.displayName = 'OrderRow';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await fetch('/api/orders');
      // const data = await response.json();
      // setOrders(data.data);

      // Placeholder data
      setOrders([
        {
          orderId: '001',
          customer: 'John Doe',
          email: 'john@example.com',
          items: 3,
          total: 234.99,
          status: 'completed',
          date: '2024-04-01',
          books: [
            { title: 'The Great Gatsby', price: 12.99, quantity: 1 },
            { title: 'To Kill a Mockingbird', price: 14.99, quantity: 1 },
            { title: '1984', price: 13.99, quantity: 1 },
          ],
        },
        {
          orderId: '002',
          customer: 'Jane Smith',
          email: 'jane@example.com',
          items: 2,
          total: 154.50,
          status: 'pending',
          date: '2024-04-02',
          books: [
            { title: 'Pride and Prejudice', price: 11.99, quantity: 1 },
            { title: 'The Catcher in the Rye', price: 13.99, quantity: 1 },
          ],
        },
        {
          orderId: '003',
          customer: 'Bob Johnson',
          email: 'bob@example.com',
          items: 1,
          total: 89.99,
          status: 'completed',
          date: '2024-04-03',
          books: [
            { title: 'Wuthering Heights', price: 12.99, quantity: 1 },
          ],
        },
        {
          orderId: '004',
          customer: 'Alice Brown',
          email: 'alice@example.com',
          items: 4,
          total: 342.00,
          status: 'pending',
          date: '2024-04-04',
          books: [
            { title: 'Jane Eyre', price: 13.99, quantity: 2 },
            { title: 'Frankenstein', price: 11.99, quantity: 1 },
            { title: 'Dracula', price: 12.99, quantity: 1 },
          ],
        },
      ]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderId.includes(searchQuery) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    return filtered;
  }, [orders, searchQuery, filterStatus]);

  const handleStatusChange = useCallback((orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  }, []);

  const handleViewOrder = useCallback((order) => {
    setSelectedOrder(order);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
            <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
          </div>
          <p className="text-emerald-300">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {['all', 'pending', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/60'
                  : 'bg-slate-700/50 text-slate-300 border border-emerald-500/30 hover:bg-slate-600/50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-emerald-500/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-500/20 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <OrderRow
                  key={order.orderId}
                  order={order}
                  onView={handleViewOrder}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400">Total Orders</p>
          <p className="text-2xl font-bold text-emerald-400">{orders.length}</p>
        </div>
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-400">
            ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
