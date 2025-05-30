import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BauhausButton from "@/components/ui/bauhaus-button";
import BauhausPattern from "@/components/ui/bauhaus-patterns";
import MainLayout from "@/components/layouts/MainLayout";
import { useEffect, useState } from "react";

const Index = () => {
  // Check if user is logged in to determine whether to show protected links
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <MainLayout showProtectedLinks={isLoggedIn}>
      <div className="w-full bg-white overflow-hidden relative">
        {/* Hero Section - Full Height */}
        <div className="min-h-screen relative">
          {/* Bauhaus background pattern with enhanced positioning */}
          <BauhausPattern variant="background" className="absolute inset-0 w-full h-full" />
          
          <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-blue-600 uppercase tracking-wide font-bold mb-4">
                MEET A NEW TASK MANAGEMENT APP
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                TaskFlow
              </h1>
              
              <p className="text-lg text-bauhaus-gray mb-10 max-w-2xl mx-auto">
                Discover how the Avant-Garde Movement Transformed Task Management in a new platform!
              </p>
              
              <Link to="/login">
                <BauhausButton variant="primary" className="px-8 py-3 text-lg">
                  Get Started
                </BauhausButton>
              </Link>
            </div>
          </div>
          
          {/* Bottom design element for hero section */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-bauhaus-black"></div>
        </div>
        
        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-bauhaus-yellow -z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-bauhaus-blue -z-10"></div>
            
            <div className="bg-white border-2 border-bauhaus-black p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-bauhaus-red flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-bold text-lg">Beautiful Task Management</h3>
                  </div>
                  <p className="text-bauhaus-gray">Manage your tasks with a visually stunning interface</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-bauhaus-blue flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-bold text-lg">Pomodoro Timer</h3>
                  </div>
                  <p className="text-bauhaus-gray">Stay focused with our elegant Bauhaus-inspired timer</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-bauhaus-yellow flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-bauhaus-black font-bold">3</span>
                    </div>
                    <h3 className="font-bold text-lg">AI Task Breakdown</h3>
                  </div>
                  <p className="text-bauhaus-gray">Let AI break down complex tasks into manageable subtasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;