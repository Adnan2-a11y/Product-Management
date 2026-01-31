<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  }
  
  .header {
    text-align: center;
    padding: 40px 0;
    border-bottom: 3px solid #667eea;
    margin-bottom: 30px;
  }
  
  .title {
    font-size: 3em;
    color: #667eea;
    margin: 0;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(102, 126, 234, 0.1);
  }
  
  .subtitle {
    font-size: 1.2em;
    color: #764ba2;
    margin-top: 10px;
  }
  
  .badge {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    margin: 5px;
    font-size: 0.9em;
    font-weight: 600;
  }
  
  .section {
    margin: 30px 0;
    padding: 25px;
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    border-radius: 6px;
  }
  
  .section h2 {
    color: #667eea;
    font-size: 1.8em;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .section h3 {
    color: #764ba2;
    font-size: 1.3em;
    margin-top: 20px;
  }
  
  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 15px 0;
  }
  
  .tech-item {
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    transition: all 0.3s ease;
  }
  
  .tech-item:hover {
    border-color: #667eea;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }
  
  .tech-item strong {
    color: #667eea;
    display: block;
    margin-bottom: 8px;
  }
  
  .code-block {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 15px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.95em;
  }
  
  .command {
    color: #ce9178;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
  }
  
  .feature-list li {
    padding: 12px 0;
    padding-left: 30px;
    position: relative;
    color: #555;
  }
  
  .feature-list li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .folder-structure {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9em;
    overflow-x: auto;
  }
  
  .folder-item {
    margin: 5px 0;
  }
  
  .folder-name {
    color: #569cd6;
  }
  
  .file-name {
    color: #ce9178;
  }
  
  .footer {
    text-align: center;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
    color: #999;
  }
  
  .author-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin: 20px 0;
  }
  
  .status-badge {
    display: inline-block;
    background: #4caf50;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.85em;
    font-weight: 600;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background: #667eea;
    color: white;
  }
  
  tr:hover {
    background: #f5f5f5;
  }
</style>
</head>
<body>
<div class="container">

<!-- HEADER SECTION -->
<div class="header">
  <h1 class="title">🛍️ Product Management System</h1>
  <p class="subtitle">A Powerful MERN Stack Web Application for Shop Product Management</p>
  <div>
    <span class="badge">MERN Stack</span>
    <span class="badge">Full-Stack</span>
    <span class="badge">Production Ready</span>
    <span class="status-badge">Active Development</span>
  </div>
</div>

<!-- OVERVIEW SECTION -->
<div class="section">
  <h2>📋 Overview</h2>
  <p>Product Management System is a comprehensive web application built with the MERN stack (MongoDB, Express, React, Node.js) designed to help shop owners efficiently manage their product inventory. This application provides a complete solution for user authentication, product management, and real-time updates with an intuitive user interface.</p>
</div>

<!-- FEATURES SECTION -->
<div class="section">
  <h2>⭐ Key Features</h2>
  <ul class="feature-list">
    <li><strong>User Authentication:</strong> Secure signup and login with bcryptjs and JWT tokens</li>
    <li><strong>Product Management:</strong> Create, read, update, and delete products with ease</li>
    <li><strong>Category Management:</strong> Organize products by categories</li>
    <li><strong>Protected Routes:</strong> Role-based access control for enhanced security</li>
    <li><strong>Real-time Notifications:</strong> Toast notifications for user actions</li>
    <li><strong>Responsive Design:</strong> Beautiful UI built with Tailwind CSS</li>
    <li><strong>Telegram Bot Integration:</strong> Automated product notifications</li>
    <li><strong>Rate Limiting:</strong> Protection against abuse and DDoS attacks</li>
    <li><strong>Input Validation:</strong> Server-side validation for data integrity</li>
    <li><strong>Error Handling:</strong> Comprehensive error logging and management</li>
  </ul>
</div>

<!-- TECH STACK SECTION -->
<div class="section">
  <h2>🚀 Technology Stack</h2>
  
  <h3>Frontend</h3>
  <div class="tech-stack">
    <div class="tech-item">
      <strong>React 19</strong>
      <p>Modern JavaScript library for building user interfaces</p>
    </div>
    <div class="tech-item">
      <strong>Vite</strong>
      <p>Lightning fast build tool and development server</p>
    </div>
    <div class="tech-item">
      <strong>Tailwind CSS</strong>
      <p>Utility-first CSS framework for rapid UI development</p>
    </div>
    <div class="tech-item">
      <strong>React Router</strong>
      <p>Declarative routing for React applications</p>
    </div>
    <div class="tech-item">
      <strong>Zustand</strong>
      <p>Lightweight state management solution</p>
    </div>
    <div class="tech-item">
      <strong>Axios</strong>
      <p>Promise-based HTTP client for API calls</p>
    </div>
    <div class="tech-item">
      <strong>React Hook Form</strong>
      <p>Performant and flexible form validation</p>
    </div>
    <div class="tech-item">
      <strong>Lucide React</strong>
      <p>Beautiful icon library for React</p>
    </div>
  </div>
  
  <h3>Backend</h3>
  <div class="tech-stack">
    <div class="tech-item">
      <strong>Node.js</strong>
      <p>JavaScript runtime for server-side development</p>
    </div>
    <div class="tech-item">
      <strong>Express.js</strong>
      <p>Fast and minimal web application framework</p>
    </div>
    <div class="tech-item">
      <strong>MongoDB</strong>
      <p>NoSQL database for flexible data storage</p>
    </div>
    <div class="tech-item">
      <strong>JWT</strong>
      <p>Secure token-based authentication</p>
    </div>
    <div class="tech-item">
      <strong>Bcryptjs</strong>
      <p>Password hashing for enhanced security</p>
    </div>
    <div class="tech-item">
      <strong>Helmet</strong>
      <p>HTTP headers security middleware</p>
    </div>
    <div class="tech-item">
      <strong>CORS</strong>
      <p>Cross-Origin Resource Sharing support</p>
    </div>
    <div class="tech-item">
      <strong>Telegram Bot API</strong>
      <p>Integration for automated notifications</p>
    </div>
  </div>
