import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { LoadingSpinner } from './LoadingSpinner';
import type { Job, JobStatus } from '../types';

interface JobReviewModalProps {
  job: Job;
  onClose: () => void;
  onStatusUpdate: (jobId: string, status: JobStatus) => Promise<void>;
}

export const JobReviewModal = ({
  job,
  onClose,
  onStatusUpdate,
}: JobReviewModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status: JobStatus) => {
    try {
      setLoading(true);
      await onStatusUpdate(job.id, status);
      onClose();
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Review Job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {job.category}
            </Badge>
            <h3 className="text-2xl font-bold text-slate-900">{job.title}</h3>
            <p className="text-lg text-slate-600 mt-1">{job.company}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Location:</span>
              <span className="ml-2 text-slate-900 font-medium">
                {job.location}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Type:</span>
              <span className="ml-2 text-slate-900 font-medium">{job.type}</span>
            </div>
            <div>
              <span className="text-slate-500">Salary:</span>
              <span className="ml-2 text-slate-900 font-medium">{job.salary}</span>
            </div>
            <div>
              <span className="text-slate-500">Posted:</span>
              <span className="ml-2 text-slate-900 font-medium">
                {new Date(job.posted_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
            <p className="text-slate-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Requirements</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-6 flex gap-3">
            <Button
              onClick={() => handleStatusUpdate('approved')}
              disabled={loading || job.status === 'approved'}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Approve'}
            </Button>
            <Button
              onClick={() => handleStatusUpdate('rejected')}
              disabled={loading || job.status === 'rejected'}
              variant="outline"
              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Reject'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

