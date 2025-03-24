import React from 'react';
import { Code2, Users, Calendar } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      {/* Why ISoC */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Why Indian Summer of Code?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Indian Summer of Code (ISoC) is a unique initiative designed to bridge the gap between student developers
              and the open-source community. We believe in nurturing talent, fostering innovation, and creating
              meaningful impact through collaborative development.
            </p>
          </div>
        </div>
      </section>

      {/* Why Open Source */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Why Open Source?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">What is Open Source?</h3>
              <p className="text-gray-600 mb-6">
                Open source software is code that is designed to be publicly accessible—anyone can see, modify, and
                distribute the code as they see fit. It promotes collaboration, transparency, and community-driven development.
              </p>
              <h3 className="text-xl font-semibold mb-4">Why is it Important?</h3>
              <p className="text-gray-600">
                Open source drives innovation, reduces development costs, and creates better software through community
                collaboration. It's the foundation of modern software development and powers much of the technology we use daily.
              </p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/watch?v=dQw4w9WgXcQ"
                title="Understanding Open Source"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Key Dates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Dates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Applications Open</h3>
              <p className="text-gray-600">March 1, 2025</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coding Period</h3>
              <p className="text-gray-600">June 1 - July 31, 2025</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <p className="text-gray-600">September 15, 2025</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}