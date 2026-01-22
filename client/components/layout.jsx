// src/components/AuthLayout.jsx
//export const AuthLayout = ({ children, title, subtitle }) => (
//    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
//            <div className="text-center">
//                <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
//                <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
//            </div>
//            {children}
//        </div>
//    </div>
//);
// src/components/AuthLayout.jsx
export const AuthLayout = ({ 
  children, 
  title, 
  subtitle,
  showLeftPanel = true,
  leftPanelContent
}) => (
  <div className="min-h-screen flex">
    {/* Left Panel - Hidden on mobile */}
    {showLeftPanel && (
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to</h1>
          <h2 className="text-6xl font-extrabold text-white mb-8">Spacer</h2>
          <p className="text-xl text-blue-100 max-w-md">
            Create your account to unlock premium features and stay updated with the latest news. 
            Join our community and embark on an exciting journey with us!
          </p>
        </div>
        
        {leftPanelContent || (
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
        )}
      </div>
    )}

    {/* Right Panel */}
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-gray-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  </div>
);
