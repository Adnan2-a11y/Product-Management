// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  BarChart3, 
  Users, 
  TrendingUp,
  PlusCircle,
  Search,
  Filter,
  ShoppingCart,
  Bell,
  ChevronDown
} from "lucide-react";

export const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalOrders: 0,
    revenue: 0
  });

  // Quick actions for the dashboard
  const quickActions = [
    { 
      icon: PlusCircle, 
      label: "Add Product", 
      color: "bg-blue-500", 
      onClick: () => navigate("/products/new") 
    },
    { 
      icon: Package, 
      label: "View Inventory", 
      color: "bg-green-500", 
      onClick: () => navigate("/inventory") 
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      color: "bg-purple-500", 
      onClick: () => navigate("/analytics") 
    },
    { 
      icon: Users, 
      label: "Customers", 
      color: "bg-orange-500", 
      onClick: () => navigate("/customers") 
    },
  ];

  // Mock data for recent products
  const recentProducts = [
    { id: 1, name: "Wireless Headphones", sku: "WH-001", stock: 45, price: "$99.99", status: "In Stock" },
    { id: 2, name: "Smart Watch", sku: "SW-002", stock: 12, price: "$199.99", status: "Low Stock" },
    { id: 3, name: "USB-C Cable", sku: "UC-003", stock: 0, price: "$19.99", status: "Out of Stock" },
    { id: 4, name: "Laptop Backpack", sku: "LB-004", stock: 23, price: "$49.99", status: "In Stock" },
  ];

  // Mock data for recent orders
  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", date: "2024-01-15", amount: "$299.97", status: "Delivered" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2024-01-14", amount: "$149.99", status: "Processing" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "2024-01-13", amount: "$499.95", status: "Shipped" },
    { id: "#ORD-004", customer: "Emily Davis", date: "2024-01-12", amount: "$79.99", status: "Pending" },
  ];

  useEffect(() => {
    // In a real app, fetch stats from API
    setStats({
      totalProducts: 156,
      lowStock: 8,
      totalOrders: 324,
      revenue: 24680
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Package className="text-blue-600 size-8" />
                <span className="ml-3 text-2xl font-bold text-gray-900">ProductHub</span>
              </div>
              
              {/* Search Bar */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="size-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">AD</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-500">admin@producthub.com</p>
                </div>
                <ChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your products today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="text-blue-600 size-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 size-4 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.lowStock}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Package className="text-yellow-600 size-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Needs attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="text-green-600 size-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 size-4 mr-1" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-gray-500 ml-2">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="text-purple-600 size-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 size-4 mr-1" />
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition-shadow text-left"
              >
                <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                  <action.icon className="text-white size-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{action.label}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Products & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sku}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium">{product.stock}</p>
                      </td>
                      <td className="py-4">
                        <p className="font-medium">{product.price}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === "In Stock" 
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <span className={`text-sm px-2 py-1 rounded ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
