import React from 'react';
import { CheckCircle, FileText, Users, Award } from 'lucide-react';

export default function Students() {
  return (
    <div className="pt-16">
      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Student Eligibility</h2>
          <div className="bg-orange-50 p-8 rounded-xl">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                <span>Must be at least 17 years old</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                <span>Currently enrolled in an educational institution</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                <span>Basic programming knowledge and willingness to learn</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                <span>Ability to commit full-time during the coding period</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Application Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <FileText className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Submit Application</h3>
              <p className="text-gray-600">Fill out the online application form with your details and project preferences</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Project Proposal</h3>
              <p className="text-gray-600">Write a detailed proposal for your chosen project</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Award className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. Selection</h3>
              <p className="text-gray-600">Get selected based on your proposal and interview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing a Proposal */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Writing a Strong Proposal</h2>
          <div className="prose max-w-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Do's</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Research the project thoroughly</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Include a detailed timeline</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Highlight relevant skills and experience</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Show enthusiasm and commitment</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Don'ts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Copy proposals from others</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Make unrealistic commitments</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Submit without proofreading</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Ignore project guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}