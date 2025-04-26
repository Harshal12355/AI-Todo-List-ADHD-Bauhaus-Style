import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BauhausButton from "@/components/ui/bauhaus-button";
import BauhausPattern from "@/components/ui/bauhaus-patterns";

const Index = () => {
  const location = useLocation();
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden relative">
      {/* Bauhaus background pattern */}
      <BauhausPattern variant="background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between py-8">
          <div className="h-12 w-12 flex-shrink-0">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              <div className="bg-bauhaus-black"></div>
              <div className="bg-bauhaus-blue"></div>
              <div className="bg-bauhaus-yellow"></div>
              <div className="bg-bauhaus-red"></div>
            </div>
          </div>
          
          <div className="bg-white border-2 border-bauhaus-black rounded-full py-1 px-2 flex items-center">
            <Link 
              to="/" 
              className={`font-medium px-6 py-2 rounded-full transition-colors ${
                isActive('/') 
                  ? 'bg-bauhaus-blue text-white' 
                  : 'bg-white text-bauhaus-black hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/tasks" 
              className={`font-medium px-6 py-2 rounded-full transition-colors ${
                isActive('/tasks') 
                  ? 'bg-bauhaus-blue text-white' 
                  : 'bg-white text-bauhaus-black hover:bg-gray-100'
              }`}
            >
              Tasks
            </Link>
            <Link 
              to="/timer" 
              className={`font-medium px-6 py-2 rounded-full transition-colors ${
                isActive('/timer') 
                  ? 'bg-bauhaus-blue text-white' 
                  : 'bg-white text-bauhaus-black hover:bg-gray-100'
              }`}
            >
              Timer
            </Link>
          </div>
          
          <Link to="/login">
            <BauhausButton variant="secondary" className="px-6">
              LOGIN
            </BauhausButton>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row py-16 md:py-24 items-center">
          {/* Left content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="text-blue-600 uppercase tracking-wide font-bold mb-4">
              MEET A NEW TASK MANAGEMENT APP
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Bauhaus
            </h1>
            
            <p className="text-lg text-bauhaus-black mb-8 max-w-xl">
              Discover how the Avant-Garde Movement Transformed Task Management in a new platform!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <BauhausButton variant="primary">
                  Get Started
                </BauhausButton>
              </Link>
              
              <Link to="/tasks">
                <BauhausButton variant="outline">
                  View Demo
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
  );
};

export default Index;