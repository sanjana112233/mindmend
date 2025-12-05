// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import { useContext } from 'react';
// import { UpdateProvider } from './context/UpdateContext'; 
// // Layouts
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// //import DoctorDashboard from './pages/DoctorDashboard';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Journal from './pages/Journal';
// import Chat from './pages/Chat';
// import Breathing from './pages/Breathing';

// // Private Route Component
// const PrivateRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <UpdateProvider>
//     <AuthProvider>
//       <Router>
//         {/* LAYOUT FIX: flex-col and min-h-screen ensures Footer sticks to bottom */}
//         <div className="flex flex-col min-h-screen bg-[#F8F7FA] text-slate-800 font-sans">
          
//           <Navbar />
          
//           {/* Main Content grows to fill space */}
//           <main className="flex-grow">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Protected Routes */}
//               <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//               <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
//               <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
//               <Route path="/breathing" element={<PrivateRoute><Breathing /></PrivateRoute>} />
                         
//               {/* 💡 NEW PATIENT FILE ROUTE: Requires patient ID parameter */}
              
              
//             </Routes>
//           </main>

//           <Footer />
          
//         </div>
//       </Router>
//     </AuthProvider>
//     </UpdateProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { UpdateProvider } from './context/UpdateContext'; 

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Chat from './pages/Chat';
import Breathing from './pages/Breathing';
// 💡 REQUIRED IMPORTS FOR ROLE-BASED ROUTING
import AdminDashboard from './pages/AdminDashboard'; 
import DoctorDashboard from './pages/DoctorDashboard';
import PatientFile from './pages/PatientFile'; 

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

// 💡 NEW COMPONENT: Redirects to the correct dashboard based on role
const RoleRedirect = () => {
  const { role } = useContext(AuthContext);

  if (role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }
  if (role === 'doctor') {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  // Default for 'user' role or any other standard logged-in user
  return <Navigate to="/user-dashboard" replace />;
};

function App() {
  return (
    <UpdateProvider>
    <AuthProvider>
      <Router>
        {/* LAYOUT FIX: flex-col and min-h-screen ensures Footer sticks to bottom */}
        <div className="flex flex-col min-h-screen bg-[#F8F7FA] text-slate-800 font-sans">
          
          <Navbar />
          
          {/* Main Content grows to fill space */}
          <main className="flex-grow">
            <Routes>
              {/* === PUBLIC ROUTES === */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* === PROTECTED ROUTES === */}
              
              {/* 1. CENTRAL ENTRY POINT: Redirection based on role */}
              {/* The old /dashboard route now points to the smart redirector */}
              <Route path="/dashboard" element={<PrivateRoute><RoleRedirect /></PrivateRoute>} />

              {/* 2. ROLE-SPECIFIC DASHBOARD ROUTES */}
              <Route path="/user-dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/doctor-dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />

              {/* 3. DOCTOR PATIENT FILE ROUTE */}
              <Route path="/doctor/patient/:id" element={<PrivateRoute><PatientFile /></PrivateRoute>} /> 
              
              {/* 4. OTHER PROTECTED APPLICATION ROUTES */}
              <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
              <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="/breathing" element={<PrivateRoute><Breathing /></PrivateRoute>} />
            </Routes>
          </main>

          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
    </UpdateProvider>
  );
}

export default App;