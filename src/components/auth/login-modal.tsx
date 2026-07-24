"use client";

/**
 * LoginModal — slides in when a user tries to start a course without being
 * signed in. Handles both sign-up (first visit) and sign-in (returning user)
 * automatically. Username + password only — no email verification needed.
 *
 * The username is stored as display_name in Supabase user_metadata and is
 * used for certificates.
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, X, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// We use a synthetic email: <username>@skillroute.app
// This means users only ever type a username + password.
function toEmail(username: string) {
  // We use a synthetic email so users only need a username + password.
  // Using .com avoids Supabase's server-side rejection of newer TLDs (.app).
  return `${username.toLowerCase().trim()}@learnwithskillroute.com`;
}

export function LoginModal() {
  const { loginOpen, closeLogin, pendingHref } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Reset state when modal opens
  React.useEffect(() => {
    if (loginOpen) {
      setError("");
      setUsername("");
      setPassword("");
      setMode("signin");
    }
  }, [loginOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim()) { setError("Please enter a username."); return; }
    if (username.trim().length < 2) { setError("Username must be at least 2 characters."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (!/^[a-zA-Z0-9_.-]+$/.test(username.trim())) {
      setError("Username can only contain letters, numbers, underscores, dots and hyphens.");
      return;
    }

    setLoading(true);
    const email = toEmail(username);

    if (mode === "signup") {
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: username.trim() } },
      });
      if (signUpErr) {
        // If user already exists, switch to sign-in
        if (
          signUpErr.message.includes("already registered") ||
          signUpErr.message.includes("already been registered") ||
          signUpErr.message.includes("User already registered")
        ) {
          setError("This username is taken. Switch to 'Sign In' instead.");
          setMode("signin");
        } else if (signUpErr.message.toLowerCase().includes("invalid") || signUpErr.message.toLowerCase().includes("email")) {
          setError("Sign-up failed — please check your Supabase dashboard: Authentication → Configuration → Email → disable 'Enable email confirmations'.");
        } else {
          setError(signUpErr.message);
        }
        setLoading(false);
        return;
      }
    } else {
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) {
        if (signInErr.message.includes("Invalid login") || signInErr.message.includes("invalid_credentials") || signInErr.message.includes("Email not confirmed")) {
          setError("Wrong username or password. If you're new here, click 'Create Account'.");
        } else {
          setError(signInErr.message);
        }
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    closeLogin();
    if (pendingHref) router.push(pendingHref);
  }

  return (
    <AnimatePresence>
      {loginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLogin}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              
              {/* Header gradient banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent px-8 py-8 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute -right-8 -top-8 opacity-10">
                  <GraduationCap className="h-40 w-40" />
                </div>
                <button
                  onClick={closeLogin}
                  className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative">
                  <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <h2 className="mt-3 text-2xl font-black">
                    {mode === "signin" ? "Welcome back! 👋" : "Join SkillRoute 🚀"}
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    {mode === "signin"
                      ? "Sign in to continue your learning journey"
                      : "Create your account — free forever"}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 p-8">
                {/* Mode toggle */}
                <div className="flex rounded-xl border border-border bg-secondary/40 p-1">
                  {(["signin", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setMode(m); setError(""); }}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all",
                        mode === m
                          ? "bg-background text-foreground shadow"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {m === "signin" ? (
                        <><LogIn className="h-3.5 w-3.5" /> Sign In</>
                      ) : (
                        <><UserPlus className="h-3.5 w-3.5" /> Create Account</>
                      )}
                    </button>
                  ))}
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label htmlFor="login-username" className="block text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                    placeholder="e.g. john_doe"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    This name will appear on your certificates 🎓
                  </p>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPw ? "text" : "password"}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Min. 6 characters"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</>
                  ) : mode === "signin" ? (
                    <><LogIn className="h-4 w-4" /> Sign In</>
                  ) : (
                    <><UserPlus className="h-4 w-4" /> Create Account & Start Learning</>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Your progress is saved to your account. Sign in once, learn on any device.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
