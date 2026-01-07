import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../JobListingCompontes/JobCard"; 

const SavedJobs = ({ user }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from props or fallback to localStorage
  const storedUserId = localStorage.getItem("userId");
  const userId = user?._id || storedUserId;

  useEffect(() => {
    if (!userId) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/jobs/saved/${userId}`
        );
        setSavedJobs(response.data);
      } catch (err) {
        console.error("Error fetching saved jobs:", err.response?.data || err.message);
        setError("Failed to fetch saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [userId]);

  if (loading) return <div className="text-center mt-5">Loading saved jobs...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (savedJobs.length === 0) return <div className="text-center mt-5">No saved jobs found.</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Saved Jobs</h2>
      {savedJobs.map((job) => (
        <JobCard key={job._id} job={job} user={user} />
      ))}
    </div>
  );
};

export default SavedJobs;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import JobCard from "../JobListingCompontes/JobCard";

// const SavedJobs = ({ user }) => {
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const storedUserId = localStorage.getItem("userId");
//   const userId = user?._id || storedUserId;

//   useEffect(() => {
//     if (!userId) {
//       setError("User not found.");
//       setLoading(false);
//       return;
//     }

//     const fetchSavedJobs = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:5000/api/jobs/saved/${userId}`
//         );
//         setSavedJobs(response.data);
//       } catch (err) {
//         console.error("Error fetching saved jobs:", err.response?.data || err.message);
//         setError("Failed to fetch saved jobs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedJobs();
//   }, [userId]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white text-lg animate-pulse">
//         Loading saved jobs...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-red-400 text-lg">
//         {error}
//       </div>
//     );

//   if (savedJobs.length === 0)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-300 text-lg">
//         No saved jobs found.
//       </div>
//     );

//  return (
//   <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
//     {/* background glow effects */}
//     <div className="absolute inset-0 overflow-hidden opacity-40">
//       <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
//       <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-ping"></div>
//     </div>

//     <div className="relative container mx-auto py-16 px-4">
//       <h2 className="text-4xl font-bold mb-8 text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-lg">
//         💼 Your Saved Jobs
//       </h2>

//       {/* ✅ Responsive grid layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {savedJobs.map((job) => (
//           <div
//             key={job._id}
//             className="transform hover:scale-105 transition-transform duration-300"
//           >
//             <JobCard job={job} user={user} />
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// };

// export default SavedJobs;
