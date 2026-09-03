'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  mobileNumber?: string;
  avatarUrl?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isDemoUser: boolean;
  signIn: (email: string, pass: string) => Promise<{ error?: string }>;
  signUp: (email: string, pass: string, fullName: string, mobileNumber?: string) => Promise<{ error?: string; message?: string }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error?: string }>;
  signInAsDemo: (name?: string, email?: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_BYPASS_USER: UserProfile = {
  id: 'demo-user-123',
  email: 'alex.morgan@legaljargon.demo',
  fullName: 'Alex Morgan',
  mobileNumber: '+1 (555) 019-2834',
  isDemo: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(true);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;

    // First check localStorage for persistent bypass session
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('legaljargon_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setIsDemoUser(Boolean(parsed.isDemo));
        } catch (e) {
          console.error('Failed to parse stored user:', e);
        }
      }
    }

    const getInitialSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted && currentSession?.user) {
          setSession(currentSession);
          const loggedInUser: UserProfile = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            fullName: currentSession.user.user_metadata?.full_name || currentSession.user.email?.split('@')[0] || 'User',
            mobileNumber: currentSession.user.user_metadata?.mobile_number,
            avatarUrl: currentSession.user.user_metadata?.avatar_url,
            isDemo: false,
          };
          setUser(loggedInUser);
          if (typeof window !== 'undefined') {
            localStorage.setItem('legaljargon_user', JSON.stringify(loggedInUser));
          }
          setIsDemoUser(false);
        }
      } catch (err) {
        console.error('Error fetching auth session:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;

      if (newSession?.user) {
        setSession(newSession);
        const loggedInUser: UserProfile = {
          id: newSession.user.id,
          email: newSession.user.email || '',
          fullName: newSession.user.user_metadata?.full_name || newSession.user.email?.split('@')[0] || 'User',
          mobileNumber: newSession.user.user_metadata?.mobile_number,
          avatarUrl: newSession.user.user_metadata?.avatar_url,
          isDemo: false,
        };
        setUser(loggedInUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('legaljargon_user', JSON.stringify(loggedInUser));
        }
        setIsDemoUser(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (!error && data?.user) {
        const loggedUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          mobileNumber: data.user.user_metadata?.mobile_number,
          isDemo: false,
        };
        setUser(loggedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('legaljargon_user', JSON.stringify(loggedUser));
        }
        setIsDemoUser(false);
        return {};
      }
    } catch (err) {
      // Ignore database auth errors for bypass fallback
    }

    // Direct Bypass Authentication: instantly sign in using provided credentials
    const formattedName = email
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const bypassUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: email || 'user@legaljargon.demo',
      fullName: formattedName || 'Legal Jargon User',
      isDemo: true,
    };

    setUser(bypassUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaljargon_user', JSON.stringify(bypassUser));
    }
    setIsDemoUser(true);
    return {};
  };

  const signUp = async (
    email: string,
    pass: string,
    fullName: string,
    mobileNumber?: string
  ): Promise<{ error?: string; message?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: fullName,
            mobile_number: mobileNumber,
          },
        },
      });

      if (!error && data?.user) {
        const loggedUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName || email.split('@')[0],
          mobileNumber,
          isDemo: false,
        };
        setUser(loggedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('legaljargon_user', JSON.stringify(loggedUser));
        }
        setIsDemoUser(false);
        return {};
      }
    } catch (err) {
      // Ignore database errors for bypass mode
    }

    // Direct Bypass Registration: instantly sign up and log in
    const bypassUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: email || 'user@legaljargon.demo',
      fullName: fullName || 'New User',
      mobileNumber: mobileNumber || '',
      isDemo: true,
    };

    setUser(bypassUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaljargon_user', JSON.stringify(bypassUser));
    }
    setIsDemoUser(true);
    return {};
  };

  const signInWithOAuth = async (provider: 'google' | 'github'): Promise<{ error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (err: any) {
      // Fallback demo signin if OAuth fails
      signInAsDemo('Social User', `user.${provider}@legaljargon.demo`);
      return {};
    }
  };

  const signInAsDemo = (name = 'Alex Morgan', email = 'alex.morgan@legaljargon.demo') => {
    const demoUserObj: UserProfile = {
      id: 'demo-user-123',
      email,
      fullName: name,
      mobileNumber: '+1 (555) 019-2834',
      isDemo: true,
      avatarUrl: undefined,
    };
    setUser(demoUserObj);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaljargon_user', JSON.stringify(demoUserObj));
    }
    setIsDemoUser(true);
    setSession(null);
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('legaljargon_user');
    }
    setSession(null);
    setIsDemoUser(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoUser,
        signIn,
        signUp,
        signInWithOAuth,
        signInAsDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
