// src/pages/LoginPage.jsx
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

  // SVG Grid Pattern (more interesting than simple lines)
  const gridPattern = encodeURIComponent(`
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Main grid lines -->
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
        </pattern>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.2)"/>
          <circle cx="21" cy="21" r="1" fill="rgba(255,255,255,0.2)"/>
        </pattern>
        <pattern id="hex" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M15 0L30 8.66V21.66L15 30L0 21.66V8.66z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.3"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)"/>
      <rect width="100" height="100" fill="url(#dots)"/>
      <rect width="100" height="100" fill="url(#hex)" opacity="0.3"/>
      
      <!-- Decorative circles at intersections -->
      <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="20" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="40" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="60" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="80" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
      <circle cx="100" cy="0" r="1" fill="rgba(255,255,255,0.4)"/>
    </svg>
  `);

  // Alternative simpler grid if you prefer
  const simpleGridPattern = encodeURIComponent(`
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(147, 51, 234, 0.3)" />
          <stop offset="100%" stop-color="rgba(59, 130, 246, 0.3)" />
        </linearGradient>
      </defs>
      <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="url(#gridGradient)" stroke-width="0.8"/>
      </pattern>
      <rect width="80" height="80" fill="url(#gridPattern)"/>
      
      <!-- Add some decorative dots -->
      <circle cx="10" cy="10" r="0.8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="30" cy="10" r="0.8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="50" cy="10" r="0.8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="70" cy="10" r="0.8" fill="rgba(255,255,255,0.5)"/>
    </svg>
  `);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Animated Grid Background */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [-20, 20, -20], 
          y: [-20, 20, -20],
          rotate: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.5, 1]
        }}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,${gridPattern}")`,
          backgroundSize: '400px 400px'
        }}
        className="absolute inset-0 opacity-[0.07] z-[-2]"
      />

      {/* Secondary Grid Layer (moving in opposite direction) */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [20, -20, 20], 
          y: [20, -20, 20]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,${simpleGridPattern}")`,
          backgroundSize: '300px 300px'
        }}
        className="absolute inset-0 opacity-[0.05] z-[-2]"
      />

      {/* Animated Background Blobs */}
      <motion.div 
        variants={blobVariants}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 z-[-1]"
      />
      
      <motion.div 
        variants={blobVariants}
        animate="animate"
        initial={{ scale: 0.8, rotate: 45 }}
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 z-[-1]"
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20 z-[-1]"
      />

      {/* Floating Connected Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`connected-${i}`}
          className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * 50 - 25],
            y: [null, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

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
          {/* Logo/Header */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <motion.h1 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-4xl font-black text-white tracking-tight"
            >
              LOGIN
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
              Join our community that have more than 10000 subscribers and learn new things
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants} whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                elka@qq.com
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
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-white/30 text-white outline-none focus:border-purple-400 transition-all placeholder-white/50"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              <motion.div 
                className="flex items-center justify-center"
                animate={isLoading ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={isLoading ? { repeat: Infinity, duration: 1.5 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-3 size-5" />
                    LOGGING IN...
                  </>
                ) : (
                  <>
                    LOGIN
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

          {/* Sign Up Link */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-white/20 text-center"
          >
            <p className="text-white/80">
              Don't have account?
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center mt-2 text-purple-300 hover:text-white font-semibold group"
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center"
              >
                Sign up
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats in Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-white font-bold">10K+</div>
              <div className="text-white/60 text-sm">Members</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-white font-bold">24/7</div>
              <div className="text-white/60 text-sm">Support</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-white font-bold">Premium</div>
              <div className="text-white/60 text-sm">Resources</div>
            </div>
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
    </div>
  );
};