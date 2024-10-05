import React from "react";
import JobItem from "./JobItem";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="grid gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobItem
            key={job._id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
          />
        ))
      ) : (
        <p className="text-gray-600">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default JobList;
