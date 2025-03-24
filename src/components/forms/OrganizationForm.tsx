import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../AuthContext';

interface OrganizationFormData {
  name: string;
  websiteUrl: string;
  email: string;
  githubUrl?: string;
  shortDescription: string;
  fullDescription: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    discord?: string;
  };
}

interface ProjectFormData {
  title: string;
  techStack: string[];
  description: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  expectedOutcomes?: string;
  githubRepo?: string;
  tags: string[];
  mentors: { name: string; email: string; }[];
}

export function OrganizationForm() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectFormData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<OrganizationFormData>();

  const handleAddProject = (project: ProjectFormData) => {
    setProjects([...projects, project]);
    setCurrentProject(null);
  };

  const onSubmit = async (data: OrganizationFormData) => {
    if (!user) {
      setError('You must be signed in to register an organization');
      return;
    }

    try {
      // Insert organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          user_id: user.id,
          name: data.name,
          website_url: data.websiteUrl,
          email: data.email,
          github_url: data.githubUrl,
          short_description: data.shortDescription,
          full_description: data.fullDescription,
          social_links: data.socialLinks
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Insert projects and mentors
      for (const project of projects) {
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .insert({
            organization_id: org.id,
            title: project.title,
            tech_stack: project.techStack,
            description: project.description,
            difficulty_level: project.difficultyLevel,
            expected_outcomes: project.expectedOutcomes,
            github_repo: project.githubRepo,
            tags: project.tags
          })
          .select()
          .single();

        if (projectError) throw projectError;

        // Insert mentors
        for (const mentor of project.mentors) {
          const { data: mentorData, error: mentorError } = await supabase
            .from('mentors')
            .insert({
              organization_id: org.id,
              name: mentor.name,
              email: mentor.email
            })
            .select()
            .single();

          if (mentorError) throw mentorError;

          // Link mentor to project
          const { error: linkError } = await supabase
            .from('project_mentors')
            .insert({
              project_id: projectData.id,
              mentor_id: mentorData.id
            });

          if (linkError) throw linkError;
        }
      }

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while registering');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Organization Registration</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
          Organization registered successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">This field is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              {...register('websiteUrl', { required: true })}
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
              GitHub URL
            </label>
            <input
              type="url"
              {...register('githubUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <input
              type="text"
              {...register('shortDescription', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Description
            </label>
            <textarea
              {...register('fullDescription', { required: true })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Projects</h3>
            {projects.map((project, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium">{project.title}</h4>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCurrentProject({})}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Add Project
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Register Organization
            </button>
          </div>
        </form>
      )}
    </div>
  );
}