</div>

<!-- PROJECT STRUCTURE SECTION -->
<div class="section">
  <h2>📁 Project Structure</h2>
  <div class="folder-structure">
<div class="folder-item"><span class="folder-name">📦 MERN-Project1/</span></div>
<div class="folder-item">&nbsp;&nbsp;<span class="folder-name">📁 client/</span> - React Frontend Application</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="file-name">package.json</span></div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="file-name">vite.config.js</span></div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">src/</span></div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├── <span class="folder-name">pages/</span> - Page components</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├── <span class="folder-name">components/</span> - Reusable components</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├── <span class="folder-name">store/</span> - Zustand state management</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├── <span class="folder-name">lib/</span> - Axios configuration</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└── <span class="file-name">App.jsx</span></div>
<div class="folder-item">&nbsp;&nbsp;<span class="folder-name">📁 server/</span> - Express Backend Application</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="file-name">server.js</span></div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="file-name">package.json</span></div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">routes/</span> - API routes</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">controller/</span> - Business logic</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">models/</span> - Database schemas</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">middleware/</span> - Custom middleware</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">utils/</span> - Utility functions</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;├── <span class="folder-name">bot/</span> - Telegram bot handlers</div>
<div class="folder-item">&nbsp;&nbsp;&nbsp;&nbsp;└── <span class="folder-name">services/</span> - Business services</div>
  </div>
</div>

<!-- INSTALLATION SECTION -->
<div class="section">
  <h2>🔧 Installation & Setup</h2>
  
  <h3>Prerequisites</h3>
  <ul class="feature-list">
    <li>Node.js (v14 or higher)</li>
    <li>MongoDB (local or cloud instance)</li>
    <li>npm or yarn package manager</li>
    <li>Git</li>
  </ul>
  
  <h3>Step 1: Clone the Repository</h3>
  <div class="code-block">
git clone https://github.com/Adnan2-a11y/Product-Management.git<br>
cd MERN-Project1
  </div>
  
  <h3>Step 2: Setup Backend</h3>
  <div class="code-block">
cd server<br>
npm install
  </div>
  
  <h3>Step 3: Configure Environment Variables</h3>
  <p>Create a <code>.env</code> file in the server directory:</p>
  <div class="code-block">
PORT=3000<br>
MONGODB_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_jwt_secret_key<br>
TELEGRAM_BOT_TOKEN=your_telegram_bot_token<br>
TELEGRAM_CHAT_ID=your_telegram_chat_id
  </div>
  
  <h3>Step 4: Setup Frontend</h3>
  <div class="code-block">
cd ../client<br>
npm install
  </div>
  
  <h3>Step 5: Run the Application</h3>
  <p><strong>Terminal 1 - Backend:</strong></p>
  <div class="code-block">
cd server<br>
npm run dev
  </div>
  
  <p><strong>Terminal 2 - Frontend:</strong></p>
  <div class="code-block">
cd client<br>
npm run dev
  </div>
  
  <p>The application will be available at:</p>
  <ul class="feature-list">
    <li>Frontend: <code>http://localhost:5173</code></li>
    <li>Backend: <code>http://localhost:3000</code></li>
  </ul>
</div>

<!-- API ENDPOINTS SECTION -->
<div class="section">
  <h2>🔌 API Endpoints</h2>
  
  <h3>Authentication Endpoints</h3>
  <table>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/signup</td>
      <td>Register a new user</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Login user</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/logout</td>
      <td>Logout user</td>
    </tr>
  </table>
  
  <h3>Product Endpoints</h3>
  <table>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/products</td>
      <td>Get all products</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/products/:id</td>
      <td>Get product by ID</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/products</td>
      <td>Create new product (Protected)</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/api/products/:id</td>
      <td>Update product (Protected)</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/products/:id</td>
      <td>Delete product (Protected)</td>
    </tr>
  </table>
</div>

