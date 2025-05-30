import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BauhausButton from "@/components/ui/bauhaus-button";
import { useState, useEffect } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  showProtectedLinks?: boolean;
};

const MainLayout = ({ children, showProtectedLinks = false }: MainLayoutProps) => {
  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Track scroll position to adjust navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header 
        className={`fixed w-full top-0 z-30 transition-all duration-300 ${
          isNavVisible || isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-2'
        }`}
        onMouseEnter={() => setIsNavVisible(true)}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo - Always visible */}
          <Link to={showProtectedLinks ? "/tasks" : "/"} className="font-bold text-xl">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                  <div className="bg-bauhaus-black"></div>
                  <div className="bg-bauhaus-blue"></div>
                  <div className="bg-bauhaus-yellow"></div>
                  <div className="bg-bauhaus-red"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Only visible on hover or when scrolled */}
          <div 
            className={`transition-all duration-300 ${
              isNavVisible || isScrolled 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="bg-white border-2 border-bauhaus-black rounded-full py-1 px-2 flex items-center">
              {showProtectedLinks ? (
                // Authenticated navigation
                <>
                  <Link 
                    to="/tasks" 
                    className={`font-medium px-4 py-1 rounded-full transition-colors text-sm ${
                      isActive('/tasks') 
                        ? 'bg-bauhaus-blue text-white' 
                        : 'bg-white text-bauhaus-black hover:bg-gray-100'
                    }`}
                  >
                    Tasks
                  </Link>
                  <Link 
                    to="/timer" 
                    className={`font-medium px-4 py-1 rounded-full transition-colors text-sm ${
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
                    className={`font-medium px-4 py-1 rounded-full transition-colors text-sm ${
                      isActive('/') 
                        ? 'bg-bauhaus-blue text-white' 
                        : 'bg-white text-bauhaus-black hover:bg-gray-100'
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/about" 
                    className={`font-medium px-4 py-1 rounded-full transition-colors text-sm ${
                      isActive('/about') 
                        ? 'bg-bauhaus-blue text-white' 
                        : 'bg-white text-bauhaus-black hover:bg-gray-100'
                    }`}
                  >
                    About
                  </Link>
                  <Link 
                    to="/pricing" 
                    className={`font-medium px-4 py-1 rounded-full transition-colors text-sm ${
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
          </div>

          {/* Login/Logout button - Only visible on hover or when scrolled */}
          <div 
            className={`transition-all duration-300 ${
              isNavVisible || isScrolled 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform -translate-y-4 pointer-events-none'
            }`}
          >
            {!showProtectedLinks ? (
              <Link to="/login">
                <BauhausButton variant="secondary" className="px-4 py-1 text-sm">
                  LOGIN
                </BauhausButton>
              </Link>
            ) : (
              <button onClick={() => { 
                localStorage.removeItem("isLoggedIn"); 
                window.location.href = "/"; 
              }} className="bg-bauhaus-black text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-black/90 transition-colors">
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Add padding to main content to account for fixed header */}
      <main className="flex-grow pt-16">
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
