import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BauhausLayoutProps {
  children: ReactNode;
}

const BauhausLayout = ({ children }: BauhausLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-bauhaus-yellow">
      <div className="flex flex-col min-h-screen rounded-bauhaus border-4 border-bauhaus-black bg-white m-4 overflow-hidden">
        {/* Navigation */}
        <header className="flex items-center gap-8 p-6 lg:p-8 border-b-2 border-bauhaus-black">
          <div className="h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              <div className="bg-bauhaus-black"></div>
              <div className="bg-bauhaus-blue"></div>
              <div className="bg-bauhaus-yellow"></div>
              <div className="bg-bauhaus-red"></div>
            </div>
          </div>
          
          <Link to="/" className="text-xl font-serif font-bold text-bauhaus-black">TaskFlow</Link>
          
          <nav className="flex gap-4 lg:gap-8 ml-auto">
            <Link to="/tasks" className="font-medium text-bauhaus-black hover:underline">Tasks</Link>
            <Link to="/timer" className="font-medium text-bauhaus-black hover:underline">Timer</Link>
            <Link to="/stats" className="font-medium text-bauhaus-black hover:underline">Stats</Link>
            <Link to="/settings" className="font-medium text-bauhaus-black hover:underline">Settings</Link>
          </nav>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6 md:p-12 relative">
          {/* Geometric decoration - top right */}
          <div className="absolute top-0 right-0 w-48 h-48 -z-10 overflow-hidden">
            <div className="absolute w-[200%] h-[200%] bg-bauhaus-blue rounded-full -top-3/4 -right-3/4"></div>
          </div>
          
          {children}
          
          {/* Geometric decoration - bottom left */}
          <div className="absolute bottom-0 left-0 w-48 h-48 -z-10 overflow-hidden">
            <div className="absolute w-[200%] h-[200%] bg-bauhaus-red rounded-full -bottom-3/4 -left-3/4"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BauhausLayout;
