import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './components/home/home';
import Login from './components/Login_Signup/login';
import CitizenSignup from './components/Login_Signup/citizen_signup';
import WorkerDashboard from './components/worker_dashboard/workerDashPage';
import ComplaintPage from './components/complaint/complaintPage';
import UserCompalints from './components/userPages/userPage';
import AdminDashboard from './components/admin_dashboard/adminDashPage';
import SuccessMsgPage from './components/successPage';
import ComplaintDetailPage from './components/complaint/complaintDetailPage';
import { UserContext } from './components/context';
import Contact from './components/contact_us/contact';
import About from './components/about_us/about1';
import WorkerSignup from './components/Login_Signup/worker_signup';
import CorporatorDashboard from './components/corporator_dashboard/corporatorDashPage';
import CorporatorComplaintDetailPage from './components/corporator_dashboard/complaintDetailPage';

// ⭐ LOGIN PAGES
import AdminLogin from "./components/Login_Signup/adminLogin";
import EmployeeLogin from "./components/Login_Signup/employeeLogin";
import LoginChoice from "./components/Login_Signup/loginChoice";

// ⭐ SEARCH RESULT PAGE
import SearchResultPage from "./components/search/searchResultPage";

// ⭐ NEW ROLE-BASED HOME PAGES
import CitizenHome from "./components/home/CitizenHome";
import EmployeeHome from "./components/home/EmployeeHome";
import AdminHome from "./components/home/AdminHome";

function App() {

  const [value, setValue] = React.useState({ exists: false })

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ value, setValue }}>
          <Routes>

            {/* Public Home Page */}
            <Route path='/' element={<Home />} />

            {/* ⭐ Login Choice Page */}
            <Route path='/loginchoice' element={<LoginChoice />} />

            {/* ⭐ Citizen Login */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<CitizenSignup />} />

            {/* ⭐ Employee & Admin Login */}
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/employeelogin' element={<EmployeeLogin />} />

            {/* ⭐ ROLE-BASED HOME DASHBOARDS */}
            <Route path='/userhome' element={<CitizenHome />} />
            <Route path='/employeehome' element={<EmployeeHome />} />
            <Route path='/adminhome' element={<AdminHome />} />

            {/* Existing Dashboards */}
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/empdash' element={<WorkerDashboard />} />
            <Route path='/usercomplaints' element={<UserCompalints />} />
            <Route path='/admindash' element={<AdminDashboard />} />
            <Route path='/corporatordash' element={<CorporatorDashboard />} />

            {/* Complaint Views */}
            <Route path='/success' element={<SuccessMsgPage />} />
            <Route path='/viewcomplaint' element={<ComplaintDetailPage />} />
            <Route path='/viewcorporatorcomplaint' element={<CorporatorComplaintDetailPage />} />

            {/* Search */}
            <Route path='/search' element={<SearchResultPage />} />

            {/* Other Pages */}
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/workersignup' element={<WorkerSignup />} />

          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
