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
    <div className='p-10'>
    <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
  <div className="relative bg-gray-50 p-8">
    <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-gray-700">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    </div>
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-gray-800 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div>
        <h2 className="text-3xl font-light text-gray-800">Student Registration</h2>
        <p className="text-gray-500 mt-1">Join our open source community of developers</p>
      </div>
    </div>
  </div>

  <div className="p-8">
    {error && (
      <div className="bg-red-50 text-red-600 p-5 rounded-lg mb-8 border-l-2 border-red-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-3 text-red-500">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="font-medium">{error}</span>
      </div>
    )}

    {success ? (
      <div className="bg-green-50 text-green-700 p-6 rounded-lg mb-8 border-l-2 border-green-500">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-green-600">
              <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-medium text-green-800">Registration successful</h3>
            <p className="text-green-700 mt-1">Thank you for joining. We'll be in touch soon.</p>
          </div>
        </div>
      </div>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName', { required: true })}
              className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
              placeholder="johndoe@example.com"
            />
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100">
          <div className="absolute top-0 right-0 w-16 h-16 text-gray-100 transform translate-x-2 -translate-y-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-gray-700">
              <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
            Profile Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                  <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub Profile
              </label>
              <input
                type="url"
                {...register('githubProfile', { required: true })}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
                placeholder="https://github.com/user"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                LinkedIn Profile
              </label>
              <input
                type="url"
                {...register('linkedinProfile')}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
                placeholder="https://linkedin.com/in/user"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                  <path fill="currentColor" d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z" />
                </svg>
                Portfolio URL
              </label>
              <input
                type="url"
                {...register('portfolioUrl')}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                <path fill="currentColor" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
              </svg>
              Why do you want to participate?
            </label>
            <div className="absolute top-10 right-2 opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 text-gray-800">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <textarea
              {...register('motivation', { required: true })}
              rows={4}
              className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors resize-none"
              placeholder="Share your motivation for joining this program..."
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                <path fill="currentColor" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
              </svg>
              Past Open Source Contributions
            </label>
            <div className="absolute top-10 right-2 opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-24 h-24 text-gray-800">
                <path fill="currentColor" d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74z" />
              </svg>
            </div>
            <textarea
              {...register('pastContributions')}
              rows={4}
              className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors resize-none"
              placeholder="Describe your previous open source work..."
            />
          </div>
        </div>

        <div className="relative p-6 rounded-xl bg-gradient-to-r from-gray-100 via-white to-gray-50 border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-2 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-t-xl"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-5 flex items-center pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-gray-700">
              <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
            Skills & Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                  <path fill="currentColor" d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z" />
                </svg>
                Technical Skills
              </label>
              <input
                type="text"
                {...register('technicalSkills', { required: true })}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
                placeholder="JavaScript, React, Python, etc."
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-gray-400">
                  <path fill="currentColor" d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z" />
                </svg>
                Preferred Project Categories
              </label>
              <input
                type="text"
                {...register('preferredCategories', { required: true })}
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-0 transition-colors"
                placeholder="Web Development, Machine Learning, etc."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all duration-300 shadow-md hover:shadow-lg flex items-center group"
          >
            <span>Submit Registration</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
              <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>
        
        <div className="text-center text-gray-500 text-xs">
          By submitting this form, you agree to our Terms of Service and Privacy Policy
        </div>
      </form>
    )}
  </div>
</div>
</div>
  );
}