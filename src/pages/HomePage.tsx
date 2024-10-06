import React, { useState, useEffect } from "react";
import NavBar from "../Components/layout/Navbar";
import JobList from "../Components/Job/JobList";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const HomePage: React.FC = () => {
  const { user } = useAuth(); // Access user information
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {" "}
      {/* Add padding-top here */}
      <NavBar />
      <div className="flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            {user
              ? `Welcome, ${user.username}, here are some jobs for ya!`
              : "Job Listings"}
          </h2>
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
