"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogoutButton } from "@/components/LogoutButton";
import { getCookieValue } from "@/lib/storage";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setAuthLoading(true);
        const token = await getCookieValue("access_token");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthentication();
    setIsLoaded(true);
  }, []);

  const navItems = [
    { name: "ScrapIQ", href: "/scrap" },
    { name: "CostPILOT", href: "/workflows" },
    { name: "Executive Horizon", href: "/executive-horizon" },
    { name: "GlobalOps", href: "/global-ops" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Modern Analytics Background"
          fill
          className="object-cover"
          priority
        />
        {/* Optimized overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-indigo-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating orbs with staggered animations */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-2000" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl animate-bounce delay-3000" />

        {/* Tech grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Floating data points */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-blue-400/70 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping delay-1500"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400/50 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Navigation Header */}
      <nav
        className={`relative z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-xl transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="w-full flex items-center justify-between px-6 md:px-8 lg:px-12">
          <Logo logoType="welcome" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {authLoading ? (
              <div className="flex items-center space-x-3 ml-6">
                <div className="w-16 h-10 bg-white/10 rounded-xl animate-pulse"></div>
                <div className="w-20 h-10 bg-white/10 rounded-xl animate-pulse"></div>
              </div>
            ) : !isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-6">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="text-white/90 hover:text-white hover:bg-white/20 text-sm font-medium px-5 py-2.5 h-10 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg "
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold px-5 py-2.5 h-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 "
                >
                  Register
                </Button>
              </div>
            ) : (
              <>
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`text-white/90 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg  ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </button>
                ))}
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20">
        <div className="w-full flex items-center justify-start px-6 md:px-8 lg:px-12 py-8 lg:py-16 min-h-[calc(100vh-140px)]">
          {/* Left Content */}
          <div
            className={`max-w-5xl space-y-8 text-left flex flex-col justify-center transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >

            {/* Main Heading */}
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              One View, <br />
              Total Control
            </h1>

            {/* Description */}
            <p
              className={`text-lg md:text-xl lg:text-4xl text-white/90 font-normal max-w-4xl leading-relaxed transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Reporting platform for <br />Polydesign Systems <br /> Business operations
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed bottom-4 left-4 right-4 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-3 z-[100] border border-white/30 shadow-2xl transition-all duration-1000 delay-1200 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="space-y-3">
          {/* Navigation Items */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-white/90 hover:text-white text-xs font-medium p-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg "
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-2 pt-2 border-t border-white/30">
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="flex-1 text-white/90 hover:text-white hover:bg-white/20 text-sm font-medium h-9 rounded-lg border border-white/30 hover:border-white/50 backdrop-blur-sm hover:shadow-lg  transition-all duration-300"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold h-9 rounded-lg shadow-lg border-0  transition-all duration-300"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
