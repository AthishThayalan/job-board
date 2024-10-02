import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import JobItem from "./JobItem";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch jobs data from the backend (replace with real API endpoint)
    // For demonstration, using static data
    const mockJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Co.",
        location: "London",
        description: "Building and maintaining web applications.",
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "Innovate Ltd.",
        location: "Newcastle",
        description: "Designing and developing server-side logic.",
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Dev Hub",
        location: "Manchester",
        description: "Working on both client-side and server-side code.",
      },
    ];
    setJobs(mockJobs);
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
                  key={job.id}
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
