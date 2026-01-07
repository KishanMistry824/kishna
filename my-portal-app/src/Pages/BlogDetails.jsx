// // BlogDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const BlogDetails = () => {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     import(`../../Data/BlogData/${blogId}.json`)
//       .then((data) => setBlog(data))
//       .catch(() => setError("Blog not found."));
//   }, [blogId]);

//   if (error) return <div className="text-center text-danger">{error}</div>;
//   if (!blog) return <div className="text-center">Loading...</div>;

//   return (
//     <div className="container py-5">
//       <div className={`card border-${blog.color} border-4 shadow`}>
//         <div className="card-body">
//           <h2 className="card-title">{blog.mistake}</h2>
//           <p className="text-muted">{blog.date} | By {blog.author}</p>
//           <p>{blog.details}</p>
//           <a href="/" className="btn btn-outline-secondary mt-3">← Back</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;







import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import TopResumeMistakes from "../Components/BlogSection/TopResumeMistakes.jsx";
import NotFoundBlog from "../Components/BlogSection/NotFoundBlog.jsx";
import InterviewPrep from "../Components/BlogSection/InterviwePrep.jsx";
import InDemandSkills from "../Components/BlogSection/InDemandSkills.jsx";
import CareerTipDetails from "../Components/BlogSection/CareerTipDetails.jsx";
import CareerTipJobApplicationDetails from "../Components/BlogSection/CareerTipJobApplicationDetails.jsx";
import HowtoStandOutinOnlineJobApplications from "../Components/BlogSection/HowtoStandOutinOnlineJobApplications.jsx";
import CareerTipCareerGrowth from "../Components/BlogSection/CareerTipCareerGrowth.jsx";

// Utility to capitalize or camelCase if needed
const formatIdToComponent = (id) => {
  return id.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toUpperCase());
};

const BlogDetails = () => {
  const { blogId } = useParams();
  const formattedComponentName = formatIdToComponent(blogId);

  const LazyBlogComponent = lazy(() =>
    import(`../Components/BlogSection/${formattedComponentName}.jsx`).catch(() =>
      import("../Components/BlogSection/NotFoundBlog.jsx")
    )
  );

  return (
    <div className="container py-5">
      <Suspense fallback={<div className="text-center">Loading blog content...</div>}>
        <LazyBlogComponent />
      </Suspense>
    </div>
  );
};

export default BlogDetails;
