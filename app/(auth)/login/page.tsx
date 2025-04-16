"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextPageContext } from 'next';
import type { NextRequest } from "next/server";
import { revalidatePath } from 'next/cache'



import {
  BarChart3,
  Eye,
  EyeOff,
  LineChart,
  PieChart,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";


interface LoginResponse  {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  error?: string
}

const login = async (user: string, pass: string): Promise<LoginResponse> => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/login/authentication`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_Id: "PolydesignAPIWebClient",
        grant_type: "password",
        username: user,
        password: pass,
        client_secret: "MIGsAAiEAn5JeMVQQWXRnznNZlR2vcLPRo1HwL9K",
      }).toString(),
    }
  );

  const data = await response.json();
  return data as LoginResponse;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(username, password);

      if (result.access_token) {

     localStorage.setItem('access_token', result.access_token);
     document.cookie="auth=true;";
     router.push('/');

      } else {
        setError(
          result?.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Left side - Welcome Message */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#054177] to-blue-700 p-12 relative overflow-hidden">
        <div className="space-y-6 text-white z-10 my-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
              WELCOME BACK !
            </h1>
            <TrendingUp className="w-8 h-8 animate-fade-in" />
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold animate-fade-in-delay-1">
              Reporting Polydesign Systems
            </h2>
            <LayoutDashboard className="w-6 h-6 animate-fade-in-delay-1" />
          </div>

          <div className="space-y-4 animate-fade-in-delay-2">
            <p className="text-sm opacity-90 max-w-md leading-relaxed">
              Access comprehensive data visualization and reporting tools.
              Transform your data into actionable insights with our powerful
              analytics dashboard and customizable reports.
            </p>

            <div className="flex gap-4 pt-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <LineChart className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <PieChart className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/images/blob.svg')] opacity-10 animate-float" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-8 -right-8 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Please enter your details
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  placeholder="User Name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full transition-all border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de Passe "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 transition-all border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-primary focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-gray-600">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-primary hover:text-blue-700 transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-blue-700 transition-colors py-6 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-blue-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
