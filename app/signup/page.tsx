'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import SpotlightCard from '@/components/ui/SpotlightCard';

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const { signUp, signInWithOAuth, signInAsDemo, loading: authLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMessage('Please enter your Name, Email, and Password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { error, message } = await signUp(email, password, fullName);

    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } else if (message) {
      setSuccessMessage(message);
      setIsLoading(false);
    } else {
      router.push(redirectPath);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setErrorMessage(null);
    const { error } = await signInWithOAuth(provider);
    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    signInAsDemo(fullName || 'Alex Morgan', email || 'alex.morgan@legaljargon.demo');
    router.push(redirectPath);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-3xl rounded-full z-0" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Create an account
          </h2>
          <p className="text-slate-400 text-sm">
            Sign up with Name, Email &amp; Password
          </p>
        </div>

        {/* Card Container */}
        <SpotlightCard className="p-8 backdrop-blur-xl border border-slate-800/80 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* Quick Demo / Bypass Sign Up Banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs flex items-center justify-between gap-3 text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-950/60 transition-all duration-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
              <span>Instant bypass mode (No DB required)</span>
            </div>
            <button
              onClick={handleDemoSignIn}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center gap-1.5 transition-all text-xs shrink-0 shadow-md shadow-cyan-600/30 hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5" />
              Bypass Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* 2. Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* 3. Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-sm shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-950 px-3 text-slate-400 font-medium">Or sign up with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth('google')}
              type="button"
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>

            <button
              onClick={() => handleOAuth('github')}
              type="button"
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
            >
              Sign in here
            </Link>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}
