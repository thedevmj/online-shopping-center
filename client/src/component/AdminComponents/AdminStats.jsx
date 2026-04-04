import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BookOpenIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const StatCard = React.memo(({ title, value, change, icon: Icon, trend }) => (
  <div className="group relative overflow-hidden rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-emerald-500/5 to-blue-500/5" />
    
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-emerald-400 mt-2">{value}</p>
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? (
              <ArrowTrendingUpIcon className="h-4 w-4" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4" />
            )}
            {change}%
          </div>
        )}
      </div>
      <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

const RecentOrderItem = React.memo(({ order }) => (
  <div className="flex items-center justify-between p-4 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
    <div className="flex-1">
      <p className="font-medium text-emerald-300">Order #{order.id}</p>
      <p className="text-sm text-slate-400">{order.customer}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-emerald-400">${order.amount}</p>
      <span className={`text-xs px-2 py-1 rounded-full ${
        order.status === 'completed' 
          ? 'bg-green-500/20 text-green-300'
          : order.status === 'pending'
          ? 'bg-yellow-500/20 text-yellow-300'
          : 'bg-red-500/20 text-red-300'
      }`}>
        {order.status}
      </span>
    </div>
  </div>
));

RecentOrderItem.displayName = 'RecentOrderItem';

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    bookChange: 0,
    userChange: 0,
    orderChange: 0,
    revenueChange: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      // Simulated API calls - replace with actual endpoints
      // const booksRes = await fetch('/api/books/count');
      // const usersRes = await fetch('/api/users/count');
      // const ordersRes = await fetch('/api/orders');
      // const revenueRes = await fetch('/api/revenue');

      // Placeholder data
      setStats({
        totalBooks: 245,
        totalUsers: 1234,
        totalOrders: 5678,
        totalRevenue: 45230,
        bookChange: 12,
        userChange: 8,
        orderChange: 15,
        revenueChange: 20,
        recentOrders: [
          { id: '1001', customer: 'John Doe', amount: 234.99, status: 'completed' },
          { id: '1002', customer: 'Jane Smith', amount: 154.50, status: 'pending' },
          { id: '1003', customer: 'Bob Johnson', amount: 89.99, status: 'completed' },
          { id: '1004', customer: 'Alice Brown', amount: 342.00, status: 'pending' },
          { id: '1005', customer: 'Charlie Wilson', amount: 198.50, status: 'completed' },
        ],
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
            <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
          </div>
          <p className="text-emerald-300">Loading stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          change={stats.bookChange}
          trend="up"
          icon={BookOpenIcon}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change={stats.userChange}
          trend="up"
          icon={UsersIcon}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.orderChange}
          trend="up"
          icon={ShoppingCartIcon}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          change={stats.revenueChange}
          trend="up"
          icon={CurrencyDollarIcon}
        />
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg backdrop-blur-xl bg-linear-to-brrom-slate-700/50 to-slate-800/50 border border-emerald-500/20 overflow-hidden">
        <div className="p-6 border-b border-emerald-500/20">
          <h2 className="text-lg font-semibold text-emerald-400">Recent Orders</h2>
        </div>
        <div className="divide-y divide-slate-700/50">
          {stats.recentOrders.map((order) => (
            <RecentOrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard title="Top Selling Books" icon={BookOpenIcon} />
        <QuickActionCard title="Active Users" icon={UsersIcon} />
        <QuickActionCard title="Pending Orders" icon={ShoppingCartIcon} />
      </div>
    </div>
  );
}

const QuickActionCard = React.memo(({ title, icon: Icon }) => (
  <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-emerald-500/10">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-emerald-300 font-medium">{title}</p>
        <p className="text-sm text-slate-400">View details →</p>
      </div>
    </div>
  </div>
));

QuickActionCard.displayName = 'QuickActionCard';
