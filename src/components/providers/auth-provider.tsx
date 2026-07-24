"use client";

/**
 * Auth Provider — wraps the app and exposes the current Supabase user session.
 *
 * Usage:
 *   const { user, openLogin, logout } = useAuth();
 *
 * `openLogin()` shows the LoginModal. Call it when a user tries to start a
 * course without being signed in.
 */

import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  /** True when login modal should be shown */
  loginOpen: boolean;
  /** Call this to require login before proceeding */
  openLogin: (onSuccessHref?: string) => void;
  closeLogin: () => void;
  /** Href to navigate to after a successful login (set by openLogin) */
  pendingHref: string | null;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [pendingHref, setPendingHref] = React.useState<string | null>(null);

  // Bootstrap: get current session and subscribe to auth changes.
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openLogin = React.useCallback((onSuccessHref?: string) => {
    setPendingHref(onSuccessHref ?? null);
    setLoginOpen(true);
  }, []);

  const closeLogin = React.useCallback(() => {
    setLoginOpen(false);
    setPendingHref(null);
  }, []);

  const logout = React.useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginOpen, openLogin, closeLogin, pendingHref, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
