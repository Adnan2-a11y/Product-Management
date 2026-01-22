import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// State & Components
import { useAuthStore } from "./store/useAuthStore.js";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { ProtectedRoute } from "../components/ProtectedRoute.jsx";

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

  // 🛡️ Core Logic: On first load, check if the session cookie is valid
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show a clean loading state so the user doesn't see a "flicker" of the wrong page
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* 🏠 Private Route: Only for logged-in users */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div className="p-10"><h1>Welcome to the Dashboard! 🚀</h1></div>
            </ProtectedRoute>
          } 
        />

        {/* 🔑 Public Routes: If already logged in, redirect to Home */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
        />

        <Route 
          path="/signup" 
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} 
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 🍞 Global Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;