import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BauhausButton from "@/components/ui/bauhaus-button";

type MainLayoutProps = {
  children: React.ReactNode;
  showProtectedLinks?: boolean;
};

const MainLayout = ({ children, showProtectedLinks = false }: MainLayoutProps) => {
  const location = useLocation();
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-8 relative z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to={showProtectedLinks ? "/tasks" : "/"} className="font-bold text-xl">
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
          <div className="bg-white border-2 border-bauhaus-black rounded-full py-1 px-2 flex items-center">
            {showProtectedLinks ? (
              // Authenticated navigation
              <>
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
              </>
            ) : (
              // Public navigation
              <>
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
                  to="/about" 
                  className={`font-medium px-6 py-2 rounded-full transition-colors ${
                    isActive('/about') 
                      ? 'bg-bauhaus-blue text-white' 
                      : 'bg-white text-bauhaus-black hover:bg-gray-100'
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/pricing" 
                  className={`font-medium px-6 py-2 rounded-full transition-colors ${
                    isActive('/pricing') 
                      ? 'bg-bauhaus-blue text-white' 
                      : 'bg-white text-bauhaus-black hover:bg-gray-100'
                  }`}
                >
                  Pricing
                </Link>
              </>
            )}
          </div>
          {!showProtectedLinks ? (
            <Link to="/login">
              <BauhausButton variant="secondary" className="px-6">
                LOGIN
              </BauhausButton>
            </Link>
          ) : (
            <button onClick={() => { 
              localStorage.removeItem("isLoggedIn"); 
              window.location.href = "/"; 
            }} className="bg-bauhaus-black text-white rounded-full px-4 py-2 font-medium hover:bg-black/90 transition-colors">
              LOGOUT
            </button>
          )}
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Taskflow</h3>
              <p className="text-bauhaus-gray">A Bauhaus-inspired task management application to help you organize your work and boost your productivity.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                {showProtectedLinks ? (
                  // Authenticated footer links
                  <>
                    <li><Link to="/tasks" className="hover:text-bauhaus-blue transition-colors">Tasks</Link></li>
                    <li><Link to="/timer" className="hover:text-bauhaus-blue transition-colors">Pomodoro Timer</Link></li>
                  </>
                ) : (
                  // Public footer links
                  <>
                    <li><Link to="/" className="hover:text-bauhaus-blue transition-colors">Home</Link></li>
                    <li><Link to="/about" className="hover:text-bauhaus-blue transition-colors">About</Link></li>
                    <li><Link to="/pricing" className="hover:text-bauhaus-blue transition-colors">Pricing</Link></li>
                    <li><Link to="/login" className="hover:text-bauhaus-blue transition-colors">Login</Link></li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-bauhaus-blue transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-bauhaus-blue transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-bauhaus-gray">
            <p>&copy; {new Date().getFullYear()} Taskflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
