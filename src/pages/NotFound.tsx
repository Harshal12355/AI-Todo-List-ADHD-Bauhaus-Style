import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import BauhausPattern from "@/components/ui/bauhaus-patterns";
import BauhausButton from "@/components/ui/bauhaus-button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 py-8 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            <div className="flex items-center">
              <div className="h-12 w-12 flex-shrink-0">
                <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                  <div className="bg-bauhaus-black"></div>
                  <div className="bg-bauhaus-blue"></div>
                  <div className="bg-bauhaus-yellow"></div>
                  <div className="bg-bauhaus-red"></div>
                </div>
              </div>
            </div>
          </Link>
          <nav className="flex gap-8 items-center">
            <Link to="/" className="font-medium text-bauhaus-black hover:underline">Home</Link>
            <Link to="/tasks" className="font-medium text-bauhaus-black hover:underline">Tasks</Link>
            <Link to="/timer" className="font-medium text-bauhaus-black hover:underline">Timer</Link>
            <Link to="/login">
              <BauhausButton variant="secondary" className="px-6">
                LOGIN
              </BauhausButton>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Bauhaus pattern */}
      <BauhausPattern variant="accent" />
      
      <div className="relative z-10 text-center px-4">
        {/* 404 with Bauhaus styling */}
        <div className="mb-8 relative inline-block">
          <div className="text-9xl font-bold tracking-tighter flex">
            <span className="text-bauhaus-red mr-4">4</span>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-bauhaus-yellow -z-10"></div>
              <span className="relative z-10">0</span>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-bauhaus-blue -z-10"></div>
              <span className="relative z-10">4</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-3 bg-bauhaus-black"></div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-bauhaus-gray mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <Link to="/">
          <BauhausButton variant="primary">
            RETURN TO HOME
          </BauhausButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
