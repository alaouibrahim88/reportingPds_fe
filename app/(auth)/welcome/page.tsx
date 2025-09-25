"use client";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading-animation.json";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function WelcomePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const navItems = [
    { name: "ScrapIQ", href: "/" },
    { name: "CostPILOT", href: "/workflows" },
    { name: "Executive Horizon", href: "/executive-horizon" },
    { name: "GlobalOps", href: "/global-ops" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background elements - Base layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl animate-float delay-2000" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Enhanced Navigation Header - Top layer */}
      <nav className="relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="w-full flex items-center justify-between px-6 md:px-8 lg:px-12 py-4">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative filter brightness-0 invert">
                <Logo fontSize="text-xl md:text-2xl" iconSize={28} />
              </div>
            </div>
          </div>
        
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium px-4 py-2 h-9 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold px-4 py-2 h-9 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-0"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Content layer */}
      <div className="relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between px-6 md:px-8 lg:px-12 py-8 lg:py-16 min-h-[calc(100vh-140px)] gap-8 lg:gap-12">
        {/* Enhanced Left Content with Fade Left Animation */}
        <div className="flex-1 max-w-4xl space-y-6 lg:space-y-8 text-center lg:text-left flex flex-col justify-center animate-fade-in-left">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in">
              <span className="text-sm font-medium text-white/90">🚀 Advanced Analytics Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white animate-fade-in leading-tight">
              All About
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Key Performance
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Indicators
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-normal max-w-3xl animate-fade-in-delay-1 leading-relaxed">
              Transform your business intelligence with our advanced analytics and reporting platform designed for 
              <span className="font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Polydesign Systems&apos;</span> comprehensive operational insights.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-delay-2">
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
                className="group bg-white/5 backdrop-blur-md border-white/20 hover:border-white/40 text-white hover:bg-white/10 text-lg font-semibold px-8 py-4 h-14 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Learn More
                </span>
              </Button>
            </div>
            
            {/* Enhanced Professional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 animate-fade-in-delay-2">
              <div className="group text-center lg:text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">2,500+</div>
                </div>
                <div className="text-sm text-white/80 font-medium">Enterprise Clients</div>
                <div className="text-xs text-white/60 mt-1">Trusted worldwide</div>
              </div>
              <div className="group text-center lg:text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">99.98%</div>
                </div>
                <div className="text-sm text-white/80 font-medium">System Reliability</div>
                <div className="text-xs text-white/60 mt-1">Enterprise-grade SLA</div>
              </div>
              <div className="group text-center lg:text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">&lt;2ms</div>
                </div>
                <div className="text-sm text-white/80 font-medium">Response Time</div>
                <div className="text-xs text-white/60 mt-1">Lightning fast analytics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Content - Dashboard Preview with Fade Right Animation */}
        <div className="flex-1 max-w-4xl flex items-center justify-center lg:justify-end animate-fade-in-right">
          <div className="relative group w-full max-w-[900px] z-20">
            {/* Enhanced background glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700 animate-pulse z-0"></div>
            
            {/* Main dashboard container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-500 z-10">
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl z-0"></div>
              
              {/* Fixed Lottie Animation with Better Display */}
              <div className="relative z-20 flex items-center justify-center">
                <div className="relative">
                  {/* Animated border frame */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-lg animate-pulse z-0"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm z-5"></div>
                  
                  {/* Main Lottie container with fixed sizing */}
                  <div className="relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-2xl p-4 backdrop-blur-xl border border-white/10 overflow-hidden z-10">
                    <div className="aspect-square w-full max-w-[800px] mx-auto flex items-center justify-center">
                      <div className="relative transform translate-x-4 translate-y-2">
                        <Lottie 
                          animationData={loadingAnimation} 
                          loop={true}
                          autoplay={true}
                          style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '800px',
                            maxHeight: '800px'
                          }}
                          className="transform hover:scale-105 transition-all duration-700 filter drop-shadow-2xl relative z-10"
                        />
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse z-20"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse delay-500 z-20"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse delay-1000 z-20"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-pink-400/60 rounded-full animate-pulse delay-1500 z-20"></div>
                  </div>
                  
                  {/* Floating orbit elements */}
                  <div className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm animate-float z-15"></div>
                  <div className="absolute -top-8 -right-8 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm animate-float delay-1000 z-15"></div>
                  <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm animate-float delay-2000 z-15"></div>
                  <div className="absolute -bottom-8 -right-8 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm animate-float delay-3000 z-15"></div>
                </div>
              </div>
              
              {/* Professional overlay badges - Adjusted for off-center positioning */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-lg p-3 border border-green-400/30 shadow-xl z-30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <div>
                    <div className="text-green-100 text-xs font-medium">Real-time</div>
                    <div className="text-white text-sm font-bold">Live</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-lg p-3 border border-blue-400/30 shadow-xl z-30">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <div className="text-blue-100 text-xs font-medium">Data Processing</div>
                    <div className="text-white text-sm font-bold">98.7%</div>
                  </div>
                </div>
              </div>
              
              {/* Additional professional floating KPI cards - Positioned for off-center animation */}
              <div className="absolute top-16 -right-4 bg-gradient-to-r from-purple-500/15 to-pink-500/15 backdrop-blur-md rounded-lg p-2.5 border border-purple-400/20 shadow-lg animate-float z-25">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <div>
                    <div className="text-purple-100 text-xs">Savings</div>
                    <div className="text-white text-xs font-bold">$1.2M</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-16 -left-4 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 backdrop-blur-md rounded-lg p-2.5 border border-cyan-400/20 shadow-lg animate-float delay-1000 z-25">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  <div>
                    <div className="text-cyan-100 text-xs">Efficiency</div>
                    <div className="text-white text-xs font-bold">+47%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu - Highest layer */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-3 z-[100] border border-white/20 shadow-2xl">
        <div className="space-y-3">
          {/* Navigation Items */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-white/80 hover:text-white text-xs font-medium p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Enhanced Auth Buttons */}
          <div className="flex space-x-2 pt-2 border-t border-white/20">
            <Button
              variant="ghost"
              onClick={() => router.push('/login')}
              className="flex-1 text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium h-9 rounded-lg border border-white/20 hover:border-white/40 backdrop-blur-sm"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/register')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold h-9 rounded-lg shadow-lg border-0"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
