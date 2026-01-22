import {create } from "zustand";
import axios from "../lib/axios.js";
import {toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set ({isCheckingAuth: true});
        try {
            const response = await axios.get('/auth/check');
            set({ user: response?.data?.user, isAuthenticated: true, isCheckingAuth: false });

        }catch (error){
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        }
    },


    // 📝 SIGNUP: Create a new account
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axios.post("/auth/signup", data);
            
            // Pro Tip: Usually, after signup, we either log them in 
            // automatically or redirect to login.
            toast.success("Account created! You can now log in. ✅");
            set({ isSigningUp: false });
            return { success: true };
        } catch (error) {
            // This catches your express-validator errors or "User already exists"
            const errorMsg = error.response?.data?.message || "Signup failed";
            toast.error(errorMsg);
            set({ isSigningUp: false });
            return { success: false };
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try{
            const response = await axios.post('/auth/login', data);
            // Update state with user data and set authenticated to true
			set({ 
				user: response.data.user, 
				isAuthenticated: true, 
				isLoggingIn: false 
			});
            return { success: true };
        }catch (error){
            // Extract the message from your backend error response
			const errorMessage = error.response?.data?.message || "Login failed";
			toast.error(errorMessage);
			
			set({ isLoggingIn: false });
			return { success: false };
        }
    },
    // 🚪 LOGOUT
	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null, isAuthenticated: false });
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error("Error logging out");
		}
	},
}));