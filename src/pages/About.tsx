import MainLayout from "@/components/layouts/MainLayout";
import BauhausPattern from "@/components/ui/bauhaus-patterns";
import BauhausCard from "@/components/ui/bauhaus-card";
import { Link } from "react-router-dom";
import BauhausButton from "@/components/ui/bauhaus-button";

const About = () => {
  return (
    <MainLayout>
      <div className="relative">
        {/* Bauhaus background pattern */}
        <BauhausPattern variant="background" />
        
        <div className="container max-w-4xl mx-auto px-4 py-16 relative z-10">
          <div className="mb-8">
            <div className="text-blue-600 uppercase tracking-wide font-bold mb-2">
              ABOUT TASKFLOW
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Reimagining Task Management
            </h1>
            <p className="text-lg text-bauhaus-gray mb-8 max-w-3xl">
              At Taskflow, we believe that managing your tasks should be both effective and beautiful. 
              Inspired by the Bauhaus design movement, we've created a platform that enhances productivity
              through simplicity, function, and artistic expression.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <BauhausCard accent="left" className="border-l-bauhaus-blue">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-bauhaus-gray mb-4">
                We're on a mission to transform how people approach productivity by creating tools that
                are not just functional, but also inspiring. The right environment can dramatically 
                improve your focus and creativity.
              </p>
              <p className="text-bauhaus-gray">
                Every feature in Taskflow is designed with intention, balancing aesthetics and utility
                to help you accomplish more while enjoying the process.
              </p>
            </BauhausCard>
            
            <BauhausCard accent="top" className="border-t-bauhaus-red">
              <h2 className="text-2xl font-bold mb-4">Enhanced with AI</h2>
              <p className="text-bauhaus-gray mb-4">
                Taskflow leverages the latest in artificial intelligence to break down complex projects
                into manageable tasks. Our AI assistant can analyze your goals and suggest the most
                efficient path forward.
              </p>
              <p className="text-bauhaus-gray">
                From automatically estimating time requirements to suggesting task prioritization,
                our AI tools work alongside you to optimize your workflow without taking over.
              </p>
            </BauhausCard>
          </div>
          
          <div className="bg-white rounded-2xl border-2 border-bauhaus-black p-8 mb-16 relative">
            {/* Yellow circle */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-bauhaus-yellow rounded-full -z-10"></div>
            
            <h2 className="text-2xl font-bold mb-6">The Taskflow Difference</h2>
            
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-bauhaus-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Beautiful Productivity</h3>
                  <p className="text-bauhaus-gray">
                    We've designed every screen with careful attention to color, form, and function.
                    The result is a workspace that inspires creativity while maintaining simplicity.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-bauhaus-red flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Task Organization</h3>
                  <p className="text-bauhaus-gray">
                    Our intelligent tagging system and AI-powered task breakdown helps you organize
                    complex projects into manageable chunks, making overwhelming work approachable.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-bauhaus-black flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Focused Time Management</h3>
                  <p className="text-bauhaus-gray">
                    Our Pomodoro timer integrates directly with your tasks, helping you maintain
                    focus and track progress as you work through your to-do list.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <BauhausCard className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your workflow?</h2>
              <p className="text-bauhaus-gray mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have discovered the perfect balance of 
                function and form in their daily task management.
              </p>
              <Link to="/login">
                <BauhausButton variant="primary" className="px-8 py-3">
                  Get Started Today
                </BauhausButton>
              </Link>
            </BauhausCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About; 