<!-- USAGE SECTION -->
<div class="section">
  <h2>📖 Usage Guide</h2>
  
  <h3>User Registration & Login</h3>
  <ol style="padding-left: 20px;">
    <li>Navigate to the signup page</li>
    <li>Enter your email and password</li>
    <li>Click "Sign Up" to create an account</li>
    <li>Login with your credentials</li>
  </ol>
  
  <h3>Managing Products</h3>
  <ol style="padding-left: 20px;">
    <li>After login, navigate to the dashboard</li>
    <li>Click "Add Product" to create a new product</li>
    <li>Fill in product details (name, description, price, category)</li>
    <li>Submit the form to save the product</li>
    <li>View, edit, or delete products from the product list</li>
  </ol>
</div>

<!-- BUILD & DEPLOYMENT SECTION -->
<div class="section">
  <h2>🚀 Build & Deployment</h2>
  
  <h3>Building for Production</h3>
  <div class="code-block">
cd client<br>
npm run build
  </div>
  
  <p>This creates a <code>dist/</code> folder with optimized production-ready files.</p>
  
  <h3>Using Docker</h3>
  <div class="code-block">
docker build -t product-management .<br>
docker run -p 3000:3000 product-management
  </div>
</div>

<!-- CONTRIBUTING SECTION -->
<div class="section">
  <h2>🤝 Contributing</h2>
  <p>Contributions are welcome! Here's how you can help:</p>
  <ol style="padding-left: 20px;">
    <li>Fork the repository</li>
    <li>Create a feature branch (<code>git checkout -b feature/AmazingFeature</code>)</li>
    <li>Commit your changes (<code>git commit -m 'Add AmazingFeature'</code>)</li>
    <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>)</li>
    <li>Open a Pull Request</li>
  </ol>
</div>

<!-- TROUBLESHOOTING SECTION -->
<div class="section">
  <h2>🐛 Troubleshooting</h2>
  
  <h3>MongoDB Connection Issues</h3>
  <p>Ensure your MongoDB instance is running and the connection string is correct in your <code>.env</code> file.</p>
  
  <h3>CORS Errors</h3>
  <p>Make sure the frontend URL matches the origin in the CORS configuration in <code>server.js</code>.</p>
  
  <h3>Port Already in Use</h3>
  <p>Change the PORT in your <code>.env</code> file or kill the process using the port.</p>
  
  <h3>Dependencies Issues</h3>
  <p>Delete <code>node_modules</code> and <code>package-lock.json</code>, then run <code>npm install</code> again.</p>
</div>

<!-- PERFORMANCE & SECURITY SECTION -->
<div class="section">
  <h2>🔒 Security & Performance</h2>
  <div class="tech-stack">
    <div class="tech-item">
      <strong>🔐 JWT Authentication</strong>
      <p>Secure token-based authentication system</p>
    </div>
    <div class="tech-item">
      <strong>🛡️ Password Hashing</strong>
      <p>Industry-standard bcryptjs encryption</p>
    </div>
    <div class="tech-item">
      <strong>⚡ Rate Limiting</strong>
      <p>Protection against brute force attacks</p>
    </div>
    <div class="tech-item">
      <strong>🌐 HTTPS Support</strong>
      <p>Secure data transmission</p>
    </div>
    <div class="tech-item">
      <strong>✅ Input Validation</strong>
      <p>Server-side data validation</p>
    </div>
    <div class="tech-item">
      <strong>📝 Security Headers</strong>
      <p>Helmet.js for HTTP security</p>
    </div>
  </div>
</div>

<!-- AUTHOR SECTION -->
<div class="author-box">
  <h2 style="margin-top: 0;">👨‍💻 Author</h2>
  <p><strong>Rafshan Jani</strong></p>
  <p>Full-Stack Developer | MERN Specialist</p>
  <p>📧 <a href="mailto:your-email@example.com" style="color: white; text-decoration: underline;">your-email@example.com</a></p>
  <p>🔗 <a href="https://github.com/Adnan2-a11y" style="color: white; text-decoration: underline;">GitHub Profile</a></p>
</div>

<!-- LICENSE SECTION -->
<div class="section">
  <h2>📄 License</h2>
  <p>This project is licensed under the ISC License - see the LICENSE file for details.</p>
</div>

<!-- LINKS SECTION -->
<div class="section">
  <h2>🔗 Useful Links</h2>
  <ul class="feature-list">
    <li><a href="https://github.com/Adnan2-a11y/Product-Management" style="color: #667eea; text-decoration: none;">GitHub Repository</a></li>
    <li><a href="https://github.com/Adnan2-a11y/Product-Management/issues" style="color: #667eea; text-decoration: none;">Report Issues</a></li>
    <li><a href="https://react.dev/" style="color: #667eea; text-decoration: none;">React Documentation</a></li>
    <li><a href="https://expressjs.com/" style="color: #667eea; text-decoration: none;">Express.js Documentation</a></li>
    <li><a href="https://www.mongodb.com/docs/" style="color: #667eea; text-decoration: none;">MongoDB Documentation</a></li>
  </ul>
</div>

<!-- FOOTER -->
<div class="footer">
  <p>🌟 If you find this project helpful, please consider giving it a ⭐ on GitHub!</p>
  <p>Made with ❤️ by <strong>Rafshan Jani</strong></p>
  <p>&copy; 2025 Product Management System. All rights reserved.</p>
</div>

</div>
</body>
</html>