import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const UserRow = React.memo(({ user, onDelete, onToggleRole }) => (
  <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors" key={user._id}>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-semibold">
          {user.email.split[1]}
        </div>
        <div>
          <p className="font-medium text-emerald-300">{user.email}</p>
          <p className="text-xs text-slate-400">{user.joinDate}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-slate-300">
        <EnvelopeIcon className="h-4 w-4 text-slate-500" />
        {user.email}
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        user.status === 'active'
          ? 'bg-green-500/20 text-green-300 flex items-center gap-1 w-fit'
          : 'bg-yellow-500/20 text-yellow-300 flex items-center gap-1 w-fit'
      }`}>
        {user.status === 'active' ? (
          <CheckCircleIcon className="h-3 w-3" />
        ) : (
          <ExclamationCircleIcon className="h-3 w-3" />
        )}
        {user.status}
      </span>
    </td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 w-fit ${
        user.role === 'admin'
          ? 'bg-emerald-500/20 text-emerald-300'
          : 'bg-slate-700/50 text-slate-300'
      }`}>
        <ShieldCheckIcon className="h-4 w-4" />
        {user.role}
      </span>
    </td>
    <td className="px-6 py-4">${user.totalSpent}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleRole(user.id)}
          className="px-3 py-1 text-xs rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
        >
          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
));

UserRow.displayName = 'UserRow';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
    const userlist= await fetch("http://localhost:3000/auth/user/getuserdetails",{
        method:"GET",
        credentials:"include"
      })
      
      if(userlist.length === 0){
       console.log("error fetching user !");
       return;
      }
    const data=await userlist.json();
    setUsers(data.data);
     
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

 
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    
    if (searchQuery) {
      filtered = filtered.filter(user =>
        users.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        users.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    return filtered;
  }, [users, searchQuery, filterStatus]);

  const handleDelete = useCallback((userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(users => users.id !== userId));
    }
  }, []);

  const handleToggleRole = useCallback((userId) => {
    setUsers(prev =>
      prev.map(users =>
        users.id === userId
          ? { ...users, role: users.role === 'Admin' ? 'User' : 'Admin' }
          : users
      )
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
            <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
          </div>
          <p className="text-emerald-300">Loading users...</p>
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {['all', 'active', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/60'
                  : 'bg-slate-700/50 text-slate-300 border border-emerald-500/30 hover:bg-slate-600/50'
              }`}
            >
              { status}
            </button>
          ))}
        </div>
      </div>

     
      <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-emerald-500/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-500/20 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Total Spent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserRow
                  key={user._id}
                  user={user}
                  onDelete={handleDelete}
                  onToggleRole={handleToggleRole}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">{users.length}</p>
        </div>
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400 text-sm">Active Users</p>
          <p className="text-2xl font-bold text-green-400 mt-2">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400 text-sm">Admin Users</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-slate-700/30 border border-emerald-500/20">
          <p className="text-slate-400 text-sm">Avg Spent</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">
            ${(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
