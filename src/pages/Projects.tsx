import React from 'react';
import { Code2, Users, Star } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      name: "Web Framework Enhancement",
      org: "OpenSource Foundation",
      description: "Improve performance and add new features to our web framework",
      tech: ["TypeScript", "React", "Node.js"],
      difficulty: "Medium"
    },
    {
      name: "ML Model Optimization",
      org: "AI Research Lab",
      description: "Optimize machine learning models for better performance",
      tech: ["Python", "TensorFlow", "PyTorch"],
      difficulty: "Hard"
    },
    {
      name: "Mobile App Development",
      org: "Community Apps",
      description: "Build a cross-platform mobile app for community engagement",
      tech: ["React Native", "Firebase"],
      difficulty: "Medium"
    },
    // Add more projects as needed
  ];

  return (
    <div className="pt-16">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Available Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${project.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                        project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{project.org}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}