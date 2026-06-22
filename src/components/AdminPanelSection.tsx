import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Users, FileText, Key, Trash2, RefreshCw, Search, 
  Database, UserCheck, Briefcase, ShoppingCart, HelpCircle, Loader2, AlertCircle,
  Lock, Unlock, Eye, EyeOff
} from 'lucide-react';
import { db } from '../lib/supabase';

export default function AdminPanelSection() {
  const [activeTab, setActiveTab] = useState<'employees' | 'applicants' | 'orders'>('employees');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [employees, setEmployees] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; type: 'employee' | 'applicant' | 'order'; name: string } | null>(null);

  // Authorization states
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    return sessionStorage.getItem('surveilx_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (passwordInput === adminPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('surveilx_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect security key. Access Denied.');
    }
  };

  const handleLockConsole = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('surveilx_admin_auth');
    setPasswordInput('');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [empList, appList, ordList] = await Promise.all([
        db.getEmployees(),
        db.getApplicants(),
        db.getYubiOrders()
      ]);
      setEmployees(empList || []);
      setApplicants(appList || []);
      setOrders(ordList || []);
    } catch (err) {
      console.error("Error fetching admin console data:", err);
      showNotification('error', 'Failed to load records from Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleDeleteClick = (id: string, type: 'employee' | 'applicant' | 'order', name: string) => {
    setConfirmDelete({ id, type, name });
  };

  const executeDelete = async () => {
    if (!confirmDelete) return;
    const { id, type, name } = confirmDelete;
    setDeletingId(id);
    setConfirmDelete(null);
    
    try {
      let success = false;
      if (type === 'employee') {
        success = await db.deleteEmployee(id);
      } else if (type === 'applicant') {
        success = await db.deleteApplicant(id);
      } else if (type === 'order') {
        success = await db.deleteYubiOrder(id);
      }

      if (success) {
        showNotification('success', `Successfully deleted "${name}" from Supabase.`);
        // Refresh local view
        await fetchData();
      } else {
        showNotification('error', `Failed to delete "${name}".`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotification('error', `Error occurred while deleting "${name}".`);
    } finally {
      setDeletingId(null);
    }
  };

  const triggerSeeding = async () => {
    setLoading(true);
    try {
      const res = await db.seedDatabase();
      if (res.success) {
        showNotification('success', res.message || 'Database seeded successfully with beautiful demo records!');
        await fetchData();
      } else {
        showNotification('error', res.error || 'Failed to seed database.');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Error seeding database.');
    } finally {
      setLoading(false);
    }
  };

  // Search logic
  const filteredEmployees = employees.filter(emp => 
    (emp.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (emp.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (emp.employeeId || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplicants = applicants.filter(app => 
    (app.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.role || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(ord => 
    (ord.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ord.address || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ord.keyType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ord.id || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <section id="admin-console" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950 via-[#050B1A] to-[#030712] -z-10" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md mx-auto my-12 bg-[#0B132B]/85 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand to-rose-600" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="h-16 w-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand animate-pulse">
                <Lock className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight font-sans text-white">
                  Console Locked
                </h3>
                <p className="text-xs text-slate-450 max-w-xs font-sans leading-relaxed">
                  The Admin Control Panel is encrypted. Please enter the master security password to decrypt database registers.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                    MASTER PASSWORD
                  </label>
                  <div className="relative">
                    <input 
                      type={passwordVisible ? "text" : "password"} 
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError('');
                      }}
                      placeholder="••••••••••••••••"
                      className="w-full rounded-2xl border border-slate-800 bg-[#050B1A] px-4 py-3.5 pr-11 text-xs text-white placeholder-slate-650 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition font-mono font-medium tracking-widest text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350 transition cursor-pointer"
                    >
                      {passwordVisible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-left text-[11px] text-brand font-semibold flex items-start gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-brand/20 transition duration-200 cursor-pointer active:scale-98"
                >
                  <Unlock className="h-3.5 w-3.5" />
                  <span>Decrypt Console</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin-console" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950 via-[#050B1A] to-[#030712] -z-10" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-semibold uppercase tracking-wider mb-3">
              <Shield className="h-3.5 w-3.5" /> SECURE CONTROL CONSOLE
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-sans">
              SurveilX AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-500">Admin Control Panel</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Inspect database tables directly, verify submitted career specialist forms, track YubiKey physical key distributions, and manage credential parameters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerSeeding}
              disabled={loading}
              className="flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900/50 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition duration-200 cursor-pointer"
            >
              <Database className="h-3.5 w-3.5 text-brand" /> 🌱 Seed Demo Data
            </button>

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-slate-400 ${loading ? 'animate-spin' : ''}`} /> Sync Live
            </button>

            <button
              onClick={handleLockConsole}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-brand px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition duration-200 cursor-pointer"
              title="Lock Console"
            >
              <Lock className="h-3.5 w-3.5" /> Lock Console
            </button>
          </div>
        </div>

        {/* Status Alerts Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg border ${
                notification.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/25 text-brand'
              }`}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Metric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Registered Employees */}
          <div className="bg-[#0B132B]/60 border border-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">REGISTERED STAFF</span>
              <h3 className="text-3xl font-black tracking-tight">{employees.length}</h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">Active verifiers &amp; guards</p>
            </div>
            <div className="h-12 w-12 bg-brand/10 rounded-xl border border-brand/15 text-brand flex items-center justify-center shrink-0">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>

          {/* Card 2: Job Applicants */}
          <div className="bg-[#0B132B]/60 border border-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">JOB CANDIDATES</span>
              <h3 className="text-3xl font-black tracking-tight">{applicants.length}</h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">Submitted resumes &amp; info</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl border border-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Briefcase className="h-6 w-6" />
            </div>
          </div>

          {/* Card 3: YubiKey Orders */}
          <div className="bg-[#0B132B]/60 border border-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">HARDWARE DISPATCHES</span>
              <h3 className="text-3xl font-black tracking-tight">
                {orders.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0)}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">YubiKey physical devices ordered</p>
            </div>
            <div className="h-12 w-12 bg-yellow-500/10 rounded-xl border border-yellow-500/15 text-yellow-500 flex items-center justify-center shrink-0">
              <ShoppingCart className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Workbench Control Block */}
        <div className="bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top filter row */}
          <div className="p-5 md:p-6 border-b border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex bg-[#050B1A] border border-slate-900 rounded-xl p-1 shrink-0 self-start">
              <button
                onClick={() => { setActiveTab('employees'); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 ${
                  activeTab === 'employees'
                    ? 'bg-brand text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Users className="h-3.5 w-3.5" /> Employees ({employees.length})
              </button>
              <button
                onClick={() => { setActiveTab('applicants'); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 ${
                  activeTab === 'applicants'
                    ? 'bg-brand text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <FileText className="h-3.5 w-3.5" /> Applicants ({applicants.length})
              </button>
              <button
                onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 ${
                  activeTab === 'orders'
                    ? 'bg-brand text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Key className="h-3.5 w-3.5" /> YubiKey Orders ({orders.length})
              </button>
            </div>

            {/* Search filter input */}
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full rounded-xl border border-slate-900 bg-[#050B1A] pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition font-sans font-medium"
              />
            </div>
          </div>

          {/* Table display frame */}
          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                <Loader2 className="h-8 w-8 text-brand animate-spin" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Syncing database registers...</span>
              </div>
            ) : (
              <>
                {/* 1. EMPLOYEES PANEL */}
                {activeTab === 'employees' && (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 bg-[#050B1A]/40 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Employee ID</th>
                        <th className="py-4 px-6">Email / Password</th>
                        <th className="py-4 px-6">Contact / Education</th>
                        <th className="py-4 px-6">Joined Date</th>
                        <th className="py-4 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/30 text-xs">
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                          <tr key={emp.employeeId} className="hover:bg-slate-900/10 transition duration-150">
                            <td className="py-4 px-6 font-bold font-sans text-slate-200">
                              <div className="flex items-center gap-3">
                                {emp.photoUrl ? (
                                  <img src={emp.photoUrl} alt="avatar" className="h-8 w-8 rounded-lg object-cover bg-slate-900 border border-slate-800" />
                                ) : (
                                  <div className="h-8 w-8 bg-brand/10 border border-brand/20 text-brand rounded-lg flex items-center justify-center font-bold text-xs uppercase">
                                    {emp.fullName ? emp.fullName.charAt(0) : 'U'}
                                  </div>
                                )}
                                <span>{emp.fullName}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-mono font-bold text-slate-400">
                              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px]">
                                {emp.employeeId}
                              </span>
                            </td>
                            <td className="py-4 px-6 space-y-0.5 font-sans">
                              <div className="text-slate-300 font-medium select-text">{emp.email}</div>
                              <div className="text-[10px] font-mono text-slate-500 font-bold select-text">PASS: {emp.password}</div>
                            </td>
                            <td className="py-4 px-6 space-y-0.5 font-sans">
                              <div className="text-slate-300">{emp.phone || 'N/A'}</div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{emp.education || 'N/A'}</div>
                            </td>
                            <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">{emp.completedAt || 'June 2026'}</td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => handleDeleteClick(emp.employeeId, 'employee', emp.fullName)}
                                disabled={deletingId === emp.employeeId}
                                className="p-2 text-slate-500 hover:text-brand hover:bg-brand/10 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50"
                                title="Delete Employee"
                              >
                                {deletingId === emp.employeeId ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-16 text-center text-slate-500 font-medium">
                            <Users className="h-10 w-10 text-slate-700 mx-auto mb-2.5" />
                            No employees found matching filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {/* 2. APPLICANTS PANEL */}
                {activeTab === 'applicants' && (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 bg-[#050B1A]/40 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <th className="py-4 px-6">Candidate</th>
                        <th className="py-4 px-6">Role Applied</th>
                        <th className="py-4 px-6">Email / Phone</th>
                        <th className="py-4 px-6">Education</th>
                        <th className="py-4 px-6">Status / Date</th>
                        <th className="py-4 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/30 text-xs">
                      {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-900/10 transition duration-150">
                            <td className="py-4 px-6 font-bold font-sans text-slate-200">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs uppercase">
                                  {app.fullName ? app.fullName.charAt(0) : 'A'}
                                </div>
                                <span>{app.fullName}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-medium text-slate-300 font-sans">
                              {app.role || 'Threat Specialist'}
                            </td>
                            <td className="py-4 px-6 space-y-0.5 font-sans">
                              <div className="text-slate-300 select-text">{app.email}</div>
                              <div className="text-[10px] font-mono text-slate-500">{app.phone || 'N/A'}</div>
                            </td>
                            <td className="py-4 px-6 text-slate-300 font-sans">{app.education || 'N/A'}</td>
                            <td className="py-4 px-6 space-y-1">
                              <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                                {app.status || 'Applied'}
                              </span>
                              <div className="text-[10px] text-slate-500 font-mono font-semibold">{app.completedAt || 'June 2026'}</div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => handleDeleteClick(app.id, 'applicant', app.fullName)}
                                disabled={deletingId === app.id}
                                className="p-2 text-slate-500 hover:text-brand hover:bg-brand/10 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50"
                                title="Delete Applicant"
                              >
                                {deletingId === app.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-16 text-center text-slate-500 font-medium">
                            <FileText className="h-10 w-10 text-slate-700 mx-auto mb-2.5" />
                            No applicants found matching filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {/* 3. YUBIKEY ORDERS PANEL */}
                {activeTab === 'orders' && (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 bg-[#050B1A]/40 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <th className="py-4 px-6">Recipient Name</th>
                        <th className="py-4 px-6">Shipping Address</th>
                        <th className="py-4 px-6">Hardware Type</th>
                        <th className="py-4 px-6 text-center">Qty</th>
                        <th className="py-4 px-6">Ordered Date</th>
                        <th className="py-4 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/30 text-xs">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-900/10 transition duration-150">
                            <td className="py-4 px-6 font-bold font-sans text-slate-200">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center font-bold text-xs uppercase">
                                  {ord.fullName ? ord.fullName.charAt(0) : 'O'}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="block">{ord.fullName}</span>
                                  <span className="block text-[10px] font-mono text-slate-500 font-bold uppercase">TEL: {ord.phone || 'N/A'}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 max-w-xs font-sans text-slate-300 leading-tight">
                              {ord.address}
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-300 leading-none">
                              <div className="flex items-center gap-1.5">
                                <Key className="h-3.5 w-3.5 text-yellow-500/80 shrink-0" />
                                <span className="font-sans font-bold text-[11px]">{ord.keyType}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center font-bold text-white font-mono text-[13px]">
                              {ord.quantity}
                            </td>
                            <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">{ord.orderedAt || 'June 2026'}</td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => handleDeleteClick(ord.id, 'order', ord.fullName)}
                                disabled={deletingId === ord.id}
                                className="p-2 text-slate-500 hover:text-brand hover:bg-brand/10 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50"
                                title="Delete Order"
                              >
                                {deletingId === ord.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-16 text-center text-slate-500 font-medium">
                            <Key className="h-10 w-10 text-slate-700 mx-auto mb-2.5" />
                            No orders found matching filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              className="fixed inset-0 bg-[#050B1A]/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-100 max-w-md w-full p-6 md:p-8 shadow-2xl relative z-10 text-left font-sans"
            >
              <div className="h-12 w-12 bg-red-50 border border-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 leading-tight tracking-tight mb-2">
                Confirm Deletion
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                Are you absolutely sure you want to delete <span className="font-bold text-slate-900">"{confirmDelete.name}"</span>? This will permanently remove this record from your Supabase storage.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 border border-slate-200 hover:border-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition duration-150 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Yes, Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
