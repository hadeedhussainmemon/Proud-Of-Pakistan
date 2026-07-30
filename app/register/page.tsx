"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus, Mail, Lock, User, LogIn } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-amber-400/20 rounded-full flex items-center justify-center mb-6">
          <UserPlus className="h-10 w-10 text-amber-400" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Registration Successful!</h1>
        <p className="text-emerald-100/70 max-w-md">
          Your account has been created. Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-950 border border-amber-400/20 mb-6">
            <UserPlus className="h-8 w-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white mb-2">Create Account</h1>
          <p className="text-emerald-100/60 text-sm">Join Proud of Pakistan today.</p>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-3xl p-8 backdrop-blur-sm">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-emerald-500/50" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Ali Khan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-emerald-500/50" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-100/70 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-emerald-500/50" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-emerald-990/60 border border-emerald-900/50 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Register Now"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-emerald-100/60 border-t border-emerald-900/30 pt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1">
              Log in here <LogIn className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

