"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navItems = [
    { name: "ScrapIQ", href: "/" },
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
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating data points */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-blue-400/70 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping delay-1500"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400/50 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Navigation Header */}
      <nav className={`relative z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="w-full flex items-center justify-between px-6 md:px-8 lg:px-12">
          <Logo logoType="welcome" />
        
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`text-white/90 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-white/90 hover:text-white hover:bg-white/20 text-sm font-medium px-5 py-2.5 h-10 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:scale-105"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold px-5 py-2.5 h-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20">
        <div className="w-full flex items-center justify-start px-6 md:px-8 lg:px-12 py-8 lg:py-16 min-h-[calc(100vh-140px)]">
          {/* Left Content */}
          <div className={`max-w-5xl space-y-8 text-left flex flex-col justify-center transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            {/* Badge */}
            <div className={`inline-flex items-center w-fit px-6 py-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <span className="text-sm font-medium text-white/95">🚀 Advanced Analytics Platform</span>
            </div>
            
            {/* Main Heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              All About <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">Key Performance</span> <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent drop-shadow-lg">Indicators</span> <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">(KPIs) for MSPs</span>
            </h1>
            
            {/* Description */}
            <p className={`text-lg md:text-xl lg:text-2xl text-white/90 font-normal max-w-4xl leading-relaxed transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Transform your business intelligence with our advanced analytics and reporting platform designed for 
              <span className="font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Polydesign Systems&apos;</span> comprehensive operational insights.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-6 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Button
                onClick={() => router.push('/login')}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-semibold px-8 py-4 h-14 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/register')}
                className="group bg-white/10 backdrop-blur-xl border-white/30 hover:border-white/50 text-white hover:bg-white/20 text-lg font-semibold px-8 py-4 h-14 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Learn More
                </span>
              </Button>
            </div>
            
            {/* Stats Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="group text-center lg:text-left p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">2,500+</div>
                </div>
                <div className="text-sm text-white/90 font-medium">Enterprise Clients</div>
                <div className="text-xs text-white/70 mt-1">Trusted worldwide</div>
              </div>
              <div className="group text-center lg:text-left p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">99.98%</div>
                </div>
                <div className="text-sm text-white/90 font-medium">System Reliability</div>
                <div className="text-xs text-white/70 mt-1">Enterprise-grade SLA</div>
              </div>
              <div className="group text-center lg:text-left p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">&lt;2ms</div>
                </div>
                <div className="text-sm text-white/90 font-medium">Response Time</div>
                <div className="text-xs text-white/70 mt-1">Lightning fast analytics</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed bottom-4 left-4 right-4 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-3 z-[100] border border-white/30 shadow-2xl transition-all duration-1000 delay-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="space-y-3">
          {/* Navigation Items */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-white/90 hover:text-white text-xs font-medium p-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg hover:scale-105"
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
              onClick={() => router.push('/login')}
              className="flex-1 text-white/90 hover:text-white hover:bg-white/20 text-sm font-medium h-9 rounded-lg border border-white/30 hover:border-white/50 backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/register')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold h-9 rounded-lg shadow-lg border-0 hover:scale-105 transition-all duration-300"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
