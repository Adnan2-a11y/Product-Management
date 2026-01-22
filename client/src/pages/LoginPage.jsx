// src/pages/SignupPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Mail, Lock, User } from "lucide-react";

export const SignupPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: "",
    email: "",
    password: "" 
  });
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signup(formData);
    if (result?.success) {
      navigate("/login"); 
    }
  };

  const socialPlatforms = [
    { name: "Facebook", color: "bg-blue-600 hover:bg-blue-700", icon: "F" },
    { name: "Twitter", color: "bg-sky-500 hover:bg-sky-600", icon: "T" },
    { name: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800", icon: "L" },
    { name: "Gmail", color: "bg-red-500 hover:bg-red-600", icon: "G" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Information */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to</h1>
          <h2 className="text-6xl font-extrabold text-white mb-8">Spacer</h2>
          <p className="text-xl text-blue-100 max-w-md">
            Create your account to unlock premium features and stay updated with the latest news. 
            Join our community and embark on an exciting journey with us!
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition">
              CREATE HERE
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              DISCOVER HERE
            </button>
          </div>
          <p className="text-blue-200 text-sm">
            © 2024 Spacer. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Create you account</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Enter Full name"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Social Signup Checkbox */}
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="social-signup"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="social-signup" className="ml-3 block text-sm text-gray-700">
                    Sign up with
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  {socialPlatforms.map((platform) => (
                    <button
                      key={platform.name}
                      type="button"
                      className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center text-white text-xs font-bold transition transform hover:scale-105`}
                      aria-label={`Sign up with ${platform.name}`}
                      title={platform.name}
                    >
                      {platform.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Platform Labels */}
              <div className="flex justify-between mt-2 px-1">
                {socialPlatforms.map((platform) => (
                  <span key={platform.name} className="text-xs text-gray-500">
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Already have account */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" />
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};