'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  FileText,
  Upload,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isDemoUser, signOut } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: FileText },
    { label: 'Upload Document', href: '/upload', icon: Upload },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
              Legal Jargon
            </span>
          </Link>

          {/* Desktop Navigation Links - ONLY VISIBLE WHEN LOGGED IN */}
          {user && (
            <nav className="hidden md:flex items-center gap-1.5">
              <Link
                href="/"
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                  pathname === '/'
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 hover:border hover:border-slate-800'
                }`}
              >
                Overview
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                      active
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80 hover:border hover:border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-400 transition-transform group-hover:scale-110" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Side: Auth User Badge or Login/Signup Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 text-xs text-slate-300 transition-all duration-200 focus:outline-none hover:scale-105"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-slate-200">{user.fullName}</span>
                  {isDemoUser && <span className="text-[10px] text-slate-500 font-mono">(Demo)</span>}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2 z-50 text-xs space-y-1 backdrop-blur-xl animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                      <p className="font-semibold text-slate-100">{user.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      {user.mobileNumber && (
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{user.mobileNumber}</p>
                      )}
                      <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {isDemoUser ? 'Demo Session' : 'Active Account'}
                      </span>
                    </div>

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium transition-colors hover:translate-x-1 duration-150"
                    >
                      <Settings className="w-4 h-4 text-cyan-400" />
                      Account Settings
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 font-medium transition-colors text-left hover:translate-x-1 duration-150"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 hover:scale-105 flex items-center gap-1.5 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-400" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-200 hover:scale-105 flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2 text-xs">
          {user ? (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-medium ${
                  pathname === '/' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                Overview
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive(item.href) ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-900 space-y-2">
                <div className="px-3 py-1 text-slate-400">
                  Logged in as <strong className="text-white">{user.fullName}</strong>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 font-semibold border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-center rounded-xl bg-slate-900 text-slate-200 font-semibold border border-slate-800"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-center rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
