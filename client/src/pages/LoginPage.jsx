// src/pages/LoginPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader, ArrowRight } from "lucide-react";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result?.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">LOGIN</h1>
            <div className="mt-4 flex items-center space-x-2">
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
              <div className="h-1 w-8 bg-blue-400 rounded-full"></div>
              <div className="h-1 w-4 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">WELCOME TO ELKA</h2>
            <p className="mt-2 text-gray-600">
              Join our community that have more than 10000 subscribers and learn new things
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                elka@qq.com
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-3" />
                    LOGGING IN...
                  </>
                ) : (
                  <>
                    LOGIN
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have account?
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              Sign up
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-900 to-indigo-900 p-12 flex-col justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full translate-y-64 -translate-x-64 opacity-20"></div>
        
        <div className="relative z-10 max-w-lg">
          {/* Call to Action */}
          <div className="mb-16">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
              <span className="text-white font-semibold tracking-wider">SIGN IN</span>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight">
              BE ONE OF US!
            </h2>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 text-lg">Join 10,000+ active members</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 text-lg">Access premium resources</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 text-lg">24/7 community support</span>
            </div>
          </div>

          {/* Testimonials/Quote */}
          <div className="mt-16 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-white italic">
              "ELKA transformed how our team collaborates. The community support is unmatched!"
            </p>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="ml-4">
                <p className="text-white font-semibold">Alex Johnson</p>
                <p className="text-blue-200 text-sm">Product Lead, TechCorp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="absolute bottom-8 left-12">
          <p className="text-blue-300 text-sm">Experience the ELKA difference today</p>
        </div>
      </div>
    </div>
  );
};