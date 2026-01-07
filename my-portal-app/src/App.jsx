import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/home';
import About from './Pages/about';
import Contant from './Pages/Contant';
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

import  UploadResume from './Pages/UploadResume';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contant />} />
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
        <Route path="/User-Dashboard" element={<UserDashboard />}/>

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












// src/App.js
// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// // import PrivateRoute from './Routes/PrivateRoute'; // ⬅️ New import

// // Lazy-loaded Pages
// const Home = lazy(() => import('./Pages/home'));
// const About = lazy(() => import('./Pages/about'));
// const Contact = lazy(() => import('./Pages/Contant'));
// const Register = lazy(() => import('./Pages/Register'));
// const Login = lazy(() => import('./Pages/Login'));
// const Jobs = lazy(() => import('./Pages/Jobs'));
// const AllCompanies = lazy(() => import('./Components/JobsComponents/companycompontes/AllCompany'));
// const CompanyDetails = lazy(() => import('./Components/JobsComponents/companycompontes/companyDetalis'));
// const CareerTips = lazy(() => import('./Components/BlogSection/careeTips'));
// const BlogDetails = lazy(() => import('./Pages/BlogDetails'));
// const Dashboard = lazy(() => import('./Components/DashboardComponents/CandidateDashboard'));
// const Profile = lazy(() => import('./Components/DashboardComponents/Profile'));
// const Security = lazy(() => import('./Components/DashboardComponents/Security'));
// const JobFeed = lazy(() => import('./Components/DashboardComponents/JobFeed'));
// const ApplicationTracker = lazy(() => import('./Components/DashboardComponents/Applicationtracker'));
// const SavedJobs = lazy(() => import('./Components/DashboardComponents/Savedjobs'));
// const Settings = lazy(() => import('./Components/DashboardComponents/Setting'));
// const AdminPanel = lazy(() => import('./Pages/AdminPanel'));
// // const Unauthorized = lazy(() => import('./Pages/Unauthorized'));

// // Page Wrapper
// const PageWrapper = ({ children, title }) => (
//   <>
//     <Helmet>
//       <title>{title} | JobSphere</title>
//     </Helmet>
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.4 }}
//     >
//       {children}
//     </motion.div>
//   </>
// );

// // All App Routes with Animation
// // const AnimatedRoutes = () => {
// //   const location = useLocation();

// //   return (
// //     <AnimatePresence mode="wait">
// //       <Routes location={location} key={location.pathname}>
// //         <Route path="/" element={<PageWrapper title="Home"><Home /></PageWrapper>} />
// //         <Route path="/home" element={<Navigate to="/" />} />
// //         <Route path="/about" element={<PageWrapper title="About Us"><About /></PageWrapper>} />
// //         <Route path="/contact" element={<PageWrapper title="Contact"><Contact /></PageWrapper>} />
// //         <Route path="/regi" element={<PageWrapper title="Register"><Register /></PageWrapper>} />
// //         <Route path="/login" element={<PageWrapper title="Login"><Login /></PageWrapper>} />
// //         <Route path="/jobs" element={<PageWrapper title="Jobs"><Jobs /></PageWrapper>} />
// //         <Route path="/all-company" element={<PageWrapper title="Companies"><AllCompanies /></PageWrapper>} />
// //         <Route path="/top-companies/:companyId" element={<PageWrapper title="Company Details"><CompanyDetails /></PageWrapper>} />
// //         <Route path="/careeTips" element={<PageWrapper title="Career Tips"><CareerTips /></PageWrapper>} />
// //         <Route path="/details/:blogId" element={<PageWrapper title="Blog Details"><BlogDetails /></PageWrapper>} />
// //         {/* <Route path="/unauthorized" element={<PageWrapper title="Access Denied"><Unauthorized /></PageWrapper>} /> */}

// //         {/* Candidate-Only Routes */}
// //         <Route element={<PrivateRoute allowedRoles={['Candidate']} />}>
// //           <Route
// //             path="/dashboard/*"
// //             element={<PageWrapper title="Dashboard"><Dashboard /></PageWrapper>}
// //           >
// //             <Route index element={<Profile />} />
// //             <Route path="profile" element={<Profile />} />
// //             <Route path="security" element={<Security />} />
// //             <Route path="job-feed" element={<JobFeed />} />
// //             <Route path="application-tracker" element={<ApplicationTracker />} />
// //             <Route path="saved-jobs" element={<SavedJobs />} />
// //             <Route path="settings" element={<Settings />} />
// //           </Route>
// //         </Route>

// //         {/* Admin-Only Route */}
// //         <Route element={<PrivateRoute allowedRoles={['admin']} />}>
// //           <Route
// //             path="/admin-panel"
// //             element={<PageWrapper title="Admin Panel"><AdminPanel /></PageWrapper>}
// //           />
// //         </Route>
// //       </Routes>
// //     </AnimatePresence>
// //   );
// // };

// // App Entry
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Suspense fallback={<div className="text-center mt-5 fw-bold">Loading...</div>}>
//         <AnimatedRoutes />
//       </Suspense>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
