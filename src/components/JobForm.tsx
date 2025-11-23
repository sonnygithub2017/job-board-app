import { useState, FormEvent } from 'react';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';
import { JOB_TYPES, JOB_CATEGORIES } from '../utils/constants';
import type { CreateJobData, Job } from '../types';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: CreateJobData) => Promise<void>;
  submitLabel?: string;
}

export const JobForm = ({
  initialData,
  onSubmit,
  submitLabel = 'Post Job',
}: JobFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(initialData?.title || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [type, setType] = useState(initialData?.type || 'Full-time');
  const [salary, setSalary] = useState(initialData?.salary || '');
  const [category, setCategory] = useState(initialData?.category || 'Engineering');
  const [description, setDescription] = useState(initialData?.description || '');
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements || ['']
  );

  const handleAddRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Filter out empty requirements
    const filteredRequirements = requirements.filter((r) => r.trim() !== '');

    if (filteredRequirements.length === 0) {
      setError('Please add at least one requirement');
      setLoading(false);
      return;
    }

    try {
      await onSubmit({
        title,
        company,
        location,
        type,
        salary,
        category,
        description,
        requirements: filteredRequirements,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Job Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Senior Frontend Engineer"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
            Company Name *
          </label>
          <input
            id="company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. TechCorp Inc."
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
            Location *
          </label>
          <input
            id="location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. San Francisco, CA or Remote"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
            Job Type *
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-2">
            Salary Range *
          </label>
          <input
            id="salary"
            type="text"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. $120k - $160k"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
          Job Description *
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity great..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Requirements *
        </label>
        <div className="space-y-3">
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. 5+ years of experience with React"
              />
              {requirements.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveRequirement(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRequirement}
          className="mt-3"
        >
          + Add Requirement
        </Button>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? <LoadingSpinner size="sm" /> : submitLabel}
        </Button>
      </div>
    </form>
  );
};

