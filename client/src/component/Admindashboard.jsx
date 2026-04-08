import React, { useState, useCallback, useMemo } from 'react';
import {
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';


const AdminStats = React.lazy(() => import('./AdminComponents/AdminStats'));
const BookManagement = React.lazy(() => import('./AdminComponents/BookManagement'));
const OrderManagement = React.lazy(() => import('./AdminComponents/OrderManagement'));
const UserManagement = React.lazy(() => import('./AdminComponents/UserManagement'));

const TABS = [
  { id: 'stats', label: 'Dashboard', icon: ChartBarIcon },
  { id: 'books', label: 'Books', icon: BookOpenIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingCartIcon },
  { id: 'users', label: 'Users', icon: UsersIcon },
];

export default function Admindashboard({category,search}) {
  const [activeTab, setActiveTab] = useState('stats');

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'stats':
        return <AdminStats />;
      case 'books':
        return <BookManagement category={category} search={search} />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <AdminStats />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
   
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

    
      <div className="relative z-10">
        
        <div className="border-b border-emerald-500/30 backdrop-blur-xl bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-emerald-300/60 mt-2">Manage your ShopHub platform</p>
          </div>
        </div>

       
        <div className="border-b border-emerald-500/20 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto space-x-1 py-4">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === id
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/60'
                      : 'bg-slate-700/50 text-slate-300 border border-emerald-500/20 hover:bg-slate-600/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4">
                    <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
                  </div>
                  <p className="text-emerald-300">Loading...</p>
                </div>
              </div>
            }
          >
            {renderContent}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
