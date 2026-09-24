import React, { useState, useEffect, useCallback } from 'react';
import {
  BookOpenIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { buildApiUrl } from "../../config";

const StatCard = React.memo(({ title, value, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 p-6 border border-lime-500/20 hover:border-lime-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-lime-500/5 to-blue-500/5" />

    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-lime-400 mt-2">{value}</p>
      </div>
      <div className="p-3 rounded-lg bg-lime-500/10 text-lime-400">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

const StoreBookItem = React.memo(({ book }) => (
  <div className="flex items-center justify-between gap-4 p-4 hover:bg-slate-800/30 transition-colors">
    <div className="flex items-center gap-4 min-w-0">
      <img
        src={book.image}
        alt={book.bookTitle}
        className="h-12 w-12 rounded-lg object-cover shrink-0"
      />
      <div className="min-w-0">
        <p className="font-medium text-lime-300 truncate">{book.bookTitle}</p>
        <p className="text-sm text-slate-400 truncate">
          {book.bookAuthor} · {book.bookCategory?.name || 'N/A'}
        </p>
      </div>
    </div>
    <div className="text-right shrink-0">
      <p className="font-semibold text-lime-400">${book.bookPrice}</p>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          book.stock > 10
            ? 'bg-green-500/20 text-green-300'
            : book.stock > 0
            ? 'bg-yellow-500/20 text-yellow-300'
            : 'bg-red-500/20 text-red-300'
        }`}
      >
        {book.stock} units
      </span>
    </div>
  </div>
));

StoreBookItem.displayName = 'StoreBookItem';

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const [booksRes, usersRes, ordersRes] = await Promise.all([
        fetch(buildApiUrl('/api/book/getall')),
        fetch(buildApiUrl('/auth/user/getuserdetails'), { credentials: 'include' }),
        fetch(buildApiUrl('/auth/user/getuserorder'), { credentials: 'include' }),
      ]);

      const books = await booksRes.json();
      const users = await usersRes.json();
      const orders = await ordersRes.json();

      const bookList = Array.isArray(books.data) ? books.data : [];
      const userList = Array.isArray(users.data) ? users.data : [];
      const orderList = Array.isArray(orders.data) ? orders.data : [];

      const revenue = orderList
        .filter((o) => o.orderStatus !== 'cancelled')
        .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

      setStats({
        totalBooks: bookList.length,
        totalUsers: userList.length,
        totalOrders: orderList.length,
        totalRevenue: revenue,
        storeBooks: bookList.slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ totalBooks: 0, totalUsers: 0, totalOrders: 0, totalRevenue: 0, storeBooks: [] });
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
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-lime-500/10 mb-4 animate-pulse">
            <div className="h-8 w-8 border-t-2 border-lime-400 rounded-full animate-spin" />
          </div>
          <p className="text-lime-300">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const { totalBooks, totalUsers, totalOrders, totalRevenue, storeBooks } = stats;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={totalBooks} icon={BookOpenIcon} />
        <StatCard title="Total Users" value={totalUsers} icon={UsersIcon} />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingCartIcon} />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          icon={CurrencyDollarIcon}
        />
      </div>

      <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-lime-500/20 overflow-hidden">
        <div className="p-6 border-b border-lime-500/20">
          <h2 className="text-lg font-semibold text-lime-400">Store Books</h2>
          <p className="text-sm text-slate-400 mt-1">
            {totalBooks} book{totalBooks === 1 ? '' : 's'} in the collection
          </p>
        </div>
        <div className="divide-y divide-slate-700/50">
          {storeBooks.length === 0 ? (
            <p className="p-6 text-center text-slate-400">No books in the store yet</p>
          ) : (
            storeBooks.map((book) => <StoreBookItem key={book._id} book={book} />)
          )}
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
  <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 p-6 border border-lime-500/20 hover:border-lime-400/40 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-lime-500/10">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-lime-500/10 text-lime-400 group-hover:bg-lime-500/20 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-lime-300 font-medium">{title}</p>
        <p className="text-sm text-slate-400">View details →</p>
      </div>
    </div>
  </div>
));

QuickActionCard.displayName = 'QuickActionCard';