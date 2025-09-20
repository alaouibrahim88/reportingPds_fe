"use client";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading-animation.json";
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-10 animate-float" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10">
        <div className="container mx-auto flex items-center justify-between p-4 md:p-6 lg:p-8">
        <div className="flex items-center space-x-5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded transform rotate-45"></div>
          </div>
          <span className="text-white text-xl font-bold">vizora</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 lg:px-8 py-8 lg:py-16 min-h-[calc(100vh-120px)]">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl space-y-6 lg:space-y-8 text-center lg:text-left mb-12 lg:mb-0">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-white animate-fade-in">
              One view,
              <br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Total control
              </span>
            </h1>
            
            <p className="text-3xl md:text-xl text-white/90 font-normal max-w-md animate-fade-in-delay-1">
              Reporting platform for Polydesign Systems&apos; business operations
            </p>
          </div>
        </div>

        {/* Right Content - Dashboard Preview */}
        <div className="flex-1 max-w-2xl flex justify-center lg:justify-end animate-fade-in-delay-1">
          <div className="relative">
            <Lottie 
              animationData={loadingAnimation} 
              loop={true}
              autoplay={true}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 z-20">
        <div className="grid grid-cols-2 gap-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium p-2 rounded-lg hover:bg-white/10"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
