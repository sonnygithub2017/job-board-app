import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { jobs } from '../data/jobs';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900">Job not found</h2>
        <p className="text-slate-600 mt-2">The job you are looking for does not exist or has been removed.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to jobs
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <Badge variant="secondary" className="mb-4">{job.category}</Badge>
                    <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                    <div className="text-xl text-slate-600 mt-2 font-medium">{job.company}</div>
                </div>
                <div className="flex flex-col gap-3 min-w-[140px]">
                    <Button size="lg" onClick={() => alert(`Application started for ${job.title} at ${job.company}`)}>Apply Now</Button>
                    <Button variant="outline" size="md">Save Job</Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm text-slate-600">
                <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-slate-400" />
                    {job.location}
                </div>
                <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-slate-400" />
                    {job.salary}
                </div>
                <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-slate-400" />
                    {job.type}
                </div>
                <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-slate-400" />
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                </div>
            </div>
        </div>

        <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
            <p className="text-slate-600 leading-relaxed mb-8 whitespace-pre-line">
                {job.description}
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>

             <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">About {job.company}</h3>
                <p className="text-slate-600 text-sm">
                    Information about the company would go here. This is a placeholder description for the company profile.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

