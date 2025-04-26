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
      <div className="min-h-screen w-full bg-white overflow-hidden relative">
        {/* Bauhaus background pattern */}
        <BauhausPattern variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row py-16 md:py-24 items-center">
            {/* Left content */}
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="text-blue-600 uppercase tracking-wide font-bold mb-4">
                MEET A NEW TASK MANAGEMENT APP
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                TaskFlow
              </h1>
              
              <p className="text-lg text-bauhaus-gray mb-8 max-w-xl">
                Discover how the Avant-Garde Movement Transformed Task Management in a new platform!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <BauhausButton variant="primary">
                    Get Started
                  </BauhausButton>
                </Link>
              </div>
            </div>
            
            {/* Right side - feature highlights */}
            <div className="md:w-1/2 md:pl-16">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-bauhaus-yellow -z-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-bauhaus-blue -z-10"></div>
                
                {/* Features list */}
                <div className="bg-white border-2 border-bauhaus-black p-8 rounded-2xl">
                  <h3 className="text-xl font-bold mb-6">Key Features</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-bauhaus-red flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Beautiful Task Management</h4>
                        <p className="text-bauhaus-gray">Manage your tasks with a visually stunning interface</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-bauhaus-blue flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Pomodoro Timer</h4>
                        <p className="text-bauhaus-gray">Stay focused with our elegant Bauhaus-inspired timer</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-bauhaus-yellow flex items-center justify-center flex-shrink-0">
                        <span className="text-bauhaus-black font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold">AI Task Breakdown</h4>
                        <p className="text-bauhaus-gray">Let AI break down complex tasks into manageable subtasks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom design element */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-bauhaus-black"></div>
      </div>
    </MainLayout>
  );
};

export default Index;