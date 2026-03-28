import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/home';
import About from './Pages/about';
import Contact from './Pages/Contact';
import Register from './Pages/Register';
import Login from './Pages/Login';
// import Jobs from './Pages/Jobs1';
import AllCompanies from './Components/JobsComponents/companycompontes/AllCompany';
import CompanyDetails from './Components/JobsComponents/companycompontes/companyDetalis';
import CareerTips from './Components/BlogSection/careeTips';
import BlogDetails from './Pages/BlogDetails';
import Service from './Pages/Service';
import JobListing from './Pages/JobListing';
import JobFilters from './Pages/JobsFilters';
import JobDetalis from './Pages/JobsDetalis';
import UserDashboard from './Pages/Userdashboard';

import AdminDashboard from './Components/DashboardComponents/AdminDashboard';
import CandidateDashboard from './Components/DashboardComponents/CandidateDashboard';
import Profile from './Components/DashboardComponents/Profile';
import Security from './Components/DashboardComponents/Security';
import JobFeed from './Components/DashboardComponents/JobFeed';
import ApplicationTracker from './Components/DashboardComponents/Applicationtracker';
import SavedJobs from './Components/DashboardComponents/Savedjobs';
import Settings from './Components/DashboardComponents/Setting';

import PrivateRoute from './Components/Routes/PrivateRoute';
import Controller from './Components/Admin/Controller';
import JobFormModal from './Components/Admin/JobFormMdels';

import UploadResume from './Pages/UploadResume';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/regi" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/jobs" element={<Jobs />} /> */}
        <Route path="/jobs-listing" element={<JobListing />} />
        <Route path="/job-filters" element={<JobFilters />} />
        <Route path="/service" element={<Service />} />
        <Route path="/all-company" element={<AllCompanies />} />
        <Route path="/top-companies/:companyId" element={<CompanyDetails />} />
        <Route path="/careeTips" element={<CareerTips />} />
        <Route path="/details/:blogId" element={<BlogDetails />} />
        <Route path="/User-Dashboard" element={<UserDashboard />} />

        {/* Job Details ✅ FIXED */}
        <Route path="/job-details/code/:jobCode" element={<JobDetalis />} />
        <Route path="/upload-resume" element={<UploadResume />} />

        {/* Admin Panel */}
        <Route path="/Controller" element={<Controller />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/job-form-modal" element={<JobFormModal />} />

        {/* Candidate Dashboard (Protected) */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute allowedRoles={['candidate']}>
              <CandidateDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="job-feed" element={<JobFeed />} />
          <Route path="application-tracker" element={<ApplicationTracker />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
              <Controller />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
