import { FC } from "react";

interface JobProps {
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobItem: FC<JobProps> = ({ title, company, location, description }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm transition-shadow duration-300 cursor-pointer hover:shadow-xl hover:border-indigo-500 hover:bg-indigo-50">
      <h3 className="text-xl font-bold text-indigo-600">{title}</h3>
      <p className="text-gray-700">
        {company} - {location}
      </p>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default JobItem;
