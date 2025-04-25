
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-bauhaus-black py-4">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-bauhaus-red rounded-full mr-2"></div>
              <span>TaskFlow</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-bauhaus-blue transition-colors">
              Home
            </Link>
            <Link to="/tasks" className="font-medium hover:text-bauhaus-blue transition-colors">
              Tasks
            </Link>
            <Link to="/timer" className="font-medium hover:text-bauhaus-blue transition-colors">
              Pomodoro
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button className="bauhaus-btn bauhaus-btn-primary">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t border-bauhaus-black py-4 bg-bauhaus-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TaskFlow</h3>
              <p className="text-bauhaus-gray">A Bauhaus-inspired task management application to help you organize your work and boost your productivity.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-bauhaus-blue transition-colors">Home</Link></li>
                <li><Link to="/tasks" className="hover:text-bauhaus-blue transition-colors">Tasks</Link></li>
                <li><Link to="/timer" className="hover:text-bauhaus-blue transition-colors">Pomodoro Timer</Link></li>
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
            <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
