// src/pages/SignupPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const socialPlatforms = [
    { name: "Facebook", color: "bg-blue-600", icon: "F", hover: "hover:bg-blue-700" },
    { name: "Twitter", color: "bg-sky-500", icon: "T", hover: "hover:bg-sky-600" },
    { name: "LinkedIn", color: "bg-blue-700", icon: "L", hover: "hover:bg-blue-800" },
    { name: "Gmail", color: "bg-red-500", icon: "G", hover: "hover:bg-red-600" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div 
        variants={blobVariants}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"
      />
      
      <motion.div 
        variants={blobVariants}
        animate="animate"
        initial={{ scale: 0.8, rotate: 45 }}
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20"
      />

      {/* Glassmorphism Form Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 15 
        }}
        className="z-10 p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md mx-4"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <motion.h1 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-4xl font-black text-white tracking-tight"
            >
              CREATE ACCOUNT
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-4 flex justify-center space-x-2"
            >
              <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
              <div className="h-1 w-8 bg-blue-400 rounded-full"></div>
              <div className="h-1 w-4 bg-pink-400 rounded-full"></div>
            </motion.div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white text-center">
              WELCOME TO ELKA
            </h2>
            <p className="mt-2 text-white/80 text-center">
              Join our community with 10,000+ subscribers and unlock premium features
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                FULL NAME
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 size-5" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-white/30 text-white outline-none focus:border-purple-400 transition-all placeholder-white/50"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 size-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-white/30 text-white outline-none focus:border-purple-400 transition-all placeholder-white/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 size-5" />
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-white/30 text-white outline-none focus:border-purple-400 transition-all placeholder-white/50"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength="6"
                />
              </div>
            </motion.div>

            {/* Social Signup Section */}
            <motion.div 
              variants={itemVariants}
              className="pt-6 border-t border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="social-signup"
                    className="h-5 w-5 text-purple-500 focus:ring-purple-500 bg-transparent border-white/30 rounded"
                  />
                  <label htmlFor="social-signup" className="ml-3 block text-sm text-white/80">
                    Sign up with social
                  </label>
                </div>
                
                <motion.div className="flex space-x-2">
                  {socialPlatforms.map((platform, index) => (
                    <motion.button
                      key={platform.name}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      className={`w-8 h-8 ${platform.color} ${platform.hover} rounded-full flex items-center justify-center text-white text-xs font-bold transition-all shadow-lg`}
                      aria-label={`Sign up with ${platform.name}`}
                      title={platform.name}
                    >
                      {platform.icon}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Social Platform Labels */}
              <div className="flex justify-between px-1 mt-2">
                {socialPlatforms.map((platform) => (
                  <span key={platform.name} className="text-xs text-white/60">
                    {platform.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Already have account */}
            <motion.div 
              variants={itemVariants}
              className="pt-6 border-t border-white/20"
            >
              <p className="text-center text-white/80">
                Already have an account?
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center mt-2 text-purple-300 hover:text-white font-semibold group w-full"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center"
                >
                  Sign in
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSigningUp}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              <motion.div 
                className="flex items-center justify-center"
                animate={isSigningUp ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={isSigningUp ? { repeat: Infinity, duration: 1.5 } : {}}
              >
                {isSigningUp ? (
                  <>
                    <Loader className="animate-spin mr-3 size-5" />
                    CREATING ACCOUNT...
                  </>
                ) : (
                  <>
                    SIGN UP
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </motion.div>
              
              {/* Button hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.button>
          </form>

          {/* Features in Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-white font-bold text-lg"
              >
                🚀
              </motion.div>
              <div className="text-white/60 text-xs mt-1">Fast Setup</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-white font-bold text-lg"
              >
                🔒
              </motion.div>
              <div className="text-white/60 text-xs mt-1">Secure</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-white font-bold text-lg"
              >
                ⭐
              </motion.div>
              <div className="text-white/60 text-xs mt-1">Premium</div>
            </div>
          </motion.div>

          {/* Terms & Privacy */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-white/60 text-xs">
              By signing up, you agree to our{" "}
              <a href="#" className="text-purple-300 hover:text-white underline">Terms</a>{" "}
              and{" "}
              <a href="#" className="text-purple-300 hover:text-white underline">Privacy Policy</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -30, 30, -30],
            x: [null, 20, -20, 20],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-0 right-0 text-center"
      >
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} ELKA. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};