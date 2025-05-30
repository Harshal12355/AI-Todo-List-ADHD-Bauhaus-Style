import MainLayout from "@/components/layouts/MainLayout";
import BauhausPattern from "@/components/ui/bauhaus-patterns";
import BauhausCard from "@/components/ui/bauhaus-card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import BauhausButton from "@/components/ui/bauhaus-button";

const Pricing = () => {
  return (
    <MainLayout>
      <div className="relative">
        {/* Bauhaus background pattern */}
        <BauhausPattern variant="background" />
        
        <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <div className="text-blue-600 uppercase tracking-wide font-bold mb-2">
              PRICING PLANS
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-bauhaus-gray mb-8 max-w-2xl mx-auto">
              Choose the plan that's right for you and start transforming your productivity today.
              All plans include a 14-day free trial with no credit card required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-bauhaus-blue rounded-full -z-10"></div>
              <BauhausCard className="h-full border-2 border-bauhaus-black">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold mb-2">Free</h2>
                  <p className="text-bauhaus-gray mb-6">Get started with the basics</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-bauhaus-gray ml-2 mb-1">/month</span>
                  </div>
                  <Link to="/login">
                    <BauhausButton variant="outline" className="w-full">
                      Start Free
                    </BauhausButton>
                  </Link>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-4">Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 10 active tasks</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic Pomodoro timer</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Simple task organization</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community support</span>
                    </li>
                  </ul>
                </div>
              </BauhausCard>
            </div>
            
            {/* Pro Plan */}
            <div className="relative mt-[-20px] z-10 md:mt-[-40px]">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-bauhaus-yellow rounded-full -z-10"></div>
              <div className="bg-bauhaus-black text-white py-2 px-4 rounded-full text-sm font-bold inline-block mb-3">
                MOST POPULAR
              </div>
              <BauhausCard className="h-full border-2 border-bauhaus-black transform scale-105 shadow-xl">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold mb-2">Pro</h2>
                  <p className="text-bauhaus-gray mb-6">Everything you need for personal productivity</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-bauhaus-gray ml-2 mb-1">/month</span>
                  </div>
                  <Link to="/login">
                    <BauhausButton variant="primary" className="w-full">
                      Start 14-Day Trial
                    </BauhausButton>
                  </Link>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-4">Everything in Free, plus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Unlimited tasks</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced task tags and filtering</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom Pomodoro timer settings</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic AI task breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority email support</span>
                    </li>
                  </ul>
                </div>
              </BauhausCard>
            </div>
            
            {/* Team Plan */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-bauhaus-red rounded-full -z-10"></div>
              <BauhausCard className="h-full border-2 border-bauhaus-black">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold mb-2">Teams</h2>
                  <p className="text-bauhaus-gray mb-6">Supercharge your team's productivity</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$19.99</span>
                    <span className="text-bauhaus-gray ml-2 mb-1">/user/month</span>
                  </div>
                  <Link to="/login">
                    <BauhausButton variant="outline" className="w-full">
                      Contact Sales
                    </BauhausButton>
                  </Link>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-4">Everything in Pro, plus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Team task sharing and assignment</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced AI task breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Team analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Admin controls</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-bauhaus-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </div>
              </BauhausCard>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-2xl border-2 border-bauhaus-black p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="font-bold mb-2">Can I cancel at any time?</h3>
                <p className="text-bauhaus-gray">Yes, you can cancel your subscription at any time. If you cancel, your plan will remain active until the end of your current billing period.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">How does the free trial work?</h3>
                <p className="text-bauhaus-gray">Your 14-day free trial gives you full access to all Pro features. No credit card is required, and you'll be notified before the trial ends.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Is there a discount for annual billing?</h3>
                <p className="text-bauhaus-gray">Yes! You can save 20% by choosing annual billing on any of our paid plans.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-bauhaus-gray">Absolutely. You can upgrade or downgrade your plan at any time, and we'll prorate the cost accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing; 