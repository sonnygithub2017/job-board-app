import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Job } from '../types';
import { Badge } from './Badge';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-slate-600 mt-1">{job.company}</p>
          </div>
          <Badge variant={job.type === 'Full-time' ? 'primary' : 'secondary'}>{job.type}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500 flex-grow">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1.5 shrink-0" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 shrink-0" />
            {new Date(job.postedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
           <Badge variant="outline" className="border-slate-200 text-slate-600">
             {job.category}
           </Badge>
           <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
             View Details &rarr;
           </span>
        </div>
      </div>
    </Link>
  );
};

