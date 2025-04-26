import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BauhausButton from "@/components/ui/bauhaus-button";
import BauhausCard from "@/components/ui/bauhaus-card";
import BauhausPattern from "@/components/ui/bauhaus-patterns";
import MainLayout from "@/components/layouts/MainLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    if(localStorage.getItem("isLoggedIn") === "true") {
      navigate("/tasks");
    }
  }, [navigate]);
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate successful Google login and redirect to tasks page
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/tasks";
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-full bg-white relative overflow-hidden flex items-center justify-center">
        {/* Bauhaus pattern */}
        <BauhausPattern variant="background" className="absolute inset-0" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-md">
          <div className="relative w-full">
            {/* Blue circle decoration */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-bauhaus-blue rounded-full -z-10"></div>
            
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="absolute -top-16 left-0 bg-bauhaus-black text-white rounded-full px-4 py-2 font-medium hover:bg-black/90 transition-colors"
            >
              ← Back
            </button>
            
            <div className="bg-white rounded-2xl border-2 border-bauhaus-black p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Login to Taskflow</h2>
                <p className="text-gray-500">Sign in with Google to access your account</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <button
                  type="button"
                  className="w-full bg-white border-2 border-bauhaus-black rounded-full h-12 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
                  onClick={handleSubmit}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12c0,5.523,4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  {isSubmitting ? "SIGNING IN..." : "CONTINUE WITH GOOGLE"}
                </button>
                
                {/* <div className="text-center pt-4">
                  <span className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="#" className="text-bauhaus-blue hover:underline font-medium">
                      Sign up
                    </Link>
                  </span>
                </div> */}
              </form>
            </div>
            
            {/* Red circle decoration */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-bauhaus-red rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
