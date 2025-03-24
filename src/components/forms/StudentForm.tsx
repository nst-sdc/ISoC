import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../AuthContext';

interface StudentFormData {
  fullName: string;
  email: string;
  githubProfile: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  motivation: string;
  pastContributions?: string;
  technicalSkills: string[];
  preferredCategories: string[];
}

export function StudentForm() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>();

  const onSubmit = async (data: StudentFormData) => {
    if (!user) {
      setError('You must be signed in to register');
      return;
    }

    try {
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          user_id: user.id,
          ...data,
          resume_url: '', // TODO: Implement file upload
          proposal_url: '' // TODO: Implement file upload
        });

      if (studentError) throw studentError;

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while registering');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Student Registration</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
          Registration successful!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub Profile
            </label>
            <input
              type="url"
              {...register('githubProfile', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              {...register('linkedinProfile')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Portfolio URL
            </label>
            <input
              type="url"
              {...register('portfolioUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Why do you want to participate?
            </label>
            <textarea
              {...register('motivation', { required: true })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Past Open Source Contributions
            </label>
            <textarea
              {...register('pastContributions')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Technical Skills (comma-separated)
            </label>
            <input
              type="text"
              {...register('technicalSkills', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Project Categories (comma-separated)
            </label>
            <input
              type="text"
              {...register('preferredCategories', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
}