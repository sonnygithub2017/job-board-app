import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/jobService';
import { JobForm } from '../components/JobForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CreateJobData, Job } from '../types';

export const PostJobPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [existingJob, setExistingJob] = useState<Job | undefined>();
  const [loading, setLoading] = useState(!!id);

  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    try {
      const job = await jobService.getJobById(jobId);
      if (job) {
        setExistingJob(job);
      } else {
        alert('Job not found');
        navigate('/employer/dashboard');
      }
    } catch (error) {
      console.error('Error loading job:', error);
      alert('Failed to load job');
      navigate('/employer/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: CreateJobData) => {
    if (!user?.employer?.id) {
      throw new Error('Employer profile not found');
    }

    try {
      if (isEditMode && id) {
        await jobService.updateJob(id, data);
      } else {
        await jobService.createJob(user.employer.id, data);
      }
      navigate('/employer/dashboard');
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/employer/dashboard"
        className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {isEditMode ? 'Edit Job' : 'Post a New Job'}
        </h1>
        <p className="text-slate-600 mb-8">
          {isEditMode
            ? 'Update the job details below'
            : 'Fill out the form below to post a new job listing'}
        </p>

        <JobForm
          initialData={existingJob}
          onSubmit={handleSubmit}
          submitLabel={isEditMode ? 'Update Job' : 'Post Job'}
        />
      </div>
    </div>
  );
};

