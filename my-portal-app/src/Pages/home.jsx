import React from "react";
import HeroSection from "../Components/HeroSection";
import HowItWorks from "../Components/HowItWorks";
import PopularJobs from "../Components/PopularJobs";
import PopularCategories from "../Components/PopularCategories";
import PopularCompany from "../Components/PopularCompany";
import Testimonials from "../Components/Testimonials";
import CTA from "../Components/CTA";
import BlogSection from "../Components/BlogSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <PopularJobs />
      <PopularCategories />
      <CTA />
      <PopularCompany />
      <Testimonials />
      <BlogSection />
     
    </main>
  );
};

export default Home;