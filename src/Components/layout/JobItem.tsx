import React from "react";

interface JobProps {
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobItem: React.FC<JobProps> = ({
  title,
  company,
  location,
  description,
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-indigo-600">{title}</h3>
      <p className="text-gray-700">
        {company} - {location}
      </p>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default JobItem;
