import { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { SearchFilter } from '../components/SearchFilter';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesType = typeFilter === '' || job.type === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [searchTerm, locationFilter, typeFilter]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Find Your Dream Job</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Browse thousands of job openings from top companies and startups.
        </p>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        locationFilter={locationFilter}
        typeFilter={typeFilter}
        onSearchChange={setSearchTerm}
        onLocationChange={setLocationFilter}
        onTypeChange={setTypeFilter}
      />

      <div className="mb-6 text-slate-600 font-medium">
        Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
          <p className="text-lg text-slate-600">No jobs found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setLocationFilter(''); setTypeFilter(''); }}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

