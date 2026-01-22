// src/pages/SignupPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react"; // Removed User and Lock imports as they aren't in the target design
import { AuthLayout } from "../../components/layout.jsx";

export const SignupPage = () => {
  const [formData, setFormData] = useState({ 
    email: "", // Changed username to email to match the image's fields
    password: "" 
  });
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signup(formData);
    if (result?.success) {
      // Navigate to login page after successful signup, not dashboard, based on previous toast message suggestion
      navigate("/login"); 
    }
  };

  // Removed social platforms array as it is not present in the target design

  return (
    <AuthLayout
      // Update title/subtitle to match image's left panel text
      title="Welcome to Spacer" 
      subtitle="Create your account to unlock premium features and stay updated with the latest news. Join our community and embark on an exciting journey with us!"
    >
      <div className="p-8"> {/* Added padding inside the layout content area */}
        {/* Added branding/logo section from the image */}
        <div className="flex items-center mb-8">
            <div className="text-purple-600 font-semibold text-xl">yourText</div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-gray-800">Registration Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field (Assuming username was meant to be email as per the image fields) */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <input
              type="email" // Changed type to email
              placeholder="Name" // Placeholder text matching the image
              className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" // Updated styling for minimal look
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Name" // Placeholder text matching the image
              className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength="6"
            />
          </div>
          
          {/* Removed the extra text 'Must be at least 6 characters long' */}
          {/* Removed the 'Terms and Social Signup' block */}
          {/* Removed the 'Already have an account?' block */}

          {/* Submit Button - Styled to match the image's rounded, shadowed button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningUp ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" />
                Creating Account...
              </div>
            ) : (
              "Register"
            )}
          </button>
          
          {/* Added the 'Don't have an account? Sign up' link below the button */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
