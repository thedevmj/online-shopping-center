import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

export default function UserDashboard() {
  const role = localStorage.getItem("user");
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'My Orders',
      description: 'View and track your order history',
      icon: ClipboardDocumentListIcon,
      path: '/ordercart',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Shopping Cart',
      description: 'Check items in your cart',
      icon: ShoppingBagIcon,
      path: '/allcarts',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Favorites',
      description: 'Your saved books and items',
      icon: HeartIcon,
      path: '/favorites', // Assuming a favorites page exists or add later
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Profile Settings',
      description: 'Update your account information',
      icon: UserIcon,
      path: '/profile', // Assuming a profile page exists or add later
      color: 'from-orange-400 to-orange-600',
    },
    {
      title: 'Browse Books',
      description: 'Explore our book collection',
      icon: ShoppingBagIcon,
      path: '/shopping',
      color: 'from-teal-400 to-teal-600',
    },
    {
      title: 'Account Settings',
      description: 'Manage your preferences',
      icon: CogIcon,
      path: '/settings', // Assuming a settings page exists or add later
      color: 'from-indigo-400 to-indigo-600',
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back User !"</h1>
            <p className="text-white/70">Manage your account, track orders, and discover new books in your personalized dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-r ${item.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">0</div>
                <p className="text-white/70">Total Orders</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                <p className="text-white/70">Items in Cart</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
                <p className="text-white/70">Favorite Books</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
