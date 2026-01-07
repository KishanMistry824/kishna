import React from "react";
import HeroSection from "../Components/JobsComponents/HeroSection";
// import JobSerchFilter from "../Components/JobsComponents/JobSearchFilter";
import JobList from "../Components/JobsComponents/JobsList";
import TopCompanies from "../Components/JobsComponents/TopCompanyCard";
import JobStats from "../Components/JobsComponents/JobsState";
import JobsPerCompanyChart from "../Components/JobsComponents/JobsPerCompanyChart";
import TopPayingCompanies from "../Components/JobsComponents/TopPayingCompany";
import JobCategories from "../Components/JobsComponents/JobCategory";
import TopHiringCompanies from "../Components/JobsComponents/TopCompaniesHiringNow";


const Jobs = () => {
    return (
        <>
            <HeroSection />
            <JobCategories />
            {/* <JobSerchFilter /> */}
            <JobList />
            <TopCompanies />
            <TopHiringCompanies/>
            <JobStats />
            <JobsPerCompanyChart />
            <TopPayingCompanies />
        </>
    );
};

export default Jobs;