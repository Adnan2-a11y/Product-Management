// src/pages/LoginPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { AuthLayout } from "../../components/layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react"; // Import Loader for the loading state

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result?.success) navigate("/");
    };

    return (
        // Title and subtitle already match the target design image
        <AuthLayout title="Welcome Back" subtitle="Login to your account">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {/* Email Input Styling Updated */}
                <input 
                    type="email" 
                    required 
                    placeholder="Email Address"
                    // Changed styling to match minimal design: p-2 border, rounded-sm, removed focus rings
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {/* Password Input Styling Updated */}
                <input 
                    type="password" 
                    required 
                    placeholder="Password"
                    // Changed styling to match minimal design: p-2 border, rounded-sm, removed focus rings
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                
                {/* Sign In Button Styling Updated to Dark Theme */}
                <button 
                    disabled={isLoggingIn}
                    // Changed color scheme to dark background with white text, added shadow, removed indigo rings/hover
                    className="w-full bg-gray-900 text-white py-3 rounded-lg shadow-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoggingIn ? (
                        <div className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2 size-4" />
                            Logging in...
                        </div>
                    ) : (
                        "Sign in"
                    )}
                </button>
                
                {/* Sign Up Link Styling Updated */}
                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link 
                        to="/signup" 
                        // Changed link color from indigo to match the blue in the design
                        className="text-blue-600 font-medium hover:text-blue-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};
