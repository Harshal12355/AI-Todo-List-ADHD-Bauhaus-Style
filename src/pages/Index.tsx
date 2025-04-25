
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bauhaus-container relative overflow-hidden">
        {/* Bauhaus decorative elements */}
        <div className="bauhaus-circle bg-bauhaus-yellow w-32 h-32 -top-10 -right-10 z-0"></div>
        <div className="bauhaus-square bg-bauhaus-blue w-40 h-40 -bottom-20 -left-20 z-0"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="bauhaus-header">
                <span className="text-bauhaus-red">Organize</span> your tasks.<br />
                <span className="text-bauhaus-blue">Focus</span> your time.
              </h1>
              <p className="bauhaus-subheader mt-6 text-bauhaus-gray">
                An AI task management system designed to improve your productivity and bring clarity to your workflow.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="bauhaus-btn bauhaus-btn-primary">
                    Get Started
                  </Button>
                </Link>
                <Link to="#features">
                  <Button variant="outline" className="bauhaus-btn border-2 border-bauhaus-black">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-bauhaus-red"></div>
                <div className="relative z-10 border-4 border-bauhaus-black p-4 bg-white">
                  <img src="/placeholder.svg" alt="Task Management" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-bauhaus-blue"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bauhaus-container bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bauhaus-card group hover:border-bauhaus-red">
              <div className="w-12 h-12 bg-bauhaus-red mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Task Management</h3>
              <p className="text-bauhaus-gray">Create tasks, add subtasks, set priorities, and organize your workflow with our intuitive task management system.</p>
            </div>
            
            <div className="bauhaus-card group hover:border-bauhaus-blue">
              <div className="w-12 h-12 bg-bauhaus-blue mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pomodoro Timer</h3>
              <p className="text-bauhaus-gray">Boost your productivity with our customizable Pomodoro timer. Focus for set periods and take structured breaks.</p>
            </div>
            
            <div className="bauhaus-card group hover:border-bauhaus-yellow">
              <div className="w-12 h-12 bg-bauhaus-yellow mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-bauhaus-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-bauhaus-gray">Track your progress over time with visual statistics and reports on your productivity and completed tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bauhaus-container bg-bauhaus-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bauhaus-red text-white flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Tasks</h3>
              <p className="text-bauhaus-gray">Add your tasks and break them down into manageable subtasks.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bauhaus-blue text-white flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Set Timer</h3>
              <p className="text-bauhaus-gray">Use the Pomodoro timer to focus on one task at a time.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-bauhaus-yellow text-bauhaus-black flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-bauhaus-gray">Monitor your productivity and celebrate your achievements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bauhaus-container bg-bauhaus-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to boost your productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have transformed their workflow with TaskFlow.</p>
          <Link to="/login">
            <Button className="bauhaus-btn bauhaus-btn-primary">
              Start For Free
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
