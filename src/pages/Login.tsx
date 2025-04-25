
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layouts/MainLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Note: This is just a placeholder - Supabase integration is required
    setTimeout(() => {
      alert("Please connect to Supabase for authentication functionality");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="bauhaus-container flex items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="relative w-full max-w-md">
          {/* Bauhaus decorations */}
          <div className="bauhaus-square bg-bauhaus-yellow w-16 h-16 -top-6 -right-6 z-0"></div>
          <div className="bauhaus-square bg-bauhaus-blue w-16 h-16 -bottom-6 -left-6 z-0"></div>
          
          <Card className="bauhaus-card border-bauhaus-black relative z-10">
            <CardHeader>
              <CardTitle className="text-2xl">Login to TaskFlow</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-none border-bauhaus-black focus:ring-bauhaus-red"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-none border-bauhaus-black focus:ring-bauhaus-red"
                  />
                </div>
                <div className="flex justify-end">
                  <Link to="#" className="text-sm text-bauhaus-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="bauhaus-btn bauhaus-btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative flex items-center w-full">
                <div className="flex-grow border-t border-bauhaus-gray"></div>
                <span className="mx-4 text-bauhaus-gray text-sm">OR</span>
                <div className="flex-grow border-t border-bauhaus-gray"></div>
              </div>
              <Button
                variant="outline"
                className="bauhaus-btn w-full border-bauhaus-black"
                type="button"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12c0,5.523,4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Continue with Google
              </Button>
              <div className="text-center">
                <span className="text-sm text-bauhaus-gray">
                  Don't have an account?{" "}
                  <Link to="#" className="text-bauhaus-blue hover:underline">
                    Sign up
                  </Link>
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
