import React, { useState, useEffect } from "react";
import NavBar from "../Components/layout/Navbar";
import JobItem from "../Components/layout/JobItem";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch jobs data from the backend
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        console.log(response);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Job Listings
          </h2>
          {jobs.length > 0 ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <JobItem
                  key={job._id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  description={job.description}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
