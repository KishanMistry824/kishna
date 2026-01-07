import HeroSection2 from '../Components/JobListingCompontes/HeroSection';
import JobSerchHeaders from '../Components/JobListingCompontes/JobSerchHeaders';
import JobCategories from '../Components/JobsComponents/JobCategory';
import PopularCategories from "../Components/PopularCategories1";
import FeaturedCompaniesCarousel from '../Components/JobListingCompontes/FeaturedCompaniesCarousel';
import PopularjobRole from '../Components/JobListingCompontes/PopularJobRole';
import ModernUpcomingEvents from "../Components/JobListingCompontes/ModernUpcomingEvents";

const JobListing = () =>{
    return(
        <main  style={{
        background: "linear-gradient(135deg, #eef2f3 50%, #8e9eab 100%)", // updated gradient
      }}>    
        <HeroSection2/>    
       <JobSerchHeaders/>
        <JobCategories />
        <PopularCategories/>
        <FeaturedCompaniesCarousel/>
        <PopularjobRole />
        <ModernUpcomingEvents />
        </main>
    );
}

export default JobListing